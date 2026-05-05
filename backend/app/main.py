# type: ignore

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from apscheduler.schedulers.background import BackgroundScheduler

from app.application.job_service import JobService

from app.infrastructure.database.config import init_db, get_db, SessionLocal
from app.infrastructure.database.models import JobModel
from app.infrastructure.scrapers.trabalha_brasil import TrabalhaBrasilScraper
from app.infrastructure.database.repository import JobRepository
from app.infrastructure.notifier import NotifierService
from app.interfaces.schemas import JobResponse, SearchRequest
from app.infrastructure.database.websocket import ConnectionManager


app = FastAPI(title="EmpregoAÍ")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

manager = ConnectionManager()

init_db()


def scheduled_job_search():
    """
    Execução em background. Aqui não temos o contexto do FastAPI,
    por isso instanciamos a SessionLocal manualmente.
    """
    print("[WORKER] Iniciando Busca Automática...")
    db = SessionLocal()
    try:
        # No futuro, essas keywords virão de uma tabela 'Settings' no banco
        keywords = [
            "Estágio em TI",
            "Desenvolvedor Júnior Python",
            "Desenvolvedor Júnior Node",
        ]

        scraper = TrabalhaBrasilScraper()
        repo = JobRepository(db)
        notifier = NotifierService()
        service = JobService(scraper, repo)

        for kw in keywords:

            vagas_novas = service.execute_update(kw)

            if vagas_novas:
                notifier.send_new_jobs_alert(vagas_novas)
                print(
                    f"[WORKER] Busca por {kw}: {len(vagas_novas)} "
                    "novas vagas encontradas."
                )
            else:
                print(f"[WORKER] Busca por {kw}: Nenhuma vaga nova.")

    except Exception as e:
        print(f"[WORKER] Erro crítico: {str(e)}")
    finally:
        db.close()


@app.on_event("startup")
def start_scheduler():
    scheduler = BackgroundScheduler()

    scheduled_job_search()

    scheduler.add_job(scheduled_job_search, "interval", hours=1)
    scheduler.start()
    print("[SERVER] Scheduler iniciado com sucesso.")


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@app.get("/jobs", response_model=list[JobResponse])
def get_jobs(db: Session = Depends(get_db)) -> list[JobModel]:
    return db.query(JobModel).order_by(JobModel.discovered_at.desc()).all()


@app.post("/search")
async def custom_job_search(
    request: SearchRequest,
    db: Session = Depends(get_db)
):

    try:
        scraper = TrabalhaBrasilScraper()
        repo = JobRepository(db)
        service = JobService(scraper, repo)

        vagas_novas = service.execute_update(request.keyword)

        if vagas_novas:
            vagas_dict = [
                {
                    "id": vaga.id,
                    "title": vaga.title,
                    "company": vaga.company,
                    "location": vaga.location,
                    "link": vaga.link,
                    "site_source": vaga.site_source,
                    "discovered_at": vaga.discovered_at.isoformat()
                } for vaga in vagas_novas
            ]
            await manager.broadcast(vagas_dict)

    except Exception as e:
        print(f"[API] Erro na busca: {str(e)}")
        return []

    return {
        "message": "Busca concluída com sucesso!",
        "keyword": request.keyword,
        "jobs_found": len(vagas_novas)
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

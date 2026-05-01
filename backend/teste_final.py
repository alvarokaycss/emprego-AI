from app.infrastructure.database.config import init_db, SessionLocal
from app.infrastructure.database.repository import JobRepository
from app.infrastructure.scrapers.trabalha_brasil import TrabalhaBrasilScraper
from app.application.job_service import JobService

# 1. Cria o banco de dados localmente
init_db()

# 2. Inicializa as camadas
db = SessionLocal()
repo = JobRepository(db)
scraper = TrabalhaBrasilScraper()
service = JobService(scraper, repo)

# 3. Roda a busca (ex: Python)
print("Iniciando busca e salvamento...")
total = service.execute_update("Python")
print(f"Sucesso! {total} novas vagas salvas no seu SQLite.")

db.close()

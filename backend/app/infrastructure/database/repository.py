from sqlalchemy.orm import Session
from app.domain.models import Job as DomainJob
from .models import JobModel


class JobRepository:
    def __init__(self, db: Session):
        self.db = db

    def save(self, job: DomainJob) -> JobModel:
        """Converte um objeto de domínio para banco e salva"""
        db_job = JobModel(
            title=job.title,
            company=job.company,
            location=job.location,
            link=job.link,
            site_source=job.site_source,
        )

        self.db.add(db_job)
        self.db.commit()
        self.db.refresh(db_job)

        return db_job

    def exists_by_link(self, link: str) -> bool:
        """Verifica se uma vaga com esse link já existe (Anti-Duplicate)"""
        return self.db.query(JobModel).filter(JobModel.link == link).first() is not None

from app.domain.models import Job
from app.infrastructure.scrapers.base import JobScraperStrategy
from app.infrastructure.database.repository import JobRepository


class JobService:
    def __init__(self, scraper: JobScraperStrategy, repository: JobRepository):
        self.scraper = scraper
        self.repository = repository

    def execute_update(self, keyword: str) -> list[Job]:
        vagas_encontradas = self.scraper.fetch_jobs(keyword)
        novas_vagas: list[Job] = []

        for vaga in vagas_encontradas:
            if not self.repository.exists_by_link(vaga.link):
                self.repository.save(vaga)
                novas_vagas.append(vaga)

        return novas_vagas

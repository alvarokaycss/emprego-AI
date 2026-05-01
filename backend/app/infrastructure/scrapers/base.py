from abc import ABC, abstractmethod
from typing import List
from app.domain.models import Job


class JobScraperStrategy(ABC):
    @abstractmethod
    def fetch_jobs(self, keyword: str) -> List[Job]:
        """Extrai vagas de um site específico baseado em uma palavra-chave."""
        pass

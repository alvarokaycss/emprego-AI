from pydantic import BaseModel
from datetime import datetime


class JobResponse(BaseModel):
    """Schema de resposta da API — traduz os dados do banco para JSON."""
    id: int
    title: str
    company: str
    location: str
    link: str
    site_source: str
    discovered_at: datetime

    class Config:
        from_attributes = True


class SearchRequest(BaseModel):
    keyword: str


class PaginatedJobResponse(BaseModel):
    items: list[JobResponse]
    total_items: int
    total_pages: int
    current_page: int

from datetime import datetime
from sqlalchemy import String, Integer, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class JobModel(Base):
    __tablename__ = "jobs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    company: Mapped[str] = mapped_column(String(255))
    location: Mapped[str] = mapped_column(String(255))
    link: Mapped[str] = mapped_column(String(500), unique=True)  # Unique evita duplicatas
    site_source: Mapped[str] = mapped_column(String(100))
    discovered_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

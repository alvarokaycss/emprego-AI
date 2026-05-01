import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base


# Descobre o caminho absoluto da pasta 'backend' independente de onde o terminal rodar
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
DB_PATH = os.path.join(BASE_DIR, "emprego.ai.db")

DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db():
    """Cria o arquivo de banco e as tabelas se não existirem."""
    Base.metadata.create_all(bind=engine)


def get_db():
    """Generator para sessões de banco (Injeção de Dependência)."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

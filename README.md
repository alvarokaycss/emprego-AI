# 🚀 EmpregoAÍ

Uma plataforma inteligente de busca e automação de vagas de emprego, focada em encontrar as melhores oportunidades de tecnologia em tempo real.

O sistema coleta ativamente vagas de portais de emprego, salva em um banco de dados local e apresenta tudo em uma interface web moderna e rápida, dispensando a necessidade de buscar vagas manualmente todos os dias.

## 🛠️ Tecnologias Utilizadas

O projeto foi modernizado de um script individual para uma arquitetura full-stack completa:

### **Backend (API & Automação)**
- **Python 3.11**
- **FastAPI** (API REST rápida e tipada)
- **SQLAlchemy** (ORM para banco de dados)
- **SQLite** (Banco de dados leve e integrado)
- **BeautifulSoup4 & requests** (Web Scraping)
- **APScheduler** (Execução de tarefas em background)

### **Frontend (Interface do Usuário)**
- **React 18**
- **Vite** (Build tool super rápido)
- **TailwindCSS** (Estilização utilitária e design responsivo)
- **Lucide React** (Ícones bonitos e leves)

## ⚙️ Como Executar o Projeto

Certifique-se de ter o **Python** e o **Node.js** instalados na sua máquina.

### 1. Rodando o Backend
Abra um terminal na pasta do projeto e execute:
```bash
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1  # (No Windows)
pip install -r requirements.txt
uvicorn app.main:app --reload
```
O servidor da API iniciará em `http://localhost:8000`. O scraper rodará automaticamente em segundo plano a cada 1 hora.

### 2. Rodando o Frontend
Abra um novo terminal na pasta do projeto e execute:
```bash
cd frontend
npm install
npm run dev
```
A interface web estará disponível em `http://localhost:5173`.

---
*Desenvolvido para automatizar e otimizar a jornada de busca por emprego na área de tecnologia.*

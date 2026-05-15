FROM python:3.11-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas o arquivo de dependências primeiro (aproveita o cache do Docker)
COPY requirements.txt .

# Instala as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o resto do código da pasta backend para o diretório /app no container
# Nota: No ambiente de desenvolvimento (docker-compose), isso será sobreposto pelo volume,
# mas é boa prática manter a instrução COPY para caso a imagem seja usada em produção.
COPY . .

# Expõe a porta que o FastAPI vai rodar
EXPOSE 8000

# Comando para rodar a aplicação com auto-reload
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

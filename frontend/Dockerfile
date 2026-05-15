FROM node:20-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Copia apenas os arquivos de configuração de pacotes primeiro (aproveita cache)
COPY package.json package-lock.json* ./

# Instala as dependências do Node
RUN npm install

# Copia o resto do código fonte para o container
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# O Vite por padrão roda apenas em localhost, o '--host 0.0.0.0' permite acesso externo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Use uma imagem base do Node.js
FROM node:16

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código para o diretório de trabalho
COPY . .

# Compile o TypeScript
RUN npm run start:dev

# Exponha a porta em que a aplicação será executada
#EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start"]

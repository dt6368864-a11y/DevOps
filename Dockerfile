FROM node:20-alpine

WORKDIR /app

# Instalar ngrok de forma global en el sistema Alpine antes de mapear archivos
RUN npm install -g @expo/ngrok

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

# Dejamos que corra el script nativo que ya tiene la bandera integrada
CMD ["npm", "run", "start"]
#Imagem Base
FROM node:alpine

#Criar pasta de trabalho dentro da imagem
WORKDIR /app

#Copiamos a app para lá
COPY package*.json ./
RUN npm install
COPY . .

#Expomos a porta que irá correr
EXPOSE 9000

#Indicamos como arrancar a aplicação
CMD [ "npm", "start" ]

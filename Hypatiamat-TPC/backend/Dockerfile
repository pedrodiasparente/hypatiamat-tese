FROM node:14
#Criar pasta de trabalho dentro da imagem
WORKDIR /StrapiAPI
#Copiamos a app para lá
COPY package*.json ./
RUN npm install
COPY . .
#Expomos a porta que irá correr
EXPOSE 3052
#Indicamos como arrancar a aplicação
CMD [ "npm", "run", "develop" ]
FROM node:23
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install  
COPY . .
RUN npx prisma generate
RUN prisma migrate deploy
CMD ["npm", "start"]
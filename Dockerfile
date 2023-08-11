FROM node:16.16-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
ENV DATABASE_URL=""
EXPOSE 8000
CMD [ "npm", "start" ]
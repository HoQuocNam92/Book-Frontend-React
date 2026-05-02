FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173
 

# ✅ chạy dist
CMD ["node", "dist/server.js"]
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY api/package*.json ./api/
RUN npm install
RUN cd api && npm install
COPY . .
RUN cd api && npm run build
RUN node -e "const fs=require('fs'); fs.cpSync('api/dist', 'dist', {recursive:true});"

EXPOSE 5000
CMD ["node", "dist/app.js"]

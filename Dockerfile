FROM node:20-alpine
WORKDIR /app/api
COPY api/package*.json ./
RUN npm install
COPY api/ ./
RUN npm run build

EXPOSE 5000
CMD ["node", "dist/app.js"]

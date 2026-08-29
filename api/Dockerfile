FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN mkdir -p /app/dist/src && cp -r dist/* /app/dist/src/ 2>/dev/null || true

EXPOSE 5000
CMD ["node", "dist/app.js"]

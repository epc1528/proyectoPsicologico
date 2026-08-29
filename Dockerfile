FROM node:20-alpine
WORKDIR /app
COPY . .
RUN cd api && npm install && npm run build
RUN mkdir -p /app/dist && cp -r /app/api/dist/* /app/dist/ 2>/dev/null || true

EXPOSE 5000
CMD ["node", "dist/app.js"]

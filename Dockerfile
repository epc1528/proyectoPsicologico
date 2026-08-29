FROM node:20-alpine
WORKDIR /app
COPY . .
RUN cd api && npm install && npm run build
RUN cp -r /app/api/dist /app/dist
RUN cp -r /app/api/node_modules /app/node_modules

EXPOSE 5000
CMD ["node", "dist/app.js"]

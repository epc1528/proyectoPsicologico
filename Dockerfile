FROM node:20-alpine
WORKDIR /app
COPY . .
RUN cd api && npm install && npm run build
RUN node -e "const fs=require('fs'); fs.cpSync('api/dist', 'dist', {recursive:true}); fs.cpSync('api/node_modules', 'node_modules', {recursive:true});"

EXPOSE 5000
CMD ["npm", "start"]

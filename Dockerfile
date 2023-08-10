FROM node:16.20.1

# Create app directory

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 1313


CMD ["npm", "start"]

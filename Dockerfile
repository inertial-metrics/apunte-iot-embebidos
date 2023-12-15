FROM node:20.2.0

# Create app directory

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 1313


CMD ["npm", "start"]

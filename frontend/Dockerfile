FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build --force

FROM node:18-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm install --force --only=production

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json .

EXPOSE 3000

CMD ["npm", "start"]
FROM node:22-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

EXPOSE 3011

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3011"]

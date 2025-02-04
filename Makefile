.PHONY: up down build logs ps clean

# Development commands
up:
	docker compose -f docker-compose.local.yml up -d

down:
	docker compose -f docker-compose.local.yml down

build:
	docker compose -f docker-compose.local.yml build

logs:
	docker compose -f docker-compose.local.yml logs -f

ps:
	docker compose -f docker-compose.local.yml ps

clean:
	docker compose -f docker-compose.local.yml down -v --remove-orphans

init:
	cp .env.example .env.local
	make build
	make up
	docker compose -f docker-compose.local.yml exec app npx prisma migrate dev

migrate:
	docker compose -f docker-compose.local.yml exec app npx prisma migrate dev

studio:
	docker compose -f docker-compose.local.yml exec app npx prisma studio

# Production commands
prod-up:
	docker compose -f docker-compose.prod.yml up -d

prod-down:
	docker compose -f docker-compose.prod.yml down

prod-build:
	docker compose -f docker-compose.prod.yml build

prod-logs:
	docker compose -f docker-compose.prod.yml logs -f

prod-ps:
	docker compose -f docker-compose.prod.yml ps

prod-clean:
	docker compose -f docker-compose.prod.yml down -v --remove-orphans 

check-health:
	curl -f http://localhost:4321/health

check-health-prod:
	curl -f http://localhost:4321/health
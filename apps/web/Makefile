SHELL := /bin/bash

.PHONY: up down services services-down init dev clean check-env load-dummy-data check-db

check-env:
	@if [ ! -f .env ]; then \
		echo "No .env found. Running initialization..."; \
		$(MAKE) init; \
	else \
		echo ".env exists, skipping initialization"; \
	fi

check-db:
	@echo "Checking database..."
	@set -a && . .env && set +a && \
	if ! pnpx prisma db execute --stdin <<< "SELECT 1" >/dev/null 2>&1; then \
		echo "Database connection failed. Setting up database..." && \
		pnpx prisma db push || exit 1 && \
		$(MAKE) load-dummy-data; \
	else \
		echo "Database connection successful. Checking for data..." && \
		USER_COUNT=$$(pnpx prisma db execute --stdin <<< "SELECT COUNT(*) FROM \"User\";" 2>/dev/null | grep -o '[0-9]*') && \
		if [ "$$USER_COUNT" = "0" ]; then \
			echo "Database is empty. Loading dummy data..." && \
			$(MAKE) load-dummy-data; \
		else \
			echo "Database already populated with $$USER_COUNT users"; \
		fi \
	fi

services:
	mkdir -p data/localstack
	docker compose -f docker-compose.local.yml up -d
	@echo "Waiting for Localstack to be ready..."
	@while ! docker compose -f docker-compose.local.yml exec -T localstack awslocal s3 ls >/dev/null 2>&1; do \
		echo "Waiting for Localstack..."; \
		sleep 3; \
	done
	@echo "Localstack is ready!"
	docker compose -f docker-compose.local.yml exec -T localstack awslocal s3 mb s3://tutly-local || true
	docker compose -f docker-compose.local.yml exec -T localstack awslocal s3api put-bucket-acl --bucket tutly-local --acl public-read
	@echo "Waiting for PostgreSQL to be ready..."
	@until docker compose -f docker-compose.local.yml exec -T db pg_isready; do \
		echo "Waiting for PostgreSQL..."; \
		sleep 2; \
	done
	@echo "PostgreSQL is ready!"

services-down:
	docker compose -f docker-compose.local.yml down

clean:
	docker compose -f docker-compose.local.yml down -v
	rm -rf data/localstack
	rm -f .env

init:
	@echo "Initializing Tutly..."
	cp .env.example .env
	@echo "Installing dependencies..."
	pnpm install
	mkdir -p data/localstack
	@echo "Setting up services..."
	make services
	@echo "Setting up database..."
	set -a && . .env && set +a && pnpx prisma generate
	set -a && . .env && set +a && pnpx prisma db push
	@echo "Loading initial data..."
	make load-dummy-data
	@echo "Initialization complete!"

dev:
	@echo "Starting development server..."
	set -a && . .env && set +a && pnpm dev & \
	echo "Starting Prisma Studio..." && \
	set -a && . .env && set +a && pnpx prisma studio

load-dummy-data:
	@echo "Loading dummy data..."
	@set -a && . .env && set +a && pnpx tsx prisma/seed/index.ts && echo "Dummy data loaded successfully" || echo "Failed to load dummy data"

up: check-env services check-db
	$(MAKE) dev

down:
	$(MAKE) services-down
	@pkill -f "prisma studio" || true
	@echo "All services have been stopped"

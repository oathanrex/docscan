.PHONY: dev build test

dev:
	docker-compose up -d
	cd frontend && npm run dev

build:
	docker-compose build

test:
	cd backend && pytest
	cd frontend && npm test

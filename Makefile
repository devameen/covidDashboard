create_db:
	docker run --name db-postgres -p 5432:5432 -e POSTGRES_PASSWORD=secret -e POSTGRES_USER=root -d postgres:12-alpine

prisma_generate: 
	npx primsa generate

prisma_db_seed: 
	npx prisma db seed

run_dev:
	npm run dev

run_build:
	npm run build

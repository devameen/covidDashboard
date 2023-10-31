## Stack used:
  NextJS (typescript)
  Postgres
 ### Libraries: 
   D3, ChartJs for visualisations
   Prisma for DB Querying.

## Steps to install:
 Dependencies : Node, Make and docker
 To install use following comments:
  `make create_db` 
 This creates a postgres container with port 5432 enabled
  `make prisma_generate`
 This make creates all migrations required for the the DB to run
  `make prisma_db_seed`
 This runs all db seed 
  `make run_dev`
 This runs the app at port 3000



Pasos para levantar el backend (aplicacion y base de datos) con docker:
docker build -t buensabor:v1 .
docker-compose build
docker-compose up -d
docker ps
docker logs $id_container
docker-compose down
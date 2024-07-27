COMPOSE = docker compose -f ./docker-compose.yaml

.PHONY: all
all: up

.PHONY: up
up:
	$(COMPOSE) up -d

.PHONY: down
down:
	$(COMPOSE) down -v

.PHONY: re
re: down up

.PHONY: nuke
nuke: down
	-docker rm -f $$(docker ps -aq)
	-docker rmi -f $$(docker images -aq)
	-docker volume rm -f $$(docker volume ls -q)
	-docker network rm -f $$(docker network ls -q)

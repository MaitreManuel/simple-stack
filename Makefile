.DEFAULT_GOAL := help

DC = docker-compose
DC_EXEC = $(DC) exec
DC_WARNING = printf '\033[1;33m*** DOCKER-COMPOSE CONTAINER ***\033[0m\n\n'
NPM = npm run

DOCKER_COMPOSE_EXIST := $(shell command -v docker-compose 2> /dev/null)
NPM_EXIST := $(shell command -v npm 2> /dev/null)

build: check-env-dev ## Compile les fichiers front CSS, JS et autre assets
	@if [ "${DOCKERIZE_WEBPACK}" = "true" ]; then \
		$(DC_WARNING); \
		$(DC_EXEC) node $(NPM) build; \
	else \
		$(NPM) build; \
	fi; \

check-env-dev:
FILE = .env.dev

ifeq (,$(wildcard $(FILE)))
    FILE = .env.dev.dist
endif

include $(FILE)

check-softs: ## Teste quelle type de packet manager est installé pour les dépendances PHP
ifdef COMPOSER_EXIST
	@echo 'composer disponible'
else
	@echo 'composer NON disponible'
endif

ifdef COMPOSER_PHAR_EXIST
	@echo 'composer.phar disponible'
else
	@echo 'composer.phar NON disponible'
endif

ifdef DOCKER_COMPOSE_EXIST
	@echo 'docker-compose disponible'
else
	@echo 'docker-compose NON disponible'
endif

ifdef NPM_EXIST
	@echo 'npm disponible'
else
	@echo 'npm NON disponible'
endif

clean: check-env-dev clean-orig clean-js ## Supprime les dépendances et les fichiers parasites
	@echo 'Suppression des node_modules et vendors'

clean-orig:
	@find . -name '*.orig' -delete

clean-js:  ## Supprime les dépendances front et les fichiers compilés
	@if [ "${DOCKERIZE_NPM}" = "true" ]; then \
  		$(DC_WARNING); \
		$(DC_EXEC) node rm -rf html/dist/* node_modules package-lock.json; \
	else \
		rm -rf html/dist/* node_modules package-lock.json; \
	fi; \

copy-env-dev: ## Copie le fichier .env.dev.dist pour créer un fichier de config perso
	@cp .env.dev.dist .env.dev

dev: check-env-dev ## Compile les fichiers front CSS, JS et autre assets dans le dossier html/dist/
	@if [ "${DOCKERIZE_WEBPACK}" = "true" ]; then \
		$(DC_WARNING); \
		$(DC_EXEC) node $(NPM) build:dev; \
	else \
		npm build:dev; \
	fi; \

HELP_SCRIPT = \
    %help; while(<>){push@{$$help{$$2//'Options'}},[$$1,$$3] \
    if/^([\w-_]+)\s*:.*\#\#(?:@(\w+))?\s(.*)$$/}; \
    print"$$_:\n\n", map"  \033[1;36m$$_->[0]\033[0m".(" "x(20-length($$_->[0])))."$$_->[1]\n",\
    @{$$help{$$_}},"\n" for keys %help; \

help:
	@echo -e "Usage: make \033[1;36m<target>\033[0m\n"
	@perl -e '$(HELP_SCRIPT)' $(MAKEFILE_LIST)

install-js: check-env-dev ## Installe les dépendances JS
	@if [ "${DOCKERIZE_NPM}" = "true" ]; then \
		$(DC_WARNING); \
		$(DC_EXEC) node npm install; \
	else \
		npm install; \
	fi; \

lint: check-env-dev ## Affiche les erreurs de syntaxe JS
	@if [ "${DOCKERIZE_NPM}" = "true" ]; then \
  		$(DC_WARNING); \
		if [ "$$file" = "" ]; then \
				$(DC_EXEC) node $(NPM) lint; \
			else \
				$(DC_EXEC) node $(NPM) lint:file -- $$file; \
			fi; \
	else \
		if [ "$$file" = '' ]; then \
			$(NPM) lint; \
	  	else \
			$(NPM) lint:file -- $$file; \
  		fi; \
	fi; \

lint-fix: check-env-dev ## Affiche et corrige les erreurs de syntaxe JS
	@if [ "${DOCKERIZE_NPM}" = "true" ]; then \
  		$(DC_WARNING); \
		if [ "$$file" = "" ]; then \
				$(DC_EXEC) node $(NPM) lint:fix; \
			else \
				$(DC_EXEC) node $(NPM) lint:file:fix -- $$file; \
			fi; \
	else \
		if [ "$$file" = '' ]; then \
			$(NPM) lint:fix; \
	  	else \
			$(NPM) lint:file:fix -- $$file; \
  		fi; \
	fi; \

watch: check-env-dev ## Compile les fichiers front CSS, JS et autre assets dans le dossier html/dist/ à chaque modification
	@if [ "${DOCKERIZE_WEBPACK}" = "true" ]; then \
		$(DC_WARNING); \
		$(DC_EXEC) node $(NPM) build:watch; \
	else \
		$(NPM) build:watch; \
	fi; \

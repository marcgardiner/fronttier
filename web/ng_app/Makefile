.PHONY: build

build:
	npm install
	ln -sf node_modules/mdbootstrap/sass node_modules/mdbootstrap/scss
	PATH=$$(npm bin):$$PATH ng build

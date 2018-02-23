.PHONY: build

build:
	npm install
	ln -sf sass node_modules/mdbootstrap/scss
	PATH=$$(npm bin):$$PATH ng build

test:
	PATH=$$(npm bin):$$PATH ng test

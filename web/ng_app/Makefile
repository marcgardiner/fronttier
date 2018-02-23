.PHONY: ngbuild

build:
	PATH=$$(npm bin):$$PATH ng build --base-href /web/

install:
	npm install
	ln -sf sass node_modules/mdbootstrap/scss

test:
	PATH=$$(npm bin):$$PATH ng test

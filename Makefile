.PHONY: lint
.PHONY: test

build:
	musical-patterns build webpack

lint:
	musical-patterns lint

publish:
	musical-patterns publish

pull:
	musical-patterns pull

push:
	musical-patterns push

ship:
	musical-patterns ship

test:
	musical-patterns test

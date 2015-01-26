COMMIT:=$(shell git log -1 --pretty=format:'%H')
BRANCH:=$(TRAVIS_BRANCH)

ifeq ($(strip $(BRANCH)),)
	BRANCH:=$(shell git branch | sed -n -e 's/^\* \(.*\)/\1/p')
endif

all: clean deps dist

clean:

	rm -rf dist
	rm -rf release

dist: clean

	gulp assets

release: dist

	mkdir release
	cd dist && zip -r ../dist.zip .

	cp dist.zip release/$(COMMIT).zip
	cp dist.zip release/$(BRANCH).zip

	rm dist.zip	

deps:

	npm install
	bower install

test:

	gulp lint

.PHONY: clean deps test

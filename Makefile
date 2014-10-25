all: clean dependencies

	gulp assets

release:

	zip -r release dist

dependencies:

	npm install
	bower install

clean:

	rm -rf dist
	rm -rf release.zip

test:

	gulp lint

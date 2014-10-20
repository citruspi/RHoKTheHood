all:

	gulp assets

release:

	rm -rf dist
	gulp lint
	gulp assets
	zip -r release dist

dependencies:

	npm install
	bower install

clean:

	rm -rf dist
	rm -rf release.zip

test:

	gulp lint

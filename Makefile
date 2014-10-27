all: clean dependencies

	gulp assets

release:

	cd dist && zip -r ../release.zip .

dependencies:

	npm install
	bower install

clean:

	rm -rf dist
	rm -rf release.zip

test:

	gulp lint

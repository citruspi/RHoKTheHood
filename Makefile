release:

	rm -rf dist
	gulp lint
	gulp assets
	zip -r release dist

test:

	gulp lint

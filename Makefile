release:

	rm -rf dist
	gulp lint
	gulp assets
	zip -r release dist

clean:

	rm -rf dist
	rm -rf release.zip

test:

	gulp lint

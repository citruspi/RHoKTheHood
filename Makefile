release:

	rm -rf dist
	gulp lint
	gulp assets
	git checkout master
	git merge development
	rm -rf src
	rm -rf .bowerrc
	rm -rf gulpfile.js
	rm -rf data
	rm -rf bower.json
	rm -rf package.json
	rm -rf Makefile
	mv dist/* .
	rm -rf dist
	git add .
	git commit
	git push origin master
	git checkout development
	git reset --hard
	npm install
	bower install

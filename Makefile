build:
	rm -rf server/build
	cd server && npm install
	cd server && npm run build
	cp server/package-prod.json server/build/package.json
	cd client && npm install
	cd client && npm run build
	mv client/dist server/build/client

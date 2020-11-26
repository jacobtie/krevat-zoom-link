build:
	rm -rf server/build
	cd server && npm install
	cd server && npm run build
	cp server/package.json server/build/package.json
	cp server/package-lock.json server/build/package-lock.json
	cd client && npm install
	cd client && npm run build
	mv client/dist server/build/client

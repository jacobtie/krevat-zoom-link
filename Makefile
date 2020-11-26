build:
	rm -rf server/build
	cd server && npm run build
	cd client && npm run build
	mv client/dist server/build/client

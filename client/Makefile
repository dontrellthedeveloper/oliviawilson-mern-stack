build-dev:
	docker build \
		-t react-app . \
		--build-arg BASE_URL=http://localhost:9000/api


build-local:
	docker build \
		-t react-app-production:local \
		--build-arg CADDYFILE=Caddyfile.local \
		--build-arg BASE_URL=http://localhost:9000/api \
		-f Dockerfile.production .

build-production:
	docker build \
		-t react-app-production:production \
		--build-arg CADDYFILE=Caddyfile.production \
		--build-arg BASE_URL=https://shop.oliviawilson.xyz/api \
		-f Dockerfile.production .
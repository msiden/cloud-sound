build:
	docker build --no-cache -t cloud-sound2:latest .

run-docker: build
	docker run -ti --network="host" -p 8080:8080 cloud-sound2

run-local:
	gunicorn -w 1 -b 0.0.0.0:8080 "app:app()"

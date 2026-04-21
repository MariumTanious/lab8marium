# Lab 8 – CI/CD Multi-Container Deployment

This project demonstrates a CI/CD pipeline that deploys a multi-container application using Docker Compose on AWS EC2.

## Architecture

* Node.js Application
* MongoDB Database
* Docker Compose
* GitHub Actions CI/CD
* Docker Hub
* AWS EC2

## Workflow

1. Push code to GitHub
2. GitHub Actions builds Docker image
3. Image pushed to Docker Hub
4. EC2 pulls latest image
5. Docker Compose deploys full stack

## Docker Compose Services

* app (Node.js)
* mongo (MongoDB)

The app container connects to MongoDB using service name as hostname.

## CI/CD Deployment

Pipeline steps:

* git pull
* docker compose pull
* docker compose down
* docker compose up -d

## Test

curl http://localhost:3000/tasks

## Skills Demonstrated

* Docker Compose
* CI/CD pipeline
* AWS EC2 deployment
* MongoDB container
* Multi-container networking
* GitHub Actions

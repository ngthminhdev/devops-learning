#!/bin/zsh

TAG=$(date +%d%m%y_%H%M%S)

export TAG=${TAG} && docker-compose up --build
################ Build ################
FROM node:12.6-alpine AS builder

WORKDIR /app

# Copy project files to the docker image  (except .dockerignore)
COPY . .

# Install Angular cli
RUN npm install @angular/cli@8.1.2 -g

# Install packages
RUN npm install

# Build Angular
RUN ng build --configuration=docker
################ Build ################


################ Serve ################

FROM nginx:alpine

############### Set Defualt Value ################
ENV TRACER_ENV_TracingProviderName=NotExists
ENV TRACER_ENV_TracingProviderUrl=NotExists
############### Set Defualt Value ################

# Dist artifacts to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html




############### EntryPoint ###############
# This entrypoint is setting the env into the main.js before the nginx start on docker run

# Install bash
RUN apk add --update bash

# COPY the entrypoint
COPY --from=builder /app/docker-entrypoint.sh /entrypoint.sh

#Add permissin to entrypoint
RUN chmod +x ./entrypoint.sh

# Set entrypoint format to linux
RUN dos2unix entrypoint.sh

# set entry point--> ENTRYPOINT ./entrypoint.sh has less clear errors
ENTRYPOINT ["bin/bash", "./entrypoint.sh"]

############### entry point ###############

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80

################ Serve ################


#### Debug Container Output
# docker run -it --rm tracer "/bin/ash"
### Extract ENV Form Container Shell
# cat "$( ls /usr/share/nginx/html/main.*js)"| grep "tracingProvider[ \t]*:[^}]*" -o



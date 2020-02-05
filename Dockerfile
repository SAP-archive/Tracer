################ Build ################
FROM node:12.6-alpine AS builder

WORKDIR /app

# Copy project files to the docker image
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
ENV TRACER_ENV_TracingProviderName=serverSide
ENV TRACER_ENV_TracingProviderUrl=serverSide
############### Set Defualt Value ################

# Dist artifacts to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

RUN apk add --update bash

#Define the entry point
COPY --from=builder /app/docker-entrypoint.sh /docker-entrypoint.sh
RUN cat docker-entrypoint.sh >entrypoint.sh
ENTRYPOINT ["bin/bash", "./entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80

################ Serve ################

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
RUN ng build --prod
################ Build ################



################ Serve ################

FROM nginx:alpine

# Dist artifacts to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

# EXPOSE Port 80
EXPOSE 80
################ Serve ################


## Run Local
## docker build -t local-test .
## docker run -p 127.0.0.1:3001:80 local-test

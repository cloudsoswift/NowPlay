FROM node:18.13.0 as build-stage
WORKDIR /app
COPY . .
RUN npm cache clean --force
RUN npm install --force
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html/mobile/
COPY --from=build-stage /app/dist /usr/share/nginx/html/owner/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

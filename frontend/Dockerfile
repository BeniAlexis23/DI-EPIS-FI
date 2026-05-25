# Etapa 1: build de la app React (Create React App)
FROM node:20-alpine AS build

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Misma URL de API que usa el frontend en producción hoy
ARG REACT_APP_API_URL=https://api-formulario.episundc.pe
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Cambia en Dockploy si el build reutiliza capas viejas (Build Args: CACHEBUST=timestamp)
ARG CACHEBUST=1
RUN pnpm run build

# Etapa 2: servir archivos estáticos con nginx
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

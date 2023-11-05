---
title: "Docker"
description: "Una introducción a Docker, su importancia en la industria y cómo utilizarlo."
date: 2023-11-03T00:11:02Z
lastmod: 2023-11-03T00:11:02Z
draft: false
images: []
weight: 10
---

**¿Qué es Docker?**

Docker es una plataforma de código abierto que permite crear, ejecutar y administrar contenedores de aplicaciones. Estos contenedores son entidades ligeros y autónomos que contienen todo lo necesario (código, bibliotecas, dependencias, etc.) para ejecutar una aplicación de manera uniforme en cualquier entorno.

**¿Por qué se usa tanto en la industria?**

Docker ha ganado enorme popularidad en la industria por varias razones:

1. **Consistencia:** Permite a los desarrolladores trabajar en ambientes idénticos a los de producción, eliminando el clásico problema "en mi máquina sí funciona".
2. **Portabilidad:** Los contenedores pueden ser movidos fácilmente entre diferentes máquinas y nubes.
3. **Escalabilidad:** Con herramientas como Kubernetes, Docker permite escalar aplicaciones fácilmente.
4. **Eficiencia:** Los contenedores son ligeros en comparación con las máquinas virtuales tradicionales y permiten una mejor utilización de los recursos del sistema.

**¿Por qué es bueno para este caso al realizar desarrollo que corre en nuestra máquina pero que su objetivo es una Raspberry Pi?**

Utilizar Docker en el desarrollo dirigido a Raspberry Pi es beneficioso debido a:

1. **Uniformidad:** Asegura que la aplicación se ejecute de la misma manera en la máquina de desarrollo y en la Raspberry Pi.
2. **Aislamiento:** Cualquier dependencia o configuración específica de la aplicación se encuentra dentro del contenedor, evitando conflictos o requisitos adicionales en la Raspberry Pi.
3. **Despliegue simplificado:** Una vez que el contenedor está listo, puede ser fácilmente desplegado y ejecutado en la Raspberry Pi sin preocupaciones adicionales sobre el entorno.

**¿Cómo funciona Docker?**

Docker utiliza la tecnología de contenedorización. A diferencia de las máquinas virtuales tradicionales que virtualizan hardware, Docker contenedoriza el sistema operativo. Cada contenedor comparte el mismo sistema operativo, pero funciona de manera aislada. Esto lo hace más eficiente, rápido y ligero. Docker utiliza características del kernel de Linux como cgroups y namespaces para lograr este aislamiento.

**¿Cómo se usa Docker?**

Para usar Docker:

1. Instalar Docker en la máquina.
2. Escribir un `Dockerfile` que define cómo se construye la imagen de contenedor. Este archivo especifica el sistema operativo base, las aplicaciones, las bibliotecas y el código que será parte del contenedor.
3. Construir la imagen de contenedor con `docker build`.
4. Ejecutar la imagen con `docker run`, creando así un contenedor.
5. Se pueden gestionar contenedores con comandos como `docker ps`, `docker stop`, entre otros.

**¿Cómo se usa docker-compose?**

Docker Compose es una herramienta para definir y gestionar aplicaciones con múltiples contenedores en Docker. Utiliza un archivo `docker-compose.yml` para especificar cómo se deben ejecutar los contenedores y cómo interactúan entre sí.
Para usar docker-compose:

1. Escribir un archivo `docker-compose.yml` que define los servicios (contenedores), redes y volúmenes.
2. Ejecutar `docker-compose up` para iniciar los servicios definidos.
3. Utilizar `docker-compose down` para detenerlos. Otros comandos útiles incluyen `docker-compose ps`, `docker-compose logs`, entre otros.

## Veamos un ejemplo

En este ejemplo, presentamos el Dockerfile de un frontend utilizando React.

```dockerfile
FROM node:latest

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

Aquí, observamos que usamos una imagen base de Node con `FROM node:latest`. Esto nos proporciona un contenedor preconfigurado con Node.js, asegurando que el código funcione en cualquier máquina con Docker instalado.

A continuación, copiamos los archivos `package.json` y `package-lock.json` a la carpeta `/app` del contenedor. Esto nos permite instalar las dependencias requeridas para nuestro proyecto.

Después, ejecutamos `RUN npm install` para instalar dichas dependencias.

Posteriormente, copiamos el resto de los archivos a la carpeta `/app` del contenedor.

A continuación, exponemos el puerto 3000 usando `EXPOSE 3000`.

Finalmente, ejecutamos el comando `npm run dev` con `CMD ["npm", "run", "dev"]`.

### ¿Cómo ejecutamos este contenedor?

Primero, construimos la imagen utilizando `docker build -t <nombre de la imagen> .`.

La manera más sencilla de ejecutar este contenedor es mediante `docker run -p 3000:3000 <nombre de la imagen>`.

No obstante, este método no es óptimo para desarrollo. Cada vez que realicemos un cambio en el código, necesitaremos reconstruir la imagen y reiniciar el contenedor.

Para simplificar este proceso, podemos usar `docker-compose`. Esto nos permite definir, de forma declarativa, un archivo que establece cómo se ejecuta el contenedor.

```yaml
version: "3.8"
services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
```

Utilizando `docker-compose`, podemos iniciar o detener el contenedor de manera más eficiente, facilitando así el flujo de trabajo durante el desarrollo.

Docker Compose es una herramienta para definir y gestionar aplicaciones multi-contenedor con Docker. En lugar de necesitar utilizar comandos Docker individuales para la gestión de contenedores, Docker Compose utiliza archivos YAML para definir y ejecutar los servicios.

### Comandos comunes de Docker Compose:

1. **`docker-compose up`**:
   - Este es uno de los comandos más utilizados. Sirve para iniciar y levantar todos los servicios definidos en el archivo `docker-compose.yml`.
   - Con la opción `-d`, se puede ejecutar en modo "detached" o fondo, lo que significa que Docker Compose inicia los servicios en segundo plano.

2. **`docker-compose down`**:
   - Este comando detiene y elimina todos los contenedores definidos en el archivo `docker-compose.yml`.
   - También se puede usar con la opción `--volumes` o `-v` para eliminar los volúmenes definidos.

3. **`docker-compose run`**:
   - Permite ejecutar comandos específicos para un servicio en particular. Por ejemplo, si tienes un servicio llamado "web", puedes usar `docker-compose run web <comando>` para ejecutar un comando específico en ese contenedor.

4. **`docker-compose ps`**:
   - Lista todos los contenedores en ejecución que están asociados con el archivo `docker-compose.yml`.

5. **`docker-compose logs`**:
   - Muestra los registros (logs) de un servicio. Por ejemplo, `docker-compose logs web` mostrará los registros del servicio "web".

6. **`docker-compose build`**:
   - Reconstruye los servicios. Es especialmente útil si se han realizado cambios en el `Dockerfile` y necesitas que estos cambios se reflejen en el contenedor.

7. **`docker-compose pull`**:
   - Descarga las imágenes definidas en los servicios del archivo `docker-compose.yml`.

8. **`docker-compose stop`**:
   - Detiene los contenedores en ejecución pero no los elimina. A diferencia de `down`, `stop` no elimina los contenedores, solo los detiene.

9. **`docker-compose restart`**:
   - Reinicia los servicios. Es útil si necesitas reiniciar un servicio en particular o todos los servicios definidos en el archivo `docker-compose.yml`.

Docker Compose simplifica muchas de las tareas de gestión de contenedores, especialmente cuando se trabaja con aplicaciones compuestas por múltiples contenedores. Al definir los servicios, redes y volúmenes en un archivo `docker-compose.yml`, los desarrolladores pueden establecer cómo interaccionan entre sí los contenedores, y gestionarlos de manera conjunta con simples comandos.

## Mas informacion

Para mas informacion sobre docker y docker-compose puedes revisar la documentacion oficial

- [Docker](https://docs.docker.com/)

Un 'crash course' de Docker que les puede ser util para utilizar Docker en el desarrollo de sus proyectos.

- [Docker Crash Course](https://www.youtube.com/watch?v=Kyx2PsuwomE)

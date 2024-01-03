# Apunte Con Hugo y Doks para los cursos de IoT y Embebidos

## Como correr localmente

1. Se puede instalar node y npm, y luego correr `npm install` y `npm run start` para correr el sitio localmente.

2. Usar docker y correr 'docker compose up' para correr el sitio localmente. **Recomendado**


## Como hacer deploy

El deploy se realiza automaticamente al hacer un commit a la rama `main`, esto se hace a travez de un Github Action a Github Pages.

Al hacer el pull request y subir commits se correran los tests (linting de md), para poder merigar se deben de pasar todos los tests.

## Como editar el contenido

La gran mayoria del contenido se escribe simplemente en formato Markdown, esto se encuentra en el directorio de `/content`.

### Como agregar una nueva pagina

Se puede agregar una pagina nueva corriendo el siguiente comando:

En caso de hacerlo bajo docker, primero abrir un shell en el contenedor con:

```bash
docker compose run site /bin/sh
```

```bash
npm run create path/to/new/page
```

Un ejemplo de esto para agregar una nueva seccion de `iot` seria:

```bash
npm run create iot/nueva_seccion/_index.md
```

Luego para agregar temas a esta seccion se puede correr:

```bash
npm run create iot/nueva_seccion/nuevo_tema.md
```

Para correr en docker agregar a cada comando

```bash
docker compose run site npm run create path/to/new/page
```

Se pueden revisar los ejemplos de las paginas ya existentes para ver como se escribe el contenido.

**Nota:**
- Si se agrega una nueva seccion o pagina revisar en los headers de cada pagina que el `weight` este bien definido, esto es para que se mantenga el orden de las paginas.
- Cambiar `draft: true` a `draft: false` en el header de la pagina para que se publique y se pueda ver. (por defecto esta en `true` para que no se publique hasta que este listo)

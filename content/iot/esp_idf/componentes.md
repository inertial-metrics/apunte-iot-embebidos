---
title: "Como dividir el codigo en componentes"
description: ""
date: 2023-08-11T00:50:51Z
lastmod: 2023-08-11T00:50:51Z
draft: false
images: []
weight: 35
---

Un componente en ESP-IDF es esencialmente una biblioteca o módulo que puedes incluir en tu proyecto. Puede ser una biblioteca que hayas escrito tú mismo, una biblioteca de terceros, o incluso una que ya exista dentro de ESP-IDF pero que requiera una configuración específica.

## Paso 1: Crear o identificar el componente

Antes de agregar un componente, necesitas tener el componente en sí. Esto puede ser un conjunto de archivos .c, .h y posiblemente otros tipos de archivos dependiendo de la naturaleza del componente.

## Paso 2: Estructura de directorios del componente

Crea una carpeta dentro del directorio components de tu proyecto con el nombre de tu componente. Por ejemplo, si tu componente se llama mi_componente, la estructura sería así:

```lua
mi_proyecto/
|-- main/
|   |-- main.c
|
|-- components/
|   |-- mi_componente/
|       |-- include/
|           |-- mi_componente.h
|       |-- mi_componente.c
|       |-- CMakeLists.txt
|
|-- CMakeLists.txt  # <-- Este es el CMakeLists.txt principal del proyecto
|-- sdkconfig
|-- sdkconfig.defaults
|-- build/          # Directorio donde se generan los archivos de construcción y binarios.

```

- `include/:` Este directorio es opcional pero recomendado para almacenar archivos de encabezado.

- `mi_componente.c:` Tu código fuente principal para el componente.

- `CMakeLists.txt:` Archivo necesario para que CMake entienda cómo construir tu componente.

## Paso 3: Escribir el CMakeLists.txt del componente

El archivo CMakeLists.txt le dice a ESP-IDF cómo construir tu componente. Un archivo CMakeLists.txt básico para tu componente podría verse así:

```cmake

idf_component_register(SRCS "mi_componente.c"
                       INCLUDE_DIRS "include")
```

Esto básicamente le dice a ESP-IDF que el código fuente de tu componente está en mi_componente.c y que los archivos de encabezado se encuentran en el directorio include.

## Paso 4: Incluir el componente en tu aplicación

En tu archivo principal main.c (o cualquier otro archivo donde necesites el componente), simplemente incluye el encabezado correspondiente:

```c
#include "mi_componente.h"
```

Asegurarse de que el componente se incluya en la compilación es tan simple como agregar el directorio components a EXTRA_COMPONENT_DIRS en tu archivo CMakeLists.txt principal:

```cmake
list(APPEND EXTRA_COMPONENT_DIRS "./components")
```

## Paso 5: Buildear el proyecto

Cuando compiles el proyecto usando idf.py build, ESP-IDF detectará automáticamente los componentes en el directorio components y los incluirá en la compilación.

**Nota**: Dependencias y como agregarlas a tu componente

Si tu componente depende de otros componentes, puedes agregarlos a tu componente de la siguiente manera (por lo general el compilador se queja si no lo haces y dira que no encuentra las librerias):

```cmake
idf_component_register(SRCS "mi_componente.c"
                       INCLUDE_DIRS "include"
                       REQUIRES otro_componente) # <-- Aqui se agrega la dependencia, puede ser (wifi, nvs_flash, etc)
```

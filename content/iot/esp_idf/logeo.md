---
title: "Prints y Logeo"
description: ""
date: 2023-08-11T00:52:34Z
lastmod: 2023-08-11T00:52:34Z
draft: false
images: []

weight: 30
---

Ya que el codigo se ejecuta en un microcontrolador, no podemos usar un debugger como lo hacemos en un computador. Por lo tanto, debemos usar otras técnicas para depurar y monitorear nuestro código. En este tutorial, veremos como imprimir mensajes en la consola y como usar el sistema de logeo de ESP-IDF, el cual sera la forma principal de depurar y monitorear nuestro código.

## Prints Básicos:

Simplemente usa la función printf() como lo harías en cualquier programa de C. Por ejemplo:

```c
printf("Hola Mundo!\n");
```

## Sistema de Logeo:

ESP-IDF viene con un conjunto de macros para logeo que te permiten imprimir mensajes con diferentes niveles de severidad. Estos son:

-`ESP_LOGE(TAG, formato, ...)`: Error. Situaciones que deberían ser tratadas por el programador.

-`ESP_LOGW(TAG, formato, ...)`: Advertencia. Algo inusual, pero no necesariamente erróneo.

-`ESP_LOGI(TAG, formato, ...)`: Información. Usualmente para depuración.

-`ESP_LOGD(TAG, formato, ...)`: Depuración. Información detallada para depuración.

-`ESP_LOGV(TAG, formato, ...)`: Verbose. Información aún más detallada.

El TAG es una cadena que ayuda a identificar de qué parte del código proviene el mensaje. Por ejemplo:

```c
#include "esp_log.h" // Incluye el encabezado necesario

#define TAG "APP_MAIN"
ESP_LOGI(TAG, "Iniciando aplicación");

```

Esto imprimirá el mensaje "Iniciando aplicación" en la consola, junto con el TAG "APP_MAIN" y el nivel de severidad "I" (Información).

## Configuración del Nivel de Logeo:

Puedes definir el nivel de logeo que desees que se muestre. Por ejemplo, si solo quieres ver logs de errores y advertencias, puedes configurarlo así. Esto se hace generalmente a través del menú de configuración (menuconfig) bajo la opción Component config > Log output. El valor por defecto es `"Info"`, por lo que se mostrarán todos los mensajes excepto los de depuración y verbose.

### Formato

Las funciones de logeo soportan formatos similares a printf(). Por ejemplo:

```c
#include "esp_log.h" // Incluye el encabezado necesario
#define TAG "APP_MAIN"

int valor = 42;
float valor2 = 3.1415;
ESP_LOGI(TAG, "El valor es %d %f", valor, valor2);
```

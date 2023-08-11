---
title: "Primer Programa"
description: ""
date: 2023-08-10T20:21:31Z
lastmod: 2023-08-10T20:21:31Z
draft: false
images: []
weight: 20
---

## Estructura de un proyecto ESP-IDF

Un proyecto ESP-IDF típicamente tiene una estructura de directorio como esta:

```text
mi_proyecto/
|-- build/
|-- components/
|-- main/
|   |-- main.c
|-- CMakeLists.txt
|-- sdkconfig
|-- ...
```

Se puede crear un nuevo proyecto usando `idf.py`

```bash
idf.py create-project mi_proyecto
```

- `build/`: Este directorio contiene los archivos generados durante la compilación.
- `components/`: Aquí puedes colocar componentes adicionales o bibliotecas que tu proyecto pueda necesitar.
- `main/`: Es donde reside el código principal del programa, incluido `main.c`.
- `CMakeLists.txt`: Es un archivo que CMake utiliza para construir tu proyecto.
- `sdkconfig`: Este archivo almacena la configuración del proyecto.

### Código del archivo `main.c`

A continuación, un programa básico para conectar la ESP32 a una red WiFi:

```c
#include <stdio.h>
#include <inttypes.h>
#include "sdkconfig.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_flash.h"
#include "esp_system.h"

void app_main(void){
    // Imprime "Hello world!" en la consola (esto se puede ver con el comando "idf.py monitor")
    printf("Hello world!\n");

    vTaskDelay(10000 / portTICK_PERIOD_MS); // Espera 10 segundos (time.sleep(10) en Python))

    esp_restart(); // Reinicia el dispositivo
}
```

### Descripción

El punto de inicio de cualquier aplicación ESP-IDF es la función `app_main()`. En este programa:

1. **Inicialización**: Se inicia el sistema NVS (Non-Volatile Storage) y se configura la interfaz STA (Estación) para WiFi.
2. **Manejadores de Evento**: Se registran manejadores de eventos para eventos de WiFi y eventos de IP.
3. **Configuración y Conexión WiFi**: Se configura la ESP32 en modo Estación (STA) y se intenta conectar a la red WiFi especificada.

### Conclusión

Un proyecto ESP-IDF típicamente tiene una estructura específica, con el punto de inicio en la función `app_main()` de `main.c`. El código anterior es un programa básico que muestra cómo conectar la ESP32 a una red WiFi. Puedes expandir este programa incluyendo más características como manejo de errores, reconexión automática entre otros.

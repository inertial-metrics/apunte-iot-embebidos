---
title: "Memoria no volátil"
description: ""
date: 2023-08-11T00:52:10Z
lastmod: 2023-08-11T00:52:10Z
draft: false
images: []

weight: 40
---

https://github.com/espressif/esp-idf/blob/master/examples/storage/nvs_rw_value/main/nvs_value_example_main.c

La memoria NVS (Non-Volatile Storage) en el framework ESP-IDF para ESP-32 es una parte del sistema que permite almacenar datos de forma no volátil. Esto significa que los datos se conservan incluso después de reiniciar o apagar el dispositivo.

## ¿Por qué es necesaria?

La memoria NVS es útil para almacenar configuraciones, estados, y otros datos que deben persistir entre reinicios o apagados. Por ejemplo, podría usarse para guardar la configuración de red, preferencias del usuario, o cualquier otro dato que necesite ser conservado a largo plazo.

## Breve descripción de cómo se usa:

La memoria NVS en ESP-IDF se maneja a través de diversas funciones de la API que permiten abrir, leer, escribir y cerrar las 'particiones' de NVS. Aquí hay una breve guía de cómo se podría usar:

1. Iniciar el Manejo de NVS: Se debe llamar a la función nvs_flash_init() para inicializar el sistema NVS antes de su uso.

2. Abrir una Partición: Utiliza nvs_open() para abrir una partición NVS en un modo específico (por ejemplo, lectura o escritura).

3. Leer y Escribir Datos: Las funciones como nvs_set_i32(), nvs_get_i32(), nvs_set_str(), nvs_get_str(), etc., se utilizan para escribir y leer datos en diferentes formatos.

4 . Cerrar la Partición: Después de realizar las operaciones necesarias, se debe cerrar la partición con nvs_close() para liberar los recursos.

La utilización de NVS proporciona una manera eficiente y segura de almacenar datos que deben sobrevivir a reinicios o apagados, haciendo que sea una parte vital para muchas aplicaciones en la programación de ESP-32 y puede ser util para el proyecto final, a la hora de cambiar de modo de operation, por ejemplo (wifi a bluetooth) ya que suele ser mas simple reiniciar el dispositivo para cambiar de modo.

## Ejemplo de uso:

[Ejemplo de ESP-IDF](https://github.com/espressif/esp-idf/blob/master/examples/storage/nvs_rw_value/main/nvs_value_example_main.c)

---
title: "Auxiliar 1 - WiFi y ESP-IDF"
description: ""
date: 2023-09-01T14:35:35Z
lastmod: 2023-09-01T14:35:35Z
draft: false
weight: 100
images: []
---


_Universidad de Chile_
_Facultad de Ciencias Físicas y Matemáticas Departamento de Ciencias de la computacion_
_CC5326 – Diseño de Internet de las Cosas_

---

**Profesor:** Luciano Radrigan F.
**Auxiliar:** Alberto Abarzua P.

## Objetivos a cumplir:

- [ ] Instalación de ESP-IDF
- [ ] Compilar y cargar un programa en el ESP32
- [ ] Resolver problemas de conexión con el ESP32
- [ ] Resolver dudas de instalación y configuración de Raspberry Pi

## Indicaciones

1. Realizar la instalación de ESP-IDF en su computador. Para esto pueden ver el apunte del curso [aquí](https://iot-embebidos.cl/iot/inicio/instalacion_esp_idf/)

2. Descargar el siguiente código de ejemplo [aquí](https://github.com/alberto-abarzua/apunte-iot-embebidos/tree/main/ejemplos/auxiliares_iot/aux1.zip)

3. Setear las variables de entorno de ESP-IDF; esto se encuentra en la instalación y depende de cada sistema operativo.

4. Abrir una terminal en la carpeta `client` del código dado (esto es el proyecto de esp-idf) y compilar usando

    ```bash
    idf.py build
    ```

5. Conectar el ESP32 a su computador y verificar el puerto serie.

    En Mac y Linux se puede usar el comando, por ejemplo:

    ```bash
    ls /dev/tty.*
    ```

    En Linux deberían encontrar algo como `/dev/ttyUSB0` o `/dev/ttyUSB1` (Revisar según su sistema operativo), pero por lo general no es necesario ya que al correr los comandos de `idf.py` se detecta automáticamente.

6. Cargar el programa en el ESP32 usando

    ```bash
    idf.py flash
    ```

7. Monitorear el puerto serie usando

    ```bash
    idf.py monitor
    ```

8. Si todo sale bien, se debería mostrar en la sala su ESP enviando datos a la Raspberry Pi que está en la sala. Esta se encuentra en el modo que deben lograr en la Tarea 1. [Siguiendo este tutorial](https://www.raspberrypi.com/documentation/computers/configuration.html#setting-up-a-routed-wireless-access-point)

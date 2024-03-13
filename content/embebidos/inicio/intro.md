---
title: "Introducción"
description: ""
date: 2023-08-11T01:02:36Z
lastmod: 2023-08-11T01:02:36Z
draft: false
images: []
weight: 1
---

Bienvenidos al curso de Sistemas Embebidos. En este curso aprenderán como utilizar un microcontrolador para configurar, manejar y extraer datos desde sensores conectados, ¡asi creando su propio Sistema Embebido!.

Se empezara con un enfoque de entender que es y como se programa un microcontrolador, que es un componente sensor y como se utiliza, para proceder a configurar un sensor IMU (que mide movimientos) y visualizar sus datos en vivo. Tras esto manejaran otro tipo de sensor, uno de gas ambiental, él cual deberán integrar junto al otro a una aplicación de escritorio hecha por ustedes. Por último utilizaran un funcionamiento del microcontrolador ESP32 para medir distancias y posición de otros dispositivos, lo cual deberá manejarse y visualizarse en una aplicación de escritorio.

## Microcontrolador ESP-32

<figure>
    <img src="https://mcielectronics.cl/wp-content/uploads/2022/04/product_template_29541.png" width="300"">
    <figcaption style="text-align: center;">ESP-32 placa de desarrollo</figcaption>
</figure>

Por el lado de la ESP-32 se encuentra el firmware que interactua con la Raspberry Pi, para esto se utilizara principalmente C/C++ bajo el framework ESP-IDF.

### Datasheet:

- [Datasheet ESP-32](https://github.com/alberto-abarzua/apunte-iot-embebidos/tree/main/ejemplos/datasheets/esp_32.pdf)

## ¿Que es ESP-IDF?

ESP-IDF (Espressif IoT Development Framework) es un conjunto de herramientas y bibliotecas de desarrollo para programar los microcontroladores ESP32 y ESP32-S producidos por Espressif Systems. Proporciona un marco para escribir aplicaciones en C/C++, facilitando la comunicación con diversos periféricos y el manejo de tareas en tiempo real. ESP-IDF viene con soporte para una variedad de características como Wi-Fi, Bluetooth, y periféricos GPIO, lo que lo hace útil para el desarrollo de Sistemas Embebidos. Utiliza el sistema de compilación CMake, lo que facilita la integración con varios entornos de desarrollo y la automatización de la compilación y carga de programas en los dispositivos.

**Pagina oficial:** [https://docs.espressif.com/projects/esp-idf/en/latest/esp32/](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/)

## Sensores
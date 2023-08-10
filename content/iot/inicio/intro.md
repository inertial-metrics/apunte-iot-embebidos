---
title: "Introduccion"
description: ""
date: 2023-08-10T15:01:48Z
lastmod: 2023-08-10T15:01:48Z
draft: false
images: []
weight: 1
---

Bienvenidos al curso de IoT (Internet of Things). En este curso aprenderemos cómo se comunica un Raspberry Pi, ese pequeño computador con Linux, con un ESP-32, un microcontrolador.

Vamos a empezar usando WiFi para nuestra comunicación. Nos enfocaremos en los protocolos TCP y UDP. Luego, cambiaremos y aprenderemos sobre comunicación con Bluetooth usando BLE.

Al final, juntaremos lo que hemos aprendido de los dos protocolos y haremos una interfaz de control fácil de usar. ¡Espero que estén listos para aprender y divertirse!

## Raspberry Pi

<figure>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Raspberry_Pi_4_Model_B_-_Side.jpg/220px-Raspberry_Pi_4_Model_B_-_Side.jpg" width="300" >
    <figcaption style="text-align: center;">Placa Raspberry Pi</figcaption>
</figure>

Por el lado de la Raspberry Pi se encuentra el software que interactua con la ESP-32, para esto se utilizara principalmente Python.

## ESP-32

<figure>
    <img src="https://mcielectronics.cl/wp-content/uploads/2022/04/product_template_29541.png" width="300"">
    <figcaption style="text-align: center;">ESP-32 placa de desarrollo</figcaption>
</figure>

Por el lado de la ESP-32 se encuentra el firmware que interactua con la Raspberry Pi, para esto se utilizara principalmente C/C++ bajo el framework [ESP-IDF](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/).

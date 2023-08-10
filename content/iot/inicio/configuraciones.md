---
title: "Ambiente de Desarrollo"
description: ""
date: 2023-08-10T14:54:08Z
lastmod: 2023-08-10T14:54:08Z
draft: false
images: []
weight: 2
---



La configuración del ambiente de trabajo para el curso se segmenta en dos partes:

- Configuración del ambiente en tu computador (Windows, Linux, Mac): Es necesario tener instalado el framework de desarrollo ESP-IDF para programar el ESP-32.

- Configuración de la Raspberry Pi: Deberán instalar el sistema operativo Raspbian (una distribución de Linux) y preparar el ambiente para ejecutar su código en él. Además, es esencial configurar la Raspberry Pi para que funcione como un Hotspot WiFi, permitiendo que el ESP-32 se conecte directamente sin la necesidad de un router externo. Aunque pueda parecer complicado, es sencillo si se siguen las instrucciones detalladas en la sección de configuración de la Raspberry Pi.


## Configuración del ambiente de su computador

### Instalación de ESP-IDF

1. Visite el sitio oficial de [ESP-IDF](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/) y descargue la última versión del framework.

    - Windows: [Instrucciones](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/windows-setup.html)
    - Mac y Linux: [Instrucciones](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/linux-macos-setup.html)

2. Siga las instrucciones de instalación específicas para su sistema operativo (Windows, Linux o Mac).

3. Una vez instalado, verifique la instalación ejecutando un ejemplo básico para asegurarse de que todo funciona correctamente. Para esto se recomienda ir al directorio donde instalaron el repositorio de esp-idf (si siguieron tal como sale deberia ser lo siguiente)


En linux o mac.
```bash
cd ~/esp/hello_world
idf.py build
```

En windows
```bash
cd %userprofile%\esp\hello_world
idf.py build
```


Si al correr esto no les da ningun error, entonces ya tienen instalado el framework correctamente.


## Configuracion de la Raspberry Pi

### Instalacion del sistema operativo
Para completar la tarea, tendrán que establecer un servidor Python en la Raspberry Pi, la cual deberá mantener activado su wifi para que el ESP32 pueda conectarse de manera inalámbrica. El primer paso es preparar la Raspberry Pi 3 adecuadamente. Sigan estos pasos para ello:

1. Obtengan una tarjeta mini SD donde puedan instalar el sistema operativo y que sirva como memoria.
2. Instalen el Rasp PI OS. El instalador está disponible en esta página.
3. Con la tarjeta insertada, conecten la Raspberry Pi a:
   - Una pantalla mediante un cable HDMI (Nota: En Beauchef, especialmente en áreas del DCC como el laboratorio Toqui, las pantallas no tienen entrada HDMI).
   - Un ratón.
   - Un teclado.
   Una vez conectados estos dispositivos, enciendan la Raspberry Pi y procedan con la instalación del sistema operativo, seleccionando sus opciones preferidas.
4. Una vez finalizada la configuración del sistema operativo, podrán acceder a la Raspberry Pi normalmente.

Para una guía más exhaustiva, revisen el [Tutorial Oficial de preparación de una Raspberry PI](#).

Ahora, pueden usar la Raspberry Pi 3 como cualquier computadora, teniendo en cuenta que su sistema operativo es una distribución de Linux. Si quieren trabajar directamente, necesitarán una pantalla con entrada HDMI. Sin embargo, también es posible trabajar de forma remota mediante SSH, siempre que la Raspberry esté configurada como punto de acceso wifi.

**Notas adicionales**:
- Durante la instalación del Rasp PI OS, activen la opción para permitir el acceso vía SSH con contraseña. Recientemente, una actualización en Debian ha desactivado esta opción por defecto.

- En Beauchef 851, edificio Poniente, pueden solicitar en la Oficina de Sistemas un adaptador de VGA a HDMI si necesitan conectar la Raspberry Pi en lugares con monitores VGA, como el laboratorio Toqui.

### Configuracion del punto de acceso Wifi

Para activar el Wifi y usar la Raspberry como punto de acceso, consulten la [Documentación oficial Raspberry PI - Configurando un punto de acceso inalámbrico](https://www.raspberrypi.com/documentation/computers/configuration.html#setting-up-a-routed-wireless-access-point) (específicamente, la sección "Setting up a Routed Wireless Access Point"). Al seguir estas instrucciones, deberían ser capaces de conectar cualquier dispositivo al wifi de la Raspberry y acceder a ella de manera inalámbrica mediante SSH.

**Notas adicionales**:
- Intenten seguir al pie de la letra todos los comandos del tutorial, ya que cualquier error puede impedir que el punto de acceso funcione correctamente y se ahorrarán bastante tiempo (es puro copy-paste).



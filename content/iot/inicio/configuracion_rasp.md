---
title: "Configuracion de la Raspberry Pi"
description: ""
date: 2023-08-11T00:57:51Z
lastmod: 2023-08-11T00:57:51Z
draft: false
images: []
weight: 30
---

Para completar las tarea, tendrán que establecer un servidor Python en la Raspberry Pi, la cual deberá mantener activado su wifi para que el ESP32 pueda conectarse de manera inalámbrica. El primer paso es preparar la Raspberry Pi 3 adecuadamente.

### Instalacion del sistema operativo

1. Obtengan una tarjeta mini SD donde puedan instalar el sistema operativo y que sirva como memoria.
2. Instalen el Rasp PI OS. El instalador está disponible [En esta pagina](https://projects.raspberrypi.org/es-LA/projects/raspberry-pi-setting-up/0).

3. Con la tarjeta insertada, conecten la Raspberry Pi a:
   - Una pantalla mediante un cable HDMI (Nota: En Beauchef, especialmente en áreas del DCC como el laboratorio Toqui, las pantallas no tienen entrada HDMI).
   - Un mouse.
   - Un teclado.
   Una vez conectados estos dispositivos, enciendan la Raspberry Pi y procedan con la instalación del sistema operativo, seleccionando sus opciones preferidas.
4. Una vez finalizada la configuración del sistema operativo, podrán acceder a la Raspberry Pi normalmente.

Para una guía más exhaustiva, revisen el [Tutorial Oficial de preparación de una Raspberry PI](https://projects.raspberrypi.org/es-LA/projects/raspberry-pi-setting-up/0).

Ahora, pueden usar la Raspberry Pi 3 como cualquier computadora, teniendo en cuenta que su sistema operativo es una distribución de Linux. Si quieren trabajar directamente, necesitarán una pantalla con entrada HDMI. Sin embargo, también es posible trabajar de forma remota mediante SSH, siempre que la Raspberry esté configurada como punto de acceso wifi.

**Notas adicionales**:

- Durante la instalación del Rasp PI OS, activen la opción para permitir el acceso vía SSH con contraseña. Recientemente, una actualización en Debian ha desactivado esta opción por defecto.

- En Beauchef 851, edificio Poniente, pueden solicitar en la Oficina de Sistemas un adaptador de VGA a HDMI si necesitan conectar la Raspberry Pi en lugares con monitores VGA, como el laboratorio Toqui.

### Configuracion del punto de acceso Wifi

Para activar el Wifi y usar la Raspberry como punto de acceso, consulten la [Documentación oficial Raspberry PI - Configurando un punto de acceso inalámbrico](https://www.raspberrypi.com/documentation/computers/configuration.html#setting-up-a-routed-wireless-access-point) (específicamente, la sección "Setting up a Routed Wireless Access Point"). Al seguir estas instrucciones, deberían ser capaces de conectar cualquier dispositivo al wifi de la Raspberry y acceder a ella de manera inalámbrica mediante SSH.

**Notas adicionales**:

- Intenten seguir al pie de la letra todos los comandos del tutorial, ya que cualquier error puede impedir que el punto de acceso funcione correctamente y se ahorrarán bastante tiempo (es puro copy-paste).

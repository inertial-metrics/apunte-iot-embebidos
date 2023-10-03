---
title: "Estructura General"
description: ""
date: 2023-10-03T18:25:19Z
lastmod: 2023-10-03T18:25:19Z
draft: false
images: []
weight: 29
---

En BLE, la estructura de comunicación se organiza en torno a tres componentes clave: Aplicaciones, Servicios y Características.

<div align="center"><img src="https://github.com/espressif/esp-idf/raw/master/examples/bluetooth/bluedroid/ble/gatt_server/tutorial/image/GATT_Server_Figure_1.png" width = "400" alt="Application Profiles are used to organize a BLE application in order to implement different functionality for different clients." align=center /> </div>

### Aplicaciones

Estas son las funcionalidades de alto nivel que se construyen usando una o más combinaciones de servicios y características. Por ejemplo, una aplicación de monitorización de la salud podría utilizar servicios para medir la frecuencia cardíaca, el nivel de oxígeno en sangre, etc.

### Servicios

Un Servicio es un conjunto de funcionalidades relacionadas. Por ejemplo, un servicio de "Frecuencia Cardíaca" podría contener varias características como la medición de la frecuencia cardíaca, la ubicación del sensor, etc. Los servicios tienen identificadores únicos para que puedan ser descubiertos por otros dispositivos.

### Características

Dentro de cada servicio, hay Características que son los datos individuales que se pueden leer, escribir o notificar. Siguiendo con el ejemplo del servicio de "Frecuencia Cardíaca", una característica podría ser el valor actual de la frecuencia cardíaca.

### Roles invertidos: Cliente y Servidor

En BLE, los roles de "cliente" y "servidor" son algo distintos a los de la arquitectura de red típica. El dispositivo que tiene los datos (por ejemplo, un sensor de frecuencia cardíaca) actúa como servidor. El dispositivo que necesita acceder a esos datos (como un smartphone) actúa como cliente. Este es un cambio de roles en comparación con la arquitectura de red convencional, donde generalmente el servidor es el proveedor de servicios y el cliente el que consume los servicios.

### Transferencia de Datos

La comunicación se establece a través de un proceso de "descubrimiento" y "emparejamiento". Una vez que se ha establecido una conexión, el cliente puede leer o escribir en las características expuestas por el servidor. Además, el servidor puede enviar "notificaciones" al cliente cuando hay un cambio en una característica, lo que permite actualizaciones en tiempo real sin necesidad de que el cliente solicite constantemente información.

En resumen, la arquitectura BLE se centra en la eficiencia y la modularidad, permitiendo una comunicación efectiva y de bajo consumo energético a través de aplicaciones, servicios y características cuidadosamente organizados.

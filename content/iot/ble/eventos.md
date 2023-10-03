---
title: "Eventos"
description: ""
date: 2023-08-11T01:41:04Z
lastmod: 2023-08-11T01:41:04Z
draft: false
images: []
weight: 31
---
En la comunicación BLE, hay varios eventos clave que son cruciales para establecer y mantener una conexión efectiva entre dispositivos. Estos eventos facilitan el descubrimiento, el emparejamiento y la transferencia de datos.

| Evento                        | Descripción                                                                                                                                                                      |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Evento de Descubrimiento      | Este es el primer paso en cualquier comunicación BLE. Los dispositivos emiten y escanean "paquetes de publicidad" para hacerse visibles a otros dispositivos cercanos.               |
| Evento de Emparejamiento      | Una vez identificado un servidor que ofrece los servicios necesarios, se inicia el emparejamiento. Involucra intercambio de claves y permisos para una conexión segura.            |
| Evento de Conexión            | Tras el emparejamiento exitoso, los dispositivos entran en un estado de conexión. Pueden intercambiar datos a través de las características y servicios definidos.                 |
| Eventos de Lectura y Escritura | Establecida la conexión, el cliente puede leer o escribir en las características del servidor. Ocurre cada vez que hay una transferencia de datos entre los dispositivos conectados. |
| Evento de Notificación        | El servidor puede enviar actualizaciones automáticas a las características a las que el cliente se ha "suscripto", permitiendo informar cambios en tiempo real.                    |
| Evento de Desconexión         | Ocurre cuando uno de los dispositivos decide terminar la conexión. Puede ser iniciado por cualquiera de los dispositivos e implica la limpieza y cierre de la conexión existente.    |

Estos eventos son fundamentales para entender el flujo de una aplicación BLE. Dominar cómo y cuándo ocurren estos eventos te permitirá diseñar aplicaciones más eficientes y efectivas.

Para la realizacion de las tareas y en especifico la transeferencia de datos y configuraciones utilizaran los eventos de READ, WRITE y NOTIFICATION. Los cuales se explican a continuacion:

### Evento de Lectura (READ_EVT)

El evento de lectura, o `READ_EVT`, se activa cuando un dispositivo cliente solicita datos de una característica específica del servidor. Es una operación unilateral donde el servidor envía los datos solicitados al cliente. Este evento es especialmente útil para escenarios donde el cliente necesita actualizar manualmente los datos, como por ejemplo, consultar el valor actual de un sensor. El manejo eficiente de los eventos de lectura puede ayudar a conservar la batería tanto en el cliente como en el servidor, ya que se evita la transferencia de datos innecesarios.

### Evento de Escritura (WRITE_EVT)

El evento de escritura, o `WRITE_EVT`, ocurre cuando el cliente envía datos para modificar una característica en el servidor. Por ejemplo, esto podría usarse para configurar un umbral en un sensor o para cambiar un modo operativo en el dispositivo servidor. Este evento permite una comunicación bidireccional, y a menudo involucra un reconocimiento por parte del servidor para confirmar que los datos se han recibido y aplicado correctamente. La gestión adecuada de los eventos de escritura es crucial para garantizar que los dispositivos actúen según las expectativas y que los datos se manejen de manera segura.

### Evento de Notificación (NOTIFICATION)

A diferencia de los eventos de lectura y escritura que son iniciados por el cliente, el evento de notificación es iniciado por el servidor. Se utiliza cuando una característica cambia su valor y el servidor desea informar a uno o más clientes suscritos sobre este cambio. Al suscribirse a una característica, el cliente da permiso al servidor para enviar datos automáticamente sin necesidad de una solicitud explícita. Este evento es fundamental para aplicaciones en tiempo real y escenarios donde los cambios de estado deben ser comunicados de forma inmediata. La ventaja principal es que minimiza la latencia y el uso de la CPU al evitar la necesidad de sondear constantemente el estado de una característica.

Cada uno de estos eventos desempeña un papel único en la comunicación BLE y entenderlos profundamente facilitará la creación de aplicaciones BLE más robustas y eficientes.

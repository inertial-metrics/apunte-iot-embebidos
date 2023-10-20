---
title: "Pasos a seguir"
description: ""
date: 2023-10-03T18:35:25Z
lastmod: 2023-10-03T18:35:25Z
draft: false
images: []
---
La mejor fuente de informacion para el codigo de BLE en ESP32 es el codigo de ejemplo de Espressif, el cual se encuentra en el siguiente:

- [Ejemplo BLE](https://github.com/espressif/esp-idf/blob/master/examples/bluetooth/bluedroid/ble/gatt_server/tutorial/Gatt_Server_Example_Walkthrough.md).

Ahora veremos de forma resumida los pasos que deben realizar para poder realizar la primera comunicacion bluetooth entre el ESP32 y la Raspberry Pi.

## Paso 1: Configurar el ESP32

Primero debemos configurar el ESP32 para que pueda funcionar como servidor BLE, para esto pueden usar el ejemplo de esp-idf de arriba.

## Paso 2: Verificar que se esta anunciando el dispositivo

Para verificar que el ESP32 esta funcionando como servidor BLE pueden ver en el listado de dispositivos bluetooth de su computador, en el caso de linux puede usar el siguiente comando:

```bash
bluetoothctl
# Luego dentro de bluetoothctl
scan on
power on
scan on
```

Corriendo esto llegaran a un output como este, donde podran ver el nombre de su dispositivo, en este caso como es el codigo de ejemplo tenemos `ESP_GATTS_DEMO`, con esto podemos ver que la direccion MAC del dispositivo es `4C:EB:D6:62:18:3A`:

```bash
[CHG] Controller F4:26:79:A4:D7:3C Discovering: yes
[NEW] Device 63:7A:9F:47:21:B4 63-7A-9F-47-21-B4
[NEW] Device 4C:EB:D6:62:18:3A ESP_GATTS_DEMO
[NEW] Device 76:F1:5D:9E:AA:2E 76-F1-5D-9E-AA-2E
[NEW] Device 61:B0:AA:2F:04:15 61-B0-AA-2F-04-15
[NEW] Device 45:8B:AE:F1:22:C7 45-8B-AE-F1-22-C7
[NEW] Device 18:FA:B7:4B:59:28 alberto_iphone
[NEW] Device 2C:41:A1:27:09:57 LE-Bose Revolve SoundLink
```

Esto funcionara en linux (Incluyendo la Raspberry Pi), tambien existen aplicaciones moviles que permiten ver los dispositivos BLE  (lo pueden buscar como BLE scanner en la tienda de aplicaciones de su celular).

## Paso 3: La primera conexion

Ahora que sabemos que funciona correctamente nuestro dispositivo BLE podemos empezar a programar tanto el cliente como el servidor.

Por el lado de python existen varias librerias, una de estas puede ser `bleak`, un breve ejemplo de la documentacion de bleak es el siguiente:

```python
import asyncio
from bleak import BleakClient

ADDRESS = "24:71:89:cc:09:05"

CHARACTERISTIC_UUID = convert_to_128bit_uuid(0xFF01) # Busquen este valor en el codigo de ejemplo de esp-idf

def convert_to_128bit_uuid(short_uuid):
    # Usada para convertir un UUID de 16 bits a 128 bits
    # Los bits fijos son utilizados para BLE ya que todos los UUID de BLE son de 128 bits
    # y tiene este formato: 0000XXXX-0000-1000-8000-00805F9B34FB
    base_uuid = "00000000-0000-1000-8000-00805F9B34FB"
    short_uuid_hex = "{:04X}".format(short_uuid)
    return base_uuid[:4] + short_uuid_hex + base_uuid[8:]

async def main(ADDRESS):
    async with BleakClient(ADDRESS) as client:
        char_value = await client.read_gatt_char(CHARACTERISTIC_UUID)
        print("Characterisic A {0}".format("".join(map(chr, char_value))))
        # Luego podemos escribir en la caracteristica
        data = 'Hello World!'.encode()
        await client.write_gatt_char(CHARACTERISTIC_UUID, b"\x01\x00")
asyncio.run(main(ADDRESS))

```

Este codigo se conecta a un dispositivo con la direccion MAC `24:71:89:cc:09:05` y lee la caracteristica con UUID `0xFF01`, el cual corresponde al valor de la caracteristica A del ejemplo de esp-idf.

## Paso 4: Modificar el codigo de ejemplo de esp-idf a sus necesidades

Ahora que ya sabemos como conectarnos a un dispositivo BLE desde python, podemos modificar el codigo de ejemplo de esp-idf para que se conecte a la Raspberry Pi y envie los datos que necesitamos.

Una de las primeras cosas que pueden hacer es ver que ocurre cuando llaman en python las funciones `read_gatt_char` y `write_gatt_char`, esto les permitira saber que deben hacer en el codigo de esp-idf.

Para esto deben ir a la funcion `gatts_profile_a_event_handler` a los casos del switch case `ESP_GATTS_WRITE_EVT` y `ESP_GATTS_READ_EVT`.

## Cosas que pueden resultar utiles | Notificaciones

Como se menciono en la seccion anterior, existen notificaciones que se pueden enviar desde el servidor al cliente, esto puede ser util para notificar a la Raspberry Pi que existen datos nuevos para leer.

En este caso la Raspberry Pi despues de conectarse se puede suscribir a una caracteristica y esperar a recibir una notificacion, esto se puede hacer con la funcion `start_notify` de la libreria `bleak`:

```python
# Funcion que se llamara cada vez que llegue una notificacion por parte de la ESP
def notify_callback(handle, value):
        expected_data = b"CHK_DATA"
        if expected_data in value:
            print("Notification received - Checking data")
            # De esta forma pueden hacer que la ESP llame a una funcion de la Raspberry Pi
await client.start_notify(CHARACTERISTIC_UUID, callback)
# Luego puede que entren en un while de su servidor y por el fondo se estara llamando a la funcion callback
while True:
    # Hacer cosas
    pass
```

Con esto la Raspberry Pi puede esperar a recibir una notificacion y luego llamar a una funcion que ustedes definan, en este caso se espera a recibir la notificacion `CHK_DATA` y luego se llama a la funcion `callback`.

Por el lado de la ESP32, esta debe enviar la notificacion, esto se puede hacer con la funcion `esp_ble_gatts_send_indicate`:

```c
esp_err_t send_notify(char *notify_data) {
    // check if connected
    if (gl_profile_tab[PROFILE_A_APP_ID].conn_id ==
        0xFF) {  // assuming 0xFF is default when not connected
        ESP_LOGE(GATTS_TAG, "Not connected to a client");
        return ESP_FAIL;
    }

    size_t len = strlen(notify_data);
    esp_err_t ret = esp_ble_gatts_send_indicate(
        gl_profile_tab[PROFILE_A_APP_ID].gatts_if,
        gl_profile_tab[PROFILE_A_APP_ID].conn_id,
        gl_profile_tab[PROFILE_A_APP_ID].char_handle, len,
        (uint8_t *)notify_data, false);

    if (ret) {
        ESP_LOGE(GATTS_TAG, "Send indicate error");
    } else {
        ESP_LOGI(GATTS_TAG, "Send indicate success");
    }
    return ret;
}
```

**Nota** Esto es solo codigo de ejemplo y al no tener un contexto completo es unicamente base de inspiracion para su tarea.

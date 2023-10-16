---
title: "Auxiliar 2 - Bluetooth Low Energy"
description: ""
date: 2023-10-16T12:35:18Z
lastmod: 2023-10-16T12:35:18Z
draft: false
images: []
weight: 200
---

_Universidad de Chile_
_Facultad de Ciencias Físicas y Matemáticas Departamento de Ciencias de la computacion_
_CC5326 – Diseño de Internet de las Cosas_

---

**Profesor:** Luciano Radrigan F.
**Auxiliar:** Alberto Abarzua P.

## Objetivos a cumplir

- [ ] Revision de conceptos de BLE
- [ ] Revision del flujo para la primera conexion
- [ ] Consultas de la Tarea 2

## Flujo de conexión ble

### 1. Anuncio

El dispositivo que actúa como servidor (en este caso el ESP32) debe anunciar que está disponible para conectarse. Esto se hace mediante un paquete llamado `advertising packet` que se envía a través de la frecuencia de radio. Este paquete contiene información como el nombre del dispositivo, el tipo de dispositivo, el fabricante, etc.

### 2. Escaneo

El dispositivo que actúa como cliente debe escanear los dispositivos que están disponibles para conectarse. Esto se hace mediante un paquete llamado `scan response packet` que se envía a través de la frecuencia de radio. Este paquete contiene información como el nombre del dispositivo, el tipo de dispositivo, el fabricante, etc.

### 3. Conexión

Una vez el dispositivo cliente ha encontrado al servidor, este puede usar su direccoin MAC para conectarse.

En codigo por parte del cliente se logra mediante:

```python
from bleak import BleakScanner

async def discover():
    # Con esto podemos ver los dispositivos que estan disponibles
    scanner = BleakScanner()
    devices = await scanner.discover()
    return devices


async def connect(device_mac):
    # Con esto nos conectamos a un dispositivo
    client = BleakClient(device_mac)
    connected = await client.connect()
    return client, connected


```

### 4. Leer y escribir características

Para leer y escribir características, el cliente debe conocer el UUID de la característica. El UUID es un identificador único que se utiliza para identificar una característica.

En codigo por parte del cliente se logra mediante:

```python

async def char_read(client, characteristic_uuid):
    # Con esto leemos un caracteristica
    return await client.read_gatt_char(characteristic_uuid)


async def char_write(client, characteristic_uuid, data):
    # Con esto escribimos un caracteristica
    await client.write_gatt_char(characteristic_uuid, data)

```

Por el lado del servidor, basandose en el ejemplo de ESP-IDF, se debe de agregar codigo a la funcion
`gatts_profile_a_event_handler` para que cuando se reciba una peticion de lectura o escritura se pueda responder.

Especificamente los casos del switch `ESP_GATTS_READ_EVT` y `ESP_GATTS_WRITE_EVT`

En primer lugar pueden ver el Write Event, este se llamara cuando desde el lado del cliente se envie un
`client.write_gatt_char` donde los datos enviados estaran en la variable `param->write.value` y el largo de estos en `param->write.len`

Este lo pueden utilizar para mandar la configuracion de la base de datos por parte de la Rasbperry Pi.

```c

  case ESP_GATTS_WRITE_EVT: {
    ESP_LOGI(GATTS_TAG,
             "GATT_WRITE_EVT, conn_id %d, trans_id %" PRIu32 ", handle %d",
             param->write.conn_id, param->write.trans_id, param->write.handle);
    if (!param->write.is_prep) {
      ESP_LOGI(GATTS_TAG,
               "GATT_WRITE_EVT, value len %d, value :", param->write.len);
      esp_log_buffer_hex(GATTS_TAG, param->write.value, param->write.len);
      if (gl_profile_tab[PROFILE_A_APP_ID].descr_handle ==
              param->write.handle &&
          param->write.len == 2) {
        uint16_t descr_value =
            param->write.value[1] << 8 | param->write.value[0];
        if (descr_value == 0x0001) {
          if (a_property & ESP_GATT_CHAR_PROP_BIT_NOTIFY) {
            ESP_LOGI(GATTS_TAG, "notify enable");
            uint8_t notify_data[15];
            for (int i = 0; i < sizeof(notify_data); ++i) {
              notify_data[i] = i % 0xff;
            }
            param->write.need_rsp = 1;
            // the size of notify_data[] need less than MTU size
            esp_ble_gatts_send_indicate(
                gatts_if, param->write.conn_id,
                gl_profile_tab[PROFILE_A_APP_ID].char_handle,
                sizeof(notify_data), notify_data, false);
          }
        } else if (descr_value == 0x0002) {
          if (a_property & ESP_GATT_CHAR_PROP_BIT_INDICATE) {
            ESP_LOGI(GATTS_TAG, "indicate enable");
            uint8_t indicate_data[15];
            for (int i = 0; i < sizeof(indicate_data); ++i) {
              indicate_data[i] = i % 0xff;
            }
            // the size of indicate_data[] need less than MTU
            // size
            esp_ble_gatts_send_indicate(
                gatts_if, param->write.conn_id,
                gl_profile_tab[PROFILE_A_APP_ID].char_handle,
                sizeof(indicate_data), indicate_data, true);
          }
        } else if (descr_value == 0x0000) {
          ESP_LOGI(GATTS_TAG, "notify/indicate disable ");
        } else {
          ESP_LOGE(GATTS_TAG, "unknown descr value");
          esp_log_buffer_hex(GATTS_TAG, param->write.value, param->write.len);
        }
      }
    }
    example_write_event_env(gatts_if, &a_prepare_write_env, param);

    // Aqui pueden agregar una llamada a funcion o simplemente su codigo directamente
    char *expected_con_init_msg = "con"; // Aqui podemos algun caracter especial para identificar el mensaje

    if (strncmp((char *)param->write.value, expected_con_init_msg, 3) == 0) {
      ESP_LOGI(GATTS_TAG, "GATT_WRITE_EVT, value len %d, value :%s",
               param->write.len, param->write.value);

      // Los contenidos del mensaje se ecuentran en param->write.value
      // El largo del mensaje se encuentra en param->write.len
    }
    break;
  }
```

Para leer datos desde el cliente al servidor deben de utilizar el Read Event, este se llamara cuando desde el lado del cliente se envie un
`client.read_gatt_char` donde los datos enviados estaran en la variable `param->read.value` y el largo de estos en `param->read.len`

```c

  case ESP_GATTS_READ_EVT: {
    ESP_LOGI(GATTS_TAG,
             "GATT_READ_EVT, conn_id %d, trans_id %" PRIu32 ", handle %d\n",
             param->read.conn_id, param->read.trans_id, param->read.handle);
    esp_gatt_rsp_t rsp;
    memset(&rsp, 0, sizeof(esp_gatt_rsp_t));
    // Aqui pueden agregar una llamada a funcion o simplemente su codigo directamente

    uint8_t *value = NULL;
    uint16_t length = 0;

    esp_err_t status = esp_ble_gatts_get_attr_value(gl_profile_tab[PROFILE_A_APP_ID].char_handle, &length, &value);

    // Con esto tendran el valor de la caracteristica en la variable value y el largo en length, usando a modo de ejemplo
    // la caracteristica A

    //Para setear el valor de una caracteristica se reliza de forma similar unsando esp_ble_gatts_set_attr_value
    // Mas info en: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/bluetooth/esp_gatts.html

    break;
  }

  ```

Aqui es importante notar que el cliente realiza un llamado a unicamente leer los datos y lee el valor acutal de la caracteristica. Aqui les puede surgir un problema. Como se cuando tengo que leer? O cuando se que el valor ya esta actualizado?

Para esto puden tomar varias rutas.

1. Coordinaar la generacion de datos con el servidor y el cliente para que siempre que se lea existan datos nuevos

2. Subscribirse a las notificaciones de la caracteristica (por el lado del cliente), de esta forma el cliente sabra cuando debe de leer los datos. (Hay mas info de esto en el apunte)

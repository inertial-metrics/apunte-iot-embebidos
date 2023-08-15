---
title: "Cliente y Server TCP"
description: ""
date: 2023-08-10T15:06:52Z
lastmod: 2023-08-10T15:06:52Z
draft: false
images: []
weight: 30
---


Ahora veremos un ejemplo de un cliente y un servidor TCP, en este caso el cliente se conecta al servidor y le envia un mensaje, el servidor recibe el mensaje y lo imprime en la terminal.

## Cliente TCP

```c
// Agregar Imports de Primer Conexion WiFi


#include "lwip/sockets.h" // Para sockets

#define SERVER_IP     "192.168.0.247" // IP del servidor (su computador o raspberry)
#define SERVER_PORT   1234


// Agregar funciones de Primer Conexion WiFi (nv_init y wifi_init_sta)

void socket_tcp(){
    struct sockaddr_in server_addr;
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(SERVER_PORT);
    inet_pton(AF_INET, SERVER_IP, &server_addr.sin_addr.s_addr);

    // Crear un socket
    int sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (sock < 0) {
        ESP_LOGE(TAG, "Error al crear el socket");
        return;
    }

    // Conectar al servidor
    if (connect(sock, (struct sockaddr *)&server_addr, sizeof(server_addr)) != 0) {
        ESP_LOGE(TAG, "Error al conectar");
        close(sock);
        return;
    }

    // Enviar mensaje "Hola Mundo"
    send(sock, "hola mundo", strlen("hola mundo"), 0);

    // Recibir respuesta

    char rx_buffer[128];
    int rx_len = recv(sock, rx_buffer, sizeof(rx_buffer) - 1, 0);
    if (rx_len < 0) {
        ESP_LOGE(TAG, "Error al recibir datos");
        return;
    }
    ESP_LOGI(TAG, "Datos recibidos: %s", rx_buffer);
    
    // Cerrar el socket
    close(sock);
}

void app_main(void){
    nvs_init();
    wifi_init_sta(WIFI_SSID, WIFI_PASSWORD);
    ESP_LOGI(TAG,"Conectado a WiFi!\n");
    socket_tcp();
}

```

Primero podemos ver que se crea un socket con la función `socket()`, luego se conecta al servidor con la función `connect()`, luego se envia un mensaje con la función `send()`, luego se recibe la respuesta con la función `recv()` y finalmente se cierra el socket con la función `close()`.

Este codigo funciona dentro del ejemplo dado en la Primera Conexion WiFi, solo se debe agregar la función `socket_tcp()` dentro de la función `app_main()`, ya que para utilizar un socket tcp y conectarte a la
red WiFi debes tener una conexión establecida.

## Servidor TCP

```python
import socket

HOST = '0.0.0.0'  # Escucha en todas las interfaces disponibles
PORT = 1234       # Puerto en el que se escucha

# Crea un socket para IPv4 y conexión TCP
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()

    print("El servidor está esperando conexiones en el puerto", PORT)

    while True:
        conn, addr = s.accept()  # Espera una conexión
        with conn:
            print('Conectado por', addr)
            data = conn.recv(1024)  # Recibe hasta 1024 bytes del cliente
            if data:
                print("Recibido: ", data.decode('utf-8'))
                respuesta = "tu mensaje es: " + data.decode('utf-8')
                conn.sendall(respuesta.encode('utf-8'))  # Envía la respuesta al cliente
```

Por otro lado tenemos un servidor TCP, este servidor se queda esperando conexiones, cuando un cliente se conecta, recibe un mensaje y lo imprime en la terminal, luego envia una respuesta al cliente con el mensaje recibido.

Por lo menos el lado de Python se espera que sea conocido por el estudiante dado el ramo de Redes.

## Codigo del Ejemplo

* [Cliente y Socket TCP](https://github.com/alberto-abarzua/apunte-iot-embebidos/tree/main/ejemplos/tcp_server_client.zip)

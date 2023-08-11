---
title: "Delays, Deep Sleep y Reinicio"
description: ""
date: 2023-08-11T00:52:22Z
lastmod: 2023-08-11T00:52:22Z
draft: false
images: []
weight: 80
---



## vTaskDelay

vTaskDelay es una función dentro del sistema operativo en tiempo real FreeRTOS, que se usa comúnmente en ESP-IDF. Permite suspender la ejecución de una tarea durante un período definido de tiempo. Esto es equivalente a time.sleep() en Python, o delay() en Arduino.

**Uso:** Para pausar una tarea, simplemente llamas a `vTaskDelay(x)` donde x es el número de ticks de reloj durante los cuales la tarea debe estar en suspensión.

**Propósito:** Esta función es útil para crear demoras controladas dentro de una tarea, como esperar un sensor para estabilizarse o dar tiempo a otra tarea para completar su ejecución.

### Ejemplo de uso:

```c
//delay por 10 segundos

vTaskDelay(10000 / portTICK_PERIOD_MS); // 10000 ms = 10 s 

// Se usa portTICK_PERIOD_MS para convertir el tiempo en milisegundos a ticks de reloj
```

## Deep Sleep

El modo Deep Sleep en ESP-32 es un estado de bajo consumo de energía donde el procesador principal está apagado, y sólo algunos de los periféricos pueden continuar funcionando.

**Uso:** Puedes activar el modo Deep Sleep utilizando `esp_deep_sleep_start()`. Antes de entrar en Deep Sleep, puedes configurar opciones como el despertador con funciones como esp_deep_sleep_enable_timer_wakeup().

**Propósito:** Deep Sleep es útil para ahorrar energía en aplicaciones alimentadas por batería, permitiendo que la ESP-32 conserve energía cuando no está realizando tareas críticas.

### Ejemplo de uso:

```c
// Configurar el despertador para despertar después de 10 segundos
esp_deep_sleep_enable_timer_wakeup(10000000); // 10000000 us = 10 s

// Iniciar el modo Deep Sleep
esp_deep_sleep_start();
```

Esto es equivalente a:

```c
esp_deep_sleep(10000000);
```

Es importante notar que el modo Deep Sleep no es lo mismo que el modo Sleep. El modo Sleep es un estado de bajo consumo de energía donde el procesador principal está apagado, pero la CPU sigue funcionando, y el modo Sleep no está disponible en ESP-32.

Es por esto que la ejecucion de codigo no se reanuda despues de un `esp_deep_sleep_start()`, sino que se reinicia el microcontrolador y comienza desde el inicio de `app_main`.

## Reinicio de la ESP-32

Reiniciar la ESP-32 significa reiniciar el microcontrolador, y puede ser útil durante el desarrollo, o en situaciones donde se necesita restaurar el sistema a un estado conocido.

**Uso:** Puedes reiniciar la ESP-32 programáticamente utilizando la función `esp_restart()`.

**Propósito:** El reinicio puede ser útil para recuperarse de errores, aplicar nuevas configuraciones, o simplemente para restaurar el sistema a un estado inicial limpio.

En resumen, vTaskDelay se usa para pausas controladas, el Deep Sleep para ahorrar energía, y el reinicio para restaurar la ESP-32 a un estado conocido, y todas estas funcionalidades son esenciales en diferentes escenarios de desarrollo y despliegue con ESP-IDF.

### Ejemplo de uso:

```c
// Reiniciar la ESP-32
esp_restart();
```

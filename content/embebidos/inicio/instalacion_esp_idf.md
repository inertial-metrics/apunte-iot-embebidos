---
title: "Instalación de ESP IDF"
description: ""
date: 2024-03-11T18:43:18-03:00
lastmod: 2024-03-11T18:43:18-03:00
draft: false
images: []
weight: 2
---
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
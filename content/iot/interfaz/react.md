---
title: "React"
description: ""
date: 2023-11-03T00:25:54Z
lastmod: 2023-11-03T00:25:54Z
draft: false
images: []
weight: 20
---

**¿Qué es React?**

React es una biblioteca de JavaScript desarrollada por Facebook para construir interfaces de usuario. Está diseñada para facilitar la creación de componentes reutilizables que gestionan su propio estado, lo que resulta en aplicaciones más modulares y mantenibles.

**¿Por qué es el más usado?**

React se ha ganado una reputación por su eficiencia y flexibilidad. Sus características, como el DOM virtual y la posibilidad de mezclar HTML con JavaScript (JSX), lo hacen especialmente atractivo para desarrolladores. Además, el fuerte apoyo de la comunidad y la amplia gama de recursos y bibliotecas disponibles lo convierten en una opción predilecta para muchos proyectos.

### El Paradigma de los Componentes

React introduce el concepto de componentes como bloques de construcción fundamentales de las aplicaciones. Cada componente representa una parte específica de la interfaz de usuario y puede tener su propio estado y lógica. Los componentes pueden ser reutilizados, lo que permite una estructura más organizada y un desarrollo más eficiente.

### Estructura del Proyecto Frontend en React

```bash
-> frontend
   ├── dockerfile
   ├── index.html
   ├── package.json
   ├── package-lock.json
   ├── postcss.config.js
   ├── public
   │   ├── about.txt
   │   ├── android-chrome-192x192.png
   │   ├── android-chrome-512x512.png
   │   ├── apple-touch-icon.png
   │   ├── favicon-16x16.png
   │   ├── favicon-32x32.png
   │   ├── favicon.ico
   │   └── site.webmanifest
   ├── src
   │   ├── app.jsx
   │   ├── assets
   │   ├── components
   │   │   ├── graficos
   │   │   │   └── basegraph.jsx
   │   │   ├── settings
   │   │   │   └── settingsfrom.jsx
   │   │   └── utiles
   │   │       └── comment.jsx
   │   ├── index.css
   │   ├── main.jsx
   │   ├── utils
   │   │   └── api.js
   │   └── views
   │       └── mainview.jsx
   ├── tailwind.config.js
   └── vite.config.js
```

La estructura del proyecto `frontend` representa una organización típica de una aplicación React moderna, aprovechando las herramientas y prácticas estándar de la industria.

- **Dockerfile**: Define las instrucciones para crear una imagen Docker del proyecto frontend, lo que facilita su despliegue y ejecución en cualquier entorno con Docker.

- **index.html**: Es la página principal que sirve como punto de entrada al proyecto. Aquí es donde React "ancla" y renderiza la aplicación.

- **package.json y package-lock.json**: Estos archivos gestionan las dependencias y scripts del proyecto. `package.json` declara las dependencias y scripts, mientras que `package-lock.json` asegura versiones consistentes de las dependencias.

- **postcss.config.js**: Configuración para PostCSS, una herramienta que permite transformar CSS con JavaScript, comúnmente utilizado junto con Tailwind CSS.

- **public**: Contiene archivos estáticos y recursos de la aplicación, como íconos, manifestos y otros assets que no requieren procesamiento por parte de Webpack o Vite.

- **src**: Es el directorio principal que contiene el código fuente de la aplicación.

  - **App.jsx**: Suele ser el componente raíz de la aplicación.

  - **assets**: Almacena recursos como imágenes, fuentes y otros archivos estáticos utilizados dentro del código de la aplicación.

  - **components**: Contiene componentes reutilizables, organizados en subcarpetas por función o tipo. Por ejemplo, `graficos` para gráficos, `settings` para configuraciones y `utiles` para utilidades.

  - **index.css**: Estilos generales de la aplicación.

  - **main.jsx**: Es comúnmente el punto de entrada de la aplicación, donde se inicia y renderiza React.

  - **utils**: Contiene herramientas y funciones auxiliares, como `api.js`, que podría contener funciones para interactuar con endpoints de API.

  - **views**: Almacena componentes de nivel superior que representan páginas o vistas completas.

- **tailwind.config.js**: Configuración personalizada para Tailwind CSS.

- **vite.config.js**: Configuración para Vite, detallando cómo debe construir y servir la aplicación.

Cuando se desee expandir la aplicación, es común crear componentes adicionales dentro de la carpeta `components` y agregar estilos asociados en archivos CSS o directamente en componentes utilizando soluciones CSS-in-JS. También, si se añaden nuevas dependencias, se reflejarán en `package.json`.

### Vite: Herramienta de Desarrollo

**¿Qué es Vite?**

Vite es una herramienta de construcción que proporciona un entorno de desarrollo más rápido para proyectos frontend. Es especialmente conocido por su refresco instantáneo de página.

**¿Por qué lo usamos?**

Vite mejora la eficiencia del proceso de desarrollo al proporcionar un refresco más rápido y una integración más sencilla con frameworks populares como React.

### Uso de React y Creación de Componentes


Un componente en React puede pensarse como una unidad de la interfaz de usuario. Por ejemplo, un botón, un formulario o una tarjeta. Estos componentes pueden ser anidados, reutilizados y gestionados de forma independiente.

La estructura básica de un componente en React es una función o una clase que retorna JSX. El JSX es una extensión de JavaScript que permite escribir estructuras de HTML dentro del código JavaScript.

**Componente Funcional**:

```javascript
const Welcome = (props) => {
    return <h1>Hello, {props.name}</h1>;
}
```

### Hooks en React

Los hooks son una adición reciente en React que permiten usar estado y otras características de React sin escribir una clase. Antes de los hooks, si querías utilizar estado o ciclos de vida en tus componentes, necesitabas convertirlos en componentes basados en clases. Pero con la introducción de los hooks, estas funcionalidades se pueden lograr en componentes funcionales.

**useState**: Es el hook que permite a los componentes funcionales tener acceso al estado. El `useState` devuelve un par: el valor del estado actual y una función que permite actualizarlo.

```javascript
const [count, setCount] = useState(0);
```

**useEffect**: Es utilizado para realizar efectos secundarios en componentes funcionales. Los efectos secundarios pueden ser cualquier cosa que afecta algo fuera del ámbito del componente, como cambios en el DOM, suscripciones, solicitudes de red y más. El hook `useEffect` toma dos argumentos: una función que contiene el código del efecto y una matriz de dependencias.

```javascript
useEffect(() => {
    document.title = `Has clickeado ${count} veces`;
}, [count]);
```

Los hooks han sido una revolución en la forma en que se escribe el código en React. Simplifican el código al eliminar la necesidad de clases, facilitan la reutilización de lógica y proporcionan una forma más clara y concisa de trabajar con efectos y estado en React.

**Ejemplo de un Componente con Hooks (Contador)**:

```javascript
import React, { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Has clickeado {count} veces</p>
            <button onClick={() => setCount(count + 1)}>Clickeame</button>
        </div>
    );
}
```

Con la integración de hooks, React ofrece una mayor flexibilidad y eficiencia, permitiendo a los desarrolladores construir aplicaciones más limpias y modulares.

### Tailwind CSS: Un Framework de Utilidad

**¿Qué es Tailwind?**

Tailwind CSS es un framework de utilidad-first para construir interfaces rápidamente sin salir del HTML.

**¿Por qué lo usamos?**

Tailwind ofrece una serie de clases utilitarias que facilitan la construcción de diseños sin tener que escribir CSS desde cero. Esto promueve una mayor eficiencia y consistencia en el diseño, reduciendo también el tamaño del código CSS.

## Ejemplo de tailwind v/s css

### Ejemplo con Tailwind CSS:

```html
<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
    Click me
</button>
```

### Ejemplo con CSS puro:

```html
<style>
    .mi-boton {
        background-color: #3b82f6;
        color: white;
        padding: 8px 16px;
        border-radius: 6px;
        transition: background-color 0.3s;
    }

    .mi-boton:hover {
        background-color: #2563eb;
    }
</style>

<button class="mi-boton">Click me</button>
```

Amos ejemplos son equivalentes, pero el primero utiliza Tailwind CSS, mientras que el segundo utiliza CSS puro. Como puedes ver, con Tailwind CSS se pueden aplicar estilos rápidamente usando clases predefinidas, mientras que con CSS puro, debes definir los estilos manualmente. Esto demuestra cómo Tailwind puede agilizar el proceso de diseño y desarrollo.

Esto se veria asi:

<html>

<style>
    .mi-boton {
        background-color: #3b82f6;
        color: white;
        padding: 8px 16px;
        border-radius: 6px;
        transition: background-color 0.3s;
    }

    .mi-boton:hover {
        background-color: #2563eb;
    }
</style>

<button class="mi-boton">Click me</button>
</html>

Como puedes ver, con Tailwind CSS se pueden aplicar estilos rápidamente usando clases predefinidas, mientras que con CSS puro, debes definir los estilos manualmente. Esto demuestra cómo Tailwind puede agilizar el proceso de diseño y desarrollo.

#### Mas sobre Tailwind

- [Documentación](https://tailwindcss.com/docs)

Lo bueno de tailwind es que no es necesario conocer a fondo CSS para poder usarlo, ya que es muy intuitivo y facil de usar.

Una vez que se aprende a usar tailwind, se puede usar en cualquier proyecto, ya que es muy versatil y se puede usar en cualquier framework.

Un video entretenido que muestra su potencial es este:

- [Video](https://www.youtube.com/watch?v=pfaSUYaSgRo&ab_channel=Fireship)


#### Mas sobre React

Es muy recomendable revisar la documentación oficial de React para aprender más sobre el framework y sus características.

- [Documentación](https://react.dev/learn)

Les puede ser muy util ver algun tutorial de React en Youtube (hay muchos), pero les recomiendo este:

- [Tutorial de React](https://www.youtube.com/watch?v=SqcY0GlETPk&ab_channel=ProgrammingwithMosh)


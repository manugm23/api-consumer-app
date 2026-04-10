# API Consumer App

## Descripción
Esta es una aplicación web sencilla que consume datos de una API externa. Permite buscar publicaciones (posts) utilizando dos métodos diferentes: Fetch API nativo de JavaScript o la librería Axios. Los resultados se muestran en tarjetas con paginación para una navegación fácil.

## ¿Qué se hizo?
- Se creó una interfaz de usuario básica con HTML, CSS y JavaScript.
- Se implementó la funcionalidad para consumir la API de JSONPlaceholder (https://jsonplaceholder.typicode.com/posts).
- Se agregó la opción de elegir entre Fetch y Axios para hacer las peticiones HTTP.
- Se incluyó un sistema de búsqueda por términos.
- Se diseñó una vista de resultados con tarjetas y paginación.
- Se manejaron estados de carga, errores y resultados vacíos.

## Cómo funciona
1. El usuario selecciona el método de petición (Fetch o Axios) en el selector.
2. Ingresa un término de búsqueda en el campo de texto.
3. Hace clic en el botón "Obtener Datos" o presiona Enter.
4. La aplicación realiza una petición GET a la API con los parámetros de búsqueda, página y límite.
5. Los resultados se muestran en una cuadrícula de tarjetas, cada una con el título, cuerpo y ID del post.
6. Si hay más resultados, aparece la paginación para navegar entre páginas.

## Para qué sirve
Esta aplicación sirve como ejemplo práctico de cómo consumir APIs en el frontend. Es útil para:
- Aprender a usar Fetch API y Axios.
- Entender el manejo de promesas y async/await.
- Practicar el diseño de interfaces responsivas.
- Demostrar el consumo de APIs REST con paginación y búsqueda.

## Tecnologías utilizadas
- HTML5
- CSS3
- JavaScript (ES6+)
- Axios (desde CDN)

## Cómo ejecutar
1. Abre el archivo `index.html` en un navegador web.
2. Asegúrate de tener conexión a internet para acceder a la API.
3. Selecciona el método de petición, ingresa un término de búsqueda y haz clic en "Obtener Datos".

## Tests
El proyecto incluye tests unitarios para algunas funciones utilizando Vitest.
- Para ejecutar los tests: `npm test`
- Los tests cubren la función `escapeHtml` que se utiliza para sanitizar el contenido HTML.

## Notas
- La API utilizada es JSONPlaceholder, que proporciona datos de prueba.
- La aplicación maneja errores de red y respuestas HTTP no exitosas.
- El diseño es responsivo y funciona en dispositivos móviles.
- La API utilizada es JSONPlaceholder, que proporciona datos de prueba.
- La aplicación maneja errores de red y respuestas HTTP no exitosas.
- El diseño es responsivo y funciona en dispositivos móviles.
# Productos y Categorías

## 1. Descripción del proyecto

Este proyecto consiste en una API REST desarrollada con Node.js, Express y MongoDB, que permite administrar categorías y productos mediante operaciones CRUD (Crear, Consultar, Actualizar y Eliminar).

La API utiliza respuestas en formato JSON y cuenta con dos colecciones principales relacionadas:

- Categorías: almacenan la información de las categorías.
- Productos: almacenan los datos de los productos y la referencia a la categoría a la que pertenecen.

Además, cada producto puede contener varias características almacenadas como objetos dentro de un arreglo embebido.

## 2. Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- MongoDB Node.js Driver
- dotenv
- Nodemon

## 3. Requisitos previos

Antes de ejecutar el proyecto se debe contar con:

- Node.js instalado.
- npm instalado.
- Una instancia de MongoDB disponible.
- Git para clonar el repositorio.

## 4. Instalación del proyecto

Paso 1. Clonar el repositorio

Reemplazar `URL_DEL_REPOSITORIO` por la dirección del repositorio de GitHub.

```bash
git clone URL_DEL_REPOSITORIO
```

Paso 2. Ingresar a la carpeta del proyecto

```bash
cd productos
```

Paso 3. Instalar las dependencias

```bash
npm install
```

## 5. Configuración de variables de entorno

Crear un archivo llamado `.env` en la raíz del proyecto.

Agregar las siguientes variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017
```

Importante: El valor de `MONGO_URI` debe corresponder a la dirección de conexión de MongoDB utilizada por el usuario. Si se utiliza MongoDB Atlas, se debe colocar la cadena de conexión correspondiente.

La base de datos utilizada por la aplicación es `productosDB`.

## 6. Ejecución del proyecto

Paso 1. Iniciar el servidor

Desde la carpeta del proyecto, ejecutar:

```powershell
npm run dev
```

Para ejecutar el servidor normalmente, también se puede utilizar:

```powershell
npm start
```

Cuando la conexión con MongoDB se realiza correctamente, se muestra un mensaje de confirmación en la consola.

El servidor queda disponible en:

```text
http://localhost:3000
```

Importante: No cerrar la terminal donde se está ejecutando el servidor.

Para realizar las pruebas de los endpoints, abrir una segunda ventana de PowerShell.

## 7. Endpoints de la API

### 7.1. Endpoints de categorías

| Método HTTP | Endpoint | Descripción |
|---|---|---|
| POST | `/categorias/registrar-categoria` | Registrar una categoría. |
| GET | `/categorias/consultar-categoria` | Consultar todas las categorías. |
| GET | `/categorias/consultar-categoria?nombre=...` | Consultar una categoría por nombre. |
| PATCH | `/categorias/actualizar-categoria` | Actualizar el nombre de una categoría. |
| DELETE | `/categorias/eliminar-categoria` | Eliminar una categoría. |

### 7.2. Endpoints de productos

| Método HTTP | Endpoint | Descripción |
|---|---|---|
| POST | `/productos/registrar-producto` | Registrar un producto. |
| GET | `/productos/consultar-producto` | Consultar todos los productos. |
| GET | `/productos/consultar-producto?nombre=...` | Consultar un producto por nombre. |
| PATCH | `/productos/actualizar-producto` | Actualizar los datos generales o una característica del producto. |
| DELETE | `/productos/eliminar-producto` | Eliminar un producto. |

## 8. Pruebas de los endpoints con cURL

Los siguientes ejemplos están preparados para ejecutarse en Windows PowerShell 5.1, utilizando `curl.exe`.

Para evitar problemas con las comillas del JSON en PowerShell, las solicitudes POST, PATCH y DELETE utilizan un archivo temporal que contiene los datos que se enviarán a la API.

### 8.1. Preparación para las pruebas

Paso 1. Abrir una segunda ventana de PowerShell.

El servidor debe continuar ejecutándose en la primera ventana.

Paso 2. Ingresar a la carpeta del proyecto.

```powershell
cd C:\Users\NOMBRE_USUARIO\RUTA\productos
```

Si el proyecto se encuentra en otra ubicación, reemplazar la ruta por la correspondiente.

Paso 3. Definir la ubicación del archivo temporal.

Ejecutar una sola vez:

```powershell
$archivo = Join-Path $env:TEMP "body.json"
```

Esta variable permitirá utilizar el mismo archivo temporal durante todas las pruebas.

Importante: Los comandos que crean o modifican el archivo JSON y los comandos `curl.exe` deben ejecutarse en el orden indicado. No se debe ejecutar el comando de cURL antes de crear el contenido del archivo.

### 8.2. Pruebas de categorías

Las siguientes operaciones deben ejecutarse en orden.

1. Registrar una categoría — POST

Primero, crear el contenido del archivo JSON. Copiar y ejecutar:

```powershell
'{"nombre":"tecnologia"}' | Set-Content -Path $archivo -Encoding ASCII
```

Después, ejecutar la solicitud con cURL:

```powershell
curl.exe -X POST "http://localhost:3000/categorias/registrar-categoria" -H "Content-Type: application/json" --data-binary "@$archivo"
```

2. Consultar todas las categorías — GET

```powershell
curl.exe "http://localhost:3000/categorias/consultar-categoria"
```

3. Consultar una categoría por nombre — GET

```powershell
curl.exe "http://localhost:3000/categorias/consultar-categoria?nombre=tecnologia"
```

4. Actualizar una categoría — PATCH

Primero, crear el contenido del archivo JSON:

```powershell
'{"nombre":"tecnologia","nuevoNombre":"informatica"}' | Set-Content -Path $archivo -Encoding ASCII
```

Después, ejecutar la solicitud con cURL:

```powershell
curl.exe -X PATCH "http://localhost:3000/categorias/actualizar-categoria" -H "Content-Type: application/json" --data-binary "@$archivo"
```

5. Eliminar una categoría — DELETE

Primero, crear el contenido del archivo JSON:

```powershell
'{"nombre":"informatica"}' | Set-Content -Path $archivo -Encoding ASCII
```

Después, ejecutar la solicitud con cURL:

```powershell
curl.exe -X DELETE "http://localhost:3000/categorias/eliminar-categoria" -H "Content-Type: application/json" --data-binary "@$archivo"
```

### 8.3. Pruebas de productos

Para registrar un producto, primero debe existir la categoría a la que estará asociado.

Por este motivo, se debe registrar nuevamente la categoría `tecnologia` antes de continuar con las pruebas de productos.

1. Registrar la categoría necesaria

Primero, crear el contenido del archivo JSON:

```powershell
'{"nombre":"tecnologia"}' | Set-Content -Path $archivo -Encoding ASCII
```

Después, ejecutar:

```powershell
curl.exe -X POST "http://localhost:3000/categorias/registrar-categoria" -H "Content-Type: application/json" --data-binary "@$archivo"
```

2. Registrar un producto — POST

Primero, crear el contenido del archivo JSON:

```powershell
'{"nombre":"mouse-gamer","nombreCategoria":"tecnologia","nombreCar":"color","valorCar":"negro","precio":150000,"stock":10}' | Set-Content -Path $archivo -Encoding ASCII
```

Después, ejecutar la solicitud con cURL:

```powershell
curl.exe -X POST "http://localhost:3000/productos/registrar-producto" -H "Content-Type: application/json" --data-binary "@$archivo"
```

3. Consultar todos los productos — GET**

```powershell
curl.exe "http://localhost:3000/productos/consultar-producto"
```

4. Consultar un producto por nombre — GET**

```powershell
curl.exe "http://localhost:3000/productos/consultar-producto?nombre=mouse-gamer"
```

5. Actualizar los datos generales de un producto — PATCH**

Primero, crear el contenido del archivo JSON:

```powershell
'{"nombre":"mouse-gamer","nuevoNombre":"mouse-gamer-pro","nuevaCategoria":"tecnologia","nuevoPrecio":180000,"nuevoStock":15}' | Set-Content -Path $archivo -Encoding ASCII
```

Después, ejecutar la solicitud con cURL:

```powershell
curl.exe -X PATCH "http://localhost:3000/productos/actualizar-producto" -H "Content-Type: application/json" --data-binary "@$archivo"
```

6. Actualizar una característica del producto — PATCH**

Primero, crear el contenido del archivo JSON:

```powershell
'{"nombre":"mouse-gamer-pro","nuevoNombre":"mouse-gamer-pro","nuevaCategoria":"tecnologia","nombreCar":"color","nuevoNombreCar":"color","nuevoValorCar":"azul","nuevoPrecio":180000,"nuevoStock":15}' | Set-Content -Path $archivo -Encoding ASCII
```

Después, ejecutar la solicitud con cURL:

```powershell
curl.exe -X PATCH "http://localhost:3000/productos/actualizar-producto" -H "Content-Type: application/json" --data-binary "@$archivo"
```

7. Eliminar un producto — DELETE**

Primero, crear el contenido del archivo JSON:

```powershell
'{"nombre":"mouse-gamer-pro"}' | Set-Content -Path $archivo -Encoding ASCII
```

Después, ejecutar la solicitud con cURL:

```powershell
curl.exe -X DELETE "http://localhost:3000/productos/eliminar-producto" -H "Content-Type: application/json" --data-binary "@$archivo"
```

### 8.4. Consideraciones sobre las pruebas

- Los comandos utilizan `curl.exe`.
- El archivo JSON temporal se almacena en la carpeta temporal de Windows.
- La variable `$archivo` debe definirse antes de realizar las pruebas.
- Las solicitudes GET no necesitan enviar un cuerpo JSON.
- Las solicitudes POST, PATCH y DELETE incluyen el encabezado `Content-Type: application/json`.
- El servidor debe permanecer ejecutándose durante las pruebas.
- Se recomienda seguir el orden indicado para evitar errores relacionados con las categorías asociadas a los productos.
- Las pruebas utilizan nombres y datos de ejemplo. Si se ejecutan nuevamente, puede ser necesario modificar o eliminar los registros anteriores para evitar duplicados.

## 9. Estructura del proyecto

```text
productos/
│
├── src/
│   ├── config/
│   │   └── data_base.js
│   │
│   ├── modules/
│   │   ├── categorias/
│   │   │   ├── categoria.controller.js
│   │   │   ├── categoria.route.js
│   │   │   └── categoria.service.js
│   │   │
│   │   └── productos/
│   │       ├── productos.controller.js
│   │       ├── productos.route.js
│   │       └── productos.service.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

### Descripción de las carpetas

- config: contiene la configuración de la conexión con MongoDB.
- modules: contiene los módulos de categorías y productos.
- controller: recibe las solicitudes HTTP y devuelve las respuestas.
- route: define los endpoints de la API.
- service: contiene la lógica de negocio y las operaciones con MongoDB.
- app.js: configura Express y registra las rutas.
- server.js: establece la conexión con la base de datos e inicia el servidor.

## 10. Manejo de respuestas y errores

La API utiliza respuestas HTTP para indicar el resultado de las operaciones:

| Código HTTP | Significado |
|---|---|
| 200 | Solicitud procesada correctamente. |
| 400 | Error en los datos o en la operación solicitada. |
| 404 | No se encontró el recurso solicitado. |
| 500 | Error interno del servidor. |

Las respuestas se entregan en formato JSON e incluyen información sobre el resultado de las operaciones.

## 11. Consideraciones finales

- Las solicitudes POST, PATCH y DELETE que reciben datos deben enviarse con el encabezado `Content-Type: application/json`.
- Es necesario tener MongoDB disponible antes de iniciar el servidor.
- Para ejecutar las pruebas se requiere que el servidor esté iniciado y que la conexión con la base de datos esté funcionando correctamente.
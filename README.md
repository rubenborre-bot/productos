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

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar a la carpeta del proyecto:

```bash
cd productos
```

Instalar las dependencias:

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

Para ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

Para ejecutar el servidor normalmente:

```bash
npm start
```

Cuando la conexión con MongoDB se realiza correctamente, se muestra un mensaje de confirmación en la consola.

El servidor queda disponible en:

```text
http://localhost:3000
```

Si se utiliza otro puerto, se debe reemplazar el número 3000 por el configurado en `.env`.

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

Los siguientes ejemplos utilizan `curl.exe` y una dirección local con el puerto 3000. Se pueden ejecutar desde PowerShell o desde una terminal compatible con cURL.

### 8.1. Categorías

Registrar una categoría

```bash
curl.exe -X POST http://localhost:3000/categorias/registrar-categoria -H "Content-Type: application/json" -d "{\"nombre\":\"Tecnologia\"}"
```

Consultar todas las categorías

```bash
curl.exe http://localhost:3000/categorias/consultar-categoria
```

Consultar una categoría por nombre

```bash
curl.exe "http://localhost:3000/categorias/consultar-categoria?nombre=Tecnologia"
```

Actualizar una categoría

```bash
curl.exe -X PATCH http://localhost:3000/categorias/actualizar-categoria -H "Content-Type: application/json" -d "{\"nombre\":\"Tecnologia\",\"nuevoNombre\":\"Informatica\"}"
```

Eliminar una categoría

```bash
curl.exe -X DELETE http://localhost:3000/categorias/eliminar-categoria -H "Content-Type: application/json" -d "{\"nombre\":\"Informatica\"}"
```

### 8.2. Productos

Registrar un producto

```bash
curl.exe -X POST http://localhost:3000/productos/registrar-producto -H "Content-Type: application/json" -d "{\"nombre\":\"Portatil Lenovo\",\"nombreCategoria\":\"Tecnologia\",\"nombreCar\":\"RAM\",\"valorCar\":\"16 GB\",\"precio\":2500000,\"stock\":10}"
```

Consultar todos los productos

```bash
curl.exe http://localhost:3000/productos/consultar-producto
```

Consultar un producto por nombre

```bash
curl.exe "http://localhost:3000/productos/consultar-producto?nombre=Portatil%20Lenovo"
```

Actualizar los datos generales de un producto

```bash
curl.exe -X PATCH http://localhost:3000/productos/actualizar-producto -H "Content-Type: application/json" -d "{\"nombre\":\"Portatil Lenovo\",\"nuevoNombre\":\"Portatil Lenovo Ideapad\",\"nuevaCategoria\":\"Tecnologia\",\"nuevoPrecio\":2800000,\"nuevoStock\":8}"
```

Actualizar una característica de un producto

```bash
curl.exe -X PATCH http://localhost:3000/productos/actualizar-producto -H "Content-Type: application/json" -d "{\"nombre\":\"Portatil Lenovo Ideapad\",\"nuevoNombre\":\"Portatil Lenovo Ideapad\",\"nuevaCategoria\":\"Tecnologia\",\"nombreCar\":\"ram\",\"nuevoNombreCar\":\"memoria ram\",\"nuevoValorCar\":\"32 GB\",\"nuevoPrecio\":2800000,\"nuevoStock\":8}"
```

Eliminar un producto

```bash
curl.exe -X DELETE http://localhost:3000/productos/eliminar-producto -H "Content-Type: application/json" -d "{\"nombre\":\"Portatil Lenovo Ideapad\"}"
```

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

## 11. Consideraciones

- Las solicitudes POST, PATCH y DELETE que reciben datos deben enviarse con el encabezado `Content-Type: application/json`.

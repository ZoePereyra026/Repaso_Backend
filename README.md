# Repaso Examen: API CRUD con Express y MongoDB 🖥️
## Documentación de la API CRUD de Productos Electrónicos 📚
## Descripción del Proyecto 📋
Esta API RESTful permite gestionar una colección de productos electrónicos almacenados en MongoDB. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre productos electrónicos, modelados a partir del archivo electronicos.json.
La API está desarrollada con Express y Mongoose.

http://localhost:3000/api/productos/

## Estructura del Repositorio 🗂️

```plaintext
/controllers
  - productoController.js
/json
  - electronicos.json
/README.md
/app.js
/config/
  - database.js
/models/
  - producto.js
/routes/
  - productoRoutes.js
```

### Descripción de Archivos 📝

- **/json**: Contiene el archivo electronicos.json con los datos de productos.
- **/README.md**: Archivo con la descripción del proyecto y pasos para ejecutarlo.
- **/app.js**: Archivo principal de la aplicación Express.
- **/config/database.js**: Configuración de la conexión a MongoDB.
- **/models/**: Contiene el modelo de datos `Producto` para MongoDB.
- **/routes/**: Define las rutas de los endpoints del CRUD.

## Modelo de Base de Datos 📊
El modelo Producto tiene los siguientes campos:

codigo: Número único que identifica cada producto.
nombre: Nombre del producto (por ejemplo, "Notebook", "Smartphone X10").
precio: Precio en formato decimal.
categorias: Arreglo de categorías relacionadas al producto (ej. "Computación", "Electrónica").

## Funcionalidades del CRUD 🚀

1. **Obtener todos los productos**
2. **Obtener un producto por código**
3. **Filtrar productos**
4. **Agregar un nuevo producto**
5. **Actualizar un producto**
6. **Eliminar un producto**
7. **Control de Errores**

## Tabla de Endpoints
Método	Ruta	Descripción
GET	/api/productos/	Obtener todos los productos
GET	/api/productos/:codigo	Obtener un producto por código
GET	/api/productos/filtrar?precioMin=100&precioMax=500	Filtrar productos por rango de precio
POST	/api/productos/	Agregar un nuevo producto
PUT	/api/productos/:codigo	Actualizar un producto existente
DELETE	/api/productos/:codigo	Eliminar un producto

## Endpoints de la API

A continuación se detallan los endpoints disponibles en la API:

### 1. Obtener todos los productos

- **Método:** GET
- **Ruta:** `/api/productos`
- **Descripción:** Obtiene una lista de todos los productos electrónicos.
- **Respuesta Exitosa:**
  - **Código:** 200 OK
  - **Cuerpo:**
    ```json
    [
      {
        "codigo": 1,
        "nombre": "Notebook",
        "precio": 1500.00,
        "categorias": ["Computación", "Electrónica"]
      },
      {
        "codigo": 2,
        "nombre": "Smartphone X10",
        "precio": 800.00,
        "categorias": ["Electrónica", "Telefonía"]
      }
    ]
    ```

### 2. Obtener un producto por código

- **Método:** GET
- **Ruta:** `/api/productos/:codigo`
- **Descripción:** Obtiene los detalles de un producto específico según su código.
- **Parámetros:**
  - `codigo`: El código del producto a obtener.
- **Respuesta Exitosa:**
  - **Código:** 200 OK
  - **Cuerpo:**
    ```json
    {
      "codigo": 1,
      "nombre": "Notebook",
      "precio": 1500.00,
      "categorias": ["Computación", "Electrónica"]
    }
    ```
- **Respuesta de Error (Producto No Encontrado):**
  - **Código:** 404 Not Found
  - **Cuerpo:**
    ```json
    {
      "error": "Producto no encontrado"
    }
    ```

### 3. Filtrar productos

- **Método:** GET
- **Ruta:** `/api/productos?categoria=valor`
- **Descripción:** Filtra los productos según la categoría especificada.
- **Parámetros de Consulta:**
  - `categoria`: La categoría por la cual filtrar los productos.
- **Respuesta Exitosa:**
  - **Código:** 200 OK
  - **Cuerpo:**
    ```json
    [
      {
        "codigo": 2,
        "nombre": "Smartphone X10",
        "precio": 800.00,
        "categorias": ["Electrónica", "Telefonía"]
      }
    ]
    ```

### 4. Agregar un nuevo producto

- **Método:** POST
- **Ruta:** `/api/productos`
- **Descripción:** Agrega un nuevo producto a la colección.
- **Cuerpo de Solicitud:**
  ```json
  {
    "codigo": 3,
    "nombre": "Tablet Pro",
    "precio": 600.00,
    "categorias": ["Computación", "Tablets"]
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 201 Created
  - **Cuerpo:**
    ```json
    {
      "mensaje": "Producto agregado exitosamente",
      "producto": {
        "codigo": 3,
        "nombre": "Tablet Pro",
        "precio": 600.00,
        "categorias": ["Computación", "Tablets"]
      }
    }
    ```

### 5. Actualizar un producto

- **Método:** PUT
- **Ruta:** `/api/productos/:codigo`
- **Descripción:** Actualiza la información de un producto existente.
- **Parámetros:**
  - `codigo`: El código del producto a actualizar.
- **Cuerpo de Solicitud:**
  ```json
  {
    "nombre": "Notebook Actualizado",
    "precio": 1400.00
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 200 OK
  - **Cuerpo:**
    ```json
    {
      "mensaje": "Producto actualizado exitosamente",
      "producto": {
        "codigo": 1,
        "nombre": "Notebook Actualizado",
        "precio": 1400.00,
        "categorias": ["Computación", "Electrónica"]
      }
    }
    ```

### 6. Eliminar un producto

- **Método:** DELETE
- **Ruta:** `/api/productos/:codigo`
- **Descripción:** Elimina un producto de la colección.
- **Parámetros:**
  - `codigo`: El código del producto a eliminar.
- **Respuesta Exitosa:**
  - **Código:** 200 OK
  - **Cuerpo:**
    ```json
    {
      "mensaje": "Producto eliminado exitosamente"
    }
    ```
- **Respuesta de Error (Producto No Encontrado):**
  - **Código:** 404 Not Found
  - **Cuerpo:**
    ```json
    {
      "error": "Producto no encontrado"
    }
    ```

### 7. Control de Errores

La API debe manejar adecuadamente los errores, como códigos de producto duplicados al agregar un nuevo producto, o intentos de actualización o eliminación de productos no existentes. Las respuestas de error deben incluir un mensaje claro y un código de estado HTTP apropiado.

**Ejemplo de Respuesta de Error por Duplicado:**
- **Código:** 400 Bad Request
- **Cuerpo:**
  ```json
  {
    "error": "El código del producto ya existe"
  }
  ```

**Ejemplo de Respuesta de Error por Producto No Encontrado (Actualizar/Eliminar):**
- **Código:** 404 Not Found
- **Cuerpo:**
  ```json
  {
    "error": "Producto no encontrado"
  }
  ```

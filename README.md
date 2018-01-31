# Almundo Examen Frontend
# Presentado por: Fernando Nuñez Estrada

En este repositorio se encuentra la parte de Backend de la prueba

# Desarrollo

## Servidor de desarrollo

Para ejecutar el server de la aplicación en ambiente de desarrollo debemos usar el comando: `node server.js`. 
por defecto el server apunta a la siguiente URL `http://localhost:3000/`. 

#Endpoints

## Ejemplo dummy de la data

```json
{
    "id": "161901",
    "name": "Hotel Santa Cruz",
    "stars": 3,
    "price": 1267.57,
    "image": "6623490_6_b.jpg",
    "amenities": [
      "nightclub",
      "business-center",
      "bathtub",
      "newspaper",
      "restaurant"
    ]
}
```

## operaciones CRUD
Endpoint para Obtener listado de hoteles  
`GET /hotels`  

El siguiente ejemplo permite filtrar la información de los hoteles, buscando el nombre `Hotel Santa Cruz` y que sean de `3` y `1` estrellas:  
`GET /hotel?name=Hotel Santa Cruz&stars=3&stars=1`  

Endpoint para obtener un hotel por id  
`GET /hotels/:hotelId`  

Endpoint para guardar un nuevo hotel  
`POST /hotels` . Se debe enviar como Json el objeto `Hotel` a guardar.  

Endpoint que permite actualizar un Hotel específico pasandole el id por la url y el objecto `Hotel` con la información a actualizar  
`UPDATE /hotels/:hotelId`  

Endpoint que permite eliminar un `Hotel` por su `id`  
`DELETE /hotels/:hotelId`  
  
## Inicializar dummy data
Endpoint que permite inicializar la base de datos con la información dummy proporcionada en el archivo `data.json`  
`POST /hotels/dummy`  
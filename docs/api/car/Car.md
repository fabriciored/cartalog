
# API - Car

Endpoint URL: ${**baseURL**}/api/cars/




## API routes

### Get all cars

```http
  GET /api/cars
```

### Get cars by id

```http
  GET /api/cars/${id}
```
`Route parameters`
| Params   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. Car id. |


### Create car on automaker

```http
  POST /api/cars/create/${carName}
```
`Route parameters`
| Params   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `car`      | `string` | **Required**. Car automaker name. |

`Multipart/form-data`
| Key   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `image`      | `file` | **Required**. Car image file. |
| `name`      | `string` | **Required**. Car name. |
| `model`      | `string` | **Required**. Car model. |
| `year`      | `string` | **Required**. Car launch year. |
| `transmission`      | `string` | **Required**. Car transmission type. |
| `fuel`      | `string` | **Required**. Car fuel types. |
| `power`      | `string` | **Required**. Car engine power. |
| `torque`      | `string` | **Required**. Car engine torque. |

### Update car

```http
  PUT /api/cars/update/${id}
```
`Route parameters`
| Params   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. Car id. |


`Multipart/form-data`
| Key   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `image`      | `file` | **Optional**. Car image file. |
| `name`      | `string` | **Optional**. Car name. |
| `model`      | `string` | **Optional**. Car model. |
| `year`      | `string` | **Optional**. Car launch year. |
| `transmission`      | `string` | **Optional**. Car transmission type. |
| `fuel`      | `string` | **Optional**. Car fuel types. |
| `power`      | `string` | **Optional**. Car engine power. |
| `torque`      | `string` | **Optional**. Car engine torque. |

### Delete car by Id

```http
  DELETE /api/cars/delete/${id}
```
`Route parameters`
| Params   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. Car id. |
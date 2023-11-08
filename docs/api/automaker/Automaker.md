
# API - Automaker

Endpoint URL: ${**baseURL**}/api/automakers/


## API routes

### Get all automakers

```http
  GET /api/automaker
```

### Get automaker by id

```http
  GET /api/automaker/${id}
```
`Route parameters`
| Params   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. Automaker id. |


### Create automaker

```http
  POST /api/automaker/create
```

`Multipart/form-data`
| Key   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Required**. Automaker name. |
| `logo`      | `file` | **Required**. Automaker image file. |

### Update automaker

```http
  PUT /api/automaker/update/${id}
```
`Route parameters`
| Params   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. Automaker id. |



`Multipart/form-data`
| Key   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Optional**. Automaker name. |
| `logo`      | `file` | **Optional**. Automaker image file. |

### Delete automaker by Id

```http
  DELETE /api/automakers/delete/${id}
```
`Route parameters`
| Params   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. Car id. |


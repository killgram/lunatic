# lunatic

## _Intro_

A small service for waking up third-party services and logging private actions

## _Tech_

The following technologies and libraries were used in the development:

- [node.JS](https://github.com/nodejs)
- [cors](https://github.com/expressjs/cors)
- [express](https://github.com/expressjs/express)
- [prettier](https://github.com/prettier/prettier)
- [body-parser](https://github.com/expressjs/body-parser)
- [ts-node](https://github.com/TypeStrong/ts-node)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)
- [typescript](https://github.com/Microsoft/TypeScript)
- [axios](https://github.com/axios/axios)
- [morgan](https://www.npmjs.com/package/morgan)
- [megajs](https://github.com/qgustavor/mega)
- [redis](https://github.com/redis/node-redis)
- [response-time](https://github.com/expressjs/response-time)
- [toad-scheduler](https://github.com/kibertoad/toad-scheduler)

#### GET
> `/status`

> `/getLinks`

| Parameter       | Type     | Description                        |
|:----------------|:---------|:-----------------------------------|
| `Authorization` | `Bearer` | **Required**. Header, access token |

> `/getLogs`

| Parameter       | Type     | Description                        |
|:----------------|:---------|:-----------------------------------|
| `day`           | `string` | **Required**. Chose day            |
| `month`         | `string` | **Required**. Chose month          |
| `year`          | `string` | **Required**. Chose year           |
| `Authorization` | `Bearer` | **Required**. Header, access token |

> `/getDBLogs`

| Parameter       | Type     | Description                        |
|:----------------|:---------|:-----------------------------------|
| `Authorization` | `Bearer` | **Required**. Header, access token |

#### POST

> `/setLink`

| Parameter         | Type     | Description                        |
|:------------------|:---------|:-----------------------------------|
| `Authorization`   | `Bearer` | **Required**. Header, access token |
| `link`            | `string` | **Required**. Setup link           |

> `/deleteLink`

| Parameter       | Type     | Description                        |
|:----------------|:---------|:-----------------------------------|
| `Authorization` | `Bearer` | **Required**. Header, access token |
| `link`          | `string` | **Required**. Delete link          |

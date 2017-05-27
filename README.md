# hydra-dashboard
Hydra cluster dashboard application.

## Usage
```bash
  [GET]/srvs/:service/routes
  [GET]/srvs
  [GET]/srvs/:service/health
  [GET]/nodes
```

### List all services
`[GET]/srvs`
```json
[
    {
        "serviceName": "hydra-dashboard",
        "type": "restana",
        "available": true
    }
]
```

### List service routes
`[GET]/srvs/:service/routes`
```json
[
  "[GET]/srvs/:service/routes",
  "[GET]/srvs",
  "[GET]/srvs/:service/health",
  "[GET]/nodes"
]
```

### List service health entries
`[GET]/srvs/:service/health`
```json
[
  {
    "updatedOn": "2017-05-21T08:21:33.456Z",
    "serviceName": "hydra-dashboard",
    "instanceID": "73909f8c96a9d08e876411c0a212a1f4",
    "sampledOn": "2017-05-21T08:21:33.456Z",
    "processID": 50441,
    "architecture": "x64",
    "platform": "darwin",
    "nodeVersion": "v7.10.0",
    "memory": {
      "rss": 43618304,
      "heapTotal": 19316736,
      "heapUsed": 16732064,
      "external": 59848
    },
    "uptimeSeconds": 320.534
  }
]
```

### List cluster nodes
`[GET]/nodes`
```json
[
  {
    "serviceName": "hydra-dashboard",
    "serviceDescription": "Hydra cluster dashboard application.",
    "version": "1.0.0",
    "instanceID": "73909f8c96a9d08e876411c0a212a1f4",
    "updatedOn": "2017-05-25T15:30:32.395Z",
    "processID": 2758,
    "ip": "127.0.0.1",
    "port": "5000",
    "elapsed": 0
  }
]
```
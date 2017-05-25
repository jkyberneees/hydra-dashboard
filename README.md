# hydra-dashboard
Hydra cluster dashboard application.

## Usage
```bash
  [GET]/srv/:service/routes
  [GET]/srv
  [GET]/srv/:service/nodes
```

### List all services
`[GET]/srv`
```bash
GET /srv HTTP/1.1
Host: localhost:5000
```
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
`[GET]/srv/:service/routes`
```bash
GET /srv/hydra-dashboard/routes HTTP/1.1
Host: localhost:5000
```
```json
[
  "[GET]/srv/:service/routes",
  "[GET]/srv",
  "[GET]/srv/:service/health",
  "[GET]/node"
]
```

### List service health entries
`[GET]/srv/:service/health`
```bash
GET /srv/hydra-dashboard/health HTTP/1.1
Host: localhost:5000
```
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
`[GET]/node`
```bash
GET /node HTTP/1.1
Host: localhost:5000
```
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
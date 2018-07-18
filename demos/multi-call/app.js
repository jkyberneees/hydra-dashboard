const Koa = require('koa')
const KoaRouter = require('koa-router')
const axios = require('axios')

const HOSTNAME = process.env.HOSTNAME || '127.0.0.1'
const PORT = process.env.PORT || 3003

const service = new Koa()
const router = KoaRouter()

const gateway = axios.create({
  baseURL: 'http://localhost:5000'
})

router.get('/complex', async (ctx) => {
  const options = {
    headers: {
      'x-request-id': ctx.headers['x-request-id']
    }
  }
  const responses = []

  responses.push((await gateway.post('/v1/login', {}, options)).data)
  responses.push((await gateway.get('/v1/notes', options)).data)
  responses.push((await gateway.post('/v1/sendemail', {}, options)).data)

  ctx.body = responses
  ctx.status = 200
})

router.get('/_health', async (ctx) => {
  ctx.status = 200
})

service.use(router.routes())

// starting koa server
const server = service.listen(PORT, HOSTNAME)

// integrating hydra
const HydraServiceFactory = require('hydra-integration').HydraServiceFactory

const factory = new HydraServiceFactory({
  hydra: {
    serviceName: 'complex-service',
    serviceDescription: 'Example koa service on top of Hydra',
    serviceIP: HOSTNAME,
    servicePort: PORT,
    serviceType: 'koa',
    serviceVersion: '1.0.0',
    redis: {
      host: '127.0.0.1',
      port: 6379,
      db: 15
    }
  }
})

// sync express
factory
  .init()
  .then(() => factory.sync(service))
  .catch(console.error)

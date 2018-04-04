import Router from 'koa-router'
import sha1 from 'sha1'
import config from '../config'

export const router = app => {
  const router = new Router()
  router.get('/wechat', (ctx, next) => {
    const token = config.wechat.token
    const {
      signature,
      nonce,
      timestamp,
      echostr
    } = ctx.query
    const str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)
    console.log(signature)
    if (signature === sha) {
      ctx.body = echostr
    } else {
      ctx.body = signature + ' sssssssss ' + sha
    }
  })

  // router.post('wechat-hear', (ctx, next) => {

  // })

  app.use(router.routes())
  app.use(router.allowedMethods())
}

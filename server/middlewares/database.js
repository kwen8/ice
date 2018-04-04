import mongoose from 'mongoose'
import config from '../config'
import fs from 'fs'
import { resolve } from 'path'
const models = resolve(__dirname, '../database/schema')

fs.readdirSync(models)
  .filter(files => ~files.search(/^[^\.].*\.js$/))
  .forEach(file => require(resolve(models, file)))

export const database = app => {
  mongoose.set('debug', true)

  mongoose.connect(config.db)

  mongoose.connection.on('disconnect', () => {
    mongoose.connect(config.db)
  })

  mongoose.connection.on('error', error => {
    console.error(error)
  })

  mongoose.connection.on('open', async => {
    console.log('connect to mongoDB', config.db)
  })
}

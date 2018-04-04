import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Token = new Schema({
  name: String,
  token: String,
  expires_in: Number,
  meta: {
    created_at: {
      types: Date,
      default: Date.now
    },
    updated_at: {
      types: Date,
      default: Date.now
    }
  }
})

Token.pre('save', function (next) {
  if (this.new) {
    this.meta.created_at = this.meta.updated_at = Date.now()
  } else {
    this.meta.updated_at = Date.now()
  }
  next()
})

Token.statics = {
  async getAccessToken() {
    return this.findOne({ name: 'access_token' }).exec()
  },
  async saveAccessToken(data) {
    let token = await this.findOne({ name: 'access_token' }).exec()
    if (token) {
      token.token = data.access_token
      token.expires_in = data.expires_in
    } else {
      token = new Token({
        name: 'access_token',
        expires_in: data.expires_in,
        token: data.token
      })
    }
    try {
      token.save()
    } catch (e) {
      console.log('存储失败')
      console.log(e)
    }
  }
}

mongoose.model('Token', Token)

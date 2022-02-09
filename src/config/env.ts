import { secret, strictVerify } from 'env-verifier'

const env = strictVerify({
  token: secret('DISCORD_TOKEN'),
  channels: {
    welcome: 'CHANNEL_WELCOME'
  },
  roles: {
    member: 'ROLE_MEMBER'
  }
})

export default env

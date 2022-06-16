import { secret, strictVerify, transform } from 'env-verifier'

const env = strictVerify({
  token: secret('DISCORD_TOKEN'),
  channels: {
    autoThreadingChannels: transform('AUTO_THREADING_CHANNELS', s => s.split(',').map(v => v.trim())),
    welcome: 'CHANNEL_WELCOME'
  },
  roles: {
    member: 'ROLE_MEMBER'
  }
})

export default env

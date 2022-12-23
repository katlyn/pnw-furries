import { secret, strictVerify, transform } from "env-verifier"

const env = strictVerify({
  token: secret("DISCORD_TOKEN"),
  channels: {
    welcome: "CHANNEL_WELCOME"
  },
  roles: {
    member: "ROLE_MEMBER"
  },
  qotd: {
    channels: transform("QOTD_CHANNELS",v => v.split(/(,\w*)/)),
    maxAge: transform("QOTD_MAX_AGE", Number)
  }
})

export default env

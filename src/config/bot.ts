import { InteractionCommandClient } from 'detritus-client'
import { GatewayIntents } from 'detritus-client-socket/lib/constants'
import env from './env'

const client = new InteractionCommandClient(env.token.reveal(), {
  gateway: {
    intents: GatewayIntents.GUILDS | GatewayIntents.GUILD_MEMBERS | GatewayIntents.GUILD_MESSAGES
  }
})

export default client

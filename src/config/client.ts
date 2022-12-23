import { Client } from "oceanic.js"

import env from "./env"

const client = new Client({
  auth: `Bot ${env.token.reveal()}`,
  gateway: {
    intents: [ "GUILDS", "GUILD_MEMBERS" ]
  }
})

export default client

import { Client } from "oceanic.js"

import env from "./env"

const client = new Client({
  auth: `Bot ${env.token.reveal()}`,
  gateway: {
    intents: [ "GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "MESSAGE_CONTENT" ]
  },
  allowedMentions: {
    users: false,
    roles: false,
    everyone: false,
    repliedUser: false
  }
})

export default client

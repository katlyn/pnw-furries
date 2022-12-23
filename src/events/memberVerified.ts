import { Client } from "oceanic.js"

import env from "../config/env"

const init = (client: Client): void => {
  client.on("guildMemberUpdate", async (member, old) => {
    if (old === null) {
      // We don't have them cached, can't determine their verification. guildCreate.ts caches all members on startup to
      // try to alleviate this.
      return
    }
    if (!old.roles.includes(env.roles.member) && member.roles.includes(env.roles.member)) {
      await client.rest.channels.createMessage(env.channels.welcome, {
        content: `${member.mention} has been verified!`
      })
    }
  })
}

export default {
  init
}

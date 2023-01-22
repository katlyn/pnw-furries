import { Client } from "oceanic.js"

const init = (client: Client): void => {
  client.once("ready", () => {
    client.guilds.forEach(async g => {
      await g.fetchMembers()
      console.log(`[Member cache] Cached members from ${g.name} (${g.id})`)
    })
  })
}

export default {
  init
}

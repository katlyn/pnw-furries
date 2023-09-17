import { Client } from "oceanic.js"


const init = (client: Client): void => {
  client.once("ready", () => {
    console.log(`[INFO] Connected to Discord as ${client.user.tag ?? "unknown application"}. Using ${client.shards.size} shards.`)
  })

  client.on("ready", () => {
    client.guilds.forEach(async g => {
      await g.fetchMembers()
      console.log(`[Member cache] Cached members from ${g.name} (${g.id})`)
    })
  })
}

export default {
  init
}

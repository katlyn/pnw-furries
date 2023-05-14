import commands from "./commands"
import client from "./config/client"
import events from "./events/index"


// Exit (somewhat) gracefully
process.on("SIGTERM", () => {
  client.disconnect(false)
})
client.on("error", () => {
  client.disconnect(false)
})
// FIXME: Errors and unhandled rejections still need to be caught and handled gracefully. For now, we're just letting
//  the bot crash.

;(async () => {
  commands.init()
  events.init(client)

  await client.once("ready", () => {
    console.log(`[INFO] Connected to Discord as ${client.user.tag ?? "unknown application"}. Using ${client.shards.size} shards.`)
  })
    .connect()
})()
  .catch(console.error)

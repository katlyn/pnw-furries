import client from "./config/client"
import events from "./events/index"


// Exit (somewhat) gracefully
process.on("SIGTERM", () => {
  client.disconnect(false)
})
// FIXME: Errors and unhandled rejections still need to be caught and handled gracefully. For now, we're just letting
//  the bot crash.

;(async () => {
  events.init(client)

  await client.once("ready", () => {
    console.log(`Connected to Discord as ${client.user.tag ?? "unknown application"}. Using ${client.shards.size} shards.`)
  })
    .connect()
})()
  .catch(console.error)

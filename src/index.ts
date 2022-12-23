import client from "./config/client"
import events from "./events/index"


// Exit (somewhat) gracefully
process.on("SIGTERM", () => {
  client.disconnect(false)
}).on("unhandledRejection", (err, promise) => {
  console.error("Unhandled Rejection:", err, promise)
})
  .on("uncaughtException", err => {
    console.error("Uncaught Exception:", err)
  })

;(async () => {
  events.init(client)

  await client.once("ready", () => {
    console.log(`Connected to Discord as ${client.user.tag ?? "unknown application"}. Using ${client.shards.size} shards.`)
  })
    .connect()
})()
  .catch(console.error)

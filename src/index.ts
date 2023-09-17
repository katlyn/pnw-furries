import type { Server as HttpServer } from "node:http"
import type { Http2SecureServer, Http2Server } from "node:http2"
import type { Server as HttpsServer } from "node:https"

import commands from "./commands"
import client from "./config/client"
import events from "./events/index"

void (async () => {
  process.on("unhandledRejection", (err, promise) => console.error("Unhandled Rejection:", err, promise))
  process.on("uncaughtException", err => console.error("Uncaught Exception:", err))

  // Exit (somewhat) gracefully
  function gracefulExit (signal: string) {
    client.disconnect(false)
    statusServer?.close()
    process.kill(process.pid, signal)
  }
  process.on("SIGINT", gracefulExit)
  process.on("SIGTERM", gracefulExit)

  // Register all event handlers
  commands.init()
  events.init(client)

  await client.connect()

  type AnyServer = HttpServer | HttpsServer | Http2Server | Http2SecureServer
  let statusServer: AnyServer|undefined
  if (process.env.DOCKER === "TRUE") {
    console.log("[INFO] Docker detected, starting status server")
    const { default: StatusServer } = await import("@uwu-codes/status-server")
    statusServer = StatusServer(() => client.ready)
  }
})()

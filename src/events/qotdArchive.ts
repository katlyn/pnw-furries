import { Base, Client } from "oceanic.js"

import env from "../config/env"

const ARCHIVE_INTERVAL = 60 * 1000

const init = (client: Client): void => {
  // Convert max age from minutes to ms
  const maxInactiveTime = env.qotd.maxAge * 60 * 1000

  const archiveTask = async () => {
    // The initial date that all threads will be compared to
    const now = new Date()

    // Since threads aren't cached how we'd expect, fetch the active threads for each guild and iterate over the results
    for await (const [ _, guild ] of client.guilds) {

      const activeThreads = await guild.getActiveThreads()

      for (const thread of activeThreads.threads) {
        // Check if the thread is in a QOTD channel
        if (!env.qotd.channels.includes(thread.parentID)) {
          continue
        }

        // If there's for some reason no messages in the thread, use its creation date as the timestamp for last
        // activity
        const lastId = thread.lastMessageID ?? thread.id
        const lastActive = Base.getCreatedAt(lastId)

        // Get the millis since the thread was last active
        const timeSinceActive = now.getTime() - lastActive.getTime()

        // If the thread has been inactive longer than the allowed time, archive it.
        if (timeSinceActive > maxInactiveTime) {
          console.log(`[QOTD Archive] Archived ${thread.name} (${thread.id})`)
          void thread.edit({
            archived: true
          })
        }
      }
    }
  }

  // Run the archive task on a set interval
  setInterval(archiveTask, ARCHIVE_INTERVAL)

  // Run the task once the bot is ready
  client.once("ready", archiveTask)
}

export default {
  init
}

import { ClusterClient, ShardClient } from 'detritus-client'
import { ClientEvents } from 'detritus-client/lib/constants'
import env from '../config/env'

const init = (bot: ClusterClient|ShardClient): void => {
  bot.on(ClientEvents.MESSAGE_CREATE, async ({ message }) => {
    if (env.channels.autoThreadingChannels.includes(message.channelId)) {
      let threadName = message.convertContent({
        nick: false
      })
      // Thread names can only be 100 characters, trim things down if it's too long
      if (threadName.length > 100) {
        threadName = threadName.substring(0, 97) + '...'
      }
      await message.createThread({
        name: threadName,
        // Auto archive after one day of inactivity
        autoArchiveDuration: 1440
      })
    }
  })
}

export default {
  init
}

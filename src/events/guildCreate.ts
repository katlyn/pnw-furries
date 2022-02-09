import { ClusterClient, ShardClient } from 'detritus-client'
import { ClientEvents } from 'detritus-client/lib/constants'

const init = (bot: ClusterClient|ShardClient): void => {
  bot.on(ClientEvents.GUILD_CREATE, g => {
    void g.guild.requestMembers({ limit: 0, query: '' })
      .then(() => console.log(`Cached members from ${g.guild.id}`))
  })
}

export default {
  init
}

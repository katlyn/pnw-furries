import { ClusterClient, ShardClient } from 'detritus-client'
import { ClientEvents } from 'detritus-client/lib/constants'
import env from '../config/env'

const init = (bot: ClusterClient|ShardClient): void => {
  bot.on(ClientEvents.GUILD_MEMBER_UPDATE, async ({ old, member }) => {
    if (old === null) {
      // We don't have them chached, can't determine their verification
      return
    }
    if (!old.roles.has(env.roles.member) && member.roles.has(env.roles.member)) {
      await bot.rest.createMessage(env.channels.welcome, `${member.mention} has been verified!`)
    }
  })
}

export default {
  init
}

import { ClusterClient, ShardClient } from 'detritus-client'
import autoThreading from './autoThreading'
import guildCreate from './guildCreate'
import memberVerified from './memberVerified'

const init = (bot: ClusterClient|ShardClient): void => {
  autoThreading.init(bot)
  guildCreate.init(bot)
  memberVerified.init(bot)
}

export default {
  init
}

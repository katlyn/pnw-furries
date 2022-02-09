import { ClusterClient, ShardClient } from 'detritus-client'
import guildCreate from './guildCreate'
import memberVerified from './memberVerified'

const init = (bot: ClusterClient|ShardClient): void => {
  guildCreate.init(bot)
  memberVerified.init(bot)
}

export default {
  init
}

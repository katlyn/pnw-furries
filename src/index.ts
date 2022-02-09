import { ClusterClient } from 'detritus-client'
import 'source-map-support/register'

import bot from './config/bot'
import events from './events'

(async () => {
  // Exit (somewhat) gracefully
  process.on('SIGTERM', () => {
    bot.kill()
  })

  events.init(bot.client)

  await bot.addMultipleIn('commands')
  const cluster = await bot.run() as ClusterClient

  const shard = cluster.shards.first()
  console.log(`Connected to Discord as ${shard?.application?.name ?? 'unknown application'}. Using ${cluster.shardCount} shards.`)
})()
  .catch(console.error)

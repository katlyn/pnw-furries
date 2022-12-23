import { Client } from "oceanic.js"

const init = (bot: Client): void => {
  bot.once("ready", () => {
    bot.guilds.forEach(async g => {
      await g.fetchMembers()
      console.log(`Cached members from ${g.name} (${g.id})`)
    })
  })
}

export default {
  init
}

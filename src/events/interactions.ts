import { Client, InteractionTypes } from "oceanic.js"

import InteractionHandler from "../util/interactionHandler"

const init = (client: Client): void => {
  client.once("ready", () => InteractionHandler.sync(client))
  client.on("interactionCreate", async interaction => {
    if (interaction.type === InteractionTypes.APPLICATION_COMMAND) {
      console.log(`[Interactions/${interaction.data.name}]: Issued by ${interaction.user.tag} (${interaction.user.id})`)
      await InteractionHandler.handle(client, interaction)
    }

    // TODO: Handle autocomplete interactions
  })
}

export default {
  init
}

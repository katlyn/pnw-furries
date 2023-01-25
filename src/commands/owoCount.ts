import { ApplicationCommandTypes, CommandInteraction, MessageFlags } from "oceanic.js"

import env from "../config/env"
import prisma from "../config/prisma"
import { isUser } from "../util/guards"
import InteractionHandler, { InteractionCommand } from "../util/interactionHandler"

class OwoCount extends InteractionCommand {
  description = ""
  name = "Get owo count"
  type = ApplicationCommandTypes.USER

  async run (interaction: CommandInteraction) {
    if (!isUser(interaction.data.target)) {
      await interaction.createMessage({
        content: "I couldn't find that user! This is probably a bug.",
        flags: MessageFlags.EPHEMERAL
      })
      return
    }
    const userData = await prisma.user.findFirst({
      where: {
        id: BigInt(interaction.data.target.id)
      }
    })

    let channelMessage = ""
    if (interaction.channelID !== env.channels.bot) {
      channelMessage = `\nWant this message to be visible by everyone? Use the command in <#${env.channels.bot}>!`
    }

    if (userData == null) {
      await interaction.createMessage({
        content: `${interaction.data.target.mention} has never said owo or uwu! Are they really even a furry?${channelMessage}`,
        flags: interaction.channelID !== env.channels.bot ? MessageFlags.EPHEMERAL : 0
      })
    } else {
      await interaction.createMessage({
        content: `${interaction.data.target.mention} has owo'd ${userData.owos} times and uwu'd ${userData.uwus} times.${channelMessage}`,
        allowedMentions: { users: false },
        flags: interaction.channelID !== env.channels.bot ? MessageFlags.EPHEMERAL : 0
      })
    }
  }
}

const init = () => {
  InteractionHandler.register(OwoCount)
}

export default {
  init
}

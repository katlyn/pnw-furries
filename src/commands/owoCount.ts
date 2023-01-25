import { ApplicationCommandBuilder } from "@oceanicjs/builders"
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  CommandInteraction,
  MessageFlags,
  User
} from "oceanic.js"

import env from "../config/env"
import prisma from "../config/prisma"
import { isUser } from "../util/guards"
import InteractionHandler, { InteractionCommand } from "../util/interactionHandler"

async function sendResponse (interaction: CommandInteraction, user?: User) {
  if (!isUser(user)) {
    await interaction.createMessage({
      content: "I couldn't find that user! This is probably a bug.",
      flags: MessageFlags.EPHEMERAL
    })
    return
  }
  const userData = await prisma.user.findFirst({
    where: {
      id: BigInt(user.id)
    }
  })

  let content = userData == null
    ? `${user.mention} has never said owo or uwu! Are they really even a furry?`
    : `${user.mention} has owo'd ${userData.owos} times and uwu'd ${userData.uwus} times.`

  if (interaction.channelID !== env.channels.bot) {
    content += `\nWant this message to be visible by everyone? Use the command in <#${env.channels.bot}>!`
  }

  await interaction.createMessage({
    content,
    flags: interaction.channelID !== env.channels.bot ? MessageFlags.EPHEMERAL : 0
  })
}

class OwoCount extends InteractionCommand {
  description = ""
  name = "Get owo count"
  type = ApplicationCommandTypes.USER

  async run (interaction: CommandInteraction) {
    await sendResponse(interaction, interaction.data.target as User)
  }
}

class ChatOwoCount extends InteractionCommand {
  description = "See how many times a user has said owo or uwu"
  name = "owocount"
  type = ApplicationCommandTypes.CHAT_INPUT

  setOptions (command: ApplicationCommandBuilder) {
    command.addOption({
      type: ApplicationCommandOptionTypes.USER,
      name: "user",
      description: "The user to look up",
      required: false
    })
  }

  async run (interaction: CommandInteraction) {
    const user = interaction.data.options.getUser("user") ?? interaction.user
    await sendResponse(interaction, user)
  }
}

const init = () => {
  InteractionHandler.register(OwoCount)
  InteractionHandler.register(ChatOwoCount)
}

export default {
  init
}

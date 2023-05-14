import { Client, CreateMessageOptions } from "oceanic.js"

import env from "../config/env"
import prisma from "../config/prisma"

const introMessage: CreateMessageOptions = {
  "content": "Welcome to Pacific Northwest Furries!",
  "embeds": [
    {
      "description": "Those waiting on verification, please double check the <#380463528483487744> to make sure you have everything, and don't forget to grab <#611658298420363274>!",
      "color": 0x0c8b2e
    }
  ]
}
const init = (client: Client): void => {
  client.on("messageCreate", async message => {
    if (message.channelID === env.channels.introduction && !message.author.bot) {
      const oldMessage = await prisma.introMessage.findFirst()
      if (oldMessage !== null) {
        await client.rest.channels.deleteMessage(env.channels.introduction, oldMessage.id.toString())
      }
      const newMessage = await client.rest.channels.createMessage(env.channels.introduction, introMessage)
      await prisma.introMessage.upsert({
        where: oldMessage ?? { id: BigInt(newMessage.id) },
        update: { id: BigInt(newMessage.id) },
        create: { id: BigInt(newMessage.id) }
      })
      console.log("[Intro Message] Intro message reposted")
    }
  })
}

export default {
  init
}

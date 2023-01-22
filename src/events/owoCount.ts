import { Client } from "oceanic.js"

import prisma from "../config/prisma"

const owoCheck = /(?:^|\s)((?:\(\s?)?[oòóõō0°][wω][oòóõō0°](?:\s?\)|[~;:'"]+)?)(?=[\s.!?-]|$)/gi
const uwuCheck = /(?:^|\s)((?:\(\s?)?[uùúũū][wω][uùúũū](?:\s?\)|[~;:'"]+)?)(?=[\s.!?-]|$)/gi

const init = (client: Client): void => {
  client.on("messageCreate", async message => {
    const owos = message.content.match(owoCheck) ?? []
    const uwus = message.content.match(uwuCheck) ?? []

    // Only run the database transaction if there are counts to add
    if (owos.length === 0 && uwus.length === 0) {
      return
    }

    await prisma.user.upsert({
      where: {
        id: BigInt(message.author.id)
      },
      update: {
        owos: { increment: owos.length },
        uwus: { increment: uwus.length }
      },
      create: {
        id: BigInt(message.author.id),
        owos: owos.length,
        uwus: uwus.length
      }
    })
  })
}

export default {
  init
}

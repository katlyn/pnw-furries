import { Client } from "oceanic.js"

import guildCreate from "./guildCreate"
import memberVerified from "./memberVerified"
import qotdArchive from "./qotdArchive"

const init = async (client: Client): Promise<void> => {
  await guildCreate.init(client)
  await memberVerified.init(client)
  await qotdArchive.init(client)
}

export default {
  init
}

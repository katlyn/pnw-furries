import { Client } from "oceanic.js"

import guildCreate from "./guildCreate"
import interactions from "./interactions"
import memberVerified from "./memberVerified"
import owoCount from "./owoCount"
import qotdArchive from "./qotdArchive"

const init = (client: Client): void => {
  guildCreate.init(client)
  interactions.init(client)
  memberVerified.init(client)
  owoCount.init(client)
  qotdArchive.init(client)
}

export default {
  init
}

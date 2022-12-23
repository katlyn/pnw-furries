import { Client } from "oceanic.js"

import guildCreate from "./guildCreate"
import memberVerified from "./memberVerified"
import qotdArchive from "./qotdArchive"

const init = (client: Client): void => {
  guildCreate.init(client)
  memberVerified.init(client)
  qotdArchive.init(client)
}

export default {
  init
}

import { Client } from "oceanic.js"

import guildCreate from "./guildCreate"
import memberVerified from "./memberVerified"

const init = (client: Client): void => {
  guildCreate.init(client)
  memberVerified.init(client)
}

export default {
  init
}

import { Client } from "oceanic.js"

import interactions from "./interactions"
import introductionMessage from "./introductionMessage"
import memberVerified from "./memberVerified"
import owoCount from "./owoCount"
import qotdArchive from "./qotdArchive"
import ready from "./ready"

const init = (client: Client): void => {
  ready.init(client)
  interactions.init(client)
  introductionMessage.init(client)
  memberVerified.init(client)
  owoCount.init(client)
  qotdArchive.init(client)
}

export default {
  init
}

import { AnyChannel, ChannelTypes, ForumChannel } from "oceanic.js"

export const isForumChannel = (channel?: AnyChannel): channel is ForumChannel => {
  return channel == null ? false : channel.type === ChannelTypes.GUILD_FORUM
}

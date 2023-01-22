// Adapted from https://github.com/OceanicJS/Bot/blob/master/src/util/Commands.ts and
// https://github.com/OceanicJS/Bot/blob/master/src/util/Command.ts, licensed under the MIT license.

import { ApplicationCommandBuilder } from "@oceanicjs/builders"
import {
  ApplicationCommandTypes,
  Client,
  CommandInteraction,
  MessageFlags,
  Permission,
  PermissionName
} from "oceanic.js"

export abstract class InteractionCommand {
  defaultMemberPermissions?: bigint | string | Permission | Array<PermissionName>
  descriptionLocalizations?: Record<string, string>
  dmPermission?: boolean
  nameLocalizations?: Record<string, string>
  abstract description: string
  abstract name: string
  abstract type: ApplicationCommandTypes

  abstract run (this: Client, interaction: CommandInteraction): Promise<void> | void;

  setOptions? (command: ApplicationCommandBuilder): void;

  toJSON () {
    const builder = new ApplicationCommandBuilder(this.type, this.name)
      .setDescription(this.description)
    this.setOptions?.(builder)
    if (this.defaultMemberPermissions !== undefined) {
      builder.setDefaultMemberPermissions(this.defaultMemberPermissions)
    }
    if (this.descriptionLocalizations !== undefined) {
      builder.setDescriptionLocalizations(this.descriptionLocalizations)
    }
    if (this.dmPermission !== undefined) {
      builder.setDMPermission(this.dmPermission)
    }
    if (this.nameLocalizations !== undefined) {
      builder.setNameLocalizations(this.nameLocalizations)
    }
    return builder.toJSON()
  }
}

class EmptyCommand extends InteractionCommand {
  description = "This command is empty."
  name = "empty"
  type = ApplicationCommandTypes.CHAT_INPUT

  run () {
    throw new Error("This command is empty.")
  }
}

export default class InteractionHandler {
  static commands = new Map<string, InteractionCommand>()

  static async handle (client: Client, interaction: CommandInteraction) {
    const command = this.commands.get(interaction.data.name)
    await (command ? command.run.call(client, interaction) : interaction.createMessage({
      content: "I couldn't figure out how to execute that command.",
      flags: MessageFlags.EPHEMERAL
    }))
  }

  static register (CommandClass: typeof EmptyCommand) {
    const command = new CommandClass()
    this.commands.set(command.name, command)
  }

  static async sync (client: Client) {
    // TODO: It'd be neat if this handled both global and guild commands
    const commands = this.toJSON()
    if (process.env.NODE_ENV === "development" && process.env.DEV_GUILD === void 0) {
      throw new Error("InteractionHandler: No development guild specified in dev mode")
    }

    try {
      if (process.env.NODE_ENV === "development") {
        await client.application.bulkEditGuildCommands(process.env.DEV_GUILD as string, commands)
      } else {
        await client.application.bulkEditGlobalCommands(commands)
      }
    } catch (err) {
      console.log("Command registration error, index list:")
      console.log(commands.map((c, i) => `${i}: ${c.name}`).join("\n"))
      throw err
    }
  }

  static toJSON () {
    return Array.from(this.commands.values()).map(command => command.toJSON())
  }
}

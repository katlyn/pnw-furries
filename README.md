# PNW Furries
A small utility Discord bot for the Pacific Northwest Furries server.

Currently the following utilities are implemented:
- Member welcome messages on membership approval
- Automatically archive threads in specified Question of the Day channel

The following environment variables are required for configuring bot functionality:
- `DISCORD_TOKEN`: The bot authentication token
- `CHANNEL_WELCOME`: The channel that welcome messages should be sent in
- `ROLE_MEMBER`: The role that will be assigned to approved members
- `QOTD_CHANNELS`: The channels that threads will be automatically archived in
- `QOTD_MAX_AGE`: The time that a thread needs to be inactive before it will be archived

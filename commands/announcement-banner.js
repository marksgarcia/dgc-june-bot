const { dirname } = require("path");
const appDir = dirname(require.main.filename);
const {
  AttachmentBuilder,
  Client,
  EmbedBuilder,
  SlashCommandBuilder,
  GatewayIntentBits,
} = require("discord.js");
const axios = require("axios");
const { getEnvData } = require("../utils/helpers");
const { token } = getEnvData(process, "../config.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("announcement-banner")
    .setDescription(
      "Generate a banner to accounce stuff in the current channel"
    )
    .addStringOption((option) =>
      option
        .setName("announcement_title")
        .setDescription("Title your announcement")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("announcement_description")
        .setDescription("Give a detailed description for your announcement.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("announcement_image")
        .setDescription(
          "Provide a link to an image that you would like included as the announcement thumbnail"
        )
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("announcement_link")
        .setDescription("Provide a relevant link for the game.")
        .setRequired(false)
    )
    .addStringOption((option) =>
    option
      .setName("due_date")
      .setDescription("If the assignment has a due date, add it here.")
      .setRequired(false)
  )
    .addStringOption((option) =>
      option
        .setName("play_to")
        .setDescription("If a game club announcement give details on where to stop this session.")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("game_name")
        .setDescription("If this is a gameclub announcement, provide the game name here.")
        .setRequired(false)
    ),
  async execute(interaction) {
    const title = interaction.options.getString("announcement_title");
    const description = interaction.options.getString(
      "announcement_description"
    );
    const game_name = interaction.options.getString("game_name")
    const link = interaction.options.getString("announcement_link");
    const input_image = interaction.options.getString("announcement_image");
    const input_image_extension = input_image ? input_image.split(".") : "";
    const image = input_image
      ? new AttachmentBuilder(input_image, {
          name: `image.${input_image_extension.slice(-1)[0]}`,
        })
      : new AttachmentBuilder(`${appDir}/assets/announcement-default.png`);
      const due_date = interaction.options.getString("due_date")
      const play_to = interaction.options.getString("play_to")
    const announcementEmbed = new EmbedBuilder()
      .setTitle(title)
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
        url: `https://discordapp.com/users/${interaction.user.id}`
      })
      .setDescription(description)

    if (link) {
      announcementEmbed.addFields({ name: `More Details${ game_name ? " on " + game_name : ":"}:`, value: link });
    }

    if (due_date) {
        announcementEmbed.addFields({ name: "Complete By:", value: due_date });
    }

    if (play_to) {
        announcementEmbed.addFields({ name: "Point in Game to Play To:", value: play_to, url: 'https://www.google.com' });
    }

    announcementEmbed.setImage(
        input_image
          ? `attachment://${image.name}`
          : `attachment://announcement-default.png`
      )
      .setTimestamp();
    await interaction.reply({
      embeds: [announcementEmbed],
      files: [image],
    });
  },
};
// https://assets-prd.ignimgs.com/2022/01/26/supermariorpg-sq-1643215850430.jpg announcement_link:
// https://www.ign.com/games/super-mario-rpg-legend-of-the-seven-stars
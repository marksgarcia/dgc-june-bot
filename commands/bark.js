const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("bark")
    .setDescription(
      "Makes June Bot bark and interrupt conversations on discord. Just like she does on the podcast!"
    )
    .addStringOption((option) =>
      option
        .setName("number_of_barks")
        .setDescription(
          "How many times would you like June to bark? Choose anywhere from 1 - 20."
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const numberOfBarks = interaction.options.getString("number_of_barks");
    const getBarks = () => {
      let barks = "";
      let numOfBarks = numberOfBarks;
      if (numOfBarks < 1) {
        numOfBarks = 1;
      } else if (numOfBarks > 20) {
        numOfBarks = 20;
      }
      for (let i = 1; i <= numOfBarks; i++) {
        if (i < 6) {
          barks += "bark ";
        } else if (i < 11) {
          barks += "**bark** ";
        } else if (i < 16) {
          barks += "BARK ";
        } else {
          barks += "**BARK** ";
        }
      }
      return barks;
    };
    await interaction.reply(`${getBarks()}`);
  },
};

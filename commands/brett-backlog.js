const { SlashCommandBuilder } = require("discord.js");
const { BRETT_LIST } = require("../constants/backlogs");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("brett-gg-backlog")
    .setDescription(
      "Posts your well wishes to Brett on his achievement and provides a list of games still to beat."
    )
    .addStringOption((option) =>
      option
        .setName("achievement")
        .setDescription(
          "Wish Brett well on his most recent achievement. {ie. Awesome, you beat all Kingdom Hearts!}."
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const achievement = interaction.options.getString("achievement");
    const getGamestList = () => {
      let list = "";
      for (let [index, entry] of BRETT_LIST.entries()) {
        list += `\n${index + 1}. ${entry.game} ${entry.emoji}`;
      }
      return list;
    };
    await interaction.reply(
      `Hey, <@524351409181949998>! ${achievement}\nNeed a recommendation of another game to complete? Here are a few suggestions: ${getGamestList()}`
    );
  },
};

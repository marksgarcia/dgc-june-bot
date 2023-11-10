const { SlashCommandBuilder } = require("discord.js");
const { TIM_LIST } = require("../constants/backlogs");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("tim-gg-backlog")
    .setDescription(
      "Posts your well wishes to Tim on his achievement and provides a list of games still to beat."
    )
    .addStringOption((option) =>
      option
        .setName("achievement")
        .setDescription(
          "Wish Tim well on his most recent achievement. {ie. Congrats on completing Dark Souls!}."
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const achievement = interaction.options.getString("achievement");
    const getGamestList = () => {
      let list = "";
      for (let [index, entry] of TIM_LIST.entries()) {
        list += `\n${index + 1}. ${entry.game} ${entry.emoji}`;
      }
      return list;
    };
    await interaction.reply(
      `Hey, <@264571569576083458>! ${achievement}\nNeed a recommendation of another game to complete? Here are a few suggestions: ${getGamestList()}`
    );
  },
};

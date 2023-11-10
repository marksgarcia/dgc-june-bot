const { SlashCommandBuilder } = require("discord.js");
const { LEFT_HANDS, RIGHT_HANDS, TIM_HEADS } = require("../constants/emojis");

const getRandomIndex = (upperBound) => Math.floor(Math.floor(Math.random() * upperBound));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tim-moji")
    .setDescription("Create a randomized emoji of Tim with hands"),
  async execute(interaction) {
    const getTimMoji = () => {
        const left_hand = LEFT_HANDS[getRandomIndex(LEFT_HANDS.length)]
        const right_hand = RIGHT_HANDS[getRandomIndex(RIGHT_HANDS.length)]
        const tim = TIM_HEADS[getRandomIndex(TIM_HEADS.length)]
        return `${right_hand}${tim}${left_hand}`
    };
    await interaction.reply({ content: `${getTimMoji()}`, ephemeral: false});
  },
};
const { SlashCommandBuilder } = require("discord.js");
const { LEFT_HANDS, RIGHT_HANDS, BRETT_HEADS } = require("../constants/emojis");

const getRandomIndex = (upperBound) => Math.floor(Math.floor(Math.random() * upperBound));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("brett-moji")
    .setDescription("Create a randomized emoji of Brett with hands"),
  async execute(interaction) {
    const getBrettMoji = () => {
        const left_hand = LEFT_HANDS[getRandomIndex(LEFT_HANDS.length)]
        const right_hand = RIGHT_HANDS[getRandomIndex(RIGHT_HANDS.length)]
        const brett = BRETT_HEADS[getRandomIndex(BRETT_HEADS.length)]
        return `${right_hand}${brett}${left_hand}`
    };
    await interaction.reply({ content: `${getBrettMoji()}`, ephemeral: false});
  },
};
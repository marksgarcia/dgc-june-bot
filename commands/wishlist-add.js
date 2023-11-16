const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios")
const baseURL = 'http://june-bot.herokuapp.com/wishlist-add'

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wishlist-add")
    .setDescription("Add a game to the DGC community wishlist")
    .addStringOption((option) =>
    option
      .setName("game")
      .setDescription(
        "The name of the game you would like to add to the wishlist."
      )
      .setRequired(true)
  ),
  async execute(interaction) {
    const game = interaction.options.getString("game");
    const config = {
        method: 'post',
        url: baseURL,
        headers: {
            'Content-Type': 'application/json'
          },
        data: JSON.stringify({"game": game})
      };
    const getWishList = async () => {
        const response = await axios(config)
        const wishList = response.data
        return wishList;
    };
    await getWishList()

    await interaction.reply({content: `You have successfully added ${game} to the wishlist!`, ephemeral: true});
  },
};
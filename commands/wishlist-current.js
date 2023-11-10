const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios")
const baseURL = 'http://june-bot.herokuapp.com/wishlist-current'

const config = {
    method: 'get',
    url: baseURL,
    headers: { },
    data: undefined
  };

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wishlist-current")
    .setDescription("Privately view the current DGC community wishlist."),
  async execute(interaction) {
    const getWishList = async () => {
        const response = await axios(config)
        const wishList = response.data
        return wishList
    };
    const wishList = await getWishList()
    await interaction.reply({ content: `${wishList}`, ephemeral: true});
  },
};
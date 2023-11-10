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
    .setName("wishlist-show")
    .setDescription("Publicly post the current DGC Community wishlist to the wishlist channel"),
  async execute(interaction) {
    const getWishList = async () => {
        const response = await axios(config)
        const wishList = response.data
        return wishList
    };
    const wishList = await getWishList()
    await interaction.reply({ content: `The wishlist has been posted in <#1007099631907393547>. You can view it there!`, ephemeral: true});
    await interaction.guild.channels.cache.get('1007099631907393547').send({ content: `${wishList}`, ephemeral: false})
  },
};
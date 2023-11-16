const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const baseURL = "http://june-bot.herokuapp.com/wishlist-remove";

const getCurrentWishlistHandler = async () => {
  const currentListConfig = {
    method: "get",
    url: "http://june-bot.herokuapp.com/wishlist",
    headers: {},
    data: undefined,
  };
  const response = await axios(currentListConfig);
  return response.data;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wishlist-remove")
    .setDescription("Remove a game from the DGC community wishlist")
    .addStringOption((option) =>
      option
        .setName("game")
        .setDescription(
          "The name of the game you would like to remove from the wishlist."
        )
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const choices = await getCurrentWishlistHandler();
    const filteredLen = choices.filter((choice) =>
      choice.includes(focusedValue)
    ).length;
    let filtered =
      filteredLen < 25
        ? choices.filter((choice) => choice.includes(focusedValue))
        : choices.slice(0, 24);
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },

  async execute(interaction) {
    const game = interaction.options.getString("game");
    const currentWishlist = await getCurrentWishlistHandler();
    const config = {
      method: "post",
      url: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ game: game }),
    };
    const getWishList = async () => {
      const response = await axios(config);
      const wishList = response.data;
      return wishList;
    };
    await getWishList();
    const content = currentWishlist.includes(game)
      ? `You have successfully removed ${game} from the wishlist`
      : `${game} was not on the current wishlist.`;
    await interaction.reply({ content: content, ephemeral: true });
  },
};

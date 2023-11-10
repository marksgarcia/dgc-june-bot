const { dirname } = require("path");
const appDir = dirname(require.main.filename);
const { BOTS } = require("../constants/bots");
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
    .setName("whos-my-pokemon")
    .setDescription("Get the user's pokemon."),
  async execute(interaction) {
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
      ],
    });

    client.login(token);
    client.on("ready", async () => {
      const types = {
        Normal: "#A8A77A",
        Fire: "#EE8130",
        Water: "#6390F0",
        Electric: "#F7D02C",
        Grass: "#7AC74C",
        Ice: "#96D9D6",
        Fighting: "#C22E28",
        Poison: "#A33EA1",
        Ground: "#E2BF65",
        Flying: "#A98FF3",
        Psychic: "#F95587",
        Bug: "#A6B91A",
        Rock: "#B6A136",
        Ghost: "#735797",
        Dragon: "#6F35FC",
        Dark: "#705746",
        Steel: "#B7B7CE",
        Fairy: "#D685AD",
      };
      const guild = client.guilds.cache.get("801079899804794900");
      const members = await guild.members.fetch();
      const sorted = members.sort((a, b) => a.joinedAt - b.joinedAt);

      const isArtimage = false // interaction.user.username === "artimage";
      const updatedMembers = sorted.map((member) => member.user.username);
      const noBotMembers = updatedMembers.filter(
        (member) =>
          !BOTS.includes(member)
      );
      const pokemonIndex = noBotMembers.indexOf(interaction.user.username);
      const whosThatImage = new AttachmentBuilder(
        `${appDir}/assets/whos-that-pokemon.png`
      );
      const pokemonImage = new AttachmentBuilder(
        isArtimage
          ? `${appDir}/assets/shoe.png`
          : `${appDir}/assets/sprites/pokemon/other/showdown/${
              pokemonIndex + 1
            }.gif`
      );

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonIndex + 1}`,
        headers: {},
      };

      const response = await axios.request(config);
      let numberOfMoves = 0;
      const pokemonName = isArtimage
        ? "Shoe"
        : response?.data?.species?.name.charAt(0).toUpperCase() +
          response?.data?.species?.name.slice(1);
      let pokemonMoveList = "";
      if (isArtimage) {
        pokemonMoveList =
          "butt-kick, double-knot, orthopedic-pain, athletes-foot, sweat-odor, ";
      } else {
        response?.data?.moves.map((move) => {
          if (numberOfMoves < 10) {
            pokemonMoveList += `${move.move.name}, `;
            numberOfMoves++;
          }
          return move.move.name;
        });
      }
      const truncatedMoveList = pokemonMoveList.substring(0, pokemonMoveList.length - 2)
      const pokemonTypes = isArtimage
        ? "Footwear"
        : response?.data?.types.map(
            (type) =>
              type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
          );

      const name = isArtimage ? "Who's My Chinpokomon?" : "Who's My Pokemon?";
      const url = isArtimage
        ? "https://southpark.fandom.com/wiki/Chinpokomon_(Brand)"
        : `https://pokemon.fandom.com/wiki/${pokemonName}`;
      const pokemonEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(pokemonName)
        .setURL(url)
        .setAuthor({
          name,
          iconURL: `attachment://whos-that-pokemon.png`,
          url,
        })
        .setDescription(`**Type**: ${pokemonTypes}`)
        .addFields({
          name: "Move List",
          value: truncatedMoveList,
        })
        .setThumbnail(
          isArtimage
            ? `attachment://shoe.png`
            : `attachment://${pokemonIndex + 1}.gif`
        )
        .setTimestamp();

      await interaction.reply({
        embeds: [pokemonEmbed],
        files: [pokemonImage, whosThatImage],
        ephemeral: true,
      });
    });
  },
};

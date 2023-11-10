const { BOTS } = require("../constants/bots");
const {
  Client,
  SlashCommandBuilder,
  GatewayIntentBits,
} = require("discord.js");
const axios = require("axios");
const { getEnvData } = require("../utils/helpers");
const { token } = getEnvData(process, "../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user-dex")
    .setDescription(
      "Get a list of all users (no bots) and their respective pokemon."
    ),
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
      const guild = client.guilds.cache.get("801079899804794900");
      const members = await guild.members.fetch();
      let headerText =
        "<:PokeBall:1053186265702473758> **DGC User-dex** <:PokeBall:1053186265702473758>";
      let rankingsArray = [];
      const sorted = members.sort((a, b) => a.joinedAt - b.joinedAt);
      const updatedMembers = sorted.map((member) => member.user.username);
      const noBotMembers = updatedMembers.filter(
        (member) => !BOTS.includes(member)
      );

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://pokeapi.co/api/v2/pokemon?limit=${noBotMembers.length}`,
        headers: {},
      };

      const response = await axios.request(config);
      const pokemonArray = response.data.results;
      let currentText = "";
      for (let [index, member] of noBotMembers.entries()) {
        const isArtimage = false; // member === "artimage"
        const pokemonName =
          pokemonArray[index].name.charAt(0).toUpperCase() +
          pokemonArray[index].name.slice(1);
        const memberPokemon = `${"`" + member + "`"} - ${
          isArtimage ? "**Shoe**" : "**" + pokemonName + "**"
        }`;
        if (
          index % 50 === 0 &&
          index + 1 !== noBotMembers.length &&
          index !== 0
        ) {
          rankingsArray.push(currentText);
          currentText = "";
          currentText += `\n${index + 1}. ${memberPokemon}`;
        } else if (
          index % 50 === 0 &&
          index + 1 === noBotMembers.length &&
          index !== 0
        ) {
          rankingsArray.push(currentText);
          currentText = "";
          currentText += `\n${index + 1}. ${memberPokemon}`;
          rankingsArray.push(currentText);
        } else if (index + 1 === noBotMembers.length) {
          currentText += `\n${index + 1}. ${memberPokemon}`;
          rankingsArray.push(currentText);
        } else {
          currentText += `\n${index + 1}. ${memberPokemon}`;
        }
      }

      await interaction.reply({ content: headerText, ephemeral: true });
      for (let entry of rankingsArray.values()) {
        await interaction.followUp({ content: entry, ephemeral: true });
      }
    });
  },
};

// Require the necessary discord.js classes
const express = require("express");
const fs = require("node:fs");
const bodyParser = require("body-parser");
const path = require("node:path");
const admin = require("firebase-admin");
const serviceAccount = require("./dgc-wishlist-firebase-adminsdk-zqto7-f77abf8213.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dgc-wishlist-default-rtdb.firebaseio.com",
});

const { getEnvData } = require("./utils/helpers");
const db = admin.firestore();
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

const { token } = getEnvData(process, "../config.json");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();


const getGameList = (games) => {
    let gameList = `**DGC Community Game Wishlist**\n`;
    for (let [index, game] of games.entries()) {
      gameList += `${index + 1}. ${game}\n`;
    }
    return gameList;
  };

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});

app.post("/wishlist-add", async (req, res) => {
  const wishList = db.collection("wishlist").doc("games");
  const gamesCollection = await wishList.get();
  const list = gamesCollection.data().list;
  const game = await req.body.game;
  list.push(game);
  list.sort();
  wishList.set({ list: list });
  const gameList = getGameList(list);
  res.send(`The DGC Community Game Wishlist has been updated:\n\n${gameList}`);
});

app.get("/wishlist-current", async (req, res) => {
  const wishList = db.collection("wishlist").doc("games");
  const gamesCollection = await wishList.get();
  const list = gamesCollection.data().list.sort();
  const gameList =
    list?.length > 0
      ? getGameList(list)
      : "There are currently no games in the community game list";
  res.send(gameList);
});

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand() && !interaction.isAutocomplete()) {
    return;
  } else if (interaction.isAutocomplete()) {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }
    try {
      await command.autocomplete(interaction);
    } catch (error) {
      console.error(error);
    }
  } else {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

// Log in to Discord with your client's token
client.login(token);

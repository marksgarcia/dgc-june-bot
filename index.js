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

const app = express();
const PORT = process.env.PORT || 3000;

const listOfGamesHandler = (games) => {
  let gameList = `**DGC Community Game Wishlist**\n`;
  for (let [index, game] of games.entries()) {
    gameList += `${index + 1}. ${game}\n`;
  }
  return gameList;
};

const getListOfGames = async (returnList = false) => {
  const wishList = db.collection("wishlist").doc("games");
  const gamesCollection = await wishList.get();
  const list = gamesCollection.data().list.sort();
  if (returnList) {
    return list?.length > 0
      ? listOfGamesHandler(list)
      : "There are currently no games in the community game list";
  } else {
    return { wishList, list };
  }
};

app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});

app.post("/wishlist-add", async (req, res) => {
  const { wishList, list } = await getListOfGames();
  const game = await req.body.game;
  list.push(game);
  list.sort();
  wishList.set({ list: list });
  const gameList = listOfGamesHandler(list);
  res.send(`The DGC Community Game Wishlist has been updated:\n\n${gameList}`);
});

app.post("/wishlist-remove", async (req, res) => {
  const { wishList, list } = await getListOfGames();
  const game = await req.body.game;
  const updatedList = list.filter((currentGame) => currentGame !== game);
  updatedList.sort();
  wishList.set({ list: updatedList });
  const gameList = listOfGamesHandler(updatedList);
  res.send(`The DGC Community Game Wishlist has been updated:\n\n${gameList}`);
});

app.get("/wishlist", async (req, res) => {
  const { list } = await getListOfGames();
  res.send(list);
});

app.get("/wishlist-current", async (req, res) => {
  const list = await getListOfGames((returnList = true));
  res.send(list);
});

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.on("guildMemberAdd", (member) => {
  const numberOfBarks = (upperBound) =>
    Math.floor(Math.floor(Math.random() * 20));
  const getBarks = () => {
    let barks = "";
    let numOfBarks = numberOfBarks;
    if (numOfBarks < 1) {
      numOfBarks = 1;
    } else if (numOfBarks > 20) {
      numOfBarks = 20;
    }
    for (let i = 1; i <= numOfBarks; i++) {
      if (i < 6) {
        barks += "bark ";
      } else if (i < 11) {
        barks += "**bark** ";
      } else if (i < 16) {
        barks += "BARK ";
      } else {
        barks += "**BARK** ";
      }
    }
    return barks;
  };
  member.guild.channels.cache
    .get("801079900437348394")
    .send({ content: getBarks() });
});

client.on(Events.InteractionCreate, async (interaction, client) => {
  //client.channels.get("846741291701764116").send("hello");
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

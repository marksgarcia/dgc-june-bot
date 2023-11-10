const { SlashCommandBuilder } = require("discord.js");
const buildURL = (queryArray = []) => {
  let link = "https://dgc-achievement-creator.web.app/";
  if (queryArray?.length > 0) {
    link += "?";
    for ([index, entry] of queryArray.entries()) {
      if (index > 0 && Object.values(entry)[0] !== null) {
        link += "&";
      }
      if (Object.values(entry)[0] !== null) {
        const currentKey = Object.keys(entry)
        const currentValue = Object.values(entry)[0]
        const valueWithoutSpaces = currentValue.replace(/ /g, "%20")
        link += `${currentKey}=${valueWithoutSpaces}`;
      }
    }
  }
  return link;
};


module.exports = {
  data: new SlashCommandBuilder()
    .setName("achievement-maker")
    .setDescription(
      "Quickly generate a DGC achievement that can be uploaded to discord"
    )
    .addStringOption((option) =>
      option
        .setName("brand")
        .setDescription("Select the brand for the icon")
        .setRequired(false)
        .setAutocomplete(false)
        .addChoices(
          { name: "Dev Game Club", value: "dgc" },
          { name: "Microsoft", value: "xbox" },
          { name: "Nintendo", value: "nintendo" },
          { name: "Sony", value: "playstation" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("icon")
        .setDescription("Select the icon for the achievement")
        .setRequired(false)
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option
        .setName("header")
        .setDescription("Create a clever header for an achievement")
        .setRequired(false)
        .setAutocomplete(false)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Add a description for the achievement")
        .setRequired(false)
        .setAutocomplete(false)
    )
    .addStringOption((option) =>
      option
        .setName("points")
        .setDescription("Add gamerscore for the achievement (xbox)")
        .setRequired(false)
        .setAutocomplete(false)
    )
    .addStringOption((option) =>
      option
        .setName("trophy")
        .setDescription(
          "Select the trophy color for the achievement (playstation)"
        )
        .setRequired(false)
        .setAutocomplete(false)
        .addChoices(
          { name: "Bronze", value: "bronze" },
          { name: "Silver", value: "silver" },
          { name: "Gold", value: "gold" },
          { name: "Platinum", value: "platinum" }
        )
    ),
  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();

    const choices = [
      "alien-8bit",
      "apple-whole",
      "circle-arrow-up",
      "arrow-down",
      "arrow-up",
      "atom-simple",
      "axe-battle",
      "bacon",
      "baseball",
      "person-biking",
      "biohazard",
      "bomb",
      "book",
      "bookmark",
      "bow-arrow",
      "bowling-ball",
      "boxing-glove",
      "burger-soda",
      "camera-movie",
      "candy-cane",
      "check",
      "burger-cheese",
      "cheese-swiss",
      "chess",
      "chess-bishop",
      "chess-knight",
      "cloud-arrow-down",
      "martini-glass-citrus",
      "mug-saucer",
      "cup-togo",
      "compact-disc",
      "cowbell",
      "cricket-bat-ball",
      "curling-stone",
      "database",
      "desktop",
      "dice",
      "dice-d20",
      "discord",
      "face-dizzy",
      "dumbbell",
      "dungeon",
      "egg-fried",
      "field-hockey-stick-ball",
      "film",
      "fish",
      "football",
      "football-helmet",
      "futbol",
      "game-console-handheld",
      "gamepad",
      "gamepad-modern",
      "gem",
      "ghost",
      "champagne-glasses",
      "whiskey-glass-ice",
      "earth-africa",
      "earth-americas",
      "earth-asia",
      "earth-europe",
      "golf-ball-tee",
      "face-grimace",
      "face-grin",
      "face-grin-squint-tears",
      "face-grin-stars",
      "face-grin-tears",
      "face-grin-tongue",
      "face-grin-tongue-squint",
      "face-grin-tongue-wink",
      "face-grin-wink",
      "guitar",
      "guitar-electric",
      "hat-wizard",
      "headphones",
      "headphones-simple",
      "headset",
      "head-side-goggles",
      "heart",
      "hockey-sticks",
      "icons",
      "image",
      "images",
      "joystick",
      "laptop",
      "face-laugh",
      "face-laugh-beam",
      "face-laugh-squint",
      "lemon",
      "map-location",
      "face-meh",
      "face-rolling-eyes",
      "meteor",
      "microphone",
      "computer-mouse",
      "music",
      "music-note",
      "paw",
      "flag-pennant",
      "pepper-hot",
      "piano-keyboard",
      "pie",
      "pizza",
      "pizza-slice",
      "playstation",
      "popcorn",
      "pumpkin",
      "question",
      "broom-ball",
      "racquet",
      "robot",
      "rocket",
      "route",
      "person-running",
      "face-sad-cry",
      "salad",
      "sandwich",
      "sausage",
      "saxophone",
      "scroll",
      "shuttlecock",
      "person-skating",
      "person-skiing",
      "face-smile-beam",
      "face-smile-wink",
      "person-snowboarding",
      "bowl-hot",
      "staff",
      "star",
      "starfighter",
      "starfighter-twin-ion-engine",
      "starship",
      "starship-freighter",
      "face-surprise",
      "person-swimming",
      "sword",
      "steam",
      "table-tennis-paddle-ball",
      "taco",
      "tennis-ball",
      "circle-xmark",
      "trophy",
      "turkey",
      "tv",
      "user-headset",
      "fork-knife",
      "violin",
      "volleyball",
      "vuejs",
      "person-walking",
      "camera-web",
      "wine-glass-empty",
      "xbox",
      "person-to-portal",
      "person-from-portal",
    ];
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
    const urlValues = [];
    urlValues.push({ brand: interaction.options.getString("brand") });
    urlValues.push({ icon: interaction.options.getString("icon") });
    urlValues.push({ header: interaction.options.getString("header") });
    urlValues.push({
      description: interaction.options.getString("description"),
    });
    urlValues.push({ points: interaction.options.getString("points") });
    urlValues.push({ trophy: interaction.options.getString("trophy") });
    const url = buildURL(urlValues);
    await interaction.reply({ content: `${url}`, ephemeral: true });
  },
};

// https://dgc-achievement-creator.web.app/?
//icon=apple-whole
//brand=nintendo
//header=Hello%20World
//description=foo%20bar
//trophy=gold
//points=20

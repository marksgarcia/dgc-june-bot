const { MessageAttachment, SlashCommandBuilder } = require("discord.js");
const { drawCard, LinearGradient } = require("discord-welcome-card");
const axios = require("axios");
const { getEnvData} = require('../utils/helpers')
const { secret } = getEnvData(process, "../config.json")

const calculateTime = (ISOValueOfStream) => {
  const today = Date.now();
  const lastStreamDay =
    typeof ISOValueOfStream === "object"
      ? ISOValueOfStream.map((entry) => entry.createdTimestamp)[0]
      : new Date(ISOValueOfStream);
  let delta = Math.abs(today - lastStreamDay) / 1000;
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  const seconds = Math.floor(delta % 60);
  return `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
};
const getTimVODs = async () => {
  let vodsArray = [];
  let tokenConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://id.twitch.tv/oauth2/token?client_id=byozvfbu0oixbvpkylm8zm0s6rtbqg&client_secret=${secret}&grant_type=client_credentials`,
    headers: {},
  };

  const tokenResponse = await axios.request(tokenConfig);
  const token = await tokenResponse.data.access_token;
  if (token) {
    let vodsConfig = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.twitch.tv/helix/videos?user_id=131676485",
      headers: {
        Authorization: `Bearer ${token}`,
        "Client-Id": "byozvfbu0oixbvpkylm8zm0s6rtbqg",
      },
    };
    const vodsResponse = await axios.request(vodsConfig);
    vodsArray =
      (await vodsResponse?.data?.data?.length) > 0
        ? [...vodsResponse.data.data]
        : [];
  }
  return vodsArray;
};

const getATim = () => {
  const TIMS = [
    "https://i.imgur.com/iBGdBQ1.jpeg",
    "https://i.imgur.com/DQ5wOHq.gif",
    "https://i.imgur.com/D9SEq0S.jpg",
    "https://i.imgur.com/AJoqvn2.png",
    "https://i.imgur.com/sg2QVHD.png",
    "https://i.imgur.com/5PTm3cR.png",
    "https://i.imgur.com/s8QByEI.png",
    "https://i.imgur.com/Rp3vxRx.png",
    "https://i.imgur.com/uI6TWnX.png",
    "https://i.imgur.com/gvhV2G5.png",
    "https://i.imgur.com/fdR6hpP.png",
    "https://i.imgur.com/w1csUKd.png",
    "https://i.imgur.com/Qi8sVUZ.png",
    "https://i.imgur.com/7UDvHne.png",
    "https://i.imgur.com/WKCCBSp.png",
  ];
  const rando = Math.floor(Math.floor(Math.random() * 15));
  return TIMS[rando];
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("time-since-last-tim")
    .setDescription(
      "Displays, in the current channel, how long it has been since Tim last streamed."
    ),
  async execute(interaction) {
    let haveLastStream = false;
    const vods = await getTimVODs();
    const channel = interaction.guild.channels.cache.get("1051987540862840992");
    const messages = await channel.messages.fetch({ limit: 100 });
    let isoValue;
    if (vods.length > 0) {
      isoValue = vods[0].published_at;
    } else {
      isoValue = messages.filter((message) => {
        if (message.content.includes("timlongojr is LIVE") && !haveLastStream) {
          haveLastStream = true;
          return true;
        }
      });
    }
    const calculation = await calculateTime(isoValue);
    const image = await drawCard({
      theme: "circuit",
      text: {
        title: "It has been",
        subtitle: "since Tim Longo Jr. last streamed.",
        text: calculation,
        color: `#FFFFFF`,
      },
      avatar: {
        image: getATim(),
        outlineWidth: 10,
        outlineColor: "#ffffff",
      },
      card: {
        blur: false,
        border: true,
        rounded: true,
      },
    });

    interaction.reply({ files: [image] });
  },
};

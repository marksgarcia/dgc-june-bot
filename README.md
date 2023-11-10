# June-Bot DGC Discord Bot

## About this Repo
This is repository is for a custom Discord Bot that is utilized by the Dev Game Club Discord server. As such many of the functions within it are exclusive to the server and may need to be modified if the bot is implement on a different server. Additionally, some of the variables that should be set to environmental or constant files were not added in such a manner initially because I was building this bot by trial and error. It is my hope that I can clean this the code here as time goes on, but I also wanted to share this with the community. So, if you are learning to build Discord Bots, enjoy!

## Getting Started
This Bot is built using [DiscordJS v14.x](https://discordjs.guide/#before-you-begin) and NodeJS. As such, you will want to either only serve it locally or get a server spun up online. I intially experimented with deploying to Google Cloud, but the monthly cost was going to be way too much. Instead, I decided to deploy to `Heroku` as it was only $7/month to run the server for the bot. Beyond that initial piece, here are the set up steps you will want to follow to get your bot up and running on your discord server.
### Developer Service Setup
1. Head over to the [Discord Developer Portal](https://discord.com/developers/docs/intro) and create a new Application (this will serve as your bot).
2. Within your discord server, [enable developer mode](https://discord.com/developers/docs/game-sdk/store#:~:text=Open%20up%20the%20Discord%20app,and%20enter%20your%20application%20ID).
3. This repo has a couple of commands that utilize external APIs (Twitch, Google Firebase), and as such, you will need to log into those services and get credentials to either (in Twitch's case, pull user data on Tim's twitch account, or in Firebase's case post to an instance of your Firestore Database). If you don't want to use those features, simply delete or comment out those commands from this repo.

### Environmental Credentials
4. You will need to set up a `config.json` file in your root directory with the following information:
``` javascript
{
  "token": <TokenFromDiscordDeveloperPortalForYourApp>,
  "clientId": <ClientIDFromDiscordDeveloperPortalForYourApp>,
  "guildId": <GuildIDFromYourDiscordServer>,
  "secret": <SecretFromTwitchDeveloperPortal>
}
```

5. You will also need to get a Firebase SDK json file that looks something like this
```javascript
{
  "type": "service_account",
  "project_id": <PROJECTID>,
  "private_key_id": <PRIVATEKEYID>,
  "private_key": <PRIVATEKEY>,
  "client_email": <CLIENTEMAIL>,
  "client_id": <CLIENTID>,
  "auth_uri": <AUTHURI>,
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zqto7%40dgc-wishlist.iam.gserviceaccount.com"
}
```

### Install Dependencies and Fire Up the Server
6. Clone this repository into a local directory on your machine.
7. Once you have cloned the repo, `cd` into the `dgc-june-bot` directory on your machine and run `npm install`. If you get a warning about critical vulnerabilities, you will also need to run `npm audit fix`.
8. To start up the application run `npm start`. If the app compiles properly, you should see that the server has fired up on `localhost:3000` in your Terminal app.


### Add the Bot to Your Server
9. Now that your bot is up and running and ready to go, head back to the Discord Developer Portal and [follow these steps to integrate your bot into your server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#adding-your-bot-to-servers).
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




:SusJune: **JUNE BOT COMMANDS** :JuneUnamused: 
Want to engage with our server in special/exclusive ways? There's a bot for that! @june bot#2131  was created with the specific purpose of adding the same chaotic, yet adorable flavor that June, Tim's dog, adds to the podcast. Below are a collection of the commands that can be issued to the bot, along with the outcomes of those commands:

# Getting Started
Never instantiated a bot in discord before? No worries, it's really simple. 

**To start, in any channel of the DGC discord simply type the forward slash `/`** and a list of commands/bots will appear. 

**Note:**You can use any of the bots on our server, but this guide focuses on the custom bot built only for DGC - June Bot. After you 

# June Specific Commands
*Description:* These commands will interact with @june-bot in the way in which you may interact with a dog, or a dog may interact with you. 

### `/bark`
*Description:* Asks for a number between 1 - 20 and will issue the appropriate number of barks based on that. 
*Usage:* Can be used in all channels.

### `/pet`
*Description:* Pet June and see how she responds. When calling this command, you will be required to select the **Privacy** level of the pet response (ie. do you want an ephemeral/private response that only you will see, or a public one that will be visible to all users in a channel).
*Usage:* Can be used in all channels.


# Community Specific Commands

## Announcements

### `/announcement-banner`
*Description* Want to make an announcement that looks better than just a wall of text? You can easily make one using this command. Simply issue the command in the channel where you wish to post the announcement and provide a title and description (there are other details that you can also provide - image url, due date, additional link).
*Usage:* Can be used in all channels.

## Achievements

### `/achievement-maker`
*Description* Did someone on the discord do something that impressed you or made you laugh? Want to recognize them and show the rest of the server that they are awesome? Just use this command to start generating a custom achievement for the DGC server. Want to make it look more like something you might see on Xbox or Playstation? We have those achievements to. Once you have filled in the prompt with however much or little info you want, June Bot will reply with a link to the achievement generator itself so that you can finish what you started and download the finished product to post to the server.
*Usage:* Can be used in all channels.

## DGC Community Wishlist

### `/wishlist-add`
*Description:* Add a game to the DGC community wishlist. Once the game is added, you will receive an ephemeral response confirming it has been added.
*Usage:* Can be used in all channels.

### `/wishlist-current`
*Description:* View a private/ephemeral copy of the current DGC community wishlist.
*Usage:* Can be used in all channels.

### `/wishlist-show`
*Description:*Publicly post the current DGC Community wishlist to the #:dizzy:-dgc-game-wishlist channel. It will send a confirmation of it posting the list as an ephemeral message in the channel in which it is called, but the actual list is only posted in the appropriate channel.
*Usage:* Can be used in all channels.

### `/wishlist-remove`
*Description* Remove an existing game from the DGC community wishlist. Once the game is removed, you will recieve an ephemeral response confirming it has been removed. This command populates with an `Autocomplete` function listing all of the current games in the wishlist.
*Usage:* Can be used in all channels


## User Pokemon and Pokedex Entries

### `/user-dex`
*Description* Lists all of the current users of the DGC discord in the order in which they joined and shows who their pokemon would be based on that number. Once it has been issued, it send an ephemeral response back to the person who requested it.
*Usage:* Can be used in all channels

### `/whos-my-pokemon`
*Description* Returns an ephemeral card to the requestor with the name of their respective pokemon (from the pokedex), a gif of that pokemon, and a list of moves for that pokemon.

# Podcast Host Related Commands

## Tim Specific Commands

### `/time-since-last-tim`
*Description* Need to know when Tim last streamed? Were you here for the drought of '23, where we saw Tim go almost an entire year without streaming? That was something! Well, even if he streams more frequently, you can always check in on when he last streamed by entering this command. You will have a public card returned in the channel where you issue this command and the card will include:
* A limited edition Tim Longo Jr headshot (chosen at random)
* The number of days, hours, minutes, and seconds since Tim last streamed

### `/tim-gg-backlog`
*Description:* Posts your well wishes to Tim (and tags him by his username), and also provides a list of games from the podcast that he has not yet beaten. This input will take an input of an **achievement** from you and insert it before the list of unbeaten games. This list is the same as the one found on #:dizzy_face:-unbeaten-games 
*Usage:* Can be used in all channels. **Should be used sparingly** as it does tag Tim.
*Example Output*
```
Hey, <HOST NAME HERE>! Your feat of beating <YOUR ACHIEVEMENT INPUT HERE> was most impressive. As I understand it you are looking for a new challenge…
Need a recommendation of another game to complete? Here are a few suggestions: 
<BEGIN LIST OF SHAME>
```


### `/tim-moji`
*Description:* Create a randomized emoji of Tim with hands. This takes the collection of hand emojis for L & R hands, along with the collection of emojis of Tim's head and combines them.
*Usage:* Can be used in all channels.

## Brett Specific Commands

### `/brett-gg-backlog`
*Description:* Posts your well wishes to Brett (and tags him by his username), and also provides a list of games from the podcast that he has not yet beaten. This input will take an input of an **achievement** from you and insert it before the list of unbeaten games. This list is the same as the one found on #:dizzy_face:-unbeaten-games 
*Usage:* Can be used in all channels. **Should be used sparingly** as it does tag Brett.
*Example Output*
```
Hey, <HOST NAME HERE>! Your feat of beating <YOUR ACHIEVEMENT INPUT HERE> was most impressive. As I understand it you are looking for a new challenge…
Need a recommendation of another game to complete? Here are a few suggestions: 
<BEGIN LIST OF SHAME>
```

## `/brett-moji`
*Description:* Create a randomized emoji of Brett with hands. This takes the collection of hand emojis for L & R hands, along with the collection of emojis of Brett's head and combines them.
*Usage:* Can be used in all channels.
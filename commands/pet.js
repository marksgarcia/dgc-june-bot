const { SlashCommandBuilder } = require("discord.js");
const { PET_RESPONSES } = require("../constants/pet_responses");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("pet")
    .setDescription("Pet June and see how she responds")
    .addStringOption(option =>
		option.setName('privacy')
		.setDescription('Whether or not the pet response should be private')
        .setRequired(true)
        .addChoices(
            {name: 'Private', value: 'true'},
            {name: 'Public', value: 'false'}
        )),
  async execute(interaction) {
    const isEphemeral = interaction.options.getString("privacy") === 'true';
    const numberOfPossibleResponses = PET_RESPONSES.length
    const getPetResponse = () => {
      const index = Math.floor(Math.random() * numberOfPossibleResponses);
      return PET_RESPONSES[index];
    };
    const response = getPetResponse()
    await interaction.reply({ content: `${response}`, ephemeral: isEphemeral});
  },
};

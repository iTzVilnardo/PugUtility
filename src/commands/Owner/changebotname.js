const config = require('../../../config');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions, DiscordAPIError } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('changebotname')
		.addStringOption(option => option.setName('name').setDescription('un nuevo nombre para el bot.').setRequired(true))
		.setDescription('Cambia el nombre de usuario del bot.'),
	async execute(interaction, client) {
		if (!config.settings.owners.includes(interaction.user.id)) return interaction.reply('**❌ | No eres dueño del bot.**');

		try {
			let emb = new MessageEmbed()
				.setTimestamp()
				.setColor('PURPLE')
				.setFooter(interaction.user.tag, interaction.user.displayAvatarURL());
			let name = interaction.options.getString('name');
			
			if (!name) return interaction.reply('**❌ | Necesitas proporcionar un nombre.**');
			else emb.setDescription(`Se ha establezido el nombre del bot a **\`${name}\`**.`);
			try {
				try {
					client.user.setUsername(name);
				} catch (e) {
					return await interaction.reply({embeds: [emb]});
				}
			} catch (error) {
				console.log(error);
				return interaction.reply('**❌ | No se pudo cambiar el nombre de usuario del bot.**');
			}
		} catch (DiscordAPIError) {
			return interaction.reply('**❌ | Ha cambiado su nombre demasiado rápido, por favor espere un momento.**');
		}
		
	}
};


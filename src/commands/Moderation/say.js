const config = require('../../../config');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.addStringOption(option => option.setName('say').setDescription('El mensaje que vas a enviar.').setRequired(true))
		.addStringOption(option => option.setName('title').setDescription('El título de tu anuncio..'))
		.addChannelOption(option => option.setName('channel').setDescription('El canal en el que quieres decir esto.'))
		.setDescription('Envia un mensaje a un canal'),
	async execute(interaction, client) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply('**❌ | No tiene los permisos correctos para usar este comando.**');

		let emb = new MessageEmbed()
			.setTimestamp()
			.setColor('RANDOM')
			.setFooter(interaction.user.tag, interaction.user.displayAvatarURL());

		let say = interaction.options.getString('say');
		let title = interaction.options.getString('title');
		let channel = interaction.options.getChannel('channel');
        
		if (!say) return interaction.reply('**❌ | Necesitas proporcionar algo que decir.**');
		else emb.setDescription(say);

		if (title) emb.setTitle(title);
		if (!channel) {
			interaction.channel.send({embeds: [emb]});
		} else {
			channel.send({embeds: [emb]});
		}
		return await interaction.reply('Mensaje enviado');
	}
};


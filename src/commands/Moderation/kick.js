const config = require('../../../config');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.addUserOption(option => option.setName('user').setDescription('El usuario al que quieres expulsar.').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('La razón por la que estás kickeando al usuario'))
		.setDescription('kickea al usuario mencionado con una razón.'),
	async execute(interaction, client) {

		if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply('**❌ | No tienes los permisos adecuados para expulsar a este miembro.**');

		const user = interaction.options.getUser('user');
		let reason = interaction.options.getString('reason');
        
		if (!user) return interaction.reply('**❌ | Debe proporcionar un miembro válido para kickear.**');
		if (!reason) reason = 'Ninguna razón dada.';

		let findMem = await search.searchMember(interaction, user.tag);
		if (!findMem.kickable) return interaction.reply('**❌ | No tengo los permisos correctos para expulsar a este miembro/no se puede expulsar a este miembro.**');

		let emb = new MessageEmbed()
			.setTitle(`Kick ${user.tag}`)
			.addField('Servidor', `**\`${interaction.guild.name}\`**`, true)
			.addField('Moderador', `**\`${interaction.member.user.tag}\`**`, true)
			.addField('Usuario', `**\`${user.tag}\`**`, true)
			.addField('Rason', `**\`${reason}\`**`, false)
			.setThumbnail(user.displayAvatarURL())
			.setTimestamp()
			.setFooter(config.embeds.embedFooterText)
			.setColor('RED');

		try {
			findMem.kick(reason);
		} catch (e) {
			return interaction.reply('**❌ | No tengo los permisos correctos para expulsar a este miembro.**');
		}

		await interaction.reply({embeds: [emb]});
	}
};


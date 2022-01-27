const config = require('../../../config');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.addUserOption(option => option.setName('user').setDescription('El usuario al que quieras banear.').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('La razón por la que estás baneado al usuario'))
		.addIntegerOption(option => option.setName('days').setDescription('La cantidad de días que desea banear al usuario'))
		.setDescription('banea al usuario mencionado con una razón.'),
	async execute(interaction, client) {

		if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply('**❌ | No tienes los permisos adecuados para banear a este miembro.**');

		const user = interaction.options.getUser('user');
		let reason = interaction.options.getString('reason');
		let days = interaction.options.getInteger('days');
        
		if (!user) return interaction.reply('**❌ | Debe proporcionar un miembro válido para banear.**');
		if (!reason) reason = 'Ninguna razón dada.';
		if (!days) days = 0;

		let findMem = await search.searchMember(interaction, user.tag);
		if (!findMem.bannable) return interaction.reply('**❌ | No tengo los permisos  para banear a este miembro / este miembro no se puede baneado.**');

		let emb = new MessageEmbed()
			.setTitle(`Ban ${user.tag}`)
			.addField('Servidor', `**\`${interaction.guild.name}\`**`, true)
			.addField('Moderador', `**\`${interaction.member.user.tag}\`**`, true)
			.addField('Usuario', `**\`${user.tag}\`**`, true)
			.addField('Razon', `**\`${reason}\`**`, false)
			.setThumbnail(user.displayAvatarURL())
			.setTimestamp()
			.setFooter(config.embeds.embedFooterText)
			.setColor('RED');

		try {
			findMem.ban({days: days, reason: reason});
		} catch (e) {
			return interaction.reply('**❌ | No tengo los permisos  para banear a este miembro.**');
		}

		await interaction.reply({embeds: [emb]});
	}
};


const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'guildMemberAdd',
	once: false, 
	async execute(member, client) {

		const embed = new MessageEmbed()
			.setTitle('Bienvenido a la comunidad de **DJ PUG**')
			.setDescription(`Hola ${member}, bienvenido a la comunidad de **DJ PUG**, donde podrás encontrar información sobre el, y también puedes interactuar con otros usuarios.`)
			.setColor('BLUE')
			.setThumbnail(member.user.avatarURL())
			.setFooter(client.user.username, client.user.avatarURL())
			.setTimestamp();


        client.channels.cache.get('906644279445819443').send({embeds: [embed]});

    }
};



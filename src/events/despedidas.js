const Discord = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    once: false,
    async execute(member, client) {
        let msgChannel = new Discord.MessageEmbed()
        .setTitle('Alguien se ha ido de la comunidad')
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription( '**'+member.user.username + '** dejo el servidor! \n Ahora somos **' + member.guild.memberCount + '** miembros.')
        .setColor("RED") 
        .setFooter(client.user.username, client.user.avatarURL())
        .setTimestamp();
      
      let channel = client.channels.cache.get('932335270106382348');
      channel.send({embeds:[msgChannel]});
    }
}
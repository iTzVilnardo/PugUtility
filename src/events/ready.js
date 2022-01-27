const db = require('megadb')
const { getChannelVideos } = require('yt-channel-info')

module.exports = {
	name: 'ready',
	once: true, 
	async execute(client) {
		console.log('Bot is logged in')

			let canales = 'UCebtbnBSla-ntF30orIyhzA'
			let videos = await getChannelVideos(canales, 0)
			let uVideo = videos.items[0]
			const yt = new db.crearDB('yt')

			const title = yt.obtener(canales)
			if(yt.tiene(canales)) return;
			if(title === uVideo.title) return;
			yt.establecer(canales, uVideo.title)
			

			// if(title !== uVideo.title) return client.channels.cache.get('933765440847630396').send(`**${uVideo.author}** ha subido un nuevo video : **${uVideo.title}** 
			// \n https://www.youtube.com/watch?v=${uVideo.videoId}`)

			
	}
};


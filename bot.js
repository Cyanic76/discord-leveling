const {Client,Intents,Permissions} = require("discord.js")
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES
	],
	partials: ["CHANNEL"]
});
// lmk if @discordjs/rest & discord-api-types/v9 are needed
const db = require("quick.db");

client.login("Your token here.");
client.once("ready", async() => {
	console.log(`Logged in as ${client.user.tag}`);
})

client.on("messageCreate", async message => {
	if(message.author.bot) return;

	// XP between 10 & 25
	let random = Math.floor(Math.random()*15)+10

	await db.add(`xp_${message.guild.id}_${message.author.id}`, random);

	let level = await db.get(`level_${message.guild.id}_${message.author.id}`);
	let xp = await db.get(`xp_${message.guild.id}_${message.author.id}`);

	// Level up
	if(level*75 < xp){
		await db.add(`level_${message.guild.id}_${message.author.id}`, 1);
		message.channel.send(`${message.author.username} reached level ${level+1}! GG!`)
		return;
	}

});


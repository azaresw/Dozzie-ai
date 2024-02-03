const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const aichat = require("../../Structures/models/aichat");
const Discord = require("discord.js")
module.exports = {
	name: 'setup-aichat',
	description: "Set me up 😊",
  aliases: ["setup-aichat", "start", "install"],
  usage: "[prefix]setup",
  nsfwOnly: false,
  guildOnly: false,
  ownerOnly: false,
	cooldown: 3000,
	userPerms: ['ManageGuild'],
	botPerms: [''],
    category: "Setup",
	run: async (client, message, args, prefix) => {
		const wait = require('node:timers/promises').setTimeout;
           
          const msg = await message.reply({ content: `<a:laugh:1186421728423972864> Gimme a second.. <:RIA:1177706866755780731>`})



    let data = await aichat.findOne({ guildId: message.guild.id})

    if(!data) {
        console.log("No data found")
    await aichat.create({ guildId: message.guild.id}, { enabled: false, channel: ""})

 
    }
    console.log(data)
await wait(3000)
    const embed = new EmbedBuilder()
    .setAuthor({ name: `Lumine - your friendly companion.`, iconURL: message.author.displayAvatarURL(), url: "https://discord.gg/rialabs"})
    .setDescription(`<:PI_hewwo:1179890952391888928> Enable Lumine in your server and find out there's nothing to regret about it1`)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter({ text: `I'm excited, you'll love it!`, iconURL: client.user.displayAvatarURL()})

     const state = data.enabled
     console.log(state)
    var stateMENT;
    
    if(state === true) {
        stateMENT = false
    }

    if(!state) {
        stateMENT = true
    }
    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel("Enable")
        .setEmoji("<:RIA:1177706866755780731>")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(state)
        .setCustomId("ria-enable"),

        new ButtonBuilder()
        .setLabel("Disable")
        .setEmoji("<:Arrow_Down:1149035835988127795>")
        .setStyle(ButtonStyle.Primary)
        
        .setDisabled(stateMENT)
        .setCustomId("ria-disable"),

        new ButtonBuilder()
        .setLabel("Settings")
        .setEmoji("<:moderators:1148915936443760755>")
        .setStyle(ButtonStyle.Primary)
        .setCustomId("ria-settings"),
    )
          const mainmsg = await msg.edit({content: `Heyy, let's setup Lumine in your server!`, embeds: [embed], components: [row]})

          const collector = await mainmsg.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 60000
          })

           collector.on("collect", async i => {
            if(i.user.id !== message.author.id) return i.reply({content: `Sorry but you aren't allowed to use this menu`, ephemeral: true})
           
            if(i.customId === "ria-enable") {
                await i.deferUpdate()
                const embed = new EmbedBuilder()
                .setAuthor({ name: `Select the channel.`, iconURL: client.user.displayAvatarURL(), url: "https://discord.gg/clientbot"})
    
                .setDescription(`- Select the channel where the ai-chat will be enabled from the selection menu below.`)
    
                const channelSelect = new Discord.ChannelSelectMenuBuilder()
       .setCustomId('aichat-channel')
       .setPlaceholder('Select the channel.')
       .setMinValues(1)
       .setMaxValues(1);
    
     const row1 = new ActionRowBuilder()
       .addComponents(channelSelect);
    
     const messageChannel = await i.message.edit({ embeds: [embed], components: [row1]})
       const collectorChannel = await messageChannel.createMessageComponentCollector({
        filter: m => m.user.id === message.author.id,
        componentType: ComponentType.ChannelSelect,
        time: 120000
       })
    
       collectorChannel.on("collect", async menuChannel => {
    
        await menuChannel.deferUpdate()
    var aichatChannel = menuChannel.values[0]
    
     await aichat.findOneAndUpdate({ guildId: message.guild.id}, { channel: aichatChannel, enabled: true})
    
    await menuChannel.message.edit({content: `<:RIA:1177706866755780731> Enjoy the power of Lumine in <#${aichatChannel}>`, embeds: [], components: []})
    
       })
            }

            if(i.customId === "ria-disable") {
                  await aichat.findOneAndUpdate({ guildId: message.guild.id}, { channel: "", enabled: false})
    
                await i.message.edit({content: "I'm sorry you had to let me go, i'll try to be better soon..", components: [], embeds: []})
            }
        
         
        })
    
		
	}
};






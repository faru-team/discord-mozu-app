
const Eris = require("eris");
const {Client,Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const discord_job = require("discord-job-panel");
const token  = "OTQ1NzMzMDI2ODUwMTYwNjUw.YhUchA.ocms7Inp873LvCnukdgoeGrAee8";
const bot = new Eris(token)
const paginator = require('discord-paginator')
const pag = paginator.create({ bot });
// bot準備
client.on('ready', () => {
    console.log('Bot準備完了');
    setInterval(() => {
      client.user.setActivity({
        name: `${new Date().toLocaleString()}`
      })
    }, 1000)
  });
discord_job.db_type({id: 1,label: "db",key:"MONGOkey"});
discord_job.couston_id("FARUPANEL");
// パネル実装
client.on('messageCreate', async message => {
    if(message.content.startsWith("!job")) {
      const args = message.content.split(" ").slice(1);
      const getdata = discord_job.create_panel({role: args,in:message,title: "ロールを選ぼう"});
      if (getdata==1) return message.reply("入力されていません");
      if(getdata==2)return message.reply("ロールが見つかりませんでした");
      for(let i=0; i < getdata.content.length; i++)message.reply({embeds:[{description: getdata.content[i].join("\n")}],components: [getdata.select[i]]});
    };
    if(message.content.startsWith("!addjob")) {
      const args = message.content.split(" ").slice(1);
      const getdata = await discord_job.add_panel({role: args,in:message,title: "ロールを選ぼう"});
      if (getdata==1) return message.reply("入力がされていません");
      if(getdata==2) return message.reply("前回のデータが見つかりません");
      if(getdata==3) return message.reply("ロールが見つかりません");
      for(let i=0; i < getdata.content.length; i++)message.reply({embeds:[{description: getdata.content[i].join("\n")}],components: [getdata.select[i]]});
    };
    if(message.content == "!deletedb") {
      const deletedb = await discord_job.delete_db(message.guild.id);
      if(deletedb==1) return message.reply("何も保存されていません");
      if(deletedb==2) return message.reply("完了");
    };
    if(message.content.startsWith("!deletejob")){
      const args = message.content.split(" ")[1]
      const getdata =await discord_job.remove_panel({num:args,title:"ロールを選ぼう",in:message});
      if(getdata == 1) return message.reply("前回のデータが見つかりませんでした");
      if(getdata == 2) return message.reply("前回のパネルの範囲内の数値を入れてください");
      if(getdata == 3) return message.reply("すべてのコンテンツがなくなりました");
      message.reply({embeds:[{description: getdata.content.join("\n")}],components: [getdata.select]});
    }
    if(message.content == "!cleardb"){
      await discord_job.clear_db();
      message.reply("完了しました");
    }
});
client.on("interactionCreate", async i => {
    if(i.customId=="FARUPANEL"){
    const select = discord_job.select(i);
      await i.deferReply({ ephemeral:true });
      if (select.bol) {
       const role = await i.member.roles.add(select.info).catch(()=>{});
        if(!role) return i.followUp("エラー");
          i.followUp("ロール追加");
          } else {
       const role = await i.member.roles.remove(select.info).catch(()=>{});
        if(!role) return i.followUp("エラー");
        i.followUp("ロール削除");
      }
    }
});
// ヘルプ実装
bot.on("messageCreate", (msg) => {
    if(msg.content === "//help"){
        bot.createMessage(msg.channel.id, {
        embed: {
            title: "ゆるキャン△BOT",
            description: "コマンド一覧",
            fields: [{
                name:"✅ //help", 
                value:"ヘルプ", 
                inline:true
            },
            {
                name:"✅ //image", 
                value:"画像を表示する", 
                inline:true
            },
            {
                name:"✅ //pages",
                value:"ページ機能",
                inline:false
            }
        ],
            author: {
                name: msg.author.username,
                icon_url: msg.author.avatarURL
                },
                color: 0x008000,
            },
            timestamp: new Date()
        })
// 任意の画像を表示する
}else if(msg.content === "//image"){
        bot.createMessage(msg.channel.id, {
        embeds: [{
                author:{
                    name: msg.author.username,
                    icon_url: msg.author.avatarURL
                },
                color: 0x008000,
                image: {
                    url:"https://tc-animate.techorus-cdn.com/resize_image/resize_image.php?image=02191208_602f2ba195652.jpg",
                },
                timestamp: new Date()
            }]
        })
    }
})

// ページ実装
bot.on("messageCreate", async (msg) => {
    if(msg.content.startsWith('//pages')) {
        const pageslist = [
        'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqGxuQACxqi0fkbGNWy3I1FNXQxsfxYwnstHrPeMSP8zAeteJG0ihAACwjpsAo38Jw9DMwqx4j6JcYDIcqw_MaPg6u29AZ03Swm8z4wLRNpxe4DZhyb9nH9M4Fkte9iWk5hX6t2ZL4kOR3t36OnM_zc11uoVqvOiE249NBCD6LthX5flaZxUCGxcaZsHBZCHNqPJ1seUhdNFTSmzTR6MZcwCLHbfiIdVz7cby_YTAltKyB9YDOB6c2a-Hqv-4fKc71sg==/maxresdefault.jpg',
        'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG9LF0uMihVL-MJSfNZh-TuzLiJlOV258tTKjNtwKxI1Rp_xLj30Im1f43Gv9lnC8qBEsSazmXYbQF-n3mjUuuz7xekkVSLCfzW8WIi7__njJ_ozt4jeMC7ch2A8SmqoAYk4rq0a0jGXsPcQJ4hSmoJ97N3WshyBIZ2Uro-X7bGbbEuWdnlkQmcdJYTdOO5FU1BRipD87QqkKuVSfS6z0V3_Uh9UH1MIrFJgRnk9--JJ26JmExhgPJRzuAv1r42uyrw==/GH2_12_119.jpg',
        'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG8dup2NFyHN8ODD65wjpyxaJyPxaUWG-M3ZfRd9A8htU5MK1EqXA8LFiq7uAc4UFvLzkUBAfkfaVnTwaKuW06gcnPI79tSjHjR-tCJg4S2cMJVygbd6zZ0k-h8u0fLIoR5rp9d7zNywQVmHUF8SWRwaXxi1WGKAtK_umJ1VOURVXdNyfIc4A_C-71ZsrVd8jzZznj8PlH7huiG4TvEK1bf4lbRp9P7aYtxcLQLR3ftg0qjIfLaeSCNix5YCVb1ao9g==/RbTS6lt6I7bdGaHXeF5ROVZFMBV8AFyZSUEWMIOY.jpeg?errorImage=false',
        'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG7LfMgwrgVGubjp5lPIrk4VMWVDhFxOtAVEpj02I9YsPRKqFikpMIeVX8hFHOMUVQdIaBxM2J3O7cL64Ka56CXRGOyLg8njYM83kpQTjOTXwVqd59RwZnON7KRKVrAzggoOjlLVuuWWpiibjuqHlPO6MEFK9rj0Y7LLyCqdJczYeXGj0Z3M2WZIW-mJveG3_f1YGFhH6RqTC_q1eFRk5JI0vr_6r-P8iXrCWNWBivuitaEPJUiF3sLOePtaRgRoOlCCAf-DX0tpu1ZYrNBwAUOV3yeAu1S2dVPBqxRVoTHH-lqUQhh2xpTufovvUr2AJfw==/chalorette-anime-girl-cute-wallpaper-preview.jpg',
        'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG_omiYkNVym1Sd6g5T38MuROwslg7TX_DfTsG9bP_Zbnt12EdcDPVrVwBnEdjnal-W5DqrE8qiLTHR8V_aaBVhbBMoPYG-HUNRZF1x8CDzGsy-Ij8CrYkQpp5pB2_lheaIH_QYZecdTV2ByUR4HWSc58sZv5YCy3kfPXOGaVQYTdyxfE7DgxOi9qdozJh04rax0FoGYJ7sDtwxIdN_TI5Rb7w1seS6wayqL-c5VMo5VibwcraXKAFp0g-YTnZI6s8Q==/DuxrgBpU0AABh9N.jpgmedium',
        'https://stat.ameba.jp/user_images/20181219/12/otakulife315/ff/dc/j/o0739041514323401768.jpg?caw=800',
        'http://gamenavis.com/collect_img/17539.jpg',
        'http://gamenavis.com/wordpress/wp-content/uploads/2018/01/wpid-C9T0p1t-600x337.jpg',
        'https://i.ytimg.com/vi/U8_36jFTVpw/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDdwZk_cWNqv8opbH9sjblNmkk8NA',
        'https://images-fe.ssl-images-amazon.com/images/I/71Ej7iKl0GL._CR190,0,480,800_.jpg',
        'https://animeanime.jp/imgs/p/ypfYP8UGHHv1ocFz1cgmQGihmaytrq_oqaqr/445216.jpg',
        'https://sp-akiba-souken.k-img.com/thumbnail/images/article/000/706/706846.jpg?w=640&h=480&m=resize',
        'https://moviewalker.jp/api/resizeimage/news/article/220238/1369848?h=500',
        'https://img.animatetimes.com/news/visual/2016/1469786796_2_10_8e3249035219ac70ded1ce4ac8427dd9.jpg',
        'https://images.ciatr.jp/2020/02/w_640/aA009vyjJGAh5WEQo87J7SCoxG2fJrxKvwFnfUok.jpeg',
        'https://pics.prcm.jp/d6f17f32f713d/84308462/jpeg/84308462_480x480.jpeg',
        'https://images.ciatr.jp/2021/04/w_640/BZIeSHEAKGpslJSSgnh5YeAnBlUCaIbbVPpFSZhi.jpg',
        'http://rank1-media.com/file/parts/I0001295/ebce8870f29aee5b58e4b96862a57096.jpg',
        'https://mukiryoku-bear.com/wp-content/uploads/2020/07/2f272072e8cb79b16dc4f9f2ec3e76b6.jpg',
        'https://s3-ap-northeast-1.amazonaws.com/cdn.bibi-star.jp/production/imgs/images/000/329/408/lqip.jpg?1560094583',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ21LXlKOQ1xEXzIzQCAMK4KWjENlsVy0wQz0lCiIbLlLp8tNAVPBOPM1zardAhFJWC6E0&usqp=CAU',
        'https://www.me-byo-summit.jp/wp-content/uploads/2020/12/remu4-640x360.jpg',
        'https://newstisiki.com/wp-content/uploads/2020/07/2b52848d43f0f0c4837e89d783f841ad.jpg',
        'https://img.hmv.co.jp/image/jacket/800/85/7/9/515.jpg'
        ]
        const embed = {
            title: msg.author.avatarURL,
            description: 'アニメ画像をスライドできます',
            image: { url: ''}
        }
        pag.addPagination(msg.author.id, msg.channel.id, {
            pageslist, embed,
            switchPage: (data) => data.embed.image.url = data.pages[data.pagenum],
        })
        
    }
})
bot.on('messageReactionAdd', async (msg, emoji, userID) => {
    pag.trigger(userID, msg, emoji.name)
});
bot.on("voiceChannelJoin", (member, newChannel) => {
    // 入室処理
    let ch = newChannel.guild.defaultChannel;
    console.log("%sさんがVC{%s}に入室したぞ。", member.username, newChannel.name);
    // 'CreateMessageの中の数字のところはテキストチャンネルを任意で送りたい場所をコピーしてくる'
    bot.createMessage("898939943823474698",member.username + "さんがVC[" + newChannel.name + "] に入室したぞ");
  });
bot.on("voiceChannelLeave", (member, oldChannel) => {
    // 退室処理
    let ch = oldChannel.guild.defaultChannel;
    console.log("%sさんがVC{%s}を退室したぞ。", member.username, oldChannel.name);
    // 'CreateMessageの中の数字のところはテキストチャンネルを任意で送りたい場所をコピーしてくる'
    bot.createMessage("898939943823474698",member.username + "さんがVC[" + oldChannel.name + "] を退室したぞ。");
  });
// Discordに接続します。
bot.connect();
client.login(token);
// ボイスチャンネル入室退室
// const mainChannelId = [945761163436752946n];
// client.on('voiceStateUpdate', (oldGuildMember, newGuildMember) => {
//     if(oldGuildMember.voiceChannelID === undefined && newGuildMember.voiceChannelID !== undefined) {
//         if(createMessage.channels.get(newGuildMember.voiceChannelID).members.size == 1){
//             if(newGuildMember.voiceChannelID == 926108681307815998n){
//                 newGuildMember.voiceChannel.createInvite({"maxAge":"0"})
//                     .then(invite => sendMsg(
//                         mainChannelId, "<@" + newGuildMember.user.id + ">が通話開始したぞ、参加しようぜ！\n" + invite.url
//                     ));
//             }
//         }
//     }
// });
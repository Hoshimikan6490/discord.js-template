//パッケージ系の定義
const fs = require("fs");
const {
  Client,
  GatewayIntentBits,
  InteractionType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
require("dotenv").config();

//Discordのclientを設定
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

//コマンドを「/commands」フォルダから呼び出して、commands変数に代入
const commands = {};
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands[command.data.name] = command;
}

//Discord BOTを起動したときに動作する内容を設定
client.once("ready", async () => {
  //先ほど読み込んだコマンドをBOTに反映
  const data = [];
  for (const commandName in commands) {
    data.push(commands[commandName].data);
  }
  await client.application.commands.set(data);

  //ログインできたことをターミナルに表示
  console.log("Ready!");

  //「○○をプレイ中！！」みたいなやつを設定。この場合は10秒に１回更新する。
  setInterval(() => {
    client.user.setActivity({
      name: `所属サーバー数は、${client.guilds.cache.size}サーバー｜Ping値は、${client.ws.ping}ms｜replitで起動中です`,
    });
  }, 10000);

  //起動したことを、開発ログ用のチャンネルに送信
  client.channels.cache
    .get(process.env.ConsoleChannelId)
    .send("起動しました！");
});

//interactionが発行された時に何をするかを設定
client.on("interactionCreate", async (interaction) => {
  //カスタムIDが「test」の物(ボタン)が実行(押された)時に
  if (interaction.customId == "test") {
    //それに返信をする
    interaction.reply("GOOOOOOOOOOOOOD!");
  }

  //スラッシュコマンドが実行された時に
  if (interaction.type === InteractionType.ApplicationCommand) {
    //「commands」フォルダの中のどのファイルにinteractionの情報を送るかを決めるために、そのinteractionコマンドのコマンド名を定義したファイルに送信する。(つまりファイル名は関係ない)
    const command = commands[interaction.commandName];

    try {
      //コマンドを定義したファイルにinteractionの情報を送る
      await command.execute(interaction);

      //エラーが発生した場合は
    } catch (error) {
      //ターミナルにエラー内容を表示する
      console.error(error);
      //ユーザーには、内部エラーが発生した旨のみを伝える。
      await interaction.reply({
        content: "内部エラーが発生しました。管理者にお問い合わせください。",
        ephemeral: true,
      });
    }
  }
});

///////////////////////////////////////////////////////////////////////////////

//何らかのメッセージを受信した場合は
client.on("messageCreate", async (message) => {
  //メッセージの内容が「$test」だった時に
  if (message.content === "$test") {
    //ボタンを準備する
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("💤")
    );

    //メッセージを受信したチャンネルにメッセージを送信する。
    message.channel.send({
      content: "TEST!!!!!!!!!!",
      components: [button],
    });
  }
});

//Discord BOTにログイン
client.login(process.env.TOKEN);

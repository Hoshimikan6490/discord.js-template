module.exports = {
	data: {
		name: 'simple_response',
		description: 'このコードの書き方で最も簡単なコマンドです！',
	},
	async execute(interaction) {
		await interaction.reply({
			embeds: [
				{
					title: 'こんにちは！',
					description:
						'このメッセージが送信されていれば、正常にスラッシュコマンドの設定ができています！',
					thumbnail: {
						url: 'attachment://image.png',
					},
				},
			],
			files: [
				{
					attachment: 'images/ojigi.png',
					name: 'image.png',
				},
			],
		});
	},
};

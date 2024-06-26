# discord bot のテンプレート

本テンプレートは、メッセージ送信によるコマンドとスラッシュコマンドによるコマンドに対応しています。
メッセージ送信によるコマンドは次の設定が必要ですので、ご注意ください。

## メッセージ送信によるコマンドを使用するには

1. [discord の開発者ポータル](https://discord.com/developers/applications)にアクセスする。
2. 自分の BOT を選択
3. 左側のメニューの「Bot」選択
4. 「PRESENCE INTENT」と「MESSAGE CONTENT INTENT」を ON にする。

## 使い方

1. コード(「.gitignore」と「readme.md」と「package-lock.json」以外のファイル)をあなたの環境にコピーする(手動でも git でもお好きなものをお選びください)
2. index.js がある場所をターミナルで開き、次のコマンドを実行して関連パッケージをインストールする。

```
npm i
```

3. [discord の開発者ポータル](https://discord.com/developers/applications)にアクセスする。
4. 右上の「New Application」を押して、画面の指示に従って BOT のアプリケーションを作成する。
5. 作成した BOT のアプリケーションを選択
6. 左側のメニューの「Bot」選択
7. 右側の「Reset Token」を押して、tokenをコピーする
8. プログラムの編集画面に戻り、「.env.example」の「TOKEN=」の後の文字列を先ほどコピーしたtokenに置き換える
9. 同じく「.env.example」の「ConsoleChannelId=」の後の数字をご自身のログ用DiscordチャンネルのチャンネルIDに変更する
10. 「.env.example」というファイルを、「.env」という名前に変更する
11. ターミナルで、次のコマンドを実行する
```
node index.js
```

※ログ用のチャンネル（手順の９）を使用しない場合は、index.jsの52~55行目の次の文字列を削除してください。
```js
  //起動したことを、開発ログ用のチャンネルに送信
  client.channels.cache
    .get(process.env.ConsoleChannelId)
    .send("起動しました！");
```

# このコードの利用について
このコードをご自身で利用する際、商用利用の有無にかかわらず、制作者名等の明記不要で使用できます。また、改変・改造などは自由です。ただし、次の２点にご留意ください。
- このコードの作者・編集者は、このコードを使用することで発生したいかなる損害の責任を負いません。
- プログラミングの方法などを聞く場合は、「Discussions」タブを利用してください。「Issues」は、バグ報告などに利用してください。
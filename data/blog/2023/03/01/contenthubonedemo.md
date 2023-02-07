---
title: Sitecore Content Hub ONE のデモサイトを立ち上げる
date: '2023-02-16'
tags: ['Content Hub ONE']
draft: true
summary: Sitecore の新しいヘッドレス CMS として新たにリリースされる Sitecore Content Hub ONE のデモが提供されました。これのセットアップの手順を今回まとめておきます。
images: ['/static/images/2023/03/nextjs03.png']
---

Sitecore の新しいヘッドレス CMS として新たにリリースされる Sitecore Content Hub ONE のデモが提供されました。これのセットアップの手順を今回まとめておきます。

- [Sitecore.Demo.CHONE](https://github.com/Sitecore/Sitecore.Demo.CHONE)

## Content Hub ONE CLI のインストール

まずデモのデータに関しては、シリアライズされたデータ（テキストデータ）が展開されている形です。これをサーバーに展開するために、まずはコマンドラインツールをインストールします。Windows の場合は Chocolatey を利用してインストールできます。

```
choco install Sitecore.ContentHubOne.Cli --source https://nuget.sitecore.com/resources/v2/
```

また macOS の場合は以下の様にインストールができます。

```
brew tap sitecore/content-hub
brew install ch-one-cli
```

![content hub one demo](/static/images/2023/02/playone01.png)

Windows や Docker を利用する場合の手順は以下に記載されています。

- [Install and run the Content Hub ONE CLI](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/content-hub-one-cli--install-and-run-the-cli.html)

## シリアライズしたデータのインポート

インポートをするために、Sitecore Content Hub ONE の環境データを取得する必要があります。

```bash
cd serialization
npm install
npm run tenant:add -- -o <organization-id> -t <tenant-id> -ci <oauth-client-id> -cs <oauth-client-secret>
```

npm run tenant:add -- -o org*BrDOm5eGLFWpHs2e -t 111719d2-fad4-43d2-bcc7-08daadeee4f5 -ci 3oDZ940foIrrBEHtsFxwSAwJoOoBBGmJ -cs ZEmnW5dGnsKaz-ssQQdrzytDO8efL7WUc6cNIZ0GqoPFmOfB6t7FQvVH6yHXOBo*

![Content Hub ONE](/static/images/2023/02/chone02.png)

上記の項目は以下の場所から取得することができます。

- URL にそれぞれの値が表示されています
  - organization-id
  - tenant-id
- OAuth の値に関しては Settings - OAuth client から取得可能
  - oauth-client-id
  - oauth-client-secret

![Content Hub ONE](/static/images/2023/02/chone03.png)

これで手元のコードとテナントの連携ができました。続いてシリアライズされた項目を展開していきます。

```bash
npm run push:types
npm run push:items
```

![Content Hub ONE](/static/images/2023/02/chone04.gif)

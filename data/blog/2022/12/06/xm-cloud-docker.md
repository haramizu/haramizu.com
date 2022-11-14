---
title: XM Cloud の開発環境を Docker で起動する
date: '2022-12-06'
tags: ['XM Cloud', 'Docker']
draft: false
summary: これまで XM Cloud に関して SaaS の環境のみを操作していました。実際の開発になると手元で同じ環境を用意したくなるところです。手元で動かすことができる Docker の環境が作成された GitHub のリポジトリに用意されているため、今回はこれを利用してローカルの環境で起動したいと思います。
images: ['/static/images/2022/12/docker08.png']
---

これまで XM Cloud に関して SaaS の環境のみを操作していました。実際の開発になると手元で同じ環境を用意したくなるところです。手元で動かすことができる Docker の環境が作成された GitHub のリポジトリに用意されているため、今回はこれを利用してローカルの環境で起動したいと思います。

## GitHub からコードを取得する

GitHub に作成されているリポジトリのコードを手元にクローンとして作成してください。ここでは、GitHub Desktop を利用して手元にコードを展開するようにしていきます。まず、対象となるリポジトリを指定します。

![docker](/static/images/2022/12/docker01.png)

クローンを作成します（今回は c:¥projects¥sxastarter に展開しています）。クローンを作成したあと、ブランチに関しては development に切り替えてください。

![docker](/static/images/2022/12/docker02.png)

これで準備が完了となります。

## プロジェクトの初期化

リポジトリには初期化をするためのスクリプトとして `init.ps1` という用意されています。このスクリプトに、ライセンスファイルの場所、および管理者のパスワードを指定します。なお、実行する際には自己証明書なども作成するため、ターミナルを管理者権限で立ち上げる必要があります。

実行するスクリプトは以下のとおりです。

```
.\init.ps1 -InitEnv -LicenseXmlPath "C:\projects\license\license.xml" -AdminPassword "DesiredAdminPassword"
```

続いてコンテナを起動して初期化をするために用意されているスクリプト、 `up.ps1` を実行してください。上記のコマンドと一緒に実行している模様は以下のようになります。

```
.\up.ps1
```

![docker](/static/images/2022/12/docker04.gif)

上記のスクリプトはコンテナのビルドなどを実行しつつ、準備ができたときに一度ログインを求めてきいます。このログインは、XM Cloud にログインをするために必要となりますので、アカウントでログインをしてください。

![docker](/static/images/2022/12/docker05.png)

ログインが完了すると以下の画面が表示されます。

![docker](/static/images/2022/12/docker06.png)

インデックスの区政、必要なアイテムのインポートの手続きが完了すると、ブラウザを起動してスクリプトが終了します。

![docker](/static/images/2022/12/docker07.png)

ブラウザは Docker を利用して起動している XM Cloud の環境が立ち上がっていることがわかります。

![docker](/static/images/2022/12/docker08.png)

## まとめ

ローカルでの作業環境が整いました。ただし、今の段階では XM Cloud が起動しただけでデータがありません。次回は、XM Cloud で作成したサイトの情報をローカルの環境に反映させるために、Sitecore CLI を利用して展開します。

上記の内容をダイジェストで紹介している動画を YouTube にアップしています。参考にしてください。

[![](https://img.youtube.com/vi/Z0RHuBdiOSI/0.jpg)](https://www.youtube.com/watch?v=Z0RHuBdiOSI)

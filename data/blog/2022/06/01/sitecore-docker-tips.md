---
title: Sitecore コンテナに関する Tips
date: '2022-05-27'
tags: ['Docker', 'Sitecore']
draft: false
summary: Sitecore コンテナを利用する上でよく引っかかるポイントをこのページに記載しています。今後、見つけたものは随時追加していきたいと思います。
images: ['/static/images/2022/05/docker08.png']
---

Sitecore コンテナを利用する上でよく引っかかるポイントをこのページに記載しています。今後、見つけたものは随時追加していきたいと思います。

## イメージを削除する

プロジェクトで作っていたイメージを削除する場合は、以下のコマンドで削除されます。

```
docker-compose down --rmi all --volumes --remove-orphans
```

システム全体のデータを削除する場合は、以下のコマンドで削除されます。プロジェクト単位で消すのが良いですが、個別に作るより必要になったらもう一度ビルドしちゃおう、ぐらいの勢いがある時はこちらです。

```
docker system prune -a
```

## Box Drive などのクラウドドライブとの相性

Docker Desktop を利用する際には、Box Drive などのクラウド連携のツールを入れている際に、Docker for Windows が正しく動作しないことがあります。よくあるエラーメッセージは以下の通りです。

```
hcsshim::PrepareLayer - failed failed in win32 : Incorrect function. (0x1)
```

C:\Windows\System32\drivers\ の配下にある `cbfsconnect2017.sys` および `cbfs6.sys` などのファイルが影響を与えています。回避方法としては Box Drive を開発用のマシンにインストールしない、もしくは一時的に上記のファイルを削除して再起動する、などの手順が必要となります。

cbfs のドライバ自体は最新版では問題なく動作するようですが、まだ多くのクラウドドライブのツールで利用していないのが現状です。

## 停止と再起動

一度起動した環境に関しては、停止、再起動をすることで短時間で環境を立ち上げることができます。

停止の場合は

```
docker-compose stop
```

再起動の場合は

```
docker-compose up -d
```

となります。

## エラーメッセージ

以下のエラーメッセージが表示される。

```
Error response from daemon: Unrecognised volume spec: file '\\.\pipe\docker_engine' cannot be mapped. Only directories can be mapped on this platform
```

これは docker-compose のコマンドが v2 に設定されていることが原因です。Docker の管理画面で、v2 をオフにしてください。

![sample](/static/images/2022/05/docker12.png)

## その他

公式サイトにもいくつか Tips が記載されています。

- [Docker のトラブルシューティング](https://doc.sitecore.com/xp/ja/developers/101/developer-tools/troubleshooting-docker.html)

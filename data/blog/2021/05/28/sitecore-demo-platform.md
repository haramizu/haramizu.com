---
title: Sitecore Demo Platform を動かす 
date: '2021-05-28'
lastmod: '2021-05-28'
tags: ['Sitecore','デモ']
draft: false
summary: Sitecore のデモ環境である Sitecore.Demo.Platform のソースコードを利用して、デモ環境を立ち上げたいと思います。環境はすでに Windows Server で Docker の環境を整える まで終わっていることを想定して進めていきます。
images: ['/static/images/2021/05/docker09.png)']
---

Sitecore のデモ環境である Sitecore.Demo.Platform のソースコードを利用して、デモ環境を立ち上げたいと思います。環境はすでに [Windows Server で Docker の環境を整える](/blog/2021/05/22/Windows-Server-Docker) まで終わっていることを想定して進めていきます。

## セットアップの準備

まず最初に、リポジトリのクローンを作成する必要があります。以下の URL が対象となるリポジトリとなります。

* https://github.com/Sitecore/Sitecore.Demo.Platform

今回は c:\projects\sitecore.demo.platform にリポジトリのクローンを準備します。 C:\projects に移動をして以下のコマンドを実行します。

```powershell
git clone https://github.com/Sitecore/Sitecore.Demo.Platform.git
```

![Git](/static/images/2021/05/git01.png)

また、利用するライセンスファイルを c:\licence のフォルダにコピーします。

```
c:\licence\licence.xml
```

これで準備が完了しました。

## デモ環境を展開する

Docker で展開するために便利な SitecoreDockerTools のインストール、ライセンスファイルを環境に合わせてスクリプトを動かす、などが通常であれば必要ですが、クローンを作成したリポジトリには init.ps1 というスクリプトがあり、一気に設定を変更することができます。

まずリポジトリをコピーしたディレクトリに移動して、以下のコマンドを実行してください。ライセンスファイルを今回とは別の別のパスにおいている場合は、書き換えて実行してください。

```powershell
.\init.ps1 -InitEnv -LicenseXmlPath C:\license\license.xml -AdminPassword b
```

![init.ps1 を実行する](/static/images/2021/05/docker05.png)

途中で mkcert のコマンドを実行するにあたり、ダイアログが表示されます。今回は **はい** をクリックしてください。しばらくすると、スクリプトの実行が完了となります。

これでデモ環境を立ち上げるための基本的な設定が完了したことになります。

あとは Docker に関する手順を進めていきます。まず、Docker のイメージをダウンロードします。

```powershell
docker-compose pull
```

![docker-compose pull](/static/images/2021/05/docker07.png)

エラーが出た場合も、もう一度 pull を実行することで完了させてください。

続いて、コンテナを起動します。以下のコマンドでコンテナが動きます。

```powershell
docker-compose up -d
```

エラーが出た場合も、もう一度実行することで全てのコンテナが動くようになります。

![docker-compose up -d](/static/images/2021/05/docker08.png)

初回起動に関しては、データをインポートするのに時間がかかります。以下のコマンドで、インポートの状況を確認してください。

```powershell
docker-compose logs -f init
```

最後に以下の行が表示されれば、インポートが完了となります。

```powershell
init_1                 |       3/3/2021 9:02:51 AM No jobs are running. Monitoring stopped.
```

![Monitoring stopped](/static/images/2021/05/docker09.png)

## デモ環境にアクセスする

Web サイトの URL は標準では以下のようになっています。 cm サーバーにログインをするパスワードは、 init.ps1 で設定したパスワードとなります。

* https://cd.lighthouse.localhost
* https://cm.lighthouse.localhost/sitecore

![demo](/static/images/2021/05/docker10.png)

![demo](/static/images/2021/05/docker11.png)

今回は、CD サーバー、CM サーバーが別れた形の設定になっているのがわかると思います。

## まとめ

Docker を利用していることで、色々なインストールをする手順を省略するためにイメージのダウンロード、そして展開が可能となります。今回の動作環境であれば、CD と CM が別れて、SQL Server も立ち上がって、という感じで複数のインスタンスに別れた構成の Sitecore を動かすことができました。

## 補足

デモ環境を日本語化するための手順を、別の記事で記載しました。参考にしてください。

* [Sitecore Demo Platform - デモの日本語化](/blog/2021/06/29/lighthouse-ja)
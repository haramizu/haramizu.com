---
title: GitHub のリポジトリに反映させる
date: '2022-12-08'
tags: ['XM Cloud']
draft: false
summary: ローカルで開発をしたものを、GitHub を通じて反映させることが可能です。今回は、ローカルで少しだけアイテムの変更をして、GitHub のリポジトリを通じて SaaS 環境の XM Cloud に反映させる手順を紹介します。
images: ['/static/images/2022/12/github04.png']
---

ローカルで開発をしたものを、GitHub を通じて反映させることが可能です。今回は、ローカルで少しだけアイテムの変更をして、GitHub のリポジトリを通じて SaaS 環境の XM Cloud に反映させる手順を紹介します。

## ローカルの環境を GitHub に反映させる

手元のアイテムのデータなども含めて、他の開発者も使うことができるようにシリアライズを実施したデータが含まれる形として反映させたいと思います。まず、ローカルのデータを確実にシリアライズするために、Sitecore CLI を利用してローカルにログインをします。

```
dotnet sitecore login -n default
```

ログインが完了したあと、シリアライズでデータを反映させます。

```
dotnet sitecore ser pull
```

今回は、１つのアイテムが反映されていることがわかります。

![github](/static/images/2022/12/github01.png)

## アプリケーション名の確認

GitHub のリポジトリに反映させる前に、今回の Next.js のアプリ名を変更したいと思います。この記述は `src\sxastarter\package.json` のファイルに記載があり、以下のような記述になっています。

```json
{
  "name": "sxastarter",
  "description": "Application utilizing Sitecore JavaScript Services and Next.js",
  "version": "21.0.0",
  "private": true,
  "config": {
    "appName": "sxastarter",
```

今回はサイトの名前を `sxastarter` にしているためそのままで進めていきますが、別の名前で website を作成している時はここの値を２箇所、変更してください。

## GitHub に反映させる

GitHub Desktop を改めて立ち上げると以下のような形で変更されているコードの確認ができます。

![github](/static/images/2022/12/github02.png)

このうち、`.env` ファイルにはパスワードの記載などもあるため反映をせずに進めていきます。なお削除後に起動をしたい場合は、 init.ps1 を実行することで各種パラメータが変わります。反映させるブランチが development であること、また XM Cloud Deploy の画面で作成した環境と連携しているブランチも同様になっていることを確認した上で、コミットをしてコードの反映をしてください。

XM Cloud Deploy にアクセスをすると、新しいコードをベースに展開が実行されていることがわかります。

![github](/static/images/2022/12/github03.png)

## 展開後を確認する

新しく起動した XM Cloud にアクセスをすると、新しいコードをベースとした Sitecore の環境が起動していることがわかります。

![github](/static/images/2022/12/github04.png)

新しいコンポーネントを作ったりした場合は、コードを展開してサーバー環境でも利用できるようにする必要が出てきます。

## ローカルの環境をリセットする

手元の環境を一度リセットをして、再度起動した場合に同じ環境が立ち上がるのを確認します。まず最初に、起動しているコンテナを落とします。

```
docker-compose down
```

Docker で利用しているデータに関して、実は docker のフォルダの中に集約されています。このため、このフォルダに入っているデータをクリアすると、XM Cloud の初期起動ができるようになります。

```
cd docker
clean.ps1
```

![github](/static/images/2022/12/github05.png)

あとは、以前に紹介したように初期化（ .env ファイルが更新されます）して、起動します。

```
.\init.ps1 -InitEnv -LicenseXmlPath "C:\projects\license\license.xml" -AdminPassword "DesiredAdminPassword"
.\up.ps1
```

実はこの up.ps1 のスクリプトの中で、Sitecore CLI の初期化、およびシリアライズされているデータがあればインポートをする処理が記載されています。

```powershell
# Rebuild indexes
Write-Host "Rebuilding indexes ..." -ForegroundColor Green
dotnet sitecore index rebuild

Write-Host "Pushing Default rendering host configuration" -ForegroundColor Green
dotnet sitecore ser push
```

このように、シリアライズしたデータを GitHub に反映させておくことで、新しい環境で改めて開発を簡単に実行できることがわかります。

![github](/static/images/2022/12/github06.png)

## まとめ

今回はローカルの環境で使えるようになった XM Cloud の環境を、GitHub に反映させて、他の環境でも使えるのかどうか、という点を紹介しました。また、今回は環境を初期化する手順も紹介していますので、環境をクリーンな状況に戻したい、もしくはシリアライズした新しいデータを手に入れたので Master データベースを初期したい、などの時に使える Tips にもなるかと思います。

上記の内容をダイジェストで紹介している動画を YouTube にアップしています。参考にしてください。

[![](https://img.youtube.com/vi/_vxO713dGvA/0.jpg)](https://www.youtube.com/watch?v=_vxO713dGvA)

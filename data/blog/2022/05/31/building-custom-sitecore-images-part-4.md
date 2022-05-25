---
title: Sitecore Docker カスタムイメージの利用 - Sitecore Management Services のインストール
date: '2022-05-31'
tags: ['Docker', 'Sitecore CLI']
draft: true
summary: カスタムイメージに対して、 Sitecore CLI でアクセスをして作業をすることができるように、Sitecore Management Services を追加したいとおもいます。この機能が CM サーバーに入っていない場合は、Sitecore CLI を利用することができません。今回はコンテナでの設定に関して説明をしていきますが、そのほかの環境に関してはパッケージを利用してインストールをしてください。
images: ['/static/images/2022/05/customimage21.png']
---

カスタムイメージに対して、 Sitecore CLI でアクセスをして作業をすることができるように、Sitecore Management Services を追加したいとおもいます。この機能が CM サーバーに入っていない場合は、Sitecore CLI を利用することができません。今回はコンテナでの設定に関して説明をしていきますが、そのほかの環境に関してはパッケージを利用してインストールをしてください。

## Sitecore CLI の設定

まず最初に、Sitecore CLI を現在のプロジェクトで利用できるように、設定を進めていきます。詳しい設定の手順は以下のページに記載しています。

- [Sitecore CLI のインストール](/blog/2022/05/17/install-sitecore-cli)

今回は以下のコマンドをプロジェクトのフォルダで実行をしていきます。

```
dotnet new tool-manifest
dotnet tool install Sitecore.CLI
dotnet sitecore init
dotnet sitecore plugin add -n Sitecore.DevEx.Extensibility.Serialization
dotnet sitecore plugin add -n Sitecore.DevEx.Extensibility.Publishing
```

![customimage](/static/images/2022/05/customimage17.png)

この状態で起動している Sitecore にアクセスをします。

```
dotnet sitecore login --cm https://manage.sitecoredemo.jp/ --auth https://login.sitecoredemo.jp/ --allow-write true
```

![customimage](/static/images/2022/05/customimage18.png)

ログインができました。では次のコマンドでスキーマを更新します。

```
dotnet sitecore index schema-populate
```

しかしながらエラーが表示される形となります。このエラーは、Sitecore Management Services がインストールされていない状況で発生をします。

![customimage](/static/images/2022/05/customimage19.png)

## Sitecore Management Service のインストール

インストールをするためには、CM サーバーとなるコンテナイメージを Build している `docker\build\cm\Dockerfile` のファイルにモジュールをインストールする定義を追加する必要があります。このモジュールのためのリファレンスは以下の通りです。

- [Sitecore Management Service](https://doc.sitecore.com/xp/ja/developers/101/developer-tools/sitecore-module-reference.html#sitecore-management-services)

この情報を、プロジェクトの設定ファイルに入れていきます。

まず最初に `.env` ファイルに、以下の１行を追加してください。イメージリポジトリを設定する形です。

```
MANAGEMENT_SERVICES_VERSION=4.1-1809
```

これは定義を `.env` に記載しているだけなので、docker-compose はどのインスタンスに入れるべきか判断することができません。今回は `docker-compose.override.yml` のファイルに１行追加してください。

```yml:docker-compose.override.yml
  cm:
    build:
      args:
        MANAGEMENT_SERVICES_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-management-services-xm1-assets:${MANAGEMENT_SERVICES_VERSION}
```

最後に、docker\build\cm\Dockerfile ファイルを更新します。これも上記のリファレンスにあるコードをそのまま参照している形です。

```yml:docker\build\cm\Dockerfile
ARG MANAGEMENT_SERVICES_IMAGE

FROM ${MANAGEMENT_SERVICES_IMAGE} AS management_services

# Copy the Sitecore Management Services Module
COPY --from=management_services C:\module\cm\content C:\inetpub\wwwroot
```

上記の設定が完了したところで、cm のイメージを再度ビルドします。

```
docker-compose build cm
```

これで Sitecore Management Service がインストールされたイメージが出来上がりました。コンテナを起動します。

```
docker-compose up -d
```

![customimage](/static/images/2022/05/customimage20.png)

モジュールが正しくインストールできているか、ログインのあとコマンドを実行します。なお、前回サーバー名などを入れてログインに成功していれば、 `.sitecore\user.json` のファイルのサーバー名など記載されているため、シンプルにログインだけで進めることができます。

```
dotnet sitecore login
dotnet sitecore index schema-populate
```

![customimage](/static/images/2022/05/customimage21.png)

無事、Sitecore CLI を通じて Sitecore のインスタンスにアクセス、制御することができました。

## まとめ

今回は Sitecore CLI を利用するために必要となる Sitecore Management Services をイメージに含める手順を紹介しました。一度定義したものを作成しておけば比較的簡単に追加することができるのを確認しました。

## 参考情報

- [Sitecore Docker シリーズ](/blog/sitecore-docker)

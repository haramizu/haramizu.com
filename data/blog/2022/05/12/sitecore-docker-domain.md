---
title: Sitecore XM1 で起動しているドメインを変更する
date: '2022-05-12'
tags: ['Docker', 'Sitecore']
draft: true
summary: コンテナで稼働している Sitecore の環境に対して、自己証明書ではなくワイルドカード証明書を利用してサイトを立ち上げる手順を紹介します。これにより、実際の運用に近い形を手元で再現することが可能となります。
images: ['/static/images/2022/05/domain05.png']
---

コンテナで稼働している Sitecore の環境に対して、自己証明書ではなくワイルドカード証明書を利用してサイトを立ち上げる手順を紹介します。これにより、実際の運用に近い形を手元で再現することが可能となります。

なお、この手順は以前にも Windows Server 2019 での検証で紹介していましたが、改めて紹介する形です。

## 起動しているコンテナを削除する

前回動かしていたコンテナを止める必要がありますが、ドメイン名などを変更することになるため、設定が変わる形です。このため、コンテナを一度削除するために、以下のコマンドを実行します。

```
docker-compose down
```

![domain](/static/images/2022/05/domain01.png)

## ドメイン設定の準備

Let's Encript で作成したワイルドカード証明書を今回は利用します。作り方に関してはさまざまなブログで紹介されていますので、確認をしてください。今回は **sitecoredemo.jp** というドメイン名とします。

証明書の pfx ファイルを C:\projects\license の中に入れておきます。

このファイルから crt ファイル、key ファイルを生成する必要があります。ファイルを生成するために、OpenSSL のコマンドをインストールします。インストールは chocoretly をインストールしているのであれば、以下のコマンドでインストールができます。

```
choco install openssl
```

![domain](/static/images/2022/05/domain02.png)

インストールしただけでは Path が反映されないため、一度 PowerShell を落として再度立ち上げます。

## 証明書ファイルの作成、設定

すでに PFX の証明書があるので、このファイルを利用して 今回は pem ファイルを２つ作成します。以下のようにコマンドを実行していきますが、途中パスワードの入力がありますので、PFX ファイルのパスワードの入力を都度して、進めていきます。

```
cd C:\projects\xm1-sample\traefik\certs
openssl pkcs12 -in "/projects/license/sitecoredemo20220411.pfx" -clcerts -nokeys -out _wildcard.sitecoredemo.jp.pem
openssl pkcs12 -in "/projects/license/sitecoredemo20220411.pfx" -nocerts -nodes -out _wildcard.sitecoredemo.jp-key.pem
```

![domain](/static/images/2022/05/domain03.png)

続いて証明書を指定しているファイル、 `C:\projects\xm1-sample\traefik\config\dynamic\certs_config.yaml` の中身を以下のように書き換えます。

```
tls:
  certificates:
    - certFile: C:\etc\traefik\certs\_wildcard.sitecoredemo.jp.pem
      keyFile: C:\etc\traefik\certs\_wildcard.sitecoredemo.jp-key.pem
```

![domain](/static/images/2022/05/domain04.png)

## ドメインの変更

ドメインの設定に関しては、`.env` ファイルに以下のように記載されています。

```
CD_HOST=xm1cd.localhost
CM_HOST=xm1cm.localhost
ID_HOST=xm1id.localhost
```

これを今回は以下のように変更します。

```
CD_HOST=xm1cd.sitecoredemo.jp
CM_HOST=xm1cm.sitecoredemo.jp
ID_HOST=xm1id.sitecoredemo.jp
```

これらのホスト名を追加するために、以下のコマンドも実行してください。

```ps1
Add-HostsEntry "xm1cd.sitecoredemo.jp"
Add-HostsEntry "xm1cm.sitecoredemo.jp"
Add-HostsEntry "xm1id.sitecoredemo.jp"
```

これで準備完了となります。

## Sitecore を起動する

上記の設定が完了している状況で、コンテナを起動します。

```
docker-compose up -d
```

しばらくすると全てのコンテナが起動してアクセスできるようになります。まず最初に、 https://xm1cm.sitecoredemo.jp にアクセスをします。

![domain](/static/images/2022/05/domain05.png)

管理画面にアクセスするために /sitecore を追加するとログイン画面が表示されて、ログインをすると管理画面が表示されました。

![domain](/static/images/2022/05/domain06.png)

## まとめ

今回は証明書を利用して、ブラウザの自己証明書の時のエラーを回避する方法を紹介しました。自己証明書を利用するのは手軽ではある一方、環境を作る必要があったり、検証をする上で一手間がかかることが多いのが実情です。開発用で使える正式な証明書を準備しておくことで、細かいトラブルを回避することが可能となります。

## 参考情報

- [Sitecore 10 を Docker で実行する - XP1 とドメインの設定](/blog/2020/12/14/sitecore-docker-xp1)

---
title: Sitecore 10 を Docker で実行する - XP1 とドメインの設定
author: Shinichi Haramizu
author_title: Sitecore Japan
author_url: https://haramizu.jp/
author_image_url: https://avatars3.githubusercontent.com/u/5026348?s=400&v=4
tags: [Sitecore containers, Docker]
description: Sitecore Experience Platform 10.0 において対応を始めた Docker 対応、前回は XP0 の環境を立ち上げる手順を紹介しました。今回は、XP1 の環境とドメイン名の設定の変更をしてみます。
slug: 2020/12/14/sitecore-docker-xp1
---

---
title: Sample .md file
date: '2016-03-08'
tags: ['markdown', 'code', 'features']
draft: false
summary: Example of a markdown file with code blocks and syntax highlighting
---

Sitecore Experience Platform 10.0 において対応を始めた Docker 対応、前回は XP0 の環境を立ち上げる手順を紹介しました。今回は、XP1 の環境とドメイン名の設定の変更をしてみます。

## 前回のおさらい

前回紹介をした記事 [Sitecore 10 を Docker で実行する](2020-12-11-sitecoredemo.md) では、XP0 の環境を立ち上げました（ CM と CD が同じ）。ドメイン名としては localhost というドメインで設定を進めたため、証明書は独自証明書を作成、利用して、テスト環境を立ち上げた形になります。

今回は前回作成した環境を利用することを前提としつつ、トポロジーのとこなる XP1 （ CM と CD は別）の環境をワイルドカードの証明書を適用する手順を紹介します。また前回説明していることは省略してコマンドを書いていきます。

## 環境設定

前回、展開したフォルダと箱隣今回は xp1 の構成を利用するため、 C:\projects\compose\ltsc2019\xp1 のフォルダの中で作業を進めていきます。.env ファイルは以下のようになっています。

```
COMPOSE_PROJECT_NAME=sitecore-xp1
SITECORE_DOCKER_REGISTRY=scr.sitecore.com/sxp/
SITECORE_VERSION=10.0.0-ltsc2019
SITECORE_ADMIN_PASSWORD=
SQL_SA_PASSWORD=
REPORTING_API_KEY=
TELERIK_ENCRYPTION_KEY=
SITECORE_IDSECRET=
SITECORE_ID_CERTIFICATE=
SITECORE_ID_CERTIFICATE_PASSWORD=
SITECORE_LICENSE=
CD_HOST=xp1cd.localhost
CM_HOST=xp1cm.localhost
ID_HOST=xp1id.localhost
TRAEFIK_IMAGE=traefik:v2.2.0-windowsservercore-1809
TRAEFIK_ISOLATION=hyperv
ISOLATION=default
```

表にすると以下のようになります。違いとしては、COMPOSE_PROJECT_NAME が異なる（ XP0 と XP1 の違い）と **CD_HOST** と **REPORTING_API_KEY** の項目が追加されているだけです。

| パラメーター 	| 値 	|
|-	|-	|
| COMPOSE_PROJECT_NAME 	| sitecore-xp1 	|
| SITECORE_DOCKER_REGISTRY 	| scr.sitecore.com/sxp/ 	|
| SITECORE_VERSION 	| 10.0.0-ltsc2019 	|
| SITECORE_ADMIN_PASSWORD 	|  	|
| SQL_SA_PASSWORD 	|  	|
| REPORTING_API_KEY 	|  	|
| TELERIK_ENCRYPTION_KEY 	|  	|
| SITECORE_IDSECRET 	|  	|
| SITECORE_ID_CERTIFICATE 	|  	|
| SITECORE_ID_CERTIFICATE_PASSWORD 	|  	|
| SITECORE_LICENSE 	|  	|
| CD_HOST 	| xp1cd.localhost 	|
| CM_HOST 	| xp1cm.localhost 	|
| ID_HOST 	| xp1id.localhost 	|
| TRAEFIK_IMAGE 	| traefik:v2.2.0-windowsservercore-1809 	|
| TRAEFIK_ISOLATION 	| hyperv 	|
| ISOLATION 	| default 	|


REPORTING_API_KEY は 64文字〜128文字までのランダムなキーを設定することになります。ここでは以下のコマンドを追加します。

```powershell
Set-DockerComposeEnvFileVariable "REPORTING_API_KEY" -Value (Get-SitecoreRandomString 128 -DisallowSpecial)
```

Sitecore でデモサイトでよく利用している cmsdemo.jp のドメイン名を利用していきます。ということで、以下の項目を 3 つ変更します。

```
CD_HOST=xp1cd.cmsdemo.jp
CM_HOST=xp1cm.cmsdemo.jp
ID_HOST=xp1id.cmsdemo.jp
```

cmsdemo.jp に関しては、ワイルドカードの証明書を Let's encrypt を利用して作成しています。それでは Identity Server の項目以外は、前回の記事を参考にして設定を進めていきます。

Add-HostsEntry "xp1cd.cmsdemo.jp"
Add-HostsEntry "xp1cm.cmsdemo.jp"
Add-HostsEntry "xp1id.cmsdemo.jp"

環境設定に関しては、前回との違いは上記だけです。それ以外は同じ手続きで進めてください。

## 証明書の準備

前回は mkcert を利用して証明書を作成しましたが、正式な証明書を利用していきます。

### OpenSSL コマンドのインストール

今回、用意をしている証明書のファイルは **cmsdemo20201124.pfx** という pfx 型式のファイルで、パスワードが設定されている形です。このままでは Docker の環境で利用できないため、PFX 型式のファイルからキーと証明書を出力するために、OpenSSL をインストールします。

インストールは、今回も choco のコマンドを使いましょう。

```
choco install openssl
```

![OpenSSL](img/2020/12/openssl.gif "OpenSSL")

インストールが完了すると、Path が変更されたというメッセージが表示されているので、一度 PowerShell の画面を閉じて、別のウィンドウで新しく立ち上げてください。これで、Openssl のコマンドを利用できるようになります。

### PEM ファイルの作成

まず、cmsdemo20201124.pfx のファイルを c:¥projects のフォルダにコピーをします。

続いて、ファイルを作成するフォルダに移動して、以下のようにコマンドを実行していきます。

```powershell
cd C:\projects\compose\ltsc2019\xp1\traefik\certs
openssl pkcs12 -in "/projects/cmsdemo20201124.pfx" -clcerts -nokeys -out _wildcard.cmsdemo.jp.pem
openssl pkcs12 -in "/projects/cmsdemo20201124.pfx" -nocerts -nodes -out _wildcard.cmsdemo.jp-key.pem
```

Openssl のコマンドを実行すると、pfx のパスワードを入力する画面になりますので、パスワードを都度入れてください。

![OpenSSL](img/2020/12/createpem.png "OpenSSL")

続いて、C:\projects\compose\ltsc2019\xp1\traefik のフォルダの下にある config\dynamic フォルダに設定ファイル certs_config.yaml があります。これを以下の様に書き換えてください。

```yaml
tls:
  certificates:
    - certFile: C:\etc\traefik\certs\_wildcard.cmsdemo.jp.pem
      keyFile: C:\etc\traefik\certs\_wildcard.cmsdemo.jp-key.pem
```

![cert config](img/2020/12/certconfig.png "cert config")

## Sitecore を起動する

準備が完了したので、コンテナを起動しましょう。

```powershell
docker-compose up -d
```

前回は XP0 のイメージを利用していたため、改めて XP1 のイメージをダウンロードしていきます。共通している部分もあるため、前回ほど時間はかからないでしょう。

起動が完了すると、以下のように複数のコンテナが起動していることがわかります。

![コンテナの起動](img/2020/12/xp1.png "コンテナの起動")

設定している証明書が有効になっているかどうか、アクセスをして確認をします。

1. https://xp1cm.cmsdemo.jp にアクセスします
2. Welcome ページが表示されているのを確認します
3. 証明書が設定されているか確認をします（ブラウザの鍵をクリックすると見れます）

    ![証明書の確認](img/2020/12/welcomecms.png "証明書の確認")

4. /sitecore を URL に追加して管理画面にログインをします
5. ログイン画面で証明書が有効であることを確認します

    ![証明書の確認](img/2020/12/welcomecms2.png "証明書の確認")


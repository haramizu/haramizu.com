---
title: Sitecore Docker カスタムイメージの利用 - 初期設定
date: '2022-05-25'
tags: ['Docker']
draft: false
summary: これまでサンプルの Docker のイメージを起動して動作検証をしている形でしたが、実際には必要となるモジュールの入っているイメージを作成していくことになります。今回はサンプルから自分で利用したいカスタムイメージを作成していきます。
images: ['/static/images/2022/05/customimage06.png']
---

これまでサンプルの Docker のイメージを起動して動作検証をしている形でしたが、実際には必要となるモジュールの入っているイメージを作成していくことになります。今回はサンプルから自分で利用したいカスタムイメージを作成していきます。

## Docker のサンプル

カスタムイメージのサンプルは、以下のリポジトリにて展開しています。

- [Sitecore Docker Examples](https://github.com/Sitecore/docker-examples)

このリポジトリをダウンロードします。

![customimage](/static/images/2022/05/customimage01.png)

`C:\projects\docker-examples\custom-images` のフォルダを `C:\projects\sitecoredemo-jp` とコピーをして、これからの作業はこのフォルダで作業をします。

## 設定ファイルの作成

`.env` ファイルを作成するために、まずは `init.ps1` を実行します。これまでと同様、一度実行したあとは .env ファイルを変更していきます。このサンプルの init.ps1 は管理者パスワードは埋め込まれているため、ライセンスファイルだけ指定します。

```ps1
.\init.ps1 -LicenseXmlPath C:\projects\license\license.xml
```

![customimage](/static/images/2022/05/customimage02.png)

`.env` ファイルで必要となる項目にスクリプトが設定をしていきます。まずはホスト名を変更していきます。今回は以下のように変更をします。

```
CD_HOST=cd-demo.sitecoredemo.jp
CM_HOST=manage-demo.sitecoredemo.jp
ID_HOST=login-demo.sitecoredemo.jp
HRZ_HOST=edit-demo.sitecoredemo.jp
```

host ファイルに対してもこのドメインを追加していきます。

```
Add-HostsEntry "cd-demo.sitecoredemo.jp"
Add-HostsEntry "manage-demo.sitecoredemo.jp"
Add-HostsEntry "login-demo.sitecoredemo.jp"
Add-HostsEntry "edit-demo.sitecoredemo.jp"
```

以下の項目に関しても、デフォルトの値から変更をしてください。

```
SITECORE_ADMIN_PASSWORD
SQL_SA_PASSWORD
```

また証明書に関しても以前と同じものを用意します。フォルダ **C:\projects\sitecoredemo-jp\docker\traefik\certs** に、ファイルをコピーします。

![customimage](/static/images/2022/05/customimage03.png)

```yaml:C:\projects\sitecoredemo-jp\docker\traefik\config\dynamic\certs_config.yaml
tls:
  certificates:
    - certFile: C:\etc\traefik\certs\_wildcard.sitecoredemo.jp.pem
      keyFile: C:\etc\traefik\certs\_wildcard.sitecoredemo.jp-key.pem
```

## XM のイメージを実行

サンプルには XP および XM を起動できるサンプルのファイルが含まれています。今回は xm1 の構成で起動するため、以下のようにファイルを指定して起動します。

```ps1
docker-compose -f docker-compose.xm1.yml -f docker-compose.xm1.override.yml up -d
```

![customimage](/static/images/2022/05/customimage04.png)

イメージのビルドなども含めて時間がかかりますので、しばらく飲み物を飲みながら待ってください。

![customimage](/static/images/2022/05/customimage05.png)

## サンプルサイトにアクセスをする

上記でコンテナが全て起動したところで、サイトにアクセスをしてください。まずは管理サーバーにアクセスすると、以下のように表示されます。

![customimage](/static/images/2022/05/customimage06.png)

ログインをすると管理画面が表示されます。

![customimage](/static/images/2022/05/customimage07.png)

無事、起動しました。

## まとめ

今回はサンプルをベースに起動するところまで実行していきました。次回は、不要な部分を削って実際のプロジェクトのベースにできるようにカスタマイズをしていきます。

## 参考情報

- [Sitecore Docker シリーズ](/blog/sitecore-docker)
- [カスタム Sitecore イメージの作成](https://doc.sitecore.com/xp/ja/developers/101/developer-tools/building-custom-sitecore-images.html)

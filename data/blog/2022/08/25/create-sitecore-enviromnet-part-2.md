---
title: Sitecore Headless 開発、テスト環境の構築 Part 2 - サーバーの準備（コンテナ編）
date: '2022-08-25'
tags: ['Headless', 'Docker']
draft: true
summary: 前回はサーバーを用意しましたが、実際の作業をするのは手元でコンテナを動作させるのがポイントとなります。これまで数回に分けて実施してきた手順を整理しながら、手元で Docker ベースの Sitecore が起動する環境を準備していきたいと思います。
images: ['/static/images/2022/08/docker06.png']
---

前回はサーバーを用意しましたが、実際の作業をするのは手元でコンテナを動作させるのがポイントとなります。これまで数回に分けて実施してきた手順を整理しながら、手元で Docker ベースの Sitecore が起動する環境を準備していきたいと思います。

なお、以前に紹介した記事と全く同じ手順で進めていくため詳細は省いています。

- [Sitecore Docker カスタムイメージの利用 - 初期設定](/blog/2022/05/26/building-custom-sitecore-images-part-1)

## プロジェクトの作成

今回のプロジェクトのファイルは、GitHub で Sitecore が公開している Docker のサンプルをベースに作業を進めていきます。まず以下のリポジトリの中の custom-images ダウンロードして、`C:\projects\Sitecoredemo.Docker` に展開します。

- https://github.com/Sitecore/docker-examples

![install](/static/images/2022/08/docker01.png)

プロジェクトの名前を変更するために、`.env` ファイルの COMPOSE_PROJECT_NAME を以下のように変更します。

```
COMPOSE_PROJECT_NAME=sitecoredemo-docker
```

今回はローカルで動かすホスト名に関しても変更したいと思いますので、`init.ps` ファイルを開いて以下の部分を修正しました。また Sitecore の管理者、データベースの管理者のパスワードも変更してください（以下のパスワードは例です）。

```powershell
    [string]
    $HostName = "sitecoredemo",

    [string]
    $SitecoreAdminPassword = "D05f2F%*l6Vb",

    [string]
    $SqlSaPassword = "0pj7uM3jxF%n"
```

このカスタムイメージには不要なコンテナのデータなどが入っているため、以下のようにファイルの整理をしてください。

- docker-compose.xm1.* のファイルを残して docker-compose ファイルの削除。
- docker-compose.xm1.yml のファイルを docker-compose.yml に変更
- docker-compose.xm1.override.yml のファイルを docker-compose.override.yml に変更
- docker/build のフォルダにある cortex*、prc、rep、xconnect、xdb* のフォルダごと削除
- docker/deploy/xconnect のフォルダを削除
- src のフォルダからは DockerExamples.Website 以外のフォルダを削除

この段階で Visual Studio のプロジェクトのファイルも影響が出てくるため、以下のように手続きを進めていきます。

- DockerExamples.sln のプロジェクトを開く
- 読み込めないプロジェクト、ファイルを削除していく（下画面は削除前）

![install](/static/images/2022/08/docker04.png)

整理が終わったプロジェクトを一度 build しておきます。

![install](/static/images/2022/08/docker05.png)

最後に、`Docker` ファイルから関連するビルドのコマンドを削除しておきます。以下の行をコメントアウトします。

```
RUN msbuild .\src\DockerExamples.XConnect\DockerExamples.XConnect.csproj /p:Configuration=$env:BUILD_CONFIGURATION /p:DeployOnBuild=True /p:DeployDefaultTarget=WebPublish /p:WebPublishMethod=FileSystem /p:PublishUrl=C:\out\xconnect

COPY --from=builder C:\out\xconnect .\xconnect\
```

## プロジェクトの初期化

下準備が終わったところで、以下のようにプロジェクトの初期化を実施します。初期化は Sitecore Docker Tool を利用しているため、管理者権限で以下のスクリプトを実行する必要があります。

```
.\init.ps1 -LicenseXmlPath "C:\projects\license\license.xml"
```

実行が完了すると、証明書の作成と各ホストの設定が完了して、コンテナを立ち上げることができます。

![install](/static/images/2022/08/docker02.png)

## コンテナの起動

上記の設定が完了すれば、コンテナを起動するための準備ができていることになります。起動をするのはいつもの通り以下のコマンドを実行してください。

```
docker-compose up -d
```

関連するイメージをダウンロードなどの時間がかかりますが、しばらくするとコンテナのビルド、起動が終了します。

![install](/static/images/2022/08/docker03.png)

完了した後、以下の URL にアクセスをします。

- https://cm.sitecoredemo.localhost/sitecore/

ログイン画面が表示されました。

![install](/static/images/2022/08/docker06.png)

## まとめ

コンテナを立ち上げて作業をするためのプロジェクトの作成が完了しました。次回はモジュールをインストールする手順を進めていきます。
---
title: Sitecore Docker カスタムイメージの利用 - プロジェクトの作成
date: '2022-05-25'
tags: ['Docker']
draft: false
summary: サンプルのカスタムイメージを利用して起動することができたため、今回は今後利用していく上で不要な部分や、変更するべき点について紹介をしていきます。
images: ['/static/images/2022/05/customimage12.png']
---

サンプルのカスタムイメージを利用して起動することができたため、今回は今後利用していく上で不要な部分や、変更するべき点について紹介をしていきます。

## docker-compose ファイルの整理

今回は XM1 の環境が動くイメージを作成していくことを想定しているため、docker-compose のコマンドを実行する時に毎回ファイルを指定するのは面倒なのでファイル名を変更していきます。まず、以下のファイルを削除してください。

```
docker-compose.override.yml
docker-compose.xp1.override.yml
docker-compose.xp1.yml
docker-compose.yml
```

続いて、以下のファイルから .xm1 の部分を削除してください。

```
docker-compose.xm1.override.yml
docker-compose.xm1.yml
```

## docker イメージの削除

カスタムイメージには XP を実行するにあたって必要なイメージをビルドするための定義が含まれています。残しておくメリットは特にないので、以下のフォルダに関して削除をしていきます。

```
docker\build\cortexprocessing
docker\build\cortexprocessingworker
docker\build\cortexreporting
docker\build\prc
docker\build\rep
docker\build\xconnect
docker\build\xdbautomation
docker\build\xdbautomationrpt
docker\build\xdbautomationworker
docker\build\xdbcollection
docker\build\xdbrefdata
docker\build\xdbsearch
docker\build\xdbsearchworker
```

結果、随分とスッキリしました。

![customimage](/static/images/2022/05/customimage08.png)

## プロジェクトファイルの削除

サンプルのコードが以下のフォルダに入っています。xConnect 関連は利用することがないので、全て削除してしまいましょう。

```
src\App.XConnect.Demo
src\App.XConnect.ModelBuilder
src\DockerExamples.XConnect
src\DockerExamples.XConnect.Model
```

残るのは以下の項目だけとなります。

```
src\DockerExamples.Website
```

DockerExamples.sln ファイルを Visual Studio で開きます。削除されたプロジェクトが無効になっているため、これを削除します。

![vs](/static/images/2022/05/vs01.png)

## Docker ファイルの調整

Docker ファイルには、上記のプロジェクトを Build する手続きが入っているため、Build をする部分を削除します。具体的には、以下の行をコメントアウトする形です。

```
RUN msbuild .\src\DockerExamples.XConnect\DockerExamples.XConnect.csproj /p:Configuration=$env:BUILD_CONFIGURATION /p:DeployOnBuild=True /p:DeployDefaultTarget=WebPublish /p:WebPublishMethod=FileSystem /p:PublishUrl=C:\out\xconnect
```

ビルドしたデータのコピーに関しても不要となるため、以下の行もコメントアウトしておきます。

```
COPY --from=builder C:\out\xconnect .\xconnect\
```

また、以下のフォルダも不要ですので削除をします。

- docker\deploy\xconnect

## プロジェクトの名前を変更する

デフォルトのまま実行していくと、**docker-example** がプロジェクト名となっているため、イメージの名前もそのまま引き継がれます。この部分の変更ができるように、 `.env` ファイルの最初の１行にある **COMPOSE_PROJECT_NAME** を変更してください。今回は以下のように変更します。

```
COMPOSE_PROJECT_NAME=sitecoredemo-jp
```

## イメージを削除する

これまで、いくつかのサンプルを動かしたりしていたため、その都度作成されていたイメージが多く作成されている状況です。

![customimage](/static/images/2022/05/customimage09.png)

今回は強制的に全部消したいとおもますので、以下のコマンドを実行します。

```
docker system prune -a
```

全てのイメージが削除されました。40GB 近くクリーンナップできた形です。

![customimage](/static/images/2022/05/customimage10.png)

プロジェクト単位でイメージを削除する場合は以下のコマンドでも問題ありません。

```
docker-compose down --rmi all --volumes --remove-orphans
```

## データベース、Solr のファイルを削除する

今回はプロジェクト名を変更したりしているため、SQL Server のデータベースファイルに関しては改めて作成する形にします。Docker 環境で、停止したり再起動してもデータを保持することを想定して、**docker\data\mssql** のフォルダにデータベースファイルがあります。

同様に、Solr のフォルダ **docker\data\solr** にあるファイルも削除します。

一度立ち上げた場合は、どちらも以前の環境に合わせたデータが作成されているため、削除をしておきましょう。

## 新しいプロジェクトを起動する

不要なものを削除したあと、起動することを確認しましょう。ということで、以下のコマンドを実行します。

```
docker-compose up -d
```

イメージのダウンロードから再度実行することになりますので、ここでもまた時間がかかります。飲み物を飲みながら眺めておきましょう。

![customimage](/static/images/2022/05/customimage11.png)

起動したあとログインができれば、ベースとなるイメージができた形です。

![customimage](/static/images/2022/05/customimage12.png)

## まとめ

今回はカスタムイメージに関して、必要な部分だけを残したプレーンな XM1 を起動する仕組みまで進めていきました。まだ綺麗な XM1 の環境が準備できただけですので、今回作成をした環境をベースに 今後の Docker に関する記事は紹介していきます。

## 参考情報

- [Sitecore Docker シリーズ](/blog/sitecore-docker)

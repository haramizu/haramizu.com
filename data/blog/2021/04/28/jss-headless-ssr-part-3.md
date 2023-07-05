---
title: Sitecore JSS - Headless SSR - Part.3
date: '2021-04-28'
tags: ['JSS', 'React', 'Headless']
draft: true
summary: Headless SSR の動作に関して紹介をしていきました。これを手元で簡単に利用できるように、3回目としては Docker のコンテナを作成して利用する方法を紹介します。
images: ['/static/images/2021/04/docker12.png']
---

Headless SSR の動作に関して紹介をしていきました。これを手元で簡単に利用できるように、3 回目としては Docker のコンテナを作成して利用する方法を紹介します。

## Docker の環境を整える

コンテナを動かすために、まずは Docker Desktop for Windows / macOS をインストールしてください。手元の環境は macOS のため、Docker Desktop for Mac で作業を進めていきます。

- [Docker Desktop](https://www.docker.com/products/docker-desktop)

![docker](/static/images/2021/04/docker01.png 'docker')

起動をすると、何度かダイアログが表示されますが、権限を与えるために必要となりますので、設定を続けてください。しばらくすると以下の画面が表示されます。

![docker](/static/images/2021/04/docker02.png 'docker')

動作確認のためにチュートリアルを実行します。Start ボタンをクリックします。すると、右側にコマンドラインが、中央にチュートリアルのコマンドが表示されます。

![docker](/static/images/2021/04/docker03.png 'docker')

中央にコマンドが表示されているところをクリックすると、右側のコマンドラインにコピーされて実行します。内容は、リポジトリのクローン、そしてイメージのダウンロードです。**Next Step** のボタンをクリックします。

![docker](/static/images/2021/04/docker04.png 'docker')

新しいコマンドが中央に表示されるので、これをクリックします。しばらくすると処理が終わります。**Next Step** のボタンをクリックすると、以下の画面に切り替わります。

![docker](/static/images/2021/04/docker05.png 'docker')

コマンドを見ると、コンテナを実行することがわかります。それでは、クリックして実行し、ブラウザで http://localhost にアクセスしてください。以下のようなサイトを参照することができます。

![docker](/static/images/2021/04/docker06.png 'docker')

また、Done をクリックすると Docker コンテナが動いていることがわかります。

![docker](/static/images/2021/04/docker07.png 'docker')

ダッシュボードに切り替えると、以下の様な画面になります。

![docker](/static/images/2021/04/docker08.png 'docker')

不要であれば、作成したイメージは一番右側に表示されているゴミ箱のマークをクリックすると削除できます。これで、環境は整いました。

## Docker イメージの作成

続いて Docker のイメージを作成したいと思います。まずは Headless SSR のプロジェクトのフォルダのルートに dockerfile を作成します。コードとしては、Node.js 14 のイメージを利用するため、以下のように作成をしました。

```dockerfile
FROM node:14

WORKDIR /usr/src/react-app-cd

COPY package*.json ./

RUN  npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
```

続いて、作成するイメージにインポートをしないファイルを指定するために、**.dockerignore** のファイルを作成します。

```
node_modules
npm-debug.log
```

このタイミングで、イメージを作成します。

```
docker build . -t reactappcd
```

![docker](/static/images/2021/04/docker09.png 'docker')

docker のイメージを確認します。

![docker](/static/images/2021/04/docker10.png 'docker')

作成したイメージを利用してコンテナを動かします。

```
docker run -p 3000:3000 -d reactappcd
```

![docker](/static/images/2021/04/docker11.png 'docker')

このあと、 http://localhost:3000 にアクセスしてページが見えればコンテナが正しく動いていることになります。

![docker](/static/images/2021/04/docker12.png 'docker')

## コンテナの実行環境を作成

作成したコンテナには、build したデータが既に含まれている形です。今後、構築をしていく場合のテストとして、毎回コピーをしてイメージを作成しなおす、というのは手間になるため、プロジェクトで build したファイルを直接参照できるイメージに変更をします。

### .dockerignore の変更

react-app-cd の dist/appname にファイルをコピーしているものを、イメージに含めない形とします。

```
node_modules
npm-debug.log
dist
```

### イメージを作り直す

この状態で再度イメージを作成しなおします。

```
docker build . -t reactappcd
```

### docker-compose.xml の作成

react-app のプロジェクトに移動をして、docker-compose.xml ファイルを新規に作成し、以下のコードを記述します。

```
version: '3'
services:
  react-app-cd:
    image: reactappcd
    ports:
      - 3000:3000
    volumes:
      - type: bind
        source: ./build
        target: /usr/src/react-app-cd/dist/react-app
```

１つ手前の手順で作成をしたイメージを指定し、build のフォルダをイメージのフォルダ /usr/src/react-app-cd/dist/react-app と連携させる形となります。

ファイルの作成ができたら、以下のように実行してください。

```
docker-compose up -d
```

![docker](/static/images/2021/04/docker13.png 'docker')

コンテナが起動していれば、 http://localhost:3000 にアクセスをするとページが表示されます。

![docker](/static/images/2021/04/docker12.png 'docker')

## まとめ

Headless SSR のプロジェクトに関して、変動する部分は react-app のプロジェクトのファイルを直接参照するようにし、それ以外の部分をコンテナとして作成をしました。これにより、react-app のプロジェクトでの作業を実施、実際に build したデータの動作確認に関しては Headless SSR の仕組みを利用したコンテナを通じて、ページの表示ができるようになりました。

手元で作業をする上では jss start のコマンドで大丈夫ですが、実際に build した場合の動作確認が必要な際には、コンテナを利用することで手軽にテストができるようになりました。

---
title: Sitecore Helix の Next.js サンプルを動かす - テンプレートの変更
date: '2022-06-20'
tags: ['Next.js', 'Sitecore CLI']
draft: true
summary: Sitecore Helix のサンプルを以前動作しましたが、今回はこれまで作成してきたイメージを利用して、同じように動作する環境を準備したいと思います。
images: ['/static/images/2022/03/component06.gif']
---

Sitecore Helix のサンプルを以前動作しましたが、今回はこれまで作成してきたイメージを利用して、同じように動作する環境を準備したいと思います。

## 前提条件

## コンテンツを全てインポートできるようにする

インポートをするデータとしては、sitecore.json の以下のフォルダで module.json ファイルを指定しています。これらの関連するファイルを、helix.example のフォルダからコピーします。

```json
  "modules": ["src/*/*/*.module.json"],
```

また、データとしてはアイテムをインポートしていくため、 `defaultModuleRelativeSerializationPath` の項目を items に変更します。

```json
    "defaultModuleRelativeSerializationPath": "items",
```

対象となるアイテムは以下 json ファイルとフォルダごとコピーという形で進めていきます。

- src\Feature\BasicContent\BasicContent.module.json
- src\Feature\Navigation\Navigation.module.json
- src\Feature\Products\Products.module.json
- src\Feature\Services\Services.module.json
- src\Foundation\Multisite\Multisite.module.json
- src\Project\BasicCompany\BasicCompany.module.json
- src\Project\DemoContent\DemoContent.module.json

コピーが終わったらアイテムを展開します。下記のようにログインをして、プッシュのコマンドを実行してください（以前、ログインをしていればサーバー名などは省略できます）。

```
dotnet sitecore login
dotnet sitecore ser push
```

インポートが完了すると、コンテンツエディターからアクセスをするとサイトに必要な情報が含まれていることがわかります。

![sample](/static/images/2022/06/sample01.png)

## Node.js のコンテナを追加する

標準のサンプルには Node.js を動かすためのコンテナが用意されていません。そこで以下のフォルダにある Docker ファイルをコピーします。

docker\build\nodejs\Dockerfile
docker\build\rendering\Dockerfile

docker-compose.override.yml ファイルに以下のコードを追加します。

```
  # A Windows-based nodejs base image
  nodejs:
    image: ${REGISTRY}${COMPOSE_PROJECT_NAME}-nodejs:${VERSION:-latest}
    build:
      context: ./docker/build/nodejs
      args:
        PARENT_IMAGE: ${NODEJS_PARENT_IMAGE}
        NODEJS_VERSION: ${NODEJS_VERSION}
    scale: 0
```

同じファイルで solution: の下に以下のコードを追加します。

```
  rendering:
    image: ${REGISTRY}${COMPOSE_PROJECT_NAME}-rendering:${VERSION:-latest}
    build:
      context: ./docker/build/rendering
      target: ${BUILD_CONFIGURATION}
      args:
        PARENT_IMAGE: ${REGISTRY}${COMPOSE_PROJECT_NAME}-nodejs:${VERSION:-latest}
    volumes:
      - .\src\nextjs:C:\app
    environment:
      SITECORE_API_HOST: "http://cd"
      NEXTJS_DIST_DIR: ".next-container"
      PUBLIC_URL: "https://${RENDERING_HOST}"
      JSS_EDITING_SECRET: ${JSS_EDITING_SECRET}
    depends_on:
      - cm
      - nodejs
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.rendering-secure.entrypoints=websecure"
      - "traefik.http.routers.rendering-secure.rule=Host(`${RENDERING_HOST}`)"
      - "traefik.http.routers.rendering-secure.tls=true"
```

cm には以下のコードを追加してください。

```
  cm:
    environment:
      JSS_DEPLOYMENT_SECRET: ${JSS_DEPLOYMENT_SECRET}
      SITECORE_JSS_EDITING_SECRET: ${JSS_EDITING_SECRET}
      RENDERING_HOST_PUBLIC_URI: "https://${RENDERING_HOST}"
```

.env に必要な値を設定します。

```
# Windows and Node.js version for JSS
NODEJS_PARENT_IMAGE=mcr.microsoft.com/windows/nanoserver:1809
NODEJS_VERSION=16.15.0
JSS_EDITING_SECRET=pleasesetyourkey
RENDERING_HOST=www-demo.sitecoredemo.jp
JSS_DEPLOYMENT_SECRET=pleasesetyourkey
```

レンダリングのためのホストを追加しているため、以下のコマンドを実行して hosts ファイルを更新します（管理者権限のターミナル、PowerShell で実行してください）。

```
Add-HostsEntry "www-demo.sitecoredemo.jp"
```

最後に、サンプルにある以下のファイルを、

```
src\Project\BasicCompany\platform\App_Config\Include\Project\Project.BasicCompany.config
```

以下の名前でコピーします。

```
docker\deploy\website\App_Config\include\zzz\Project.DockerSample.config
```

このファイルの中のコードを以下のように書き換えていきます。まずは `hostName` の変更をして、

```xml
      <site name="basiccompany"
            inherits="website"
            hostName="manage-demo.sitecoredemo.jp"
            rootPath="/sitecore/content/BasicCompany"
            patch:before="site[@name='website']" />
```

続いて `deploymentSecret` を変更します。

```xml
        <app name="basiccompany"
             sitecorePath="/sitecore/content/BasicCompany"
             dictionaryDomain="{B741B17B-67B2-4DD8-A216-D092813871F0}"
             graphQLEndpoint="/sitecore/api/graph/edge"
             serverSideRenderingEngine="http"
             serverSideRenderingEngineEndpointUrl="http://rendering:3000/api/editing/render"
             serverSideRenderingEngineApplicationUrl="$(env:RENDERING_HOST_PUBLIC_URI)"
             useLanguageSpecificLayout="true"
             defaultWorkflow=""
             deploymentSecret="$(env:JSS_DEPLOYMENT_SECRET)"
             debugSecurity="false"
             inherits="defaults" />
```

Next.js のプロジェクトファイルを少し上の階層に配置したいため、 `\src\Project\BasicCompany\nextjs` のフォルダを `\src\nextjs` に移動します（ 上のコードにある rendering はすでに反映済みです )。

## 更新して確認

今回は多くの構成を変更しているので、まずは build を実行しましょう。

```
docker-compose build
```

パラメーターの設定が不足しているケースなどでエラーが出ている場合は、上記の設定を見直してください。build が完了したあと、起動します。

```
docker-compose up -d
```

コンテナが起動していることを確認できました。しかしながら、２つほどコンテナが起動していない状況です。

![sample](/static/images/2022/06/sample02.png)

これは Next.js のプロジェクトに関しての設定が不足しているためです。

## まとめ

今回は docker のコンテナとして node.js を動かすためのコンテナを構成に追加しました。とはいえ、Next.js のアプリを動かすことができていません。次回は Next.js のアプリを

## Next.js の環境を調整する

コードがコピーされているだけの状況のため、この段階では正しく動作しません。まず、ローカルで動作する手順を進めていきます。

```
cd C:\projects\sitecoredemo-jp\src\nextjs
npm install
```

これで npm コマンドが実行可能な状況にするべく必要なファイルをダウンロードして、 node_modules が構成されていきます。続いて `scjssconfig.json` のファイルを確認します。

```json
{
  "sitecore": {
    "instancePath": "..\\..\\docker\\deploy\\platform\\",
    "apiKey": "35537F26-6B0A-4A4F-8B76-02D823E4A4FE",
    "deploySecret": "dd5d764c4776459e92e1233b8cde0ab5",
    "deployUrl": "https://cm.basic-company-nextjs.localhost/sitecore/api/jss/import",
    "layoutServiceHost": "https://cm.basic-company-nextjs.localhost"
  }
}
```

`apiKey` に関しては、すでにインポートしたキーが設定されているため今回はこのまま進めていきます。API キーを作成し直したときには、キーの値を変更する必要があります。

続いて `deploySecret` の値は、すでに設定している .env ファイルの `JSS_DEPLOYMENT_SECRET` と揃えてください。

最後に `deployUrl` と `layoutServiceHost` のドメインは .env ファイルに定義している `CM_HOST` の値と揃えてください。

C:\projects\sitecoredemo-jp\src\Project\BasicCompany\platform\App_Config\Include\Project\Project.BasicCompany.config

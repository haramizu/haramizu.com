---
title: Sitecore Headless 開発、テスト環境の構築 Part 8 - プロジェクトの整理（ 設定の一元管理 ）
date: '2022-09-15'
tags: ['Headless', 'Next.js']
draft: true
summary: テスト環境の設定に関して、この項目を入力してください、などの記述をしていましたが実際に使うとなるともう少し自動化したほうが良い形になってきました。そこで最後に設定を .env ファイルに集約する形に書き換えていきます。
images: ['/static/images/2022/09/rendering02.png']
---

テスト環境の設定に関して、この項目を入力してください、などの記述をしていましたが実際に使うとなるともう少し自動化したほうが良い形になってきました。そこで最後に設定を .env ファイルに集約する形に書き換えていきます。

## 初期設定のスクリプトを更新する

`.env` に設定をする値に関して、Sitecore Docker Tools でコマンドを実行することで自動的に設定することができます。この記述を、 `init.ps1` のスクリプトファイルに記述していきたいと思います。

まず、`JSS_EDITTING_SECRET` の項目を以下のスクリプトを追加することで初期化します。

```powershell
# JSS_EDITING_SECRET
Set-EnvFileVariable "JSS_EDITING_SECRET" -Value (Get-SitecoreRandomString 32)
```

ついでに SQL のパスワードに関して、ランダムな文字列を設定するべく以下のコードを追加します。

```powershell
# SQL_SA_PASSWORD
Set-EnvFileVariable "SQL_SA_PASSWORD" -Value (Get-SitecoreRandomString 19 -DisallowSpecial -EnforceComplexity)
```

これで自動的にパスワードが設定されるため、以下のコードを削除します。

```powershell
# We do not need to use [SecureString] here since the value will be stored unencrypted in .env,
# and used only for transient local example environment.
[string]
$SqlSaPassword = "Password12345"
```

これで設定項目を減らすことができました。

## 設定を各種インスタンスで参照する

CM サーバーが参照している設定ファイル、 `docker\build\cm\Data\App_Config\include\zzz\sitecoredemo-jp.config` に対していくつかの `.env` の値を入れているため、参照するように設定を変更します。

まず最初に、cm コンテナが `.env` の値を参照することができるように、`docker-compose.override.yml` のファイルに以下のコードを追加します。

```dockerfile
  cm:
    environment:  
      JSS_EDITING_SECRET: ${JSS_EDITING_SECRET}
      RENDERING_HOST_INTERNAL_URI: ${RENDERING_HOST_INTERNAL_URI}
      CM_HOST: ${CM_HOST}
```

上記の値を設定しているそれぞれの箇所を変更していきます。まずは `JSS_EDITING_SECRET` を設定します。

```xml
      <setting name="JavaScriptServices.ViewEngine.Http.JssEditingSecret" value="$(env:JSS_EDITING_SECRET)" />
```

続いて `CM_HOST` を設定します。

```xml
      <site patch:before="site[@name='website']"
            inherits="website"
            name="sitecoredemo-jp"
            hostName="$(env:CM_HOST)"
            rootPath="/sitecore/content/sitecoredemo-jp"
            startItem="/home"
            database="master" />
```

最後に `RENDERING_HOST_INTERNAL_URI` を設定します。

```xml
        <app name="sitecoredemo-jp"
            layoutServiceConfiguration="default"
            sitecorePath="/sitecore/content/sitecoredemo-jp"
            useLanguageSpecificLayout="true"
            graphQLEndpoint="/sitecore/api/graph/edge"
            inherits="defaults"
            serverSideRenderingEngine="http"
            serverSideRenderingEngineEndpointUrl="$(env:RENDERING_HOST_INTERNAL_URI)/api/editing/render"
            serverSideRenderingEngineApplicationUrl="$(env:RENDERING_HOST_INTERNAL_URI)"
        />
```

上記の設定が終わったところで、CM サーバーを build しなおします。

```
docker-compose build cm
```

上記の設定が完了したところで、起動をしてエクスペリエンスエディターが動作するところを確認してください。

## まとめ

これで非常にシンプルな Next.js を利用したプロジェクトが完成しました。次回はこれまでの手順をすべて含めたプロジェクトを GitHub のリポジトリからダウンロードをして、立ち上げる手順に関して紹介をします。
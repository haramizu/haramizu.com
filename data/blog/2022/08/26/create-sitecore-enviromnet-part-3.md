---
title: Sitecore Headless 開発、テスト環境の構築 Part 3 - コンテナにモジュールのインストール - Content Hub コネクタ
date: '2022-08-26'
tags: ['Headless', 'Docker','Content Hub']
draft: true
summary: コンテナの環境をサーバーと同じ環境に整えていくために、Docker でも各種モジュールを利用できるようにしていきます。現在利用している Docker のコンテナには SXA および Horizon までは設定されているため、不足している分を随時インストールしていきます。
images: ['/static/images/2022/08/docker08.png']
---

コンテナの環境をサーバーと同じ環境に整えていくために、Docker でも各種モジュールを利用できるようにしていきます。現在利用している Docker のコンテナには SXA および Horizon までは設定されているため、不足している分を随時インストールしていきます。

## モジュールのインストール

本番環境でインストールをしていて、不足しているモジュールは以下の通りとなります。

- Sitecore Headless Rendering 20.0.0
- Sitecore Connect for Content Hub 5.0
- Sitecore Management Service 5.0

Sitecore Content Hub 以外は下記のページを参照しながら動くようにしてください。Sitecore Content Hub はこの記事の後半で別途追加して紹介をします。

上記のモジュールのインストールの方法ですが、以下のページで紹介をしています。下記のページで Headless Services に関しては SXA を削除していますが、今回は削除せずに追加しておきます。

- [Sitecore Docker カスタムイメージの利用 - Sitecore Headless Services のイメージ作成](/blog/2022/06/01/building-custom-sitecore-images-part-5)
- [Sitecore Docker カスタムイメージの利用 - Sitecore Management Services のインストール](https://haramizu.com/blog/2022/05/31/building-custom-sitecore-images-part-4)

インストールが完了したことを確認するべく一度起動します。

```
docker-compose up -d
```

右クリックすることでテナントの作成ができるようになっています。

![install](/static/images/2022/08/docker07.png)

これでモジュールのインストールが完了しています。

## Sitecore Connect for Content Hub 5.0.0 のインストール

まず最初に、コネクターのバージョンおよび接続をするための文字列に関しての定義を、`.env` ファイルに記載します。Content Hub に関する接続文字列は環境に合わせて準備をしてください。

```.env
CONTENTHUB_VERSION=5.0.0-1809

CMP_ContentHub=
CMP_ServiceBusEntityPathIn=
CMP_ServiceBusSubscription=
CMP_ServiceBusEntityPathOut=
DAM_ContentHub=
DAM_SearchPage=
DAM_ExternalRedirectKey=Sitecore
```

続いて上記の値を利用してコンテナで利用する値を `cd` および `cm` に対して設定をします。以下は差分のデータとなりますので、各項目をそれぞれのロールに対して設定をしてください。

```yaml:docker-compose.override.yml
  cd:
    build:
      args:
        CONTENTHUB_ASSETS_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-chub-assets:${CONTENTHUB_VERSION}
    environment:
      Sitecore_ConnectionStrings_DAM.ContentHub: ${DAM_ContentHub}
      Sitecore_ConnectionStrings_DAM.SearchPage: ${DAM_SearchPage}
      Sitecore_ConnectionStrings_DAM.ExternalRedirectKey: ${DAM_ExternalRedirectKey}
  cm:
    build:
      args:
        CONTENTHUB_ASSETS_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-chub-assets:${CONTENTHUB_VERSION}
    environment:
      # DEMO TEAM CUSTOMIZATION - Custom integrations
      Sitecore_ConnectionStrings_CMP.ContentHub: ${CMP_ContentHub}
      Sitecore_ConnectionStrings_CMP.ServiceBusEntityPathIn: ${CMP_ServiceBusEntityPathIn}
      Sitecore_ConnectionStrings_CMP.ServiceBusSubscription: ${CMP_ServiceBusSubscription}
      Sitecore_ConnectionStrings_CMP.ServiceBusEntityPathOut: ${CMP_ServiceBusEntityPathOut}
      Sitecore_ConnectionStrings_DAM.ContentHub: ${DAM_ContentHub}
      Sitecore_ConnectionStrings_DAM.SearchPage: ${DAM_SearchPage}
      Sitecore_ConnectionStrings_DAM.ExternalRedirectKey: ${DAM_ExternalRedirectKey}
```

コンテナを動かすにあたって、web.config の値を設定する必要があります。この記述に関しては cm および cd の dockerfile のあるフォルダに transforms というフォルダを作成して、以下のファイルを作成します。

```xml:docker\build\cm\transforms\Web.config.xdt
<?xml version="1.0" encoding="utf-8"?>
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
  <location>
    <system.webServer>
      <httpProtocol>
        <customHeaders>
          <!-- CSP -->
          <add xdt:Transform="SetAttributes" xdt:Locator="Match(name)" name="Content-Security-Policy" value="default-src 'self' 'unsafe-inline' 'unsafe-eval' https://apps.sitecore.net https://*.stylelabs.io https://*.stylelabs.cloud https://*.stylelabsdemo.com https://*.stylelabsqa.com https://*.stylelabsdev.com https://*.sitecoresandbox.cloud https://*.azureedge.net https://stylelabs.eu.auth0.com https://login.windows.net https://login.microsoftonline.com https://*.boxever.com; img-src 'self' data: https://*.stylelabs.io https://*.stylelabs.cloud https://*.stylelabsdemo.com https://*.stylelabsqa.com https://*.stylelabsdev.com https://*.sitecoresandbox.cloud https://*.azureedge.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' 'unsafe-inline' https://fonts.gstatic.com; frame-ancestors 'self' https://sh.edge.localhost https://*.sitecoredemo.com;"/>
        </customHeaders>
      </httpProtocol>
    </system.webServer>
  </location>
  <system.webServer>
    <httpProtocol>
      <customHeaders>
        <add name="Docker-Examples" xdt:Locator="Match(name)" value="Role transform" xdt:Transform="SetAttributes(value)" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
  <runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <!-- first completely remove the parent element -->
      <dependentAssembly xdt:Transform="RemoveAll"
                         xdt:Locator="Condition(starts-with(./_defaultNamespace:assemblyIdentity/@name,'System.Runtime.CompilerServices.Unsafe'))">
      </dependentAssembly>
      <!-- then add the new block -->
      <dependentAssembly xdt:Transform="Insert">
        <assemblyIdentity name="System.Runtime.CompilerServices.Unsafe" publicKeyToken="b03f5f7f11d50a3a" culture="neutral" />
        <bindingRedirect oldVersion="0.0.0.0-4.0.4.1" newVersion="4.0.4.0 " />
      </dependentAssembly>
    </assemblyBinding>
  </runtime>
</configuration>
```

上記の内容に関しては、`docker\build\cd\transforms\Web.config.xdt` のファイルも同じ内容として変更をしてください。

準備が整ったところで、`cm` および `cd` に関しての Dockerfile の変更を実行します。

```dockerfile:docker\build\cm\Dockerfile
ARG CONTENTHUB_ASSETS_IMAGE

FROM ${CONTENTHUB_ASSETS_IMAGE} AS ch_assets

# Add SCCH module 5.0.0
COPY --from=ch_assets \module\cm\content .\

# Copy role transforms
COPY .\transforms\ \transforms\role\

# Perform role transforms
RUN C:\tools\scripts\Invoke-XdtTransform.ps1 -Path .\ -XdtPath C:\transforms\role

# Apply SCCH transformation files
RUN C:\tools\scripts\Invoke-XdtTransform.ps1 -Path C:\inetpub\wwwroot -XdtPath \inetpub\wwwroot\App_Data\Transforms\scch\xdts
```

`cd` に関しては以下の記述が必要となります。

```dockerfile:docker\build\cd\Dockerfile
ARG CONTENTHUB_ASSETS_IMAGE

FROM ${CONTENTHUB_ASSETS_IMAGE} AS ch_assets

# Add SCCH module 5.0.0
COPY --from=ch_assets \module\cm\content .\

# Copy role transforms
COPY .\transforms\ \transforms\role\

# Perform role transforms
RUN C:\tools\scripts\Invoke-XdtTransform.ps1 -Path .\ -XdtPath C:\transforms\role
```

これで準備が出来ました。 .env ファイルに Sitecore Content Hub と接続するための文字列を設定して、コンテナをビルドし直して実行してください。接続文字列を作成する方法は、サーバーにモジュールをインストールする手順のところで紹介しています。

- [Sitecore Connect for Content Hub 5.0 のインストール](/blog/2022/03/22/sitecore-connect-for-content-hub-5.0)

Sitecore Content Hub を連携させるインスタンスとして、今回のデモ用の CM サーバーを追加する必要があります。手順は以下の通りです。

- 管理ツールを開く
- 設定を開く
- CORSConfiguration の項目を開く
- https://cm.sitecoredemo.localhost を追加して保存する

![install](/static/images/2022/08/docker09.png)

上記の準備が全て完了したところで、以下のように実行します。

```powershell
docker-compose build
docker-compose up -d
```

リッチテキストの項目を開くと DAM につなげるための項目が増えており、クリックすると Sitecore Content Hub からアセットを選択することができるのを確認できます。

![install](/static/images/2022/08/docker08.png)

## まとめ

前回はカスタムコンテナの作成、今回はモジュールのインストールをして、１回目に準備したサーバーと同じ環境を Docker コンテナを利用して動かすことができるようになりました。次回は管理画面の日本語化の手順を実施します。
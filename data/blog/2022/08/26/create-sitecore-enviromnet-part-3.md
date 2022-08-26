---
title: Sitecore Headless 開発、テスト環境の構築 Part 3 - コンテナにモジュールのインストール - Content Hub コネクタ
date: '2022-08-26'
tags: ['Headless', 'Docker','Content Hub']
draft: false
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

コンテナを動かすにあたって、`web.config` および `connectionstrings.config` の値を設定する必要があります。この記述に関しては cm および cd の中に Data というフォルダを作成し、その中に transforms というフォルダを作成します。直下に web.config.cm.xdt を設定します。

```xml:docker\build\cm\Data\transforms\web.config.cm.xdt
<?xml version="1.0" encoding="utf-8"?>
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
  <location>
    <system.webServer>
      <httpProtocol>
        <customHeaders>
          <!-- CSP -->
          <add xdt:Transform="SetAttributes" xdt:Locator="Match(name)" name="Content-Security-Policy" value="default-src 'self' 'unsafe-inline' 'unsafe-eval' https://apps.sitecore.net https://*.stylelabs.io https://*.stylelabs.cloud https://*.stylelabsdemo.com https://*.stylelabsqa.com https://*.stylelabsdev.com https://*.sitecoresandbox.cloud https://*.azureedge.net https://stylelabs.eu.auth0.com https://login.windows.net https://login.microsoftonline.com https://*.boxever.com https://*.xmcloudcm.localhost; img-src 'self' data: https://*.stylelabs.io https://*.stylelabs.cloud https://*.stylelabsdemo.com https://*.stylelabsqa.com https://*.stylelabsdev.com https://*.sitecoresandbox.cloud https://*.azureedge.net https://*.gravatar.com https://*.wp.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' 'unsafe-inline' https://fonts.gstatic.com; frame-ancestors 'self' https://*.sitecoredemo.localhost https://*.xmcloudcm.localhost https://*.sitecoredemo.com;"/>
        </customHeaders>
      </httpProtocol>
    </system.webServer>
  </location>
  <runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1" xdt:Transform="InsertIfMissing">
      <!-- Include binding redirects for CH Connector 5.0.0 on XM -->
      <dependentAssembly xdt:Transform="Remove" xdt:Locator="Condition(./_defaultNamespace:assemblyIdentity/@name='Microsoft.Extensions.Caching.Abstractions')">
      </dependentAssembly>
      <dependentAssembly xdt:Transform="Remove" xdt:Locator="Condition(./_defaultNamespace:assemblyIdentity/@name='Microsoft.Extensions.Primitives')">
      </dependentAssembly>
      <dependentAssembly xdt:Transform="Remove" xdt:Locator="Condition(./_defaultNamespace:assemblyIdentity/@name='Microsoft.Azure.ServiceBus')">
      </dependentAssembly>
      <dependentAssembly xdt:Transform="Remove" xdt:Locator="Condition(./_defaultNamespace:assemblyIdentity/@name='Microsoft.Azure.Amqp')">
      </dependentAssembly>
      <dependentAssembly xdt:Transform="Remove" xdt:Locator="Condition(./_defaultNamespace:assemblyIdentity/@name='Microsoft.Extensions.Caching.Memory')">
      </dependentAssembly>
      <dependentAssembly xdt:Transform="Remove" xdt:Locator="Condition(./_defaultNamespace:assemblyIdentity/@name='Remotion.Linq')">
      </dependentAssembly>
      <dependentAssembly xdt:Transform="Insert" xdt:Locator="Condition(./_defaultNamespace:assemblyIdentity/@name='Microsoft.Extensions.Caching.Abstractions')">
        <assemblyIdentity name="Microsoft.Extensions.Caching.Abstractions" publicKeyToken="adb9793829ddae60" />
        <bindingRedirect oldVersion="0.0.0.0-3.1.14.0" newVersion="3.1.14.0" />
        <codeBase version="2.1.2.0" href="bin/Microsoft.Extensions.Caching.Abstractions.dll" />
        <codeBase version="3.1.5.0" href="bin/Microsoft.Extensions.Caching.Abstractions.dll" />
        <codeBase version="3.1.14.0" href="bin/scch/Microsoft.Extensions.Caching.Abstractions.dll" />
      </dependentAssembly>
      <dependentAssembly xdt:Transform="Insert" xdt:Locator="Condition(./_defaultNamespace:assemblyIdentity/@name='Microsoft.Extensions.Primitives')">
        <assemblyIdentity name="Microsoft.Extensions.Primitives" publicKeyToken="adb9793829ddae60" />
        <bindingRedirect oldVersion="0.0.0.0-3.1.14.0" newVersion="3.1.14.0" />
        <codeBase version="2.1.1.0" href="bin/Microsoft.Extensions.Primitives.dll" />
        <codeBase version="3.1.5.0" href="bin/Microsoft.Extensions.Primitives.dll" />
        <codeBase version="3.1.14.0" href="bin/scch/Microsoft.Extensions.Primitives.dll" />
      </dependentAssembly>
      <dependentAssembly xdt:Transform="Insert" xdt:Locator="Condition(./_defaultNamespace:assemblyIdentity/@name='Microsoft.Azure.ServiceBus')">
        <assemblyIdentity name="Microsoft.Azure.ServiceBus" publicKeyToken="7e34167dcc6d6d8c" />
        <codeBase version="3.1.0.0" href="bin/Microsoft.Azure.ServiceBus.dll" />
        <codeBase version="3.2.1.0" href="bin/Microsoft.Azure.ServiceBus.dll" />
        <codeBase version="4.1.2.0" href="bin/scch/Microsoft.Azure.ServiceBus.dll" />
      </dependentAssembly>
      <dependentAssembly xdt:Transform="Insert" xdt:Locator="Condition(./_defaultNamespace:assemblyIdentity/@name='Microsoft.Azure.Amqp')">
        <assemblyIdentity name="Microsoft.Azure.Amqp" publicKeyToken="31bf3856ad364e35" />
        <codeBase version="2.3.0.0" href="bin/Microsoft.Azure.Amqp.dll" />
        <codeBase version="2.4.0.0" href="bin/scch/Microsoft.Azure.Amqp.dll" />
      </dependentAssembly>
      <dependentAssembly xdt:Transform="Insert" xdt:Locator="Condition(./_defaultNamespace:assemblyIdentity/@name='Microsoft.Extensions.Caching.Memory')">
        <assemblyIdentity name="Microsoft.Extensions.Caching.Memory" publicKeyToken="adb9793829ddae60" />
        <codeBase version="2.1.2.0" href="bin/Microsoft.Extensions.Caching.Memory.dll" />
        <codeBase version="3.1.5.0" href="bin/Microsoft.Extensions.Caching.Memory.dll" />
        <codeBase version="3.1.14.0" href="bin/scch/Microsoft.Extensions.Caching.Memory.dll" />
      </dependentAssembly>
      <dependentAssembly xdt:Transform="Insert" xdt:Locator="Condition(./_defaultNamespace:assemblyIdentity/@name='Remotion.Linq')">
        <assemblyIdentity name="Remotion.Linq" publicKeyToken="fee00910d6e5f53b"/>
        <codeBase version="2.2.0.0" href="bin/scch/Remotion.Linq.dll"/>
      </dependentAssembly>
    </assemblyBinding>
  </runtime>
</configuration>
```

続いて App_Config のフォルダを作成し、その下に `ConnectionStrings.config.connectors.xdt` のファイルを作成して、以下のコードを記載します。

```xml:docker\build\cm\Data\transforms\App_Config\ConnectionStrings.config.connectors.xdt
<connectionStrings configBuilders="SitecoreConnectionStringsBuilder" xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
  <add name="CMP.ServiceBusEntityPathIn" connectionString="" xdt:Transform="InsertIfMissing" xdt:Locator="Match(name)" />
  <add name="CMP.ServiceBusEntityPathOut" connectionString="" xdt:Transform="InsertIfMissing" xdt:Locator="Match(name)" />
  <add name="CMP.ServiceBusSubscription" connectionString="" xdt:Transform="InsertIfMissing" xdt:Locator="Match(name)" />
  <add name="CMP.ContentHub" connectionString="" xdt:Transform="InsertIfMissing" xdt:Locator="Match(name)" />
  <add name="DAM.ContentHub" connectionString="" xdt:Transform="InsertIfMissing" xdt:Locator="Match(name)" />
  <add name="DAM.SearchPage" connectionString="" xdt:Transform="InsertIfMissing" xdt:Locator="Match(name)" />
  <add name="DAM.ExternalRedirectKey" connectionString="Sitecore" xdt:Transform="InsertIfMissing" xdt:Locator="Match(name)" />
</connectionStrings>
```

上記の内容に関しては、cd のは以下にも同じように配置してください。

準備が整ったところで、`cm` および `cd` に関しての Dockerfile の変更を実行します。

```dockerfile:docker\build\cm\Dockerfile
ARG CONTENTHUB_ASSETS_IMAGE

FROM ${CONTENTHUB_ASSETS_IMAGE} AS ch_assets

# Add SCCH module 5.0.0
COPY --from=ch_assets \module\cm\content .\

# Copy CM Resource
COPY .\Data\ .\

# Perform transforms
RUN (Get-ChildItem -Path 'C:\\inetpub\\wwwroot\\transforms\\web*.xdt' -Recurse ) | `
    ForEach-Object { & 'C:\\tools\\scripts\\Invoke-XdtTransform.ps1' -Path 'C:\\inetpub\\wwwroot\\web.config' -XdtPath $_.FullName `
    -XdtDllPath 'C:\\tools\\bin\\Microsoft.Web.XmlTransform.dll'; };

RUN (Get-ChildItem -Path 'C:\\inetpub\\wwwroot\\transforms\\app_config\\ConnectionStrings*.xdt' -Recurse ) | `
    ForEach-Object { & 'C:\\tools\\scripts\\Invoke-XdtTransform.ps1' -Path 'C:\\inetpub\\wwwroot\\app_config\\ConnectionStrings.config' -XdtPath $_.FullName `
    -XdtDllPath 'C:\\tools\\bin\\Microsoft.Web.XmlTransform.dll'; };
```

これで準備が出来ました。 .env ファイルに Sitecore Content Hub と接続するための文字列を設定して、コンテナを再ビルド、実行してください。接続文字列を作成する方法は、サーバーにモジュールをインストールする手順のところで紹介しています。

- [Sitecore Connect for Content Hub 5.0 のインストール](/blog/2022/03/22/sitecore-connect-for-content-hub-5.0)

Sitecore Content Hub 側の設定を追加で実施する必要があります。今回、連携する Content Hub のインスタンスに対して、今回のデモ用の CM サーバーを追加する必要があります。手順は以下の通りです。

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
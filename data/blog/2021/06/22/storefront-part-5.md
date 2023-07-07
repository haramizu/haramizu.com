---
title: Storefront - カタログの更新
date: '2021-06-22'
lastmod: '2021-06-22'
tags: ['Sitecore', 'デモ', 'インストール', 'Commerce', 'Storefront']
draft: true
summary: これまで Storefront の動作において、カタログデータは英語のカタログのまま利用していました。今回は、日本語のカタログデータの作り方に関して紹介をしていきます。なお、英語のデータもそのまま残していくため、多言語でのカタログ管理が可能になるのがわかります。
images: ['/static/images/2021/06/storefront07.png']
---

これまで Storefront の動作において、カタログデータは英語のカタログのまま利用していました。今回は、日本語のカタログデータの作り方に関して紹介をしていきます。なお、英語のデータもそのまま残していくため、多言語でのカタログ管理が可能になるのがわかります。

## Sitecore の設定

カタログのデータを準備するにあたって、Sitecore の設定を変更する必要があります。Sitecore Experience Commerce の処理として、大量のデータ処理のリクエストがきたら弾くという仕組みがあるため、手元の環境ではこの仕組みをオフにしていきます。

### AntiForgeryEnabled の設定を変更

Microsoft が提供している AntiForgry のクラスを利用しており、悪意のあるスクリプトによる送信防止がデフォルトでオンになっています。この項目を変更するのは以下のファイルです。以下のファイルの _AntiForgeryEnabled_ の項目を _false_ に変更してください。

- CommerceAuthoring_Sc¥wwwroot¥config.json

```json
"AntiForgeryEnabled":  false,
```

### web.config

CommerceAuthoring_Sc の web.config の項目を変更します。以下のコードの、configuration - location - system.webServer の下にある security の項目を追加してください。

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <security>
        <requestFiltering>
          <!-- For Microsoft IIS (Internet Information Services), maxAllowedContentLength specifies the maximum length of content in a request, in bytes. -->
          <requestLimits maxAllowedContentLength="2147483648" />
        </requestFiltering>
      </security>
      <handlers>
        <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
      </handlers>
      <aspNetCore processPath="dotnet" arguments=".\Sitecore.Commerce.Engine.dll" stdoutLogEnabled="false" requestTimeout="00:10:00" startupTimeLimit="600" stdoutLogFile=".\logs\stdout" hostingModel="inprocess" />
    </system.webServer>
  </location>
</configuration>
```

### SQL のタイムアウトの設定変更

カタログデータは多めになるため、タイムアウトの設定を 0 にしてタイムアウトをしないようにします。まずは以下のファイルを開いてください。

- CommerceAuthoring_Sc\wwwroot\data\Environments\Plugin.SQL.PolicySet-1.0.0.json

このうち以下の２つのパラメーターを 0 に変更します。

```
"ConnectTimeout": 0,
"CommandTimeout": 0,
```

### IIS の設定変更

Authoring のインスタンスに対して処理をリクエストするため、このインスタンス（例）が利用しているアプリケーションプールの値を変更します。アプリケーションプールを開いて、以下の３つの項目を変更してください。

| セクション     | パラメーター                    | 値  |
| -------------- | ------------------------------- | --- |
| CPU            | 制限間隔 (分)                   | 0   |
| プロセスモデル | アイドル状態のタイムアウト (分) | 0   |
| リサイクル     | 定期的な間隔 (分)               | 0   |

![catalog](/static/images/2021/06/catalog01.png)

## カタログのダウンロード

上記の設定が完了した段階で、改めて Postman を開きます。まずサーバーにアクセスすることができるのを確認するのと合わせて access_token を取得します。Collection にある Authentication - Sitecore - GetToken を実行します。

![catalog](/static/images/2021/06/catalog02.png)

続いて、CatalogAPISample - Catalog - API - Export Catalogs を選択します。

![catalog](/static/images/2021/06/catalog03.png)

この状態から、今度は Send ボタンの右側にあるドロップダウンメニューをクリック、Send and Download をクリックしてください。

![catalog](/static/images/2021/06/catalog04.png)

しばらくすると、ExportCatalogs.zip のファイルのダウンロードが開始します。

![catalog](/static/images/2021/06/catalog05.png)

この zip ファイルを展開すると、以下のようにいくつかの Json ファイルを参照することができます。これでカタログのデータをエクスポートすることができました。

![catalog](/static/images/2021/06/catalog06.png)

## カタログデータを編集する

展開した zip ファイルのフォルダをルートとして、Visual Studio Code で編集をしていきたいと思います。

![catalog](/static/images/2021/06/catalog07.png)

左側にファイル一覧が表示されていますが、ファイル名についてそれぞれ紹介をすると以下の役割となっています。

- Releationships フォルダ
  - Relationship.\*.json : このファイルは販売アイテムの関係性のファイルです
- Catalog.\*.json : カタログに関するデータのファイルです
- Category.\*.json : カテゴリーに関するデータのファイルです
- LocalizationEntity.\*.json : カタログデータの多言語データのファイルです
- RelationshipDefinition.\*.json : 関連商品に関する定義のファイルです
- SellableItem.\*.json : 販売商品に関するデータのファイルです。

###  リソースの翻訳

リソースの翻訳をするべく、まずは LocalizationEntity.1.json のファイルを開きます。データを見ると、多言語のデータとして日本語のデータがいくつか用意されています。が、Value には英語がはいっている形です。

```json
"Properties": {
    "$type": "System.Collections.Concurrent.ConcurrentDictionary`2[[System.String, System.Private.CoreLib],[System.Collections.Generic.List`1[[Sitecore.Commerce.Core.Parameter, Sitecore.Commerce.Core]], System.Private.CoreLib]], System.Collections.Concurrent",
    "DisplayName": {
        "$type": "System.Collections.Generic.List`1[[Sitecore.Commerce.Core.Parameter, Sitecore.Commerce.Core]], System.Private.CoreLib",
        "$values": [
            {
                "$type": "Sitecore.Commerce.Core.Parameter, Sitecore.Commerce.Core",
                "Key": "ja-JP",
                "Value": "2-in-1"
            },
            {
                "$type": "Sitecore.Commerce.Core.Parameter, Sitecore.Commerce.Core",
                "Key": "fr-FR",
                "Value": "2-in-1"
            },
            {
                "$type": "Sitecore.Commerce.Core.Parameter, Sitecore.Commerce.Core",
                "Key": "en-US",
                "Value": "2-in-1"
            },
            {
                "$type": "Sitecore.Commerce.Core.Parameter, Sitecore.Commerce.Core",
                "Key": "de-DE",
                "Value": "2-in-1"
            }
        ]
    }
```

また、日本語の項目がないデータに関しては、ja-JP のキーを追加していきます。

## インポートする

翻訳データの揃った状態で、Json ファイルを１つの zip ファイルに圧縮します。今回はファイル名を ImportCatalog.zip とします。

続いて、Postman を開いて、Collections にある CatalogAPISamples - Catalog API - Import Catalogs (with publishing) を選択します。Body のタブを選択すると、importFile の項目があり、この項目で作成をした ImportCatalog.zip のファイルを指定します。

![catalog](/static/images/2021/06/catalog08.png)

Send をクリックしたあと、結果に関しては 200 OK が表示されていればインポート開始となります。

インポートは若干時間がかかるため、少し時間をおいてから、Sitecore の管理画面に移動して、コンテンツエディターを開きます。Commerce タブに **Commerce キャッシュを更新** のボタンがあるので、これをクリックします。

![catalog](/static/images/2021/06/catalog09.png)

更新をしたあと、Storefront のホームページを開くと、メニューが日本語になっていることがわかります。

![catalog](/static/images/2021/06/catalog10.png)

## まとめ

上記の手順で、カタログのエクスポート、エクスポートができるようになりました。なお、他のシステムで作った zip ファイルをそのままアップロードするとカタログが崩れることがあります。なるべく、zip で解凍した後、中身の JSON ファイルを変更して更新、作成した zip ファイルをアップロードする、という手順でカタログの更新をしてください。

## 参考情報

- [チュートリアル: カタログおよび在庫データのエクスポート](https://doc.sitecore.com/ja/developers/101/sitecore-experience-commerce/walkthrough--exporting-catalog-and-inventory-data.html)

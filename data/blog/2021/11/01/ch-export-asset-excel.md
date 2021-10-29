---
title: Content Hub のアセット Excel エクスポートの調整
date: '2021-11-01'
tags: ['Content Hub']
draft: false
summary: 前回は Sitecore のインスタンスの設定および Vercel での動作まで進めました。今回は立ち上げたサンプルのサイトに関して、すでに入っているコンテンツの整理、またそれを表示するために定義されている内容などを削除して、空っぽのプロジェクトまで仕上げていきます。
images: ['/static/images/2021/10/nextjs303.png']
---

Sitecore Content Hub で管理をしているデータのメタデータをエクスポートをする機能があります。この項目を標準の項目以外を出したいばあいの手順をまとめてみました。

## デフォルトの動作を確認する

いくつかのアセットを選択して、Excel でエクスポートのメニューを選択してみます。

![exportexcel](/static/images/2021/11/chexportexcel01.png)

ダイアログとしては以下のような画面が表示されます。

![exportexcel](/static/images/2021/11/chexportexcel02.png)

今回は、スキーマの項目をそのまま見える方がいいので、どれもチェックせずに実行します。

しばらくすると Excel のファイルが準備されて、内容としては以下のようになります。

![exportexcel](/static/images/2021/11/chexportexcel03.png)

項目としては以下のものが出てきているのがわかります。

* id
* identifier
* Title
* Description#en-US
* FileName
* VisionDescription
* VisionOcrText
* AssetTypeToAsset
* DRM.Restricted.RestrictedToAsset
* AssetMediaToAsset
* TagToAsset
* VisionColorToAsset
* FinalLifeCycleStatusToAsset
* ContentRepositoryToAsset
* CreatedBy
* CreatedOn
* ModifiedBy
* ModifiedOn

## 設定の確認

エクスポートの設定を参照している部分を確認します。作業をしているのは、管理ツールの ページ - アセット を選択して、セレクションのボタンをクリックします。

![exportexcel](/static/images/2021/11/chexportexcel04.png)

セレクションの画面を見ると、Excel の設定でエクスポートの項目があります。ここに**定義の追加**のボタンを選択、M.Asset を選択することができるのがわかります。

![exportexcel](/static/images/2021/11/chexportexcel05.png)

エクスポートプロファイルを参照すると、AssetProfile の項目があることがわかります。

![exportexcel](/static/images/2021/11/chexportexcel06.png)

## M.Asset のスキーマを拡張する

エクスポートするためのデータを作るために、スキーマをします。まず、スキーマの M.Asset の概要に、CustomText というメンバーを追加します。

![exportexcel](/static/images/2021/11/chexportexcel07.png)

変更を適用して、項目が有効になっていることを確認します。

![exportexcel](/static/images/2021/11/chexportexcel08.png)

今回エクスポートをするアセットに対して、カスタムテキストを入れて、デモ用のデータの準備が出来ました。

## エクスポートプロファイルの編集

今回は新しい Export プロファイルを作成していきます。管理ツールの **エクスポートプロファイル** を開きます。

![exportexcel](/static/images/2021/11/chexportexcel09.png)

AssetProfile を開き、項目を確認すると以下のように表示されます。

![exportexcel](/static/images/2021/11/chexportexcel10.png)

Text モードに変更をして、項目を追加します。今回は、 M.Asset のスキーマに CustomText というテキストエリアを追加している前提として、Properties に CustomText 追加します。

```json
{
  "properties": [
    "Title",
    "Description",
    "FileName",
    "CustomText",
    "ProductName",
    "ProductId",
    "TagToAsset",
    "VisionDescription",
    "VisionOcrText"
  ],
  "relations": {
    "AssetTypeToAsset": {
      "exportRelatedEntities": false
    },
    "DRM.Restricted.RestrictedToAsset": {
      "exportRelatedEntities": false
    },
    "AssetMediaToAsset": {
      "exportRelatedEntities": false
    },
    "TagToAsset": {
      "exportRelatedEntities": false
    },
    "ProductCategoryToAsset": {
      "exportRelatedEntities": false
    },
    "ProductFamilyToAsset": {
      "exportRelatedEntities": false
    },
    "VisionColorToAsset": {
      "exportRelatedEntities": false
    },
    "BrandToAsset": {
      "exportRelatedEntities": false
    },
    "FinalLifeCycleStatusToAsset": {
      "exportRelatedEntities": false
    },
    "ContentRepositoryToAsset": {
      "exportRelatedEntities": false
    }
  },
  "includeSystemProperties": true,
  "publicLinks": {
    "asset": false,
    "masterfile": false
  },
  "version": "1.1"
}
```

エクスポートプロファイルの更新が終わりました。

## 再度エクスポートを実施

改めてアセットを選択してエクスポートを実施します。エクスポートをする際の言語を日本語と英語を指定しておきました。しばらくするとファイルの準備が完了となりますので、Excel ファイルをダウンロード、開くと以下のように変更されていることがわかります。

![exportexcel](/static/images/2021/11/chexportexcel11.png)

エクスポートの項目が変更されていることを確認することができました。


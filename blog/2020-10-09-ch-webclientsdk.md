---
title: Content Hub - Web Client SDK の設定
author: Shinichi Haramizu
author_title: Sitecore Japan
author_url: https://haramizu.jp/
author_image_url: https://avatars3.githubusercontent.com/u/5026348?s=400&v=4
tags: [Content Hub]
description: Sitecore Content Hub の開発をする際に利用する Web Client SDK を利用できるように、Visual Studio の環境を整える手順を紹介します。
image: 
slug: 2020/10/09/ch-webclientsdk
---

Sitecore Content Hub の開発をする際に利用する Web Client SDK を利用できるように、Visual Studio の環境を整える手順を紹介します。

<!--truncate-->

## MyGet feed の設定

Visual Studio に Web Client SDK のパッケージを登録します。MyGet のパブリックフィードを追加してください。今回は NuGet V3 を登録します。

```
https://slpartners.myget.org/F/m-public/api/v3/index.json
```

登録の手順としては、以下のような手順でできます。

1. Visual Studio を起動します（ 2015 以降）
2. メニューから「ツール」ー「オプション」を選択します。
3. NuGet パッケージマネージャーの中にある、パッケージソースを選択します
    * nuget で検索をするとすぐに見つけれます
4. 追加のボタンをクリックします
5. 追加したパッケージソースの URL を上記の URL に変更、名前を設定します
6. 更新をクリックします

これで設定が完了となります。

![Nuget パッケージソース](img/2020/10/addmyget.gif "Nuget パッケージソース")

## プロジェクトのセットアップ

上記の手順が完了したところで、プロジェクトを作成します。手順は以下の通りです。

1. 新しいプロジェクトを作成します
2. プロジェクトのタイプとしては、.NET Core 2.1 Console Application を選択します
3. プロジェクトの「依存関係」の項目を右クリック、NuGet パッケージの管理を選択します
4. Stylelabs.M.Sdk.WebClient を選択します
5. 対象となるバージョンを指定してインストールします

この手順でプロジェクトファイルが完成します。

![プロジェクト作成](img/2020/10/createprojects.gif "プロジェクト作成")


## 関連情報

* [Web Client SDK - Getting started](https://docs.stylelabs.com/content/3.4.x/integrations/web-sdk/getting-started.html?tabs=tabid-1)
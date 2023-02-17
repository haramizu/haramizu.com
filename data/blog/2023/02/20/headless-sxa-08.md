---
title: Headless SXA でデモサイトを構築する - Part 8 日本語リソースの適用
date: '2023-02-20'
tags: ['XM Cloud', 'XM', 'Headless SXA']
draft: false
summary: コンテナおよび XM Cloud の環境に対して日本語リソースを適用していきます。この手順は以前にブログで紹介していましたが、今回はその手順を改めてステップの中に入れていく形です。
images: ['/static/images/2023/02/ja-jp02.png']
---

コンテナおよび XM Cloud の環境に対して日本語リソースを適用していきます。この手順は以前にブログで紹介していましたが、今回はその手順を改めてステップの中に入れていく形です。

## コンテナ環境への日本語リソースの適用

ローカルで起動する Docker のコンテナイメージに日本語リソースを追加します。以前にこの記事で紹介をしています。

- [Sitecore Docker カスタムイメージの利用 - 管理画面の日本語化](/blog/2022/05/30/building-custom-sitecore-images-part-3)

今回は以下のように作業をしていきます。

1. docker\build\cm\App_Data を作成します
2. 上記のパスに日本語リソースをダウンロードしてコピーします
3. Dockerfile にファイルをコピーするためのコマンドを追加する

ファイルが配置されている状況は以下のようなイメージです。

![component](/static/images/2023/02/jajp01.png)

ビルドするファイル `docker\build\cm\Dockerfile` に対しては以下のコードを追加してください。

```dockerfile:docker\build\cm\Dockerfile
# resource copy
COPY .\App_Data\ .\App_Data
```

上記のコードの記載が終わったら、改めて docker-compose build cm を実行することで、ローカルで動作する環境に日本語リソースのインポートができます。

![component](/static/images/2023/02/jajp02.png)

## プロジェクトファイルの更新

同じリソースファイルを `src\platform` の下に展開します。

![component](/static/images/2023/02/jajp03.png)

続いてこのプロジェクトのソリューションファイル（トップに配置されている） `XmCloudSXAStarter.sln` を Visual Studo で開きます。該当するファイルをプロジェクトに追加してリビルドしてください。以下のページがプロジェクトに追加した後です。

![component](/static/images/2023/02/jajp04.png)

上記の変更が終わったあと、GitHub のリポジトリにコミットすると、自動的に Deploy XM Cloud ツールで新しい CMS の設定が行われてツールの日本語リソースが適用されます。

なお、日本語リソースが適用されるのは個別のツールとなっており、トップの Launch Pad や SaaS のツールとなる Pages などは適用されません。以下の画面は Content Editor に日本語リソースが適用されていることがわかります。

![component](/static/images/2023/02/jajp05.png)

## まとめ

不足しているいくつかの日本語リソースもありますが、これに関しては core データベースの項目を変更していくことで簡単に日本語化をすることが可能です。Sitecore Cloud Portal の画面はまだ英語のままとなる部分もありますが、日本語リソースを参照する部分もあるため、まず日本語リソースを入れておくというのは便利な形です。



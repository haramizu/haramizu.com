---
title: Sitecore Helix の Next.js サンプルを動かす - テンプレートの変更
date: '2022-06-07'
tags: ['Next.js', 'Sitecore CLI']
draft: true
summary: Sitecore Helix のサンプルを以前動作しましたが、今回はこれまで作成してきたイメージを利用して、同じように動作する環境を準備したいと思います。
images: ['/static/images/2022/03/component06.gif']
---

Sitecore Helix のサンプルを以前動作しましたが、今回はこれまで作成してきたイメージを利用して、同じように動作する環境を準備したいと思います。

## 前提条件

Sitecore Helix のデモ環境を動作させた手順は以下の２つの記事になります。

- [Sitecore Helix の Next.js サンプルを動かす - 準備](/blog/2022/05/19/basic-company-nextjs-part1)
- [Sitecore Helix の Next.js サンプルを動かす - コンテナを起動する](/blog/2022/05/20/basic-company-nextjs-part2)

またサンプルのコンテナイメージを利用してコンテンツのインポートの手前まで進めた手順は以下の通りです。

- [Sitecore Docker カスタムイメージの利用 - 初期設定](/blog/2022/05/24/building-custom-sitecore-images-part-1)
- [Sitecore Docker カスタムイメージの利用 - プロジェクトの作成](/blog/2022/05/25/building-custom-sitecore-images-part-2)
- [Sitecore Docker カスタムイメージの利用 - Sitecore Management Services のインストール](/blog/2022/05/27/building-custom-sitecore-images-part-4)
- [Sitecore Docker カスタムイメージの利用 - Sitecore Headless Services のイメージ作成](/blog/2022/05/30/building-custom-sitecore-images-part-5)

Sitecore CLI に関連する記事は以下の２つが前提条件となっています。

- [Sitecore CLI のインストール](/blog/2022/05/18/install-sitecore-cli)
- [Sitecore CLI を利用してコンテンツのインポート](/blog/2022/05/31/sitecore-cli-import)

## コンテンツを全てインポートできるようにする

インポートをするデータとしては、sitecore.json の以下のフォルダで module.json ファイルを指定しています。これらの関連するファイルを、helix.example のフォルダからコピーします。

```json
  "modules": ["src/*/*/*.module.json"],
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

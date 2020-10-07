---
slug: 2020/01/08/sitecore-docker-part2
title: Sitecore を Docker で動かす – Part 2
author: Shinichi Haramizu
author_title: Sitecore Japan
author_url: https://www.haramizu.jp/
author_image_url: https://avatars3.githubusercontent.com/u/5026348?s=400&v=4
tags: [Sitecore containers]
description: 前回に続いて、Sitecore を Docker コンテナを利用して展開するための手順を紹介します。今回は2回目です。
---

:::tip

本ブログ記事は Sitecore 9.3 リリース時点で書いたものになります。

:::

前回に続いて、Sitecore を Docker コンテナを利用して展開するための手順を紹介します。今回は2回目です。

* [Sitecore を Docker で動かす – Part 1](2019-12-26-sitecore-docker-part1.md)
* Sitecore を Docker で動かす – Part 2

<!--truncate-->

すでに Docker で展開をするためのイメージが準備できている形ですので、まずはまだ何もコンテンツが入っていない状態の Sitecore を展開するところまで紹介をします。

まず、Sitecore のライセンスファイルを展開時に指定できるように、以下のコマンドを実行します。

```
Set-LicenseEnvironmentVariable.ps1 -Path C:\projects\docker-images\license.xml
```

ファイルが認識できれば、`.\windows\tests\9.3.x\` のディレクトリに移動して、 `docker-compose --file .\docker-compose.xm.yml up` を実行してください。この yml ファイルは XM （ CMS Only モード ）で起動する形となります。

上記の手順を実行している動画を用意しましたので、そちらをご覧ください。

[![](https://img.youtube.com/vi/KvO458_PMxI/0.jpg)](https://www.youtube.com/watch?v=KvO458_PMxI)
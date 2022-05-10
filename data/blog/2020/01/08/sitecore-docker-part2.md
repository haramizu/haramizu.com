---
title: Sitecore を Docker で動かす – Part 2
date: '2020-01-08'
tags: ['Sitecore containers', 'docker']
draft: false
summary: 前回に続いて、Sitecore を Docker コンテナを利用して展開するための手順を紹介します。今回は2回目です。
images: ['https://img.youtube.com/vi/KvO458_PMxI/0.jpg']
---

> 本ブログ記事は Sitecore 9.3 リリース時点で書いたものになります。
> Docker 関連の記事は [Sitecore Docker シリーズ](/blog/sitecore-docker) にまとめています。

前回に続いて、Sitecore を Docker コンテナを利用して展開するための手順を紹介します。今回は 2 回目です。

- [Sitecore を Docker で動かす – Part 1](/blog/2019/12/26/sitecore-docker-part1)
- Sitecore を Docker で動かす – Part 2

すでに Docker で展開をするためのイメージが準備できている形ですので、まずはまだ何もコンテンツが入っていない状態の Sitecore を展開するところまで紹介をします。

まず、Sitecore のライセンスファイルを展開時に指定できるように、以下のコマンドを実行します。

```
Set-LicenseEnvironmentVariable.ps1 -Path C:\projects\docker-images\license.xml
```

ファイルが認識できれば、`.\windows\tests\9.3.x\` のディレクトリに移動して、 `docker-compose --file .\docker-compose.xm.yml up` を実行してください。この yml ファイルは XM （ CMS Only モード ）で起動する形となります。

上記の手順を実行している動画を用意しましたので、そちらをご覧ください。

[![](https://img.youtube.com/vi/KvO458_PMxI/0.jpg)](https://www.youtube.com/watch?v=KvO458_PMxI)

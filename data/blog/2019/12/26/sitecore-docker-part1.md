---
slug: 2019/12/26/sitecore-docker-part1
title: Sitecore を Docker で動かす – Part 1
author: Shinichi Haramizu
author_title: Sitecore Japan
author_url: https://www.haramizu.jp/
author_image_url: https://avatars3.githubusercontent.com/u/5026348?s=400&v=4
tags: [Sitecore containers]
description: Sitecore を Docker の上で動かすことができるのをご存知でしょうか？今回は Docker で動かすための手順を紹介する最初のステップ、Docker の設定からイメージのビルドまで紹介をします。
image: /static/img/blog/2019/12/sitecore-docker.png
---

---
title: Sample .md file
date: '2016-03-08'
tags: ['markdown', 'code', 'features']
draft: false
summary: Example of a markdown file with code blocks and syntax highlighting
---

:::tip

本ブログ記事は Sitecore 9.3 リリース時点で書いたものになります。

:::

Sitecore を Docker の上で動かすことができるのをご存知でしょうか？今回は Docker で動かすための手順を紹介する最初のステップ、Docker の設定からイメージのビルドまで紹介をします。


特に Docker の細かい知識が無くても、Docker の環境で Sitecore が動作するところまで、シリーズとして紹介をしていきます。

検証をするためには、以下のものを揃えていただく必要があります。

* Docker for Windows
* Sitecore のライセンスおよびモジュールの準備

実際にはイメージのビルドは非常に時間がかかりますが（一度作れば後はらくらく）、その模様についてダイジェスト動画も YouTube にアップしています。

[![](https://img.youtube.com/vi/Q9HJB-HYb4k/0.jpg)](https://www.youtube.com/watch?v=Q9HJB-HYb4k)

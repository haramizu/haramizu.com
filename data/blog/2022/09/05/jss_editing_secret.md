---
title: エクスペリエンス エディターを利用できるようにする
date: '2022-09-02'
tags: ['Headless', 'Next.js']
draft: true
summary: 前々回に Next.js のテンプレートの準備を、前回はそれを利用するための Sitecore にアイテムをインポートする手順を紹介しました。今回は Next.js の設定を変更して、Sitecore のアイテムを参照してページが表示されるところまで紹介をします。
images: ['/static/images/2022/03/component06.gif']
---


作成されたファイルのままではなく、以下の設定項目がコメントアウトされているので、コメントを外して value を設定してください。value は GUID などで問題ありません。

```xml
<setting name="JavaScriptServices.ViewEngine.Http.JssEditingSecret" value="" />
```

このファイルを cm のコンテナで参照することができるように、 docker\build\cm\Data\App_Config\include\zzz のフォルダを作成して、上記のファイルをコピーしてください。

---
title: Sitecore Content Hub ONE - メディア
date: '2023-03-24'
tags: ['Content Hub ONE']
draft: true
summary: Sitecore の新しいヘッドレス CMS として新たにリリースされる Sitecore Content Hub ONE に関してブログで紹介をしていきます。ヘッドレス CMS の概念を理解していればシンプルな運用が可能なツールとなっています。今回はプロジェクトの作成、
images: ['/static/images/2023/03/media03.png']
---

コンテンツ形式の定義、そしてそれに合わせたコンテンツの登録を完了させましたが、実際には Web で展開するにあたっては画像が不可欠です。今回は、画像をアップロードする手順を紹介していきます。

## メディアファイルのアップロード

Content Hub ONE にメディアファイルをアップロードすることが可能です。ここにアップロードできるファイル形式は、ブログ記述時点では以下の通りです。

- gif
- jpeg, jpg
- png
- webp

## ファイルのアップロード

アップロードは管理画面から実行することができます。まだ何もファイルがアップされていない画面は以下のようになります。

![media](/static/images/2023/03/media01.png)

ファイルのサイズは 70MB までとなっています。アップロードのアイコンをクリックするとローカルのファイルを選択するダイアログが表示され、ファイルを指定してダイアログを閉じるとアップロードが完了します。

![media](/static/images/2023/03/media02.png)

アップロード後は以下の様に画像ファイルを確認することができます。

![media](/static/images/2023/03/media03.png)

複数のファイルを今回は指定しておきました。

## まとめ

ファイルのアップロードを実施してみました。画像ファイルに関してのワークフローは公開前、公開後、という形となっており基本的にはアップロードしただけでは外部から見えない形になっているのがわかります。

- [Upload an asset](https://doc.sitecore.com/ch-one/en/users/content-hub-one/content-authoring--upload-an-asset.html)

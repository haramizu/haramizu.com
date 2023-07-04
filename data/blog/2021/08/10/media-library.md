---
title: Sitecore メディアライブラリ
date: '2021-08-10'
tags: ['Sitecore']
draft: true
summary: Sitecore のメディアライブラリの機能をいくつか紹介をしていきます。今回は、ファイルをまとめてアップロードする機能、そしてダウンロードではなくてブラウザで表示をしたいという２つのシナリオに関して紹介をします。
images: ['/static/images/2021/08/medialibrary05.png']
---

Sitecore のメディアライブラリの機能をいくつか紹介をしていきます。今回は、ファイルをまとめてアップロードする機能、そしてダウンロードではなくてブラウザで表示をしたいという２つのシナリオに関して紹介をします。

## Zip ファイルをサーバー側で展開する

メディアファイルをアップロードする際に１つ１つ丁寧にアップロードするのは、ミスオペレーションにもつながりかねません。そこで、今回は Zip ファイルに階層を設定して、それをアップロードするという手順を紹介します。まず最初に、以下のようにフォルダ階層を設定した Zip ファイルを作成します。

![Media Library](/static/images/2021/08/medialibrary01.png)

今回はメディアライブラリに Campaign というフォルダを作成しました。

![Media Library](/static/images/2021/08/medialibrary02.png)

フォルダの右側に表示されている、**アップロード（複数 - 高度な設定）** のボタンをクリックして、展開したいファイルを指定します。合わせて、**ZIP アーカイブを展開する** の項目をチェックしてください。

![Media Library](/static/images/2021/08/medialibrary03.png)

**アップロード**ボタンをクリックすると、画面が切り替わってアップロードをしたメディアがダイアログの下側に表示されます。

![Media Library](/static/images/2021/08/medialibrary04.png)

アップロードしたファイルが展開されていることがわかります。警告が出ているのは代替テキストが設定されていないためで、後で修正することもできますし、警告のままでも利用できます。実際にファイルが展開されていることがツリービューでも確認することができます。

![Media Library](/static/images/2021/08/medialibrary05.png)

## HTML ファイルの対応

上記と同じように HTML ファイルのアップロードをするとどうなるでしょうか？今回は非常にシンプルですが、以下の内容が記載されている HTML ファイルを作成してみました。

```
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>タイトル</Title>
</head>
<body>
    <h1>タイトル</h1>
    <p>ここに文章を入れる</p>
</body>
</html>
```

ブラウザで表示すると以下のようになります。

![Media Library](/static/images/2021/08/medialibrary06.png)

このファイルを先ほど同様に、今回は１つのファイルなのでシンプルにアップロードします。

![Media Library](/static/images/2021/08/medialibrary07.png)

まず、事前にアップしていた画像ファイルに対して、ブラウザからアクセスをしてみます。URL は以下のような形になります。

- https://yourservername/-/media/campaign/London/pexels-david-geib-3220846.jpg

アクセスをすると当然ファイルを参照できます。

![Media Library](/static/images/2021/08/medialibrary08.png)

それでは HTML ファイルは？となると、以下のような URL にアクセスすることになります。

- https://yourservername/-/media/campaign/sample.html

するとどうでしょうか。なんと HTML ファイルがダウンロードされてしまいました。

![Media Library](/static/images/2021/08/medialibrary09.png)

これはメディアライブラリに登録されている HTML はデフォルトではダウンロードをする設定になっているためです。この設定は、 \App_Config\Sitecore.config に記載されており、以下の部分が対象となります。

```xml
      <mediaType name="HTML" extensions="htm,html,stm">
        <mimeType>text/html</mimeType>
        <forceDownload>true</forceDownload>
        <sharedTemplate>system/media/unversioned/file</sharedTemplate>
        <versionedTemplate>system/media/versioned/file</versionedTemplate>
        <defaultThumbnailFile>WordProcessing/32x32/imp_exp_html.png</defaultThumbnailFile>
      </mediaType>
```

forceDownload はブラウザではダウンロードの挙動を推奨している設定となります。画像などはすべて falses に設定されていることがわかります。forceDownload の項目を false に設定をして、iisreset で Sitecore を再起動します。

![Media Library](/static/images/2021/08/medialibrary10.png)

メディアライブラリに保存している HTML のファイルをブラウザで表示することができました。

## まとめ

今回はファイルをまとめてアップする方法、およびメディアライブラリに HTML ファイルをアップロードして、表示する方法を紹介しました。これにより、CMS のツールで編集することがない HTML ファイルを展開することができるようになります。なお、この手順はサイト移行などでは利用しない方が良いです。理由は以下の通りです。

- メディアライブラリはサーバー上に置いているファイルの表示よりもパフォーマンスがよくありません
- このため、サイトの移行の際にメディア、HTML ファイルを置いてという手順はパフォーマンス低下につながります
- メディアライブライで管理をせず、Sitecore がインストールされている環境にフォルダを切って、ファイルを配置してください
- この形にすることで、メディアライブラリよりもパフォーマンスよくファイルを表示することができます。

フォルダを切って HTML ファイルの配置をすることで、既存のサイトからのスムーズな移行を実施していきつつ、コンテンツ管理をするエリアを広げていくことで、より効率的なサイト運用が可能となります。

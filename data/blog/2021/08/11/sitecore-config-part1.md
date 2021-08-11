---
title: Sitecore の設定を変更する - ファイルの取り扱いについて
date: '2021-08-11'
tags: ['Sitecore']
draft: false
summary: 前回、メディアライブラリに関するポイントを紹介したのですが、実際にサイトコアの設定に関してよく聞かれる内容をいくつか紹介をしていきます。今回は設定ファイルの取り扱いについてです。
images: ['/static/images/2021/08/config01.png']
---

前回、メディアライブラリに関するポイントを紹介したのですが、実際にサイトコアの設定に関してよく聞かれる内容をいくつか紹介をしていきます。今回は設定ファイルの取り扱いについてです。

## 設定ファイルについて

まさに前回 [Sitecore メディアライブラリ](/blog/2021/08/10/media-library) に関して紹介をしました。この際、Sitecore.config の設定を変更しましょうと少し乱暴でしたが紹介をした形です。設定に関して直接変更をすると、実際の運用ではどこを編集したのか、というのがわからなくなります。

このため変更をした点を明確にするために、パッチファイルを作成してマージすることが可能です。これに関しては以下のドキュメントで紹介されています。

* [Configuration patch file examples](https://doc.sitecore.com/en/developers/101/platform-administration-and-architecture/configuration-patch-file-examples.html)

設定ファイルに関しては、/App_Config/Include の下に差分の設定ファイルを配置して、起動時に設定を変更するという流れになります。

ちなみに起動時の設定情報を確認するツールとしては、**コントロールパネル** - **管理ツール** を開き、Show Config のツールを起動すると設定を確認することができます。

![config](/static/images/2021/08/config01.png)

ツールを起動すると、XML のデータが表示されます。

![config](/static/images/2021/08/config02.png)

HTML に関して以下のように表示されていることがわかります。

![config](/static/images/2021/08/config03.png)

実際に Patch ファイルを作成したいと思います。以下のファイルを、 /App_Config/Include/Settings/ というフォルダに、MediaType.HTML.Disable.ForceDownload.config というファイルを作成します。

```xml
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <mediaLibrary>
      <mediaTypes>
        <mediaType name="HTML" extensions="htm,html,stm">
          <forceDownload>
            <patch:delete />
          </forceDownload>
          <forceDownload>false</forceDownload>
        </mediaType>
      </mediaTypes>
    </mediaLibrary>
  </sitecore>
</configuration>
```

このファイルを作成したあと、改めて設定を確認すると以下のように更新されています。

![config](/static/images/2021/08/config04.png)

## まとめ

このように設定を変更する際には、上記のように変更点を patch という形で作成して反映させることで、どこを変更しているのか、というのを明確に管理できるようになります。
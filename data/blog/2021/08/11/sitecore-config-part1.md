---
title: Sitecore の設定を変更する - ファイルの取り扱いについて
date: '2021-08-11'
tags: ['Sitecore']
draft: true
summary: 前回、メディアライブラリに関するポイントを紹介したのですが、実際にサイトコアの設定に関してよく聞かれる内容をいくつか定番のネタがあります。今回は設定ファイルの取り扱い、そして Sitecore で管理をしないファイルを展開する方法について紹介をします。
images: ['/static/images/2021/08/config01.png']
---

前回、メディアライブラリに関するポイントを紹介したのですが、実際にサイトコアの設定に関してよく聞かれる内容をいくつか定番のネタがあります。今回は設定ファイルの取り扱い、そして Sitecore で管理をしないファイルを展開する方法について紹介をします。

## 設定ファイルについて

まさに前回 [Sitecore メディアライブラリ](/blog/2021/08/10/media-library) に関して紹介をしました。この際、Sitecore.config の設定を変更しましょうと少し乱暴でしたが紹介をした形です。設定に関して直接変更をすると、実際の運用ではどこを編集したのか、というのがわからなくなります。

このため変更をした点を明確にするために、パッチファイルを作成してマージすることが可能です。これに関しては以下のドキュメントで紹介されています。

- [設定パッチ ファイルの例](https://doc.sitecore.com/ja/developers/101/platform-administration-and-architecture/configuration-patch-file-examples.html)

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

## Sitecore で処理をしないパスの作成

Sitecore が動いているサーバーにおいて、基本的には Sitecore が管理しているコンテンツを処理するのですが、とはいえサーバーにファイルを配置したい、というケースもあると思います。例えば以下のようなシチュエーションです。

- フェーズ分けをして、サブディレクトリごとに移行をしていく形を考えている
- 既存の HTML ファイルは管理しなくていいが配置したい、ページとして表示したい
- 頻度よく編集するエリアに関しては CMS 化を早める、そうではないファイルは全てそのまま展開しておく

この際、設定は **Sitecore.config** の **IgnoreUrlPrefixes** の項目に、対象となるディレクトリを指定するだけでいけます。デフォルトで複数設定されているので、 | を利用して追加します。以下のコードは最後に campaign を追加しており、そこに HTML のファイルを配置している場合です。

```xml
    <setting name="IgnoreUrlPrefixes" value="/sitecore/default.aspx|/trace.axd|/webresource.axd|/sitecore/shell/Controls/Rich Text Editor/Telerik.Web.UI.DialogHandler.aspx|/sitecore/shell/applications/content manager/telerik.web.ui.dialoghandler.aspx|/sitecore/shell/Controls/Rich Text Editor/Telerik.Web.UI.SpellCheckHandler.axd|/Telerik.Web.UI.WebResource.axd|/sitecore/admin/upgrade/|/layouts/testing|/sitecore/service/xdb/disabled.aspx|campaign" />
```

ここに HTML ファイルを配置して画像を指定すると以下のように普通のページが表示されていることがわかります。

![config](/static/images/2021/08/config05.png)

あとは対象となるディレクトリにファイルを展開する方法としては GitHub Actions や Azure DevOps Pipeline などを利用することで、サーバーに展開するファイルの手順を決めることができます。

## まとめ

今回は設定の手順に関しての紹介、あと Sitecore が管理しないファイルの配置方法について２つ紹介をしました。どちらも、実際の運用ではよくある展開のパターンですので、覚えておいていただければと思います。

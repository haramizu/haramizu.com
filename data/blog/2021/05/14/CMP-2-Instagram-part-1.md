---
title: Content Hub - CMP Instagram 連携 前編
date: '2021-05-14'
tags: ['Content Hub', 'Instagram']
draft: false
summary: 今回は、Sitecore Content Hub - CMP を利用して、Instagram に写真を投稿する手順に関して紹介をする前編となります。事前の投稿に関する手順の説明が長くなってしまいましたので、慣れている人はサクサクと読んでいただいて、後編に進んでいただければと思います。
images: ['/static/images/2021/05/instagram21.jpg']
---

今回は、Sitecore Content Hub - CMP を利用して、Instagram に写真を投稿する手順に関して紹介をする前編となります。事前の投稿に関する手順の説明が長くなってしまいましたので、慣れている人はサクサクと読んでいただいて、後編に進んでいただければと思います。

## 前提条件

Instagram に投稿をするためには、以下の前提条件が必要となります。

* Facebook の開発者アカウントがあること
* Instagram アカウントがあること
* アップロードする画像を置くことができる場所があること

なお、Instagram のアカウントは通常のアカウントでは投稿できません。ビジネスアカウントに切り替える必要があります。

* [Instagram for Business](https://business.instagram.com/getting-started?locale=ja_JP)

手順はそれほど難しくなく、Instagram のアプリから対象となるアカウントにログインをして以下の手順で切り替えれます。

1. メニュー から **設定** を開きます
2. **アカウント** を選択します
3. **プロアカウントに切り替える** を選択します
4. **ビジネス** を選択します

その後、いくつかのアクティビティをクリアする必要があります。３つの写真のアップロード他のアカウントをチェック、などなどです。

![Instagram](/static/images/2021/05/instagram01.png "Instagram")

ビジネスアカウントになれば、準備完了です。連携する Facebook ページの設定も必要です。

## Facebook でアプリの作成

まず Facebook for Developers のサイトでアプリを作成する必要があります。

![Instagram](/static/images/2021/05/instagram02.png "Instagram")

アプリ一覧のページで**アプリを作成**をクリックします。すると以下のようなダイアログが表示されます。

![Instagram](/static/images/2021/05/instagram03.png "Instagram")

作成をしたいのは Instagram グラフ API を利用するため、上から２つ目を選択します。

![Instagram](/static/images/2021/05/instagram04.png "Instagram")

アプリの名前を入力してください。メールアドレスは、Facebook 開発者に紐づいているものが自動的に入力されていると思います。アプリの目的としては、今回は個人のアカウントをそのまま流用するので、**自分自身または自分のビジネス**を選択します。今回はビジネスマネージャアカウントはないので、そこは何も選択せず、**アプリを作成**をクリックします。

アプリ作成にあたり、ロボットではない確認が表示されます。

![Instagram](/static/images/2021/05/instagram05.png "Instagram")

これをクリアすれば、次の画面に切り替わります。

![Instagram](/static/images/2021/05/instagram06.png "Instagram")

今回利用をしたいのは、Instagram グラフ API の機能になりますので、該当するアイテムの**設定**をクリックしてください。確認事項に切り替わります。

![Instagram](/static/images/2021/05/instagram07.png "Instagram")

今回はサンプルを作るだけですので、ここで手順を終了します。実際にしっかり連携をする際には、アプリの権限設定などを進める必要があります。

## グラフ API エクスプローラーで必要な値を取得する

### アクセストークンの取得

Facebook for Developers のサイトにアクセスをして、グラフ API エクスプローラを開いてください。

![Instagram](/static/images/2021/05/instagram08.png "Instagram")

開くと、以下のような画面になります。右側の Facebook アプリが先ほど作成をしたアプリになっているのも合わせて確認してください（複数ある場合は、選択して切り替えることができます）。

![Instagram](/static/images/2021/05/instagram09.png "Instagram")

今回のアプリの実装で必要となる権限を追加していきます。ユーザーまたはページの項目の選択しでユーザーアクセストークンを取得を選択してください。

![Instagram](/static/images/2021/05/instagram10.png "Instagram")

ダイアログが表示されて、アクセス許可が求められます。ここでは普通にそのままログインしましょう。

![Instagram](/static/images/2021/05/instagram11.png "Instagram")

画面が下のように切り替わります。

![Instagram](/static/images/2021/05/instagram12.png "Instagram")

アクセストークンが生成されている状況です。現在、設定されているアクセス許可は public_profile のみとなっていますが、これから実装するのに必要な権限を追加する必要があります。許可を追加のドロップダウンボックスを利用して、以下の 3 つの項目を追加してください。

* Events Groups Pages
    * pages_show_list
* Other
    * instagram_basic
    * instagram_content_publish

選択している項目を確認して、改めて **Generate Access Token** のボタンをクリックしてください。ログインのダイアログの次に以下の画面が表示されます。

![Instagram](/static/images/2021/05/instagram13.png "Instagram")

Instagram のビジネスアカウントが表示されるので、連携させるアカウントを選択してください。なお、この表示に関しては Instagram のビジネスアカウントを作る際に Facebook Page を作成していないと表示されませんので、ビジネスアカウントに切り替える際に設定していない場合は、設定をしてください。次にすると以下の画面に切り替わります。

![Instagram](/static/images/2021/05/instagram14.png "Instagram")

これは連携させる Facebook ページを選択することになります。ということで１つチェックして次に移動します。

![Instagram](/static/images/2021/05/instagram15.png "Instagram")

最後に権限に関して、正しいかどうかの確認画面が表示されます。完了を押すと以下のように設定が反映されます。

![Instagram](/static/images/2021/05/instagram16.png "Instagram")

利用するのに必要な権限を持ったアクセストークンの取得ができました。なお、この手順で作成をするアクセストークンは、１時間で無効になりますので、継続して利用することはできません。

### Instagram のユーザー ID の取得

このまま、グラフ API エクスプローラを利用して、Instagram のユーザー ID を取得したいと思います。クエリーを投げる項目を /me/accounts に書き換えて送信を送ってください。以下のような結果が表示されます。

![Instagram](/static/images/2021/05/instagram17.png "Instagram")

上記の画面の赤いエリアにある ID が Facebook Page の ID になります。この Facebook Page の ID を利用して、次は Instagram の ID を取得します。クエリーには 

```
{facebook-page-id}?fields=instagram_business_account
```

 と入力して送信を実行すると、以下のような結果が表示されます。

![Instagram](/static/images/2021/05/instagram18.png "Instagram")

赤いところには Facebook Page の ID が、青いところには Instagram のビジネスアカウントの ID が記載されています。

### 次のステップへの確認

この項目で以下の２つの項目が用意できました。

* アクセストークン
* Instagram のユーザーID

## Postman を利用してテスト投稿

上記のパラメーターを利用して、Postman を利用して投稿ができるかどうか確認をします。

### アクセストークンの確認

新しいクエリを作成して Get を送信、URL としては https://graph.facebook.com/me をセットしてください。Authorization のタブを切り替え、Type に OAuth 2.0 を設定、この前のステップで取得したアクセストークンを Access Token に入力します。

![Instagram](/static/images/2021/05/instagram19.png "Instagram")

Send のボタンをクリックすると、以下のようにグラフ API エクスプローラと同じ結果を取得できました。

![Instagram](/static/images/2021/05/instagram20.png "Instagram")

### 写真を投稿する

写真の公開に関する手順は、Facebook for Developer の以下のページでまとめられています。

* [写真の公開](https://developers.facebook.com/docs/instagram-api/guides/content-publishing#publish-photos)

まず最初に写真をアップロード、その後に公開という手順になります。アップロードをするために、先ほどアクセストークンのテストを実施したのは GET メソッドでしたが、これを POST に切り替えます。そして URL を以下のように書き換えてください。

```
https://graph.facebook.com/{Instagram-User-ID}/media?image_url=https//www.example.com/images/bronz-fonz.jpg&caption=文字の投稿
```

パラメーターとして利用しているのは、以下の２つです。

* media_url: 画像ファイルの URL を指定する、JPEG ファイルのみ対応
* caption: 写真と一緒に投稿するコメント

実行すると、レスポンスとして以下のような内容が返ってきます。

```json
{
  "id": "17889455560051444"
}
```

この ID がアップロードした写真の ID になります。この ID を利用して写真を公開する手順を実行します。POST する URL としては、Instagram の ID と、レスポンスで返ってきた ID を利用して、以下のように実行します（以下の最後の ID は上記で返ってきた ID を入れてください）。

```
https://graph.facebook.com/{Instagram-User-ID}/media_publish?creation_id=17889455560051444
```

Send ボタンを押すと、これで写真のアップロードに成功をしました。

![Instagram](/static/images/2021/05/instagram21.jpg "Instagram")

## まとめ

長くなってしまったので、写真を Web サービス経由で投稿するところまでを前編とさせていただきます。後編では、Sitecore Content Hub CMP から Instagram に投稿をするための Web サービス連携の実装を紹介していきます。

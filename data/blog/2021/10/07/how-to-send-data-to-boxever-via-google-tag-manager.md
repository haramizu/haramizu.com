---
title: Google Tag Manager を利用して Sitecore CDP にデータを送信する方法 
date: '2021-10-07'
tags: ['Sitecore CDP']
draft: false
summary: 今年、買収をした CDP の会社の製品は、Sitecore CDP という製品名となってリリースされることになります。今後は CDP のタグを利用して、ブログでも紹介していけたらと考えています。今回は、Google Tag Manager を通じて CDP のタグを挿入する手順について紹介をします。
images: ['/static/images/2021/10/gtm11.png']
---

今年、買収をした CDP の会社の製品は、Sitecore CDP という製品名となってリリースされることになります。今後は CDP のタグを利用して、ブログでも紹介していけたらと考えています。今回は、Google Tag Manager を通じて CDP のタグを挿入する手順について紹介をします。

## Google Tag Manager を利用する理由

多くの Web サイトでは Google Tag Manager を利用しています。Tag 管理ツールは他にも色々とありますが、このブログサイトも Google Tag Manager を利用していることもあり、サンプルとして利用することにします。

## タグマネージャとの連携

まず最初に、Google Tag Manager の管理サイトにログインをしてください。例えば私のサイトだと以下のようになります。

![GTM](/static/images/2021/10/gtm01.png)

新規ボタンをクリックします。

![GTM](/static/images/2021/10/gtm02.png)

まず、トリガーを作成します。上記画面の下部にあるトリガーをクリックします。

![GTM](/static/images/2021/10/gtm03.png)

今回は DOM Ready を対象としたトリガーを作るため、右上の + をクリックします。トリガーの設定をクリックすると以下の画面に切り替わります。

![GTM](/static/images/2021/10/gtm04.png)

一番上にある DOM Ready を選択して、トリガーの名前も DOM Ready にします。

![GTM](/static/images/2021/10/gtm05.png)

作成したトリガーを保存して、タグの作成画面まで戻ります。

![GTM](/static/images/2021/10/gtm06.png)

タグの設定、カスタム HTML タグの挿入を選択します。

![GTM](/static/images/2021/10/gtm07.png)

入力するのは以下のコードを参考に入れてください。もちろん、環境、バージョンに合わせて変更する必要があります。

```javascript
<script>
    ( function() {
        window._boxever_settings = {
           client_key: "boxever5xx33zz44gggydzk",
           target: "https://api.boxever.com/v1.x",
           cookie_domain: "boxever.com",
           javascriptLibraryVersion: '1.4.X',
           pointOfSale: "boxever.com",
           web_flow_target: "https://abcdef.cloudfront.net" 
        }
        // load boxever.js
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://abcdef.cloudfront.net/boxever-' + window._boxever_settings.javaScriptLibraryVersion + '.mini.js';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    })();
</script>
```

タグの名前を今回は Sitecore CDP としました。

![GTM](/static/images/2021/10/gtm08.png)

これで準備が完了しました。

![GTM](/static/images/2021/10/gtm09.png)

公開ボタンを押して、タグをページに展開します。

![GTM](/static/images/2021/10/gtm10.png)

## 動作確認

実際にソースコードを参照しにいくと、以下のように事前に設定していた内容が追加されていることがわかります。

![GTM](/static/images/2021/10/gtm11.png)

## まとめ

Sitecore CDP の導入に際して、すでに Google Tag Manager や同等のタグ管理ツールを利用している場合は、個別にページに埋め込んでいく必要がなく、タグ管理を通じてサイトのページに埋め込みが可能です。もちろん CMS 連携でタグを入れるということも可能ですが、CMS で管理していない対象外のページも含めて、Sitecore CDP の機能を利用できる形となりますので、タグ管理ツールと連携するのが楽ですね。

## 参照サイト

* [How to send data to Sitecore CDP via Google Tag Manager](https://sitecore.cdpknowledgehub.com/docs/how-to-send-data-to-boxever-via-google-tag-manager)
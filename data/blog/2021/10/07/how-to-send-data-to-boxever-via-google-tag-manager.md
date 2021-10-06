---
title: Google Tag Manager を利用して Sitecore CDP にデータを送信する方法 
date: '2021-10-07'
tags: ['CDP']
draft: true
summary: 今年、買収をした CDP の会社の製品は、Sitecore CDP という製品名となってリリースされることになります。今後は CDP のタグを利用して、ブログでも紹介していけたらと考えています。今回は、Google Tag Manager を通じて CDP のタグを挿入する手順について紹介をします。
images: ['/static/images/2021/10/license.png']
---

今年、買収をした CDP の会社の製品は、Sitecore CDP という製品名となってリリースされることになります。今後は CDP のタグを利用して、ブログでも紹介していけたらと考えています。今回は、Google Tag Manager を通じて CDP のタグを挿入する手順について紹介をします。

## Google Tag Manager を利用する理由

多くの Web サイトでは Google Tag Manager を利用しています。Tag 管理ツールは他にも色々とありますが、このブログサイトも Google Tag Manager を利用していることもあり、サンプルとして利用することにします。

## タグマネージャとの連携

まず最初に、Google Tag Manager の管理サイトにログインをしてください。

```javascript
<script>
    ( function() {
        window._boxever_settings = {
           client_key: "boxever5xx33zz44gggydzk",
           target: "https://api.boxever.com/v1.x",
           cookie_domain: "boxever.com",
           javascriptLibraryVersion: "1.4.X",
           pointOfSale: "boxever.com",
           web_flow_target: "https://abcdef.cloudfront.net" 
        }
        // load boxever.js
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://abcdef.cloudfront.net/boxever-' + window._boxever_settings.javaScriptLibraryVersion + 'mini.js';
        ver x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s,x);
    })();
</script>
```

* [How to send data to Sitecore CDP via Google Tag Manager](https://sitecore.cdpknowledgehub.com/docs/how-to-send-data-to-boxever-via-google-tag-manager)
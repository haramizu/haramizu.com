---
title: Next.js Commerce と OrderCloud の連携 - Middleware と Seller の追加（後編）
date: '2021-10-21'
tags: ['OrderCloud','Next.js','Headless']
draft: false
summary: Next.js Commerce と Sitecore OrderCloud の連携で簡単にサイトに管理画面を追加する手順、前回はローカルで動くところまででしたので、今回は最後まで進めていきたいと思います。
images: ['/static/images/2021/10/nextjscommerce34.png']
---

Next.js Commerce と Sitecore OrderCloud の連携で簡単にサイトに管理画面を追加する手順、前回はローカルで動くところまででしたので、今回は最後まで進めていきたいと思います。

## これまでの流れ　

Next.js Commerce と OrderCloud を組み合わせたサンプルサイトを立ち上げ、そこに HeadStart の Middleware および Seller のサイトを追加する手順を進めています。前回はローカルで動作させたので、今回はこれをクラウドに展開したいと思います。

* [Next.js Commerce と OrderCloud の連携](/blog/2021/10/19/Nextjs-Commerce-OrderCloud-part-1)
* [Middleware と Seller の追加（前編）](/blog/2021/10/22/Nextjs-Commerce-OrderCloud-part-2)

## OrderCloud の設定を Azure に反映させる

OrderCloud の管理画面から、Azure の設定項目に値を反映させるために、以下の手続きを進めていきます。まず、OrderCloud の管理画面から API Clients を選択、Vercel-Middleware-Connector を選択すると、Client ID および Client Secret を参照することができます。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce32.png)

この値を、Azure の App Configuration に準備されている項目に反映をさせます。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce33.png)

## Middleware と Seller を展開する

手順としては、以下の手順を進めていきます。

* [Azure への展開](/blog/2021/09/14/OrderCloud-setup-part-5)

ポイントとしては、以下の形となります。

* azure-pipelines.yml から job: Build_Buyer の部分を削除します

![Nextjs Commerce](/static/images/2021/10/nextjscommerce34.png)

* Release の作成に関しても buyer の部分は省略します

パイプラインが出来上がったあと、Middleware Test にマウスカーソルを合わせて、Deploy のボタンをクリックすると展開が始まります。

## 展開後の調整

Middleware および Seller のアプリが展開できました。動作に必要な最後の手順を進めていきます。

* [展開後の調整](/blog/2021/09/15/OrderCloud-setup-part-6)

手順としては、Middleware が App Configuration を参照して起動するところのみとなります。

## まとめ


---
title: Sitecore CLI を利用してクラウドとローカルの環境を揃える
date: '2022-12-07'
tags: ['XM Cloud', 'Sitecore CLI']
draft: true
summary: これまでサーバーとして Sitecore を仮想マシンとして起動していましたが、エンドポイントとして Sitecore Experience Edge というサービスを展開しており、これを利用することで Next.js のアプリを Vercel に簡単に展開することができます。今回はその展開手順に関して紹介をします。
images: ['/static/images/2022/10/symposium.png']
---

dotnet sitecore cloud environment connect --environment-id 2DTFHgm7UpMohhGqd86g6l

dotnet sitecore index list --environment-name development

dotnet sitecore ser pull -n development

http://rendering:3000/api/editing/render
http://rendering:3000

## 参考動画

上記の内容をダイジェストで紹介している動画を YouTube にアップしています。

[![](https://img.youtube.com/vi/8ouE-pT5fDw/0.jpg)](https://www.youtube.com/watch?v=8ouE-pT5fDw)

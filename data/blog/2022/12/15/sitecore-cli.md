---
title: Sitecore Cloud Portal について
date: '2022-10-25'
tags: ['Sitecore Cloud']
draft: true
summary: これまでサーバーとして Sitecore を仮想マシンとして起動していましたが、エンドポイントとして Sitecore Experience Edge というサービスを展開しており、これを利用することで Next.js のアプリを Vercel に簡単に展開することができます。今回はその展開手順に関して紹介をします。
images: ['/static/images/2022/10/symposium.png']
---



dotnet sitecore cloud environment connect --environment-id 2DTFHgm7UpMohhGqd86g6l

dotnet sitecore index list --environment-name development                      

dotnet sitecore ser pull -n development                                        


http://rendering:3000/api/editing/render
http://rendering:3000
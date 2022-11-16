---
title: XM Cloud - macOS 野環境で開発をする
date: '2022-12-14'
tags: ['XM Cloud', 'XM', 'Headless SXA']
draft: false
summary: XM Cloud の SaaS のサーバーを利用しつつ、macOS で開発をする環境の整備について紹介をします。XM Cloud をローカルで動かすのであれば Docker で動作しますが、macOS や Linux では Windows コンテナを利用できないため、今回のような形で作業環境を整えることで、サイト構築に関しての作業は macOS でもできるようになります。
images: ['/static/images/2022/10/symposium.png']
---

XM Cloud の SaaS のサーバーを利用しつつ、macOS で開発をする環境の整備について紹介をします。XM Cloud をローカルで動かすのであれば Docker で動作しますが、macOS や Linux では Windows コンテナを利用できないため、今回のような形で作業環境を整えることで、サイト構築に関しての作業は macOS でもできるようになります。

```
dotnet tool restore

dotnet sitecore cloud login

dotnet sitecore cloud project list

dotnet sitecore cloud environment list --project-id FPOaSmMU32nWCQPneA4Al

cd src/sxastarter

npm install

jss start

```

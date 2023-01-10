---
title: macOS からの開発環境の整備
date: '2023-01-19'
tags: ['XM Cloud', 'XM', 'Vercel']
draft: true
summary: Sitecore XM Cloud で作成をした CMS のデリバリー環境として Vercel を選択することが可能ですが、この作業を簡単にするための Sitecore XM Cloud との連携機能を提供しています。今回は、この機能を利用して、Web サイトを Vercel に展開する手順を紹介します。
images: ['/static/images/2023/01/nextjs03.png']
---

Sitecore XM Cloud で作成をした CMS のデリバリー環境として Vercel を選択することが可能ですが、この作業を簡単にするための Sitecore XM Cloud との連携機能を提供しています。今回は、この機能を利用して、Web サイトを Vercel に展開する手順を紹介します。

```
dotnet tool restore

dotnet sitecore cloud login

dotnet sitecore cloud project list

dotnet sitecore cloud environment list --project-id FPOaSmMU32nWCQPneA4Al

cd src/sxastarter

npm install

jss start

```

---
id: Docusaurus-github
title: GitHub との連携
sidebar_label: GitHub との連携
description: ここでは、Docusaurus を利用しているサイトのコード管理として、GitHub につなげる方法を紹介します。
slug: /Docusaurus/github
---

GitHub のリポジトリと連携する方法を紹介する予定です（以下はまだメモ）。

## リポジトリへの登録準備

## .gitignore の内容

GitHub に連携したくないファイルに関して、私の手元では以下の定義にしています。

```
.DS_Store
.vs_code
.docusaurus

node_modules
build
```

上記３つの項目は隠しファイルとして作成されているので、同期する必要はなしという形です。node_modules および build に関してはローカルで作業をする上で必要なだけなため、同期から外しています。なお、build の中には生成された website が展開されるため、その内容を使ってホスティング、ということは可能です（今回はこの部分は不要です）。

## Visual Studio Code を利用して同期する

ここでは Visual Studio Code を利用した同期の手順を紹介する予定です。

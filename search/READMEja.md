# Sitecore Search Next.js Starter Kit

このサンプルを利用することで、Next.js + Tailwind CSS を利用した Sitecore Search のサンプルサイトを手軽に立ち上げることができます。

- [Englsih Version](README.md)

## 関連ページ

このサンプルの作り方に関して、以下のページで詳細を紹介しています。

- [Next.js - Sitecore Search](https://doc.haramizu.com/nextjs/sitecore-search/)

## 前提条件

このサンプルは以下の環境を前提としてテストをしています。

- Node.js 20.15.0
- Next.js 14.2.18
- Sitecore Search

## 利用方法

1. .env.example のファイルを .env.local に変更します
2. 以下の 3 つの環境変数を指定してください

```text
NEXT_PUBLIC_SEARCH_ENV=
NEXT_PUBLIC_SEARCH_CUSTOMER_KEY=
NEXT_PUBLIC_SEARCH_API_KEY=
```

設定が完了したところで、以下のコマンドを実行します。

```bash
npm install
npm run dev
```

## サンプルサイト

以下のサイトでサンプルを動かしています。

- https://search.haramizu.com/

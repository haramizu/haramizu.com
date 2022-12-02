---
title: Sitecore 10.3 がリリースされました
date: '2022-12-02'
tags: ['XM', 'XP']
draft: false
summary: Sitecore Experience Manager / Platform の最新版となる 10.3 のモジュールのダウンロードが可能となっています。モジュールも一緒に提供されていますので、まとめて紹介をします。
images: ['/static/images/2022/12/sitecore103.png']
---

 Sitecore Experience Manager / Platform の最新版となる 10.3 のモジュールのダウンロードが可能となっています。モジュールも一緒に提供されていますので、まとめて紹介をします。

 ## ダウンロードページ

 以下のページから Sitecore Experience Manager / Platform をダウンロードすることができます。

- [Sitecore Experience Platform 10.3](https://dev.sitecore.net/Downloads/Sitecore_Experience_Platform/103/Sitecore_Experience_Platform_103.aspx)

新しい機能はそれほどありませんが、以下の部分は XM Cloud とも互換性という点では便利な機能となります。

- Headless SXA : Next.js を利用した Sitecore Experience Accelerator を提供します。これによりコンポーネントの開発を TypeScript / React を利用することが可能になります。
- [Sitecore Headless Rendering 21.0.0](https://dev.sitecore.net/Downloads/Sitecore_Headless_Rendering/21x/Sitecore_Headless_Rendering_2100.aspx) : 上記の機能を利用する場合に必要となるモジュールです
- [Sitecore CLI 5.1.25](https://dev.sitecore.net/Downloads/Sitecore_CLI/5x/Sitecore_CLI_5125.aspx) : Sitecore のコマンドラインツールの新しいバージョンから Linux にも対応しました。また、XM Cloud でも同じコマンドラインを利用することができます。
- 10.3 に関する Docker イメージも提供開始

## 関連モジュール

上記のモジュール以外では、以下のモジュールが新しいバージョンに対応してリリースをしています。

- [Sitecore Experience Accelerator 10.3.0](https://dev.sitecore.net/Downloads/Sitecore_Experience_Accelerator/10x/Sitecore_Experience_Accelerator_1030.aspx)
- [Sitecore Azure Blob Storage 5.0.1](https://dev.sitecore.net/Downloads/Sitecore_Azure_Blob_Storage/1x/Sitecore_Azure_Blob_Storage_501.aspx)
- [Sitecore Universal Tracker 7.0.0](https://dev.sitecore.net/Downloads/Sitecore_Universal_Tracker/7x/Sitecore_Universal_Tracker_700.aspx)

なお、Sitecore Horizon に関しては 10.2 までの提供となっており、10.3 からはモジュールの提供が終了します。実は Horizon をベースとした XM Cloud の編集ツール Pages に引き継がれており、今後は XM Cloud での機能強化を行っていく方針となったため、Platform 向けには 10.2 までのリリースとなった形です。

## まとめ

今回の 10.3 のリリースの大きな変更点は、Next.js をベースとした Headless SXA のリリースになります。これにより、既存のお客様はまずは Next.js をベースとした開発が可能となり、将来的にはスムーズに XM Cloud に移行することが可能となります。
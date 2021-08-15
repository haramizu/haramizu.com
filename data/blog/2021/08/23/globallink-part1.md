---
title: Global Link モジュールのインストール
date: '2021-08-23'
tags: ['Sitecore','MultiLanguage','Global Link']
draft: true
summary: 
images: ['/static/images/netlify/deploysummary.png']
---

今回は Stiecore の

## モジュールのインストール


![GlobalLinkModule](/static/images/2021/08/GlobalLink01.png)


## データベースの作成
(local)
App_Data
フォルダにある
GlobalLink_Extension_DB_Script_9.3.6.sql
のスクリプトを実行します。

![GlobalLinkModule](/static/images/2021/08/GlobalLink02.png)

![GlobalLinkModule](/static/images/2021/08/GlobalLink03.png)



## サーバー接続

\App_Config\Include TranslateApp.config

```
<setting name="GlobalLink_connection_string" value=""/>
```



## 日本語リソースのインストール

core database
/sitecore/content/Applications/Content Editor/Ribbons/Strips/GlobalLink

/sitecore/content/Applications/Content Editor/Ribbons/Chunks/GlobalLink

/sitecore/content/Applications/Content Editor/Menues/GlobalLinkDash
/sitecore/content/Applications/Content Editor/Menues/GlobalLink/Add Single

/sitecore/content/Applications/WebEdit/Ribbons/WebEdit/GlobalLink

/sitecore/content/Applications/WebEdit/Ribbons/WebEdit/GlobalLink/Translation/AddtoList
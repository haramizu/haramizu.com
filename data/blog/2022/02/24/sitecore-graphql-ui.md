---
title: Sitecore Headless - GraphQL UI の利用
date: '2022-02-24'
tags: ['Sitecore', 'Headless']
draft: false
summary: Sitecore XM に対して Headless Service をインストールすることで、GraphQL を利用してデータの取得が可能となります。今回は、データをどういう形で取得することができるのか、というのを紹介します。
images: ['/static/images/2022/02/graph01.png']
---

Sitecore XM に対して Headless Service をインストールすることで、GraphQL を利用してデータの取得が可能となります。今回は、データをどういう形で取得することができるのか、というのを紹介します。

## 現在のデモ環境に対して

データを取得する際に GraphQL を利用することで、Web サイトで利用したいデータを取得することが可能となります。標準ではサーバーに対して以下の URL でアクセスすると画面が表示されます。

- https://servername/sitecore/api/graph/edge/ui

左下に HTTP HEADERS に API キーを設定します。記述の手順は以下のようになります。

```json
{
  "sc_apikey": "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}"
}
```

![vercel](/static/images/2022/02/graph01.png)

## サンプルを実行する

Web サイトに紹介されているサンプルをいくつか実行をしてみます。まずは、ホームアイテムのタイトルを取得します。

```graphql
query {
  # path can be an item tree path or GUID-based id
  item(path: "/sitecore/content/sitecoredemo-jp/home", language: "en") {
    # items can be cast to a Template type with inline fragments
    ... on AppRoute {
      pageTitle {
        value
      }
    }
    # fields can be cast to a Field type with inline fragments
    field(name: "pageTitle") {
      ... on TextField {
        value
      }
    }
  }
}
```

結果は以下の通りです。

```json
{
  "data": {
    "item": {
      "pageTitle": {
        "value": "Welcome to Sitecore JSS"
      },
      "field": {
        "value": "Welcome to Sitecore JSS"
      }
    }
  }
}
```

![vercel](/static/images/2022/02/graph02.png)

サイト名と HTTP URL でアイテムを検索し、レイアウトサービスの出力を取得してフレームワーク固有の Sitecore プレースホルダの実装でレンダリングすることができます。

```graphql
query {
  layout(site: "sitecoredemo-jp", routePath: "/", language: "en") {
    item {
      rendered
    }
  }
}
```

結果は以下の通りです。

```json
{
  "data": {
    "layout": {
      "item": {
        "rendered": {
          "sitecore": {
            "context": {
              "pageEditing": false,
              "site": {
                "name": "sitecoredemo-jp"
              },
              "pageState": "normal",
              "language": "en",
              "itemPath": "/"
            },
            "route": {
              "name": "home",
              "displayName": "home",
              "fields": {
                "pageTitle": {
                  "value": "Welcome to Sitecore JSS"
                },
                "PageDescription": {
                  "value": ""
                }
              },
              "databaseName": "master",
              "deviceId": "fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3",
              "itemId": "70673cb7-453a-5695-b49b-ad3db8b8a2de",
              "itemLanguage": "en",
              "itemVersion": 1,
              "layoutId": "5163b1da-fe74-5a97-8260-8913e2c24b18",
              "templateId": "49d6a53c-8c9b-570e-baf6-27a31b4363bc",
              "templateName": "App Route",
              "placeholders": {
                "jss-main": [
                  {
                    "uid": "2c4a53cc-9da8-5f51-9d79-6ee2fc671b2d",
                    "componentName": "ContentBlock",
                    "dataSource": "{806A7A34-B8A3-5D89-9DD4-FDFC3F39192E}",
                    "fields": {
                      "heading": {
                        "value": "Welcome to Sitecore JSS Demo"
                      },
                      "content": {
                        "value": "<p>Thanks for using JSS!! Here are some resources to get you started:</p>\n\n<h3><a href=\"https://jss.sitecore.com\" rel=\"noopener noreferrer\">Documentation</a></h3>\n<p>The official JSS documentation can help you with any JSS task from getting started to advanced techniques.</p>\n"
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    }
  }
}
```

![vercel](/static/images/2022/02/graph03.png)

テストとしては今回３つ目ですが、サイトのパスを取得してみます。

```
query {
  layout(site: "sitecoredemo-jp", routePath: "/", language: "en") {
    item {
      homeItemPath: path
      contentRoot: parent {
        id
        path
      }
    }
  }
}
```

```json
{
  "data": {
    "layout": {
      "item": {
        "homeItemPath": "/sitecore/content/sitecoredemo-jp/home",
        "contentRoot": {
          "id": "0822F5B0382E5788BC4812BF665DAB56",
          "path": "/sitecore/content/sitecoredemo-jp"
        }
      }
    }
  }
}
```

![vercel](/static/images/2022/02/graph04.png)

上記３つに関して、site の値やパスなどが異なる場合は、クエリの部分を調整して実行してください。

## まとめ

Sitecore に蓄積されているデータを GraphQL を利用して JSON のデータとして取得することができました。今後これの利用方法に関しても追って紹介をしていきます。

## 参考情報

- [Query examples](https://doc.sitecore.com/xp/en/developers/101/developer-tools/query-examples.html)

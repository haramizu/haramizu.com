---
title: Sitecore CLI を利用してクラウドとローカルの環境を揃える
date: '2022-12-07'
tags: ['XM Cloud', 'Sitecore CLI']
draft: false
summary: これまでサーバーとして Sitecore を仮想マシンとして起動していましたが、エンドポイントとして Sitecore Experience Edge というサービスを展開しており、これを利用することで Next.js のアプリを Vercel に簡単に展開することができます。今回はその展開手順に関して紹介をします。
images: ['/static/images/2022/10/symposium.png']
---

## インポート、エクスポートの環境を整える

![sitecore cli](/static/images/2022/12/cli01.png)

```
PS C:\projects\sxastarter> dotnet sitecore cloud login --allow-write true
[DeviceLogin] User Code : VVBK-FDTH
[DeviceLogin] Authentication url : https://auth.sitecorecloud.io/activate?user_code=VVBK-FDTH
[DeviceLogin] Authorization pending. Waiting.
PS C:\projects\sxastarter>
```

![sitecore cli](/static/images/2022/12/cli02.png)

```
PS C:\projects\sxastarter> dotnet sitecore cloud project list

sxastarter Project detailed information:
Organization Name : sitecore-saas-ops-sales-engineers-16
Organization Id   : org_BrDOm5eGLFWpHs2e
Project Id        : 4KRUJ3FMWIJaDsBIod0oAL
Project name      : sxastarter
Region            : jpe (Japan East)
Created by        : shinhara@sitecore.net
Created at        : 2022/11/14 4:29:57
Last updated by   : shinhara@sitecore.net
Last updated at   : 2022/11/14 4:29:57

PS C:\projects\sxastarter>
```

```
PS C:\projects\sxastarter> dotnet sitecore cloud environment list --project-id 4KRUJ3FMWIJaDsBIod0oAL
Found 1 environment(s)
development Environment detailed information:
Organization Id                   : org_BrDOm5eGLFWpHs2e
Organization Name                 : sitecore-saas-ops-sales-engineers-16
Project Id                        : 4KRUJ3FMWIJaDsBIod0oAL
Project name                      : sxastarter
Environment Id                    : 5lCcnEfcWlVfZLjbRyboNq
Environment Name                  : development
Environment Host                  : xmc-sitecoresaa6664-sxastarter-development.sitecorecloud.io
Environment Type                  : nonprod
Created by                        : shinhara@sitecore.net
Created at                        : 2022/11/14 4:29:59
Last updated by                   : shinhara@sitecore.net
Last updated at                   : 2022/11/14 6:29:45
Provisioning status               : Complete
Provisioning last failure message :

PS C:\projects\sxastarter>
```

```
PS C:\projects\sxastarter> dotnet sitecore cloud environment connect --environment-id 5lCcnEfcWlVfZLjbRyboNq
Connecting to the environment...
PS C:\projects\sxastarter>
```

```
PS C:\projects\sxastarter> dotnet sitecore index list --environment-name development
Indexes list:
sitecore_core_index
sitecore_master_index
sitecore_web_index
sitecore_horizon_index
PS C:\projects\sxastarter>
```

```json:src\InitItems.module.json
{
    "namespace": "InitItems",
    "items" : {
        "includes": [
            {
                "name": "content-root",
                "path": "/sitecore/content",
                "scope": "singleItem",
                "allowedPushOperations": "createAndUpdate"
            }
        ]
    }
}
```

```json:src\SitecoreDemo-Content.module.json
{
    "namespace": "SitecoreDemo-Content",
    "references": [ "SitecoreDemo" ],
    "items": {
        "includes": [
            {
                "name": "content",
                "path": "/sitecore/content/sxastarter"
            },
            {
                "name": "media",
                "path": "/sitecore/media library/Project/sxastarter"
            }
        ]
    }
}
```

```json:src\SitecoreDemo.module.json
{
    "namespace": "SitecoreDemo",
    "references": [ "InitItems" ],
    "items": {
        "includes": [
            {
                "name": "placeholders",
                "path": "/sitecore/layout/Placeholder Settings/Project/sxastarter"
            },
            {
                "name": "renderings",
                "path": "/sitecore/layout/Renderings/Project/sxastarter"
            },
            {
                "name": "templates",
                "path": "/sitecore/templates/Project/sxastarter"
            },
            {
                "name": "languages",
                "path": "/sitecore/system/Languages"
            }
        ]
    }
}
```

## データの取得、反映

まずクラウドの環境からデータを取得します。

```
dotnet sitecore ser pull -n development
```

```
dotnet sitecore ser push -n default
```

![sitecore cli](/static/images/2022/12/cli03.png)

http://rendering:3000/api/editing/render
http://rendering:3000

![sitecore cli](/static/images/2022/12/cli04.png)

## 参考動画

上記の内容をダイジェストで紹介している動画を YouTube にアップしています。

[![](https://img.youtube.com/vi/8ouE-pT5fDw/0.jpg)](https://www.youtube.com/watch?v=8ouE-pT5fDw)

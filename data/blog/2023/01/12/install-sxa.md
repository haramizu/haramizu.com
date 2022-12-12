---
title: SXA のモジュールを追加する
date: '2023-01-12'
tags: ['Docker', 'Next.js', 'XM']
draft: false
summary: 前回の記事でまずはテンプレートとなるプロジェクトを作成しました。今回は、一番シンプルな XM1 を実行するためのプロジェクトにするために、不要なものを削除、調整の手順を進めていきます。
images: ['/static/images/2023/01/newproject01.png']
---

前回は XM1 のインスタンスを起動することができました。今回は、Next.js のプロジェクトを追加するにあたって必要となる Sitecore Experience Accelerator のモジュールをコンテナで利用できる様に追加の設定をしていきます。

```.env
SITECORE_MODULE_REGISTRY=scr.sitecore.com/sxp/modules/
SPE_VERSION=6.4-1809
SXA_VERSION=10.3-1809
```

```yaml:docker-compose.override.yml
  mssql-init:
    build:
      args:
        SPE_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-spe-assets:${SPE_VERSION}

  solr-init:
    build:
      args:
        SXA_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-sxa-xm1-assets:${SXA_VERSION}

  cd:
    build:
      args:
        SXA_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-sxa-xm1-assets:${SXA_VERSION}

  cm:
    build:
      args:
        SPE_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-spe-assets:${SPE_VERSION}
        SXA_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-sxa-xm1-assets:${SXA_VERSION}
```

```docker:docker\build\cm\Dockerfile
ARG SXA_IMAGE
ARG SPE_IMAGE

FROM ${SPE_IMAGE} as spe
FROM ${SXA_IMAGE} as sxa

# Add SPE module
COPY --from=spe \module\cm\content .\

# Add SXA module
COPY --from=sxa \module\cm\content .\
COPY --from=sxa \module\tools \module\tools
RUN C:\module\tools\Initialize-Content.ps1 -TargetPath .\; `
    Remove-Item -Path C:\module -Recurse -Force;
```

```docker:docker\build\cd\Dockerfile
ARG SXA_IMAGE

FROM ${SXA_IMAGE} as sxa

# Add SXA module
COPY --from=sxa \module\cd\content .\
COPY --from=sxa \module\tools \module\tools
RUN C:\module\tools\Initialize-Content.ps1 -TargetPath .\; `
    Remove-Item -Path C:\module -Recurse -Force;
```

```docker:docker\build\mssql-init\Dockerfile
# copy pse
COPY --from=spe C:\module\db C:\resources\spe
```

```docker\build\solr-init\Dockerfile
ARG SXA_IMAGE

FROM ${SXA_IMAGE} as sxa

# Add SXA module
COPY --from=sxa C:\module\solr\cores-sxa.json C:\data\cores-sxa.json
```

## 起動する

```
docker-compose build
docker-compose up -d
```

コンテンツエディターでテナントの作成ができることを確認。

![clean](/static/images/2023/01/sxa01.png)

![clean](/static/images/2023/01/sxa02.png)

## まとめ

これで Sitecore XM の環境で SXA を利用できる様になりました。

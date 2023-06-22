---
title: Headstart デモ環境を構築する - Part 9 Azure DevOps と GitHub 連携
date: '2022-02-15'
tags: ['Sitecore', 'OrderCloud']
draft: true
summary: ミドルウェアが起動して初期データの設定ができました。続いて、EC サイトのストアフロントとなる buyer およびEC サイトの管理画面となる seller のサイトをローカルで起動していきます。
images: ['/static/images/2022/02/dev10.png']
---

ミドルウェアが起動して初期データの設定ができました。続いて、EC サイトのストアフロントとなる buyer および EC サイトの管理画面となる seller のサイトをローカルで起動していきます。

## 連携前の作業として

`azure-pipelines.yml` のファイルの `zipAfterPublish` を true に変更

```yaml:azure-pipelines.yml
      - task: DotNetCoreCLI@2
        displayName: Publish Middleware
        inputs:
          command: publish
          publishWebProjects: false
          projects: "**/Headstart.API.csproj"
          arguments: --configuration Release --output middleware
          zipAfterPublish: true
```

`version.yml` にある `middlewaer` の URL を変更する

```yaml
steps:
  - task: PowerShell@2
    displayName: Get Build Number
    inputs:
      targetType: inline
      script: >-
        try {
            # call out to hosted endpoint to get the current version and add one for this build
            [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
            $response = Invoke-RestMethod -Uri "https://headstartdemo-middleware.azurewebsites.net/env"
            $newversion = [int]$response.BuildNumber.Split(".")[2] + 1
            Write-Host "##vso[build.updatebuildnumber]1.0.$newversion.$(Build.BuildId)"

        } catch {
            $newversion = 1
            Write-Host "##vso[build.updatebuildnumber]1.0.$newversion.$(Build.BuildId)"
        }
```

## プロジェクトの作成

Azure DevOps にログインをします。

![OrderCloud](/static/images/2022/02/dev01.png)

実際に作業をするためのプロジェクトを追加するべく、New Project を作成（ Headstart Test ) を今回は作成しました。

![OrderCloud](/static/images/2022/02/dev02.png)

## パイプラインの作成

左側のメニューで Pipelines - Pipelines を選択、右側に出てくる Create pipeline のボタンをクリック

![OrderCloud](/static/images/2022/02/dev03.png)

連携するコードは今回は GitHub になるため、GitHub を選択します。

![OrderCloud](/static/images/2022/02/dev04.png)

今回はリポジトリの名前として設定している headstart-demo を選択します。

![OrderCloud](/static/images/2022/02/dev05.png)

リポジトリの設定の際には、権限設定の画面で権限を許可する必要があります。対象のリポジトリを選択して、**Approve and Install** をクリックしてください。

![OrderCloud](/static/images/2022/02/dev06.png)

azure-pipelines.yml が読み込まれているのを確認して、右上にある Run ボタンの右側の下矢印を利用して保存する。

![OrderCloud](/static/images/2022/02/dev07.png)

完了すると以下の画面になります。

![OrderCloud](/static/images/2022/02/dev08.png)

画面の中央に表示されている **Run Pipeline** をクリックします。

![OrderCloud](/static/images/2022/02/dev09.png)

今回は main のブランチを対象としてビルドを実行するので、表示された画面のまま進めます。問題なく動作するようになった場合、パイプラインの実行に関しては 10 分ちょっとで完了します。

![OrderCloud](/static/images/2022/02/dev10.png)

**注意：** ここで、以下のようなエラーが表示される場合があります。

```
No hosted parallelism has been purchased or granted. To request a free parallelism grant, please fill out the following form https://aka.ms/azpipelines-parallelism-request
```

![OrderCloud](/static/images/2021/09/ordercloud51.png)

これは Azure DevOps の設定が不足しているためです。指定された URL をクリックするとフォームが表示されて、リクエストをすると、私の場合は 3 日で設定が完了して利用できるようになりました。

## まとめ

今回のパイプラインに関しての処理ですが、全てを動画として YouTube にアップロードしてみました。

[![](https://img.youtube.com/vi/gUdmVrY_nm0/0.jpg)](https://www.youtube.com/watch?v=gUdmVrY_nm0)

次回はビルドが成功した次のステップとしてリリースを作成して、Azure のインスタンスに対して展開していく手順を紹介します。

- [Part 10 リリースの作成と動作確認](/blog/2022/02/16/headstartdemo-step10)

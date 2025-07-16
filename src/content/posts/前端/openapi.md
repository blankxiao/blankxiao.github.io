---
title: 【工具】- swagger-typescript-api
date: 2024-10-26
summary: 简化前后端接口交互的工具 自动生成类型和接口
tags: [前端, 工具]
category: 前端
comments: true
draft: false
lastMod: 2024-10-26
sticky: 0
---

swagger-typescript-api 是一个用于简化前后端交互的工具，它可以根据 OpenAPI 规范生成 TypeScript 类型和接口代码。这样可以减少手动编写 API 调用代码的工作量，并且提供类型安全的接口调用。

### swagger-typescript-api

下载

```powershell
pnpm install -g swagger-typescript-api
```

#### 代码生成

```powershell
pnpm swagger-typescript-api -p ../api-docs.json -o ./src --axios --modular --module-name-index 0 --single-http-client
```

- `-p` 输入的swagger json文件路径
- `-o` 输出路径
- `--axios` 使用axios
- `--modular` 生成模块化代码 分离http client, data constracts, 和routes，否则只会生成一个大文件
- `--module-name-index 1` 分离routes，意思是按api路径.split('/')[1]拆分接口文件
- `--single-http-client` 意为只有一个http客户端

执行成功后 就会有如下的文件  
![生成的apis结构](https://raw.githubusercontent.com/blankxiao/blankxiao.github.io/main/public/imgs/frontend/apis_structure.png)

其中 `http-client.ts`是一个**封装的请求类**  
`data-contracts.ts` 是所有类型的文件 比如DTO VO啥的  
其他生成的文件都是后端的接口文件 根据路由分隔的  
ps: 如果你生成的文件巨多巨乱 可能是因为`--module-name-index` 参数没有配好，这个参数是根据路由来拆分的，比如 参数为2 那么`/api/v1/xx` 会以xx为模块名 创建文件 内容就是这个路由下的所有接口

使用前，需要将定义好的axios实例引入

```ts
// http-client.ts
import request from '../http/index'; // 导入你封装好的 Axios 实例
// ...
// 在HttpClient这个类的构造函数中，添加默认的构造器
constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
  this.instance = request; // 改动这里
  this.secure = secure;
  this.format = format;
  this.securityWorker = securityWorker;
}
```

使用时，需要引入两个东西

```ts
// 这个是配置实例
import { HttpClient } from '../apis/http-client'
// 这个是具体的接口文件
import { User } from '../apis/User'
// 实例化接口api类
const userApi = new User(new HttpClient())

// 用的时候就有接口提示 这里的名字是后端定义的
let result = await userApi.loginUsingPost(loginForm.value)
```

众所周知，axios的ts支持很逆天，因此大概率需要断言  
比如 取出一个token

```ts
userStore.setToken((result as ResultTokenVO).data?.token as string)
```

##  Spring Boot 轻论坛后端请移步至 [https://gitee.com/diyhi/bbs-pro](https://gitee.com/diyhi/bbs-pro)

<br>

## 项目介绍
巡云轻论坛的配套前台电脑版前端项目，需要搭配指定版本的后端使用

<br><br>

#### 后端和前端对应兼容版本

|  轻论坛后端版本   | 前端版本  |
|  ----  | ----  |
| v5.8 <br>v5.9 | v2022.10.10 <br> v2022.11.24 <br> v2023.1.3|
| v6.0  | v2023.7.3|
| v6.1  | v2023.9.25|
| v6.2  | v2024.2.29|
| v6.3  | v2024.5.10|
| v6.4  | v2024.6.20|

<br><br>

#### 技术选型
Vite2 + TypeScript + Vue3 + element-plus

官方网站：[http://www.diyhi.com/](http://www.diyhi.com/)

演示网站：[http://www.diyhi.com/cms.html](http://www.diyhi.com/cms.html) 页面可获取前后台演示地址、登录账号和密码


服务器部署配置参考：[http://www.diyhi.com/article-10.html](http://www.diyhi.com/article-10.html)

<br>



## 源码运行教程
<br>

**配置后端跨域** 
<br>
后端配置跨域有两种方法，可以选择其中一种，注意不要两种方法同时配置

- 方法一（推荐开发时使用）：
后端java项目配置跨域参数。
在Spring Boot轻论坛项目里找到crossOrigin.properties文件，将前端的访问地址写入allowedOrigins属性里面。修改完需要重启项目才能生效

<br>

- 方法二（推荐服务器部署时使用）：
使用Nginx配置跨域。
参考：[http://www.diyhi.com/article-10.html](前后端分离模板在服务器上部署)链接里的Nginx配置方法
<br>

**切换后端模板** 
<br>
登录安装好的轻论坛后端管理后台 --> 模板列表 --> 点击列表“使用中”列的按钮，将当前使用的模板切换到“前后端分离模板”

<br>

需要先安装node，推荐使用node 16及以上版本。

将本项目源代码下载到您的本地硬盘里，解压出来，进入您的项目目录，打开配置文件.env.development和.env.production，将VITE_API_URL属性值修改为后端访问地址。

然后执行命令

 **安装** 
```
npm install
```

 **运行** 
```
npm run dev
```

 **打包** 
```
npm run build
```



<br>


## 前端界面
![输入图片说明](bbs-web-pc_%E5%89%8D%E7%AB%AF%E5%9B%BE%E7%89%87_v2024.6.20.jpg)
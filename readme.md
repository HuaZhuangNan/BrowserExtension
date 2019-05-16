# 最爱小助手

## 前言：这是我的第一个浏览器插件demo，现学现卖可能bug多，感兴趣的可以参与进来( ˶‾᷄࿀‾᷅˵ )

## 更新：
  + 首先感谢大家的支持，因为电脑屏幕碎了花了我300大洋自己装，所以我前些时间一直没有修复这些bug，希望大家好好学习吧！
  + 本次删除公共的content-script.js,修复了智慧树跳章节等问题
  + 版本升级 1.1.0
  + 完工 2019年5月13日 17点55分

## 联系方式QQ：2382252568

## 准备编写一个答题辅助插件有兴趣的也欢迎来骚扰

## 介绍：低调使用，建议不过6倍
  + 名字：最爱小助手
  + 版本：1.0.1
  + 作者：陌轩痕(到现在都不知道自己当初为啥叫这个名字)
  + 语言 JavaScript、Html、Css
  + 完工时间：2019年3月29
  + 功能看图：
  + ![功能展示](./img/zs.png)
  + 网站支持：智慧树和超星学习通（bg-init.js过滤实现）。
  + 说明：本软件只提供学习交流请勿使用于任何商业行为，转载请标注来源，不得侵犯。

## 使用教程见视频 jc.mp4 视频里加载的软件的文件夹就是src文件夹
## 目录文件详解
  + doc 文档
  + mainifset.json  插进配置文件 
  + src/view
  
| 文件名 |	 解释 |
|--	|--	|
| background | 后台运行页面	|
| help.html	|	帮助页面待做 |
|	no.html | 不支持网站弹出页面 |
| popup.html | 支持时弹出的设置页 |
  
  + src/lib  jquery支持
  + src/js   
   
| 文件名 |	 解释 |
|--	|--	|
| bg-init.js | 后台运行页面js初始化	|
| bg-tool.js	|	popup和后台公用的方法 |
| event-panges.js | 是否需要注入脚本判断 |
| log.js | 本地日志 |
| popup.js | 弹窗设置页面js |
| zhs.js | 智慧树脚本js |
| cxt.js | 超星通脚本js |

## 文章链接：
  + [CSDN](https://blog.csdn.net/weixin_43596929/article/details/89044160)
  + [简书](https://www.jianshu.com/p/bb6277f7d2f4)

## 后记：送大家一句话吧：未来的不可知是我前进的源动力！

## 如果觉得好用，支持下呗

 <img alt="QQ" src="./img/qq.png" width="30%" height="400px" style="float:left;">
 <img alt="微信" src="./img/wexin.png" width="30%" height="400px" style="float:left;">
 <img alt="支付宝" src="./img/zfb.jpg" width="30%" height="400px" style="float:left;">

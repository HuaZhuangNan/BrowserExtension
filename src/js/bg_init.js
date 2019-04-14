

// 开启接口获取页面有关信息
var detailsInfo=null;
(function(chrome){
  // 1. 扩展安装,升级,浏览器升级时触发初始化数据 
  chrome.runtime.onInstalled.addListener(function(details){
    config = { // 默认数据传入
      "url":[
        { "name":"zhs","herf": "zhihuishu.com","jspath":"/js/zhs.js"},
        { "name":"cxt","herf": "chaoxing.com","jspath":"/js/cxt.js"}
      ],
      "set":{
        "autoplay" : "true",      // 自动播放
        "speed" : "1.5",    // 播放速度
        "muted" : "true",   // 静音
        "autodt"  : "true",   // 播放速度
        "autonext" : "true",  // 自动下一章
        "state"  : "false",  // 状态
      }
    }
    // 1.2 清理数据后添加默认数据,（配置和日志）
    Tools.clearStronge(function() {
      Tools.setStorage(config,function(){
        setLog({"msg": "最爱助手安装", "start" : details});
      })
    })
    
    // 1.3 建立规则
    var urlRlue = [];
    config.url.forEach(function(value){
      urlRlue.push({ urlContains: value.herf})
    });
    // 1.3.2 当网页载入前  检测上次是否正常关闭是否正确,网站是否支持(添加规则)
    chrome.webNavigation.onCommitted.addListener(function (details){
      // 显示可以操作的页面
      chrome.browserAction.setPopup({tabId:details.tabId,popup:"../view/popup.html"});
      initConfig(details); // 初始化数据
      initLog(details); // 删除过期3天的日志
      detailsInfo = details; //页面信息写入
//       // 监听标签更新
//        chrome.tabs.onUpdated.addListener(details,function(dd){
//         chrome.browserAction.setPopup({tabId:details.tabId,popup:"../view/popup.html"});
//        })
      // 后台完成了 写日志啦。。。
      setLog({"url":details.url,"msg":"后台初始化成功"});
    },{url:urlRlue});
  });
  
  // 初始化新的数据
  function initConfig(details){
    Tools.getStorage(["set"],function(result){
      if(result.set.autorun=="true") {  // 说明开启了自启
        result.set.autorun="true"; // 更新当前页面数据
        result.set.state = "true";
    }else result.set.state ="false";
    Tools.setStorage(result); // 更新内存里的数据
    })
 }
 // 是否需要删除日志（保存三天）
 function initLog(){
  var day = new Date().getDay();// (这里面就是) 0-6
  if(day<=3) day +=4; 
  else  day -=3;
  // 是否删除
  getLog(day,function(result){
    if(result[day]){
      day ="Log"+day;
      removeLog(day,function(){
        setLog({"form":"日志满3天管理","msg":"删除了"+day+"的日志"});
      })
    }
  })
 }
 // 
 window.addEventListener("error", function(evt){
  console.log(evt);
 })

})(chrome);
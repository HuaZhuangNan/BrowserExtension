// 公用的函数
var publicFn = {
  init: function(that){
    // 开启监听事件
    console.log("初始化OK!")
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){ 
      if(request&&request.form == "popup"){ 
        // 1. 收到消息更新数据
        publicFn.getSetInfo(function(setConfig){ 
          that(setConfig); //执行数据
          if(setConfig.state=="true") sendResponse("恭喜你,最爱助手正在运行中....");
          else sendResponse("恭喜你,最爱助手停止成功。。");
        })
      }
      return true;
    })
  },
  // 获取配置文件
  getSetInfo: function(callback){
    chrome.storage.sync.get(["set"], function(result) {
      if(callback&&result) callback(result.set);
    });
  }
}

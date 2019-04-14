
// 时间格式化
// new Date().Format("yyyy-MM-dd");
// new Date().Format("yyyy-MM-dd HH:mm:ss");
Date.prototype.Format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "H+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


// 工具函数对象
var Tools = {
  // 短消息消息发送处理 如果需要异步返回，接收方监听时需要 return true; 参数：【callback】
  sendMessageToContentScript: function(message, callback){
    Tools.getCurrentTabId(function(tabId){
      chrome.tabs.sendMessage(tabId, message, function(result){
        if(callback) callback(result);
      })
    })
  },
  // 获取当前选项卡ID 【callback】
  getCurrentTabId: function (callback){
  	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
  		if(callback) callback(tabs.length ? tabs[0].id: detailsInfo.tabId);
  	});
  },
  // 储存
  // 储存更改触发事件 【callback】
  eventStorage: function(callback){
    chrome.storage.onChanged.addListener(function(changes, areaName){
       if(callback) callback(changes, areaName);
    });
  },
  // 设置内存数据  参数：对象 ,【callback】
  setStorage: function(obj,callback){
    chrome.storage.sync.set(obj, function() {
      if(callback) callback();
    });
  },
  // 获取内存数据  参数：字符串 数组 || obj(如果有就返回,没有就返回指定对象) ,【callback】
  getStorage: function(key,callback){
    chrome.storage.sync.get(key, function(result) {
      if(callback) callback(result);
    });
  },
  // 清除数据参数：字符串数组 ,【callback】
  removeStorage: function(key,callback){
    chrome.storage.sync.remove(key, function(result) {
      if(callback) callback(result);
    });
  },
  // 清空存储
  clearStronge: function(callback){
    chrome.storage.sync.clear(function() {
      if(callback) callback();
    });
  }
  
}
// popup.js 需要的方法
// 启动按钮start
var jspath=null; //
var detailsInfo;
var cs = 0;
function startJb(setConfig,callback){
  Tools.setStorage(setConfig,function(){
    // 注入脚本
    if(jspath==null){
        Tools.getStorage(["url"],function(request){
          for(var i=0;i<request.url.length;i++){
            if(~detailsInfo.url.indexOf(request.url[i].herf))
              {jspath = request.url[i].jspath;
              break;}
          }
          // 注入
          if(jspath&&cs==0) {
            chrome.tabs.executeScript((detailsInfo.tabId),{file: jspath});
            callback({"err":0,"msg":"请稍等，确认状态中....."});
            setLog({"msg":"脚本注入成功！"});
            cs++;
          }else {
           callback({"err":1,"msg":"适合的脚本未找到!!"});
           setLog({"msg":"适合的脚本未找到！"});
          }
        })
    }
    else {
      callback({"err":0,"msg":"请稍等，确认状态中....."});
      setLog({"msg":"脚本注入成功"});
    }
  })
}
   

chrome.tabs.onUpdated.addListener(function(id,info) {
  cs=0;
  // if(detailsInfo.url)detailsInfo.url=info.favIconUrl;
  jspath=null;
});



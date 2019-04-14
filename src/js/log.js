

// 日期格式化


/* { "form": form || url , obj.msg} */

// 日志保存 3 天一天最多300条日志
function setLog(obj){
  var data = new Date();
  var key = "log"+data.getDay();
  var msg = obj.msg || "";
  obj.time = data.Format("yyyy-MM-dd HH:mm:ss");
  obj.form = obj.form || "";
  if(obj.url) obj.form = obj.url.replace(/\?(\S)*|\#(\S)*/,"");
  getLog(data.getDay(),function(logos){
    if(logos[key]){
      if(logos[key].length>=300){
        logos[key] = [{"msg":"清空了300条以上日志！","time":obj.time}];
      }else logos[key].push(obj);
      chrome.storage.local.set({[key]:logos[key]},retunCon);
    }else chrome.storage.local.set({[key]:[obj]},retunCon);
  })
  function retunCon(){
    console.log(obj.time +" ---- "+ msg +" ---- "+ obj.form);
  }
}

function getLog(day,callback){
  var key = "log"+day;
  chrome.storage.local.get([key], function(logs) {
    if(callback) callback(logs);
  })
};
function removeLog(day,callback){
  var key = "log"+day;
  chrome.storage.local.remove([key], function(key) {
    if(callback) callback(key)
  })
};
function clearLog(callback){
  chrome.storage.local.clear(function() {
    if(callback) callback();
  })
};


// 获取当天日志
function getDayLogs(){
  getLog(new Date().getDay(),function(logs){
    console.log(logs)
  })
}
// 清理日志
// chrome.storage.local.clear(function() {
//     
// })







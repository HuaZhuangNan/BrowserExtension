

$(function(){
  
 
  var content  = $("#content");  // 内容区域
  var info  = $("#prompt .info").eq(0); // 提示区域
  // 设置数据节点区块
  var autoplay = content.find(".autoplay select"),  // 自动播放
      speed    = content.find(".speed input"),  // 播放速度
      muted    = content.find(".muted select"), // 是否静音
      autodt   = content.find(".autodt select"), // 自动答题
      autonext = content.find(".autonext select"); // 自动跳章
  // 按钮
  var start    = content.find(".set .start").eq(0), // 启动
      restart = content.find(".set .restart").eq(0), // 重启
      goon    = content.find(".set .goon").eq(0), // 继续
      stop    = content.find(".set .stop").eq(0); // 停止
  
  // 1.获取background 函数
  chrome.runtime.getBackgroundPage(function(e){
    // 2. 页面数据初始化
    init(e);
    // 按钮状态初始化
    start.show();restart.hide();goon.hide();stop.hide(); 
    // 3.绑定事件
    eventButton(e);
  });
  function init(bg){
      var bg =bg;
      // 数据初始化
      bg.Tools.getStorage(["set"],function(result){
        if(!result.set) return true;
          result = result.set;
          speed.eq(0).val(result.speed);
          // 默认选中
          if(result.autoplay=="false") autoplay.find("option").eq(1).attr("selected","selected");
          if(result.autodt=="false") speed.find("option").eq(1).attr("selected","selected");
          if(result.autonext=="false") autodt.find("option").eq(1).attr("selected","selected");
          if(result.muted=="false") muted.find("option").eq(1).attr("selected","selected");
          /* 启动单独出现 点击后现重启、停止 点击停止后出现继续
          *  是否显示停止按钮(已经启动或者开启了自启)
          *  1. 启动按钮单独存在(重启按钮还未出现并且停止了运行)默认情况
          *  2. 重启停止按钮(正在运行并且重启按钮出现)
          *  3. 重启继续按钮(重启按钮出现并且停止了运行)
          */
          if(result.state=="false" && restart.css("display")!="none"){  // 3
            stop.hide();
            goon.show();
            info.text("最爱助手停止了！！！").css("color","#33CC99"); //赋值
          }else if(result.state=="true" || restart.css("display")!="none"){ // 2
            start.hide();
            restart.show();
            stop.show();
            info.text("最爱助手稳定运行中.....").css("color","#33CC99"); 
          }
      });
      
  }
  function eventButton(bg){
    var bg=bg;
    // 启动按钮
    start.click(function(){
      info.text("请稍等,启动中......");
      bg.startJb(getNewInfo("true"),function(result){ // 储存数据，注入脚本
        info.text(result.msg);
        if(result.err==0) // 注入脚本调用成功
          tellJb(bg);
        else{
          info.text(result.msg);
        } 
      })
    })
    // 重启就是继续加刷新
    restart.click(function(){
      info.text("请稍等,重启中......");
      chrome.tabs.reload(bg.detailsInfo.tabId,{bypassCache:false}, function (){
        bg.jspath=null;
        bg.cs=0;
      })
      chrome.webNavigation.onCompleted.addListener(function (details){
        if(details.url==bg.detailsInfo.url){
          start.trigger("click"); // 模拟重启
          init(bg);
        }
      })
    })
    // 停止就是暂停(有问题)
    stop.click(function(){
      info.text("请稍等,暂停中......");
      stateFn("false");
    })
    // 继续（待测试）
    restart.click(function(){
      info.text("请稍等,启动中......");
      stateFn("true");
    })
    function stateFn(state){
      bg.Tools.setStorage(getNewInfo(state),function(){ // 更新内存数据
        tellJb(bg);
      })
    }
  };
  
  // 获取新的数据
  function getNewInfo(state){
    var setInfo = { 
        "set":{
            "autoplay" : autoplay.eq(0).val(),      // 自动播放
            "speed"    : speed.eq(0).val(),    // 播放速度
            "muted"    : muted.eq(0).val(),    // 静音
            "autodt"   : autodt.eq(0).val(),   // 自动答题
            "autonext" : autonext.eq(0).val(),  // 自动下一章
            "state"    : state  // 状态
          }
        };
    return setInfo;
  };
// chrome.storage.onChanged.addListener(function(changes, areaName){
//         if(areaName=="sync"&&changes.set)
//          console.log(changes, areaName);
//       });
  //给 注入脚本发消息看看是否回应
  function tellJb(bg){
    var timer = setInterval(function(){
      bg.Tools.sendMessageToContentScript({"form":"popup"},function(request){
        if(request) {
          info.text(request).css("color","#EE0000"); //赋值
          bg.setLog({"msg":request}); // 写日志
          init(bg); // 页面更新
          clearInterval(timer); // 清理定时器
        }
      })
    },2000)
  };
  window.addEventListener("error", function(evt){
   console.log(evt);
  })
  
});

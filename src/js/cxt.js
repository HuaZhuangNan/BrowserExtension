// console.log("超星通注入成功")

//$("#iframe").contents().find("iframe").contents().find("video")

(function cxtFn(setConfig){
   // 运行脚本判断
  var v;
  var videoDot;
  var timer;
  //goRun(setConfig);
  // 第一次运行脚本
  if(setConfig==undefined){
    init(); // 开启监听
  }else goRun(setConfig);
  // 运行脚本
  function goRun(setConfig){
    var autoplay = setConfig.autoplay,      // 自动播放
        speed    = setConfig.speed,    // 播放速度
        muted    = setConfig.muted,    // 播放静音
        autodt   = setConfig.autodt,   // 自动答题
        autonext = setConfig.autonext, // 自动下一章
        state    = setConfig.state;   // 播放状态
    
    var iframVideo = $("#iframe").contents().find("iframe").contents();
    // 移除监听（可以倍数可以一步到最后）
    iframVideo.find(".x-body").unbind();
    // 播放
    v = iframVideo.find("video");
    v[0].muted=true;//静音
    setTimeout(function(){
      // 监听事件
      if(autoplay=="true"&&v[0].paused)
      v[0].play();
      console.log("正在播放:"+$("#iframe").contents().find("p .ans-attach-ct .ans-job-icon").text());
    },1000);
    // 不静音
    if(muted=="false"&&v[0].muted==true)v[0].muted=false;
    // 播放速度
   //延迟3秒执行调节播放速率
      setTimeout(function () {
       if(v[0].playbackRate!=speed)
        v[0].playbackRate=speed;
        // $(".speedBox").eq(0).trigger("click");
        console.log("已经开启"+speed+"倍速！");
      },2000);
    // 答题
    if(autodt=="true"&&videoDot==undefined){
      // 先判断有没有题目
      videoDot = $("#iframe").contents().find("iframe").contents().find(".x-container");
      timer=setInterval(function(){
        if(autoplay=="true"&&v[0].paused)
        v[0].play();
        if(videoDot.css("visibility")=="visible")
          getvideoprogress();
      },1000)
    };
    // 答题是否继续(重写alert函数)
    var degree=0;
    window.alert =function(msg) {
      console.log(msg);// 回答错误
    };
    // 写答案
    function getvideoprogress() {
      //console.log("开始答题了....");
      var node =videoDot.find("li.ans-videoquiz-opt input");
      // 选答案
      node.eq(degree).trigger("click");
      // 提交
      videoDot.find(".ans-videoquiz-submit").eq(0).trigger("click");
      if(node.length>degree) degree++;else degree--;
    };
    // 下一集
    if(autonext=="true") 
      v.eq(0).on("ended",function(){ 
       // 定时器关闭
       if(timer) clearInterval(timer);
      // 视频结束
      var menuList = $("#coursetree .ncells");
      var nextindex =menuList.find("h4.currents").removeClass("currents").parent().parent().index();
      // 下一章
        console.log("正在播放下一章！....");
        setTimeout(function(){
          menuList.eq(nextindex).find("h4").addClass("currents").trigger("click");
          v=videoDot=undefined;
          goRun(setConfig);
        },2000);
      })
  
  };
  function init(that){
    // 开启监听事件
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){ 
      if(request&&request.form == "popup"){ 
        // 1. 收到消息更新数据
        getSetInfo(function(setConfig){ 
          if(setConfig.state=="true") sendResponse("恭喜你,最爱助手正在运行中....");
          else{
            sendResponse("恭喜你,最爱助手停止成功....");
            $("#iframe").contents().find("iframe").contents().find("video")[0].playbackRate=1;
            if(timer) clearInterval(timer);
          } 
          cxtFn(setConfig); //执行数据
        })
      }
      return true;
    })
  };
  // 获取配置文件
  function getSetInfo(callback){
    chrome.storage.sync.get(["set"], function(result) {
      if(callback&&result) callback(result.set);
    });
  }
  window.addEventListener("error", function(evt){
  
  })

})();


// 可以检测到 popup 的消息智慧树脚本
/*
  1. 第一次用自动调用，监听popup数据
  2. 第二次用popup控制读取新数据，{"form":"popup"}

*/
(function zhsFn(setConfig){
    // 运行脚本判断
    var v;
    var videoDot;
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
          
      // 播放
      //<script type="text/javascript" src="http://study.zhihuishu.com/web/scripts/learning/videoList-pwd.js?v=20190216"></script>
      //<script type="text/javascript" src="http://study.zhihuishu.com/web/scripts/learning/videoListNew.js?v=20190216"></script>
      //playButton
      v = $("video")[0] || $("vjs_mediaplayer_html5_api")[0];
      if(autoplay=="true"&&v.paused) {
        // $("#playButton").trigger("click");
        //延迟2秒执行调节播放速率
        v.play();
        console.log("正在播放:"+$(".videoTitle").eq(0).text());
      };
      // 是否静音
      if(muted=="false") v.muted=false;
      else v.muted=true;
      console.log("静音状态：",v.muted)
      // 播放速度
      setTimeout(function () {
        //延迟3秒执行调节播放速率
        $(".speedTab15").attr("rate",speed).trigger("hover").trigger("click");
      },2000);
      setTimeout(function () {
        //延迟3秒执行调节播放速率
        if(v.playbackRate!=speed) v.playbackRate=speed;
        // $(".speedBox").eq(0).trigger("click");
        console.log("已经开启"+speed+"倍速！");
      },2000);
      // 答题
      if(autodt=="true"&&videoDot==undefined){
        // 先判断有没有题目
        videoDot = $(".videoDot");
        if(videoDot.length==0){
          console.log("当前视频一个问题都没有！");
        }else {
          console.log("当前视频共有: "+videoDot.length+" 个题目！");
          // 判断是否弹窗
          setTimeout(function(){getvideoprogress()},1000);
        }
      };
      // 写答案
      function getvideoprogress() {
        if($(".wrap_popboxes").css('display') == "none" || $(".wrap_popboxes").css('display')==undefined && state=="true"){ 
          setTimeout(function(){getvideoprogress()},1000);
        }else {
          console.log("注意开始答题啦！");
          setTimeout(function(){
            var ng = $(".popboxes_main #tmDialog_iframe").contents();
            var node = ng.find(".answerOption");
            for(var j=0;j<node.length;j++){
              node.find("input").eq(j).trigger("click");
              // 判断
              var flag = ng.find(".examDiv").eq(0).hasClass("exam_correct");
              if(flag) break;
              else node.find("input").eq(node.length-j-1).trigger("click");
            }
            console.log("题目已经答对！将关闭窗口");
            //$("a[title=关闭]").eq(0).trigger("click");
            $(".popboxes_main #tmDialog_iframe").contents().find(".popbtn_cancel").trigger("hover").trigger("click");
            setTimeout(function(){
              if($(".wrap_popboxes").css('display')!="none"){
                $(".wrap_popboxes").hide();
                $("#popbox_overlay").hide();
                v.play();
              }
              if(state=="true") getvideoprogress();//继续检测
            },1000); // 按钮关闭
          },2000)
      }
    };
    // 下一集
    if(autonext=="true") 
      $("video").eq(0).on("ended",function(){  // 视频结束
        console.log("正在播放下一章。。。");
        setTimeout(function(){
          // $(".next_lesson div").trigger("click");
          $(".tm_next_lesson").eq(0).trigger("hover").trigger("click")
        },1000)
        setTimeout(function(){
          v=videoDot=undefined;
          window.ononline = goRun(setConfig);
        },3000)
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
              $(".speedTab05").trigger("hover").trigger("click");;
            } 
            zhsFn(setConfig); //执行数据
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

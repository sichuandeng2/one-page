
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/index","pages/index/index","pages/onepage/set","pages/onepage/home","pages/onepage/clock","pages/index/test","pages/components/headComp"],"window":{"navigationStyle":"custom"},"tabBar":{"color":"#7A7E83","selectedColor":"rgb(50,178,218)","borderStyle":"black","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/onepage/clock","text":"打卡","iconPath":"static/icon/myicon1.ico","selectedIconPath":"static/icon/myicon4.ico"},{"pagePath":"pages/onepage/home","text":"统计","iconPath":"static/icon/myicon2.ico","selectedIconPath":"static/icon/myicon5.ico"},{"pagePath":"pages/onepage/set","text":"设置","iconPath":"static/icon/myicon3.ico","selectedIconPath":"static/icon/myicon6.ico"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"onepage","compilerVersion":"2.8.3","entryPagePath":"pages/login/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarBackgroundColor":"#ff00ff"}},{"path":"/pages/onepage/set","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/onepage/home","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/onepage/clock","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/index/test","meta":{},"window":{}},{"path":"/pages/components/headComp","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
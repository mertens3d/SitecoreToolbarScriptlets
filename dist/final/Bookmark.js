javascript:(function(){var HtmlToInject = "<body><div><div>ver.1</div><button id='btnEdit' type='button'>sc_mode=edit</button> <button id='btnPrev' type='button'>sc_mode=prev</button> <button id='btnNorm' type='button'>sc_mode=normal</button> <button id='btnAdminB' type='button'>Admin B</button> <button id='btnDesktop' type='button'>Desktop</button> <button id='btnSaveTheTrees' type='button'>Save the Trees</button> <button id='btnPlantTheTrees' type='button'>Plant the Trees</button> <button id='btnDrawLocalStorage' type='button'>Local Storage</button></div><textarea id='ta-debug'></textarea></body>";
var jsToInject = "console.log('_first loaded'),console.log('_SpokeBase loaded');var SpokeBase=function(xyyzHub){this.Xyyz=xyyzHub,console.log('SpokeBase')};exports=SpokeBase;var PageType,__extends=this&&this.__extends||function(){var extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),ClassOneLivingIframe=function(_super){function ClassOneLivingIframe(iframeIndex,iframeElem,xyyz){var _this=_super.call(this,xyyz)||this;return xyyz.debug.FuncStart(ClassOneLivingIframe.name+' : '+iframeIndex),_this.Index=iframeIndex,_this.IframeElem=iframeElem,_this.DocElem=iframeElem.contentDocument,xyyz.debug.Log('e) OneLivingIframeData'),_this}return __extends(ClassOneLivingIframe,_super),ClassOneLivingIframe}(SpokeBase),Debug=function(){function Debug(){console.log('debug'),this.__indentCount=0}return Debug.prototype.Log=function(text){for(var idx=0;idx<this.__indentCount;idx++)text='  '+text;console.log(text);var ta=document.getElementById('ta-debug');ta&&(ta.value+=text+'\\n\\r',ta.scrollTop=ta.scrollHeight)},Debug.prototype.FuncStart=function(text){text='s) '+text,this.Log(text),this.__indentCount++},Debug.prototype.FuncEnd=function(text){text='e) '+text,this.__indentCount--,this.Log(text)},Debug.prototype.Error=function(container,text){container||(container='unknown'),text||(text='unknown');var logText='** ERROR ** '+container+':'+text;this.Log(logText)},Debug}(),Hub=function(){function Hub(){this.debug=new Debug,this.debug.FuncStart(Hub.name),this.Start(),this.debug.FuncEnd(Hub.name)}return Hub.prototype.Start=function(){this.debug.FuncStart(this.Start.name),console.log('marker A'),this.PageData=new PageData(window,this),console.log('marker B'),this.EventMan=new EventManager(this),console.log('marker C'),this.Utilities=new Utilities(this),console.log('marker D'),this.InjectConst=new InjectConst(this),console.log('marker E'),this.LocationMan=new LocationManager(this),console.log('marker F'),this.ManyTreesMan=new ManyTrees(this),console.log('marker G'),this.OneTreeMan=new OneTree(this),console.log('marker H'),this.WindowTreeSnapShotMan=new WindowTreeSnapShotManager(this),console.log('marker I'),this.init(),this.debug.FuncEnd(this.Start.name)},Hub.prototype.init=function(){this.debug.FuncStart(Hub.constructor.name+' '+this.init.name),this.EventMan.WireMenuButtons(),this.debug.FuncEnd(Hub.constructor.name+' '+this.init.name)},Hub}(),LocationManager=(__extends=this&&this.__extends||function(){var extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),function(_super){function LocationManager(xyyz){var _this=_super.call(this,xyyz)||this;return xyyz.debug.FuncStart(LocationManager.name),_this.MaxAttempts=10,_this.CurrentAttempt=_this.MaxAttempts,_this.EffortWait=1e3,xyyz.debug.FuncEnd(LocationManager.name),_this}return __extends(LocationManager,_super),LocationManager.prototype.SetHref=function(href,callback,isFromTimeout,effortCount){this.Xyyz.debug.FuncStart(this.SetHref.toString()+' : '+href+' : '+isFromTimeout+' : '+effortCount),this.Xyyz.PageData.WinData.Opener.Window.location.href=href,isFromTimeout?effortCount--:effortCount=this.MaxAttempts,this.Xyyz.PageData.WinData.Opener.Window.location.href===href?callback():effortCount>0?setTimeout((function(){this.SetHref(href,callback,!0,effortCount)}),this.EffortWait):this.Xyyz.debug.Log('changing href unsuccessful. Dying'),this.Xyyz.debug.FuncEnd(this.SetHref.name)},LocationManager.prototype.Desktop=function(){var currentState=this.Xyyz.PageData.CurrentOpenerPageState();currentState===PageType.LoginPage?(this.Xyyz.debug.Log('On Login page: '),this.AdminB(),setTimeout((function(){this.Xyyz.LocationMan.Desktop()}),1e3)):currentState===PageType.Launchpad?this.SetHref(this.Xyyz.InjectConst.Url.Desktop,this.Desktop,null,null):currentState===PageType.Desktop&&(this.Xyyz.debug.Log('On Desktop'),this.Xyyz.LocationMan.TriggerRedButton()),this.Xyyz.debug.FuncEnd(this.Xyyz.LocationMan.Desktop.name)},LocationManager.prototype.RedButton=function(iteration){this.Xyyz.debug.FuncStart(this.Xyyz.LocationMan.RedButton.name);var found=this.Xyyz.PageData.WinData.Opener.Document.getElementById('StartButton');if(this.Xyyz.debug.Log('Red Button: '+found+'  '+this.Xyyz.PageData.WinData.Opener.Window.location.href+' '+iteration),found){found.click();var menuLeft=this.Xyyz.PageData.WinData.Opener.Document.querySelector('.scStartMenuLeftOption');menuLeft&&menuLeft.click()}else(iteration-=1)>0&&setTimeout((function(){this.Xyyz.LocationMan.RedButton(iteration)}),1500)},LocationManager.prototype.TriggerRedButton=function(){this.Xyyz.debug.FuncStart(this.Xyyz.LocationMan.TriggerRedButton.name);var self=this;setTimeout((function(){self.Xyyz.LocationMan.RedButton(10)}),1500),this.Xyyz.debug.FuncEnd(this.Xyyz.LocationMan.TriggerRedButton.name)},LocationManager.prototype.SetScMode=function(newValue){var newValueB='='+newValue;window.opener.location.href=window.opener.location.href.replace('=normal',newValueB).replace('=preview',newValueB).replace('=edit',newValueB)},LocationManager.prototype.AdminB=function(){var candidate;(this.Xyyz.debug.FuncStart(this.AdminB.name),this.Xyyz.PageData.WinData.Opener.Document.getElementById('UserName').setAttribute('value','admin'),this.Xyyz.PageData.WinData.Opener.Document.getElementById('Password').setAttribute('value','b'),candidate=this.Xyyz.PageData.WinData.Opener.Document.getElementById('LogInBtn'))?candidate.click():(candidate=this.Xyyz.PageData.WinData.Opener.Document.querySelector('input.btn'))&&candidate.click();this.Xyyz.debug.FuncEnd(this.AdminB.name)},LocationManager}(SpokeBase)),OneTreeNode=(__extends=this&&this.__extends||function(){var extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),function(_super){function OneTreeNode(nodeId,nodeFriendly,xyyz){var _this=_super.call(this,xyyz)||this;return _this.NodeId=nodeId,_this.NodeFriendly=nodeFriendly,_this}return __extends(OneTreeNode,_super),OneTreeNode}(SpokeBase)),PageData=(__extends=this&&this.__extends||function(){var extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),function(_super){function PageData(window,xyyz){var _this=_super.call(this,xyyz)||this;return _this.Start(),_this}return __extends(PageData,_super),PageData.prototype.Start=function(){this.Xyyz.debug.FuncStart(this.constructor.name+' '+this.Start.name),console.log('PageData B'),window.opener?(this.WinData=new WindowData(this.Xyyz),this.WinData.Opener.Window=window.opener,this.WinData.Opener.Document=window.opener.document):this.Xyyz.debug.Error(this.constructor.name,'No Opener Page'),console.log('PageData C'),this.DebugInfo(),this.Xyyz.debug.FuncEnd(this.constructor.name)},PageData.prototype.CurrentOpenerPageState=function(){this.Xyyz.debug.FuncStart(this.CurrentOpenerPageState.name);var toReturn=PageType.Unknown;if(this.WinData&&this.WinData.Opener&&this.WinData.Opener.Window&&this.WinData.Opener.Document){var currentLoc=this.WinData.Opener.Window.location.href;this.Xyyz.debug.Log('currentLoc: '+currentLoc),toReturn=currentLoc.indexOf(this.Xyyz.InjectConst.Url.Login)>-1?PageType.LoginPage:currentLoc.indexOf(this.Xyyz.InjectConst.Url.Desktop)>-1?PageType.Desktop:currentLoc.indexOf(this.Xyyz.InjectConst.Url.ContentEditor)>-1?PageType.ContentEditor:currentLoc.indexOf(this.Xyyz.InjectConst.Url.LaunchPad)>-1?PageType.Launchpad:PageType.Unknown}return this.Xyyz.debug.FuncEnd(this.CurrentOpenerPageState.name+' '+toReturn),toReturn},PageData.prototype.DebugInfo=function(){this.Xyyz.debug.FuncStart(this.DebugInfo.name),this.Xyyz.debug.Log(this.WinData.Opener.Window),this.Xyyz.debug.Log(this.WinData.Opener.Document),this.Xyyz.debug.FuncEnd(this.DebugInfo.name)},PageData}(SpokeBase)),SnapShotOneWindow=(__extends=this&&this.__extends||function(){var extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),function(_super){function SnapShotOneWindow(xyyz){var _this=_super.call(this,xyyz)||this;return xyyz.debug.FuncStart(SnapShotOneWindow.name),_this.Start(),xyyz.debug.FuncEnd(SnapShotOneWindow.name),_this}return __extends(SnapShotOneWindow,_super),SnapShotOneWindow.prototype.Start=function(){this.Xyyz.debug.FuncStart(this.Start.name),this.TimeStamp=new Date,this.TimeStampFriendly=this.Xyyz.Utilities.MakeFriendlyDate(this.TimeStamp),this.AllCEAr=[],this.Id=this.Xyyz.Utilities.Uuidv4(),this.Xyyz.debug.FuncEnd(this.Start.name)},SnapShotOneWindow.prototype.ShowDebugDataOneWindow=function(){this.Xyyz.debug.FuncStart(this.ShowDebugDataOneWindow.name);var toReturn=[];toReturn.push(this.TimeStamp);for(var jdx=0;jdx<this.AllCEAr.length;jdx++){var oneCE=this.AllCEAr[jdx];toReturn.push(oneCE.GetDebugDataOneCE())}return this.Xyyz.debug.FuncEnd(this.ShowDebugDataOneWindow.name),toReturn},SnapShotOneWindow}(SpokeBase)),SnapShotOneContentEditor=(__extends=this&&this.__extends||function(){var extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),function(_super){function SnapShotOneContentEditor(id,zzyx){var _this=_super.call(this,xyyz)||this;return _this.Id=id,_this.__allTreeDataAr=[],_this}return __extends(SnapShotOneContentEditor,_super),SnapShotOneContentEditor.prototype.GetDebugDataOneCE=function(){this.Xyyz.debug.FuncStart(this.GetDebugDataOneCE.name);var toReturn=[];toReturn.push('------ All Tree Nodes -----');for(var idx=0;idx<this.__allTreeDataAr.length;idx++)toReturn.push(this.__allTreeDataAr[idx].NodeId+' '+this.__allTreeDataAr[idx].NodeFriendly);return this.Xyyz.debug.FuncEnd(this.GetDebugDataOneCE.name),toReturn},SnapShotOneContentEditor}(SpokeBase)),WindowTreeSnapShotManager=(__extends=this&&this.__extends||function(){var extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),function(_super){function WindowTreeSnapShotManager(xyyz){var _this=_super.call(this,xyyz)||this;return xyyz.debug.FuncStart(WindowTreeSnapShotManager.name),_this.CreateNewWindowTreeSnapShot(),xyyz.debug.FuncEnd(WindowTreeSnapShotManager.name),_this}return __extends(WindowTreeSnapShotManager,_super),WindowTreeSnapShotManager.prototype.PutCEDataToCurrentSnapShot=function(oneCeData){this.Xyyz.debug.FuncStart(this.PutCEDataToCurrentSnapShot.name+' '+JSON.stringify(oneCeData));var matchingCeData=this.FindMatchingCeData(oneCeData);matchingCeData?matchingCeData=oneCeData:this.__activeWindowTreeSnapShot.AllCEAr.push(oneCeData),this.UpdateStorage(),this.ShowDebugData(),this.Xyyz.debug.FuncEnd(this.PutCEDataToCurrentSnapShot.name)},WindowTreeSnapShotManager.prototype.UpdateStorage=function(){var snapShotAsString=JSON.stringify(this.__activeWindowTreeSnapShot);window.localStorage.setItem(this.Xyyz.InjectConst.Storage.WindowRoot+this.__activeWindowTreeSnapShot.Id,snapShotAsString)},WindowTreeSnapShotManager.prototype.FindMatchingCeData=function(oneCeData){for(var toReturn=null,idx=0;idx<this.__activeWindowTreeSnapShot.AllCEAr.length;idx++){var candidate=this.__activeWindowTreeSnapShot.AllCEAr[idx];if(candidate.id===oneCeData.id){toReturn=candidate;break}}return toReturn},WindowTreeSnapShotManager.prototype.CreateNewWindowTreeSnapShot=function(){this.Xyyz.debug.FuncStart(this.CreateNewWindowTreeSnapShot.name),this.__activeWindowTreeSnapShot=new SnapShotOneWindow(this.Xyyz),this.Xyyz.debug.FuncEnd(this.CreateNewWindowTreeSnapShot.name)},WindowTreeSnapShotManager.prototype.ShowDebugData=function(){this.Xyyz.debug.FuncStart(this.ShowDebugData.name);var allDebugData=[];allDebugData.push('------ One Window Snap Shot Start -----'),allDebugData.push('Id: '+this.__activeWindowTreeSnapShot.Id),allDebugData.push('TimeStamp: '+this.__activeWindowTreeSnapShot.TimeStamp),allDebugData.push('CE Count: '+this.__activeWindowTreeSnapShot.AllCEAr.length);for(var jdx=0;jdx<this.__activeWindowTreeSnapShot.AllCEAr.length;jdx++){allDebugData.push('------ One CE -----');var oneCE=this.__activeWindowTreeSnapShot.AllCEAr[jdx];allDebugData.push('Id: '+oneCE.Id);for(var allCeDebugDataAr=oneCE.GetDebugDataOneCE(),kdx=0;kdx<allCeDebugDataAr.length;kdx++)allDebugData.push(allCeDebugDataAr[kdx])}allDebugData.push('------ One Window Snap Shot End -----');for(var ldx=0;ldx<allDebugData.length;ldx++)this.Xyyz.debug.Log(allDebugData[ldx]);this.Xyyz.debug.FuncEnd(this.ShowDebugData.name)},WindowTreeSnapShotManager}(SpokeBase)),Utilities=(__extends=this&&this.__extends||function(){var extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),function(_super){function Utilities(xyyz){var _this=_super.call(this,xyyz)||this;return xyyz.debug.FuncStart(Utilities.name),xyyz.debug.FuncEnd(Utilities.name),_this}return __extends(Utilities,_super),Utilities.prototype.MakeFriendlyDate=function(date){return date.toDateString()+' '+date.toTimeString()},Utilities.prototype.Uuidv4=function(){return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,(function(c){var r=16*Math.random()|0;return('x'==c?r:3&r|8).toString(16)}))},Utilities}(SpokeBase)),Opener=(__extends=this&&this.__extends||function(){var extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),function(){this.Window=null,this.Document=null}),WindowData=function(_super){function WindowData(xyyz){var _this=_super.call(this,xyyz)||this;return xyyz.debug.FuncStart(_this.constructor.name),_this.Opener=new Opener,xyyz.debug.FuncEnd(_this.constructor.name),_this}return __extends(WindowData,_super),WindowData}(SpokeBase);!function(PageType){PageType[PageType.Unknown=0]='Unknown',PageType[PageType.LoginPage=1]='LoginPage',PageType[PageType.Desktop=2]='Desktop',PageType[PageType.ContentEditor=3]='ContentEditor',PageType[PageType.Launchpad=4]='Launchpad'}(PageType||(PageType={}));__extends=this&&this.__extends||function(){var extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();console.log('EventManager loaded');var EventManager=function(_super){function EventManager(xyyz){return _super.call(this,xyyz)||this}return __extends(EventManager,_super),EventManager.prototype.WireMenuButtons=function(){this.Xyyz.debug.FuncStart(EventManager.name+' '+this.WireMenuButtons.name);var thisObj=this;document.getElementById('btnEdit').onclick=function(){thisObj.Xyyz.LocationMan.SetScMode('edit')},document.getElementById('btnPrev').onclick=function(){thisObj.Xyyz.LocationMan.SetScMode('preview')},document.getElementById('btnNorm').onclick=function(){thisObj.Xyyz.LocationMan.SetScMode('normal')},document.getElementById('btnAdminB').onclick=function(){thisObj.Xyyz.LocationMan.AdminB()},document.getElementById('btnDesktop').onclick=function(){thisObj.Xyyz.LocationMan.Desktop()},document.getElementById('btnSaveTheTrees').onclick=function(){thisObj.Xyyz.ManyTreesMan.SaveAllTrees()},document.getElementById('btnPlantTheTrees').onclick=function(){thisObj.Xyyz.ManyTreesMan.PlantTheTrees(window.opener.document,0)},document.getElementById('btnDrawLocalStorage').onclick=function(){console.log('todo')},this.Xyyz.debug.FuncEnd(this.WireMenuButtons.name)},EventManager}(SpokeBase);__extends=this&&this.__extends||function(){var extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();console.log('InjectConst loaded');var InjectConst=function(_super){function InjectConst(xyyz){var _this=_super.call(this,xyyz)||this;return _this.ClassNames={ContentTreeNode:'scContentTreeNode'},_this.Url={Desktop:'/sitecore/shell/default.aspx',Login:'/sitecore/login',ContentEditor:'/sitecore/shell/Applications/Content%20Editor.aspx',LaunchPad:'/sitecore/shell/sitecore/client/applications/launchpad'},_this.Selector={ContentTreeNodeGlyph:'.scContentTreeNodeGlyph',RootNodeId:'Tree_Node_11111111111111111111111111111111'},_this.Storage={WindowRoot:'  this.Xyyz.'},_this.TreeExpandedPng='treemenu_expanded.png',_this.MaxIter=100,_this.GuidEmpty='00000000-0000-0000-0000-000000000000',_this.prop={AllTreeData:'AllTreeData'},_this.Names={HtmlToInject:'HtmlToInject',StylesToInject:'StylesToInject'},xyyz.debug.FuncStart(InjectConst.name),xyyz.debug.FuncEnd(InjectConst.name),_this}return __extends(InjectConst,_super),InjectConst}(SpokeBase);(xyyz=xyyz||{}).OneCEIframe=function(){this.Index=-1,this.TreeData={}},xyyz.TreeData=function(){this.DateStamp=Date.now(),this.AllCEIframes=[]},console.log('StorageMan loaded'),xyyz.StorageMan={DrawStorage:function(){try{for(var asAr=window.localStorage.getItem(xyyz.InjectConst.Storage.WindowRoot).split('},{'),idx=0;idx<asAr.length;idx++)xyyz.debug.Log(asAr[idx])}catch(e){xyyz.debug.Error(e.message)}},GetTreeData:function(treeIdx){xyyz.debug.Log('s) GetTreeData');var foundInStorageJson=window.localStorage.getItem(xyyz.InjectConst.Storage.WindowRoot);if(foundInStorageJson){var allTreeDataAr=JSON.parse(foundInStorageJson)[xyyz.InjectConst.prop.AllTreeData];allTreeDataAr.length<=treeIdx&&allTreeDataAr[treeIdx]}return xyyz.debug.Log('e) GetTreeData'),treeIdx}};__extends=this&&this.__extends||function(){var extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();console.log('ManyTrees loaded');var ManyTrees=function(_super){function ManyTrees(xyyz){var _this;return xyyz.debug.FuncStart(ManyTrees.name),_this=_super.call(this,xyyz)||this,xyyz.debug.FuncEnd(ManyTrees.name),_this}return __extends(ManyTrees,_super),ManyTrees.prototype.GetAllLiveIframeData=function(targetDoc){this.Xyyz.debug.FuncStart(this.GetAllLiveIframeData.name);var toReturn=[],iframeAr=targetDoc.querySelectorAll('iframe[src*=content]');if(iframeAr){this.Xyyz.debug.Log('iframeAr: '+iframeAr.length);for(var ifrIdx=0;ifrIdx<iframeAr.length;ifrIdx++)this.Xyyz.debug.Log('pushing: '+ifrIdx),toReturn.push(new ClassOneLivingIframe(ifrIdx,iframeAr[ifrIdx],this.Xyyz))}return this.Xyyz.debug.FuncEnd(this.GetAllLiveIframeData.name+' '+toReturn.length),toReturn},ManyTrees.prototype.PlantTheTrees=function(targetDoc,treeIdx){this.Xyyz.debug.Log('s) LookAtExistingData: '+treeIdx)},ManyTrees.prototype.SaveOneContentEditor=function(id,docElem){this.Xyyz.debug.FuncStart(this.SaveOneContentEditor.name),id||(id=this.Xyyz.InjectConst.GuidEmpty),docElem||(docElem=this.Xyyz.PageData.WinData.Opener.Document,this.Xyyz.debug.Log('Assigning docElem: '+docElem));var CeSnapShot=new SnapShotOneContentEditor(id,this.Xyyz),oneTree=new OneTree(this.Xyyz);CeSnapShot.__allTreeDataAr=oneTree.GetOneLiveTreeData(id,docElem),this.Xyyz.WindowTreeSnapShotMan.PutCEDataToCurrentSnapShot(CeSnapShot),this.Xyyz.debug.FuncEnd(this.SaveOneContentEditor.name)},ManyTrees.prototype.SaveOneDesktop=function(){this.Xyyz.debug.FuncStart(this.SaveOneDesktop.name);var livingIframeAr=this.GetAllLiveIframeData(this.Xyyz.PageData.WinData.Opener.Document);if(livingIframeAr&&livingIframeAr.length>0)for(var iframeIdx=0;iframeIdx<livingIframeAr.length;iframeIdx++){this.Xyyz.debug.Log('iframeIdx: '+iframeIdx);var targetIframeObj=livingIframeAr[iframeIdx];this.Xyyz.debug.Log('targetIframe: '+JSON.stringify(targetIframeObj)),this.SaveOneContentEditor(iframeIdx,targetIframeObj.DocElem)}this.Xyyz.debug.Log('done gathering tree data'),this.Xyyz.WindowTreeSnapShotMan.ShowDebugData(),this.Xyyz.debug.FuncEnd(this.SaveOneDesktop.name)},ManyTrees.prototype.SaveAllTrees=function(){this.Xyyz.debug.FuncStart(this.SaveAllTrees.name),this.Xyyz.WindowTreeSnapShotMan.CreateNewWindowTreeSnapShot();var currentState=this.Xyyz.PageData.CurrentOpenerPageState();currentState===PageType.ContentEditor?this.SaveOneContentEditor(null,this.Xyyz):currentState===PageType.Desktop?this.SaveOneDesktop():this.Xyyz.debug.Error(this.SaveAllTrees.name,'Invalid page location '+currentState),this.Xyyz.debug.FuncEnd(this.SaveAllTrees.name)},ManyTrees}(SpokeBase);__extends=this&&this.__extends||function(){var extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();console.log('OneTree loaded');var OneTree=function(_super){function OneTree(xyyz){var _this=_super.call(this,xyyz)||this;return xyyz.debug.FuncStart(OneTree.name),xyyz.debug.FuncEnd(OneTree.name),_this}return __extends(OneTree,_super),OneTree.prototype.GetFriendlyNameFromNode=function(inputNode){this.Xyyz.debug.FuncStart(this.GetFriendlyNameFromNode.name);var toReturn='unknown',treeNode=inputNode.parentNode.querySelector('[id^=Tree_Node_]');return treeNode?toReturn=treeNode.innerText:this.Xyyz.debug.Log('No treeNode'),this.Xyyz.debug.FuncEnd(this.GetFriendlyNameFromNode.toString+' '+toReturn),toReturn},OneTree.prototype.WalkNodeRecursive=function(targetNode,depth){var toReturn=[];if(depth-=1,targetNode){if(targetNode.className===this.Xyyz.InjectConst.ClassNames.ContentTreeNode){var firstImg=targetNode.querySelector(this.Xyyz.InjectConst.Selector.ContentTreeNodeGlyph);if(firstImg)if(firstImg.getAttribute('src').indexOf(this.Xyyz.InjectConst.TreeExpandedPng)>-1){var friendlyName=this.GetFriendlyNameFromNode(firstImg);toReturn.push(new OneTreeNode(firstImg.id,friendlyName,this.Xyyz))}}var childNodes=targetNode.children;if(childNodes&&childNodes.length>0&&depth>0)for(var jdx=0;jdx<childNodes.length;jdx++){var oneChild=childNodes[jdx];toReturn=toReturn.concat(this.WalkNodeRecursive(oneChild,depth))}}return toReturn},OneTree.prototype.GetOneLiveTreeData=function(idx,targetDoc){this.Xyyz.debug.FuncStart(this.GetOneLiveTreeData.name+' idx: '+idx);var toReturn=[];if(targetDoc){this.Xyyz.debug.Log(JSON.stringify(targetDoc));var rootNode=targetDoc.getElementById(this.Xyyz.InjectConst.Selector.RootNodeId);if(rootNode){this.Xyyz.debug.Log('rootNode: '+rootNode.innerHTML);var rootParent=rootNode.parentElement;toReturn=this.WalkNodeRecursive(rootParent,this.Xyyz.InjectConst.MaxIter),this.Xyyz.debug.Log('foundNodes count: '+toReturn.length);var nodesAsString=JSON.stringify(toReturn);this.Xyyz.debug.Log('toReturn as string: '+nodesAsString)}else this.Xyyz.debug.Error(this.GetOneLiveTreeData.name,'no root node')}else this.Xyyz.debug.Error(this.GetOneLiveTreeData.name,'no targetDoc');return this.Xyyz.debug.FuncEnd(this.GetOneLiveTreeData.name),toReturn},OneTree}(SpokeBase);console.log('marker aa');var xyyz=xyyz||{};this.xyyz.HubObj=new Hub,console.log('marker bb');";
var StylesToInject = "button{color:green;background-color:light-gray;width:200px;border-radius:5px;height:30px;margin:7px;cursor:pointer}button:hover{background-color:#afff00}body{background-color:coral}textarea{width:100%;height:200px}";
var constants={taDebug:"ta-debug"},xyyz=xyyz||{};xyyz.ChildWindow={myWindow:null,WindowExists:function(){return this.mywindow&&"undefined"!==this.mywindow&&!this.mywindow.closed},WriteHtml:function(o){console.log("s) WriteHtml");var n="<head>";n+="<style>",console.log("marker a"),n+=StylesToInject,console.log("marker b"),n+="</style>",n+="<body>",n+=HtmlToInject,console.log("marker c"),n+="<script>",console.log("marker d"),n+=jsToInject,console.log("marker e"),console.log("marker f"),n+="<\/script>",n+="</body>",o.document.innerHtml="",o.document.write(n),console.log("marker g"),console.log(o),console.log(o.document),console.log("e) WriteHtml")},CreateWindow:function(){console.log("new window"),console.log("Constants: "+constants.taDebug),window.mywindow=window.open("","mywindow","width=900, height=600"),window.mywindow.Parent=this,this.WriteHtml(window.mywindow)},FocusWindow:function(){console.log("existing window"),window.mywindow.focus()}},xyyz.ChildWindow.WindowExists()?xyyz.ChildWindow.FocusWindow():xyyz.ChildWindow.CreateWindow(),console.log("Menu Finished");}());
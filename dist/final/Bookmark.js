javascript:(function(){var HtmlToInject = "<body><div><button id='btnEdit' type='button'>sc_mode=edit</button> <button id='btnPrev' type='button'>sc_mode=prev</button> <button id='btnNorm' type='button'>sc_mode=normal</button> <button id='btnAdminB' type='button'>Admin B</button> <button id='btnDesktop' type='button'>Desktop</button> <button id='btnSaveTheTrees' type='button'>Save the Trees</button> <button id='btnPlantTheTrees' type='button'>Plant the Trees</button> <button id='btnDrawLocalStorage' type='button'>Local Storage</button></div><textarea id='ta-debug'></textarea></body>";
var jsToInject = "class AllTreeStorageStruct{constructor(){this.empty='empty'}}class ClassOneLivingIframe{constructor(iframeIndex,iframeElem){xyyz.debug.Log('s) OneLivingIframeData: '+iframeIndex),this.Index=iframeIndex,this.IframeElem=iframeElem,this.DocElem=iframeElem.contentDocument,xyyz.debug.Log('e) OneLivingIframeData')}}var xyyz,Debug=function(){function Debug(){this.__indentCount=0}return Debug.prototype.Log=function(text){for(var idx=0;idx<this.__indentCount;idx++)text='  '+text;console.log(text);var ta=document.getElementById('ta-debug');ta&&(ta.value+=text+'\\n\\r',ta.scrollTop=ta.scrollHeight)},Debug.prototype.FuncStart=function(text){text='s) '+text,this.Log(text),this.__indentCount++},Debug.prototype.FuncEnd=function(text){text='e) '+text,this.__indentCount--,this.Log(text)},Debug.prototype.Error=function(container,text){container||(container='unknown'),text||(text='unknown');var logText='** ERROR ** '+container+':'+text;this.Log(logText)},Debug}(),LocationManager=function(){function LocationManager(){this.MaxAttempts=10,this.CurrentAttempt=this.MaxAttempts,this.EffortWait=1e3}return LocationManager.prototype.SetHref=function(href,callback,isFromTimeout,effortCount){xyyz.debug.FuncStart(this.SetHref.toString()+' : '+href+' : '+isFromTimeout+' : '+effortCount),xyyz.PageData.Opener.Window.location.href=href,isFromTimeout?effortCount--:effortCount=this.MaxAttempts,xyyz.PageData.Opener.Window.location.href===href?callback():effortCount>0?setTimeout((function(){this.SetHref(href,callback,!0,effortCount)}),this.EffortWait):xyyz.debug.Log('changing href unsuccessful. Dying'),xyyz.debug.FuncEnd(this.SetHref.toString())},LocationManager.prototype.Desktop=function(){var currentState=xyyz.PageData.CurrentOpenerPageState();currentState===xyyz.InjectConst.PageType.LoginPage?(xyyz.debug.Log('On Login page: '),this.AdminB(),setTimeout((function(){xyyz.LocationMan.Desktop()}),1e3)):currentState===xyyz.InjectConst.PageType.Launchpad?this.SetHref(xyyz.InjectConst.Url.Desktop,this.Desktop,null,null):currentState===xyyz.InjectConst.PageType.Desktop&&(xyyz.debug.Log('On Desktop'),xyyz.LocationMan.TriggerRedButton()),xyyz.debug.FuncEnd(xyyz.LocationMan.Desktop.name)},LocationManager.prototype.RedButton=function(iteration){xyyz.debug.FuncStart(xyyz.LocationMan.RedButton.name);var found=xyyz.PageData.Opener.Document.getElementById('StartButton');xyyz.debug.Log('Red Button: '+found+'  '+xyyz.PageData.Opener.Window.location.href+' '+iteration),found?(found.click(),xyyz.PageData.Opener.Document.querySelector('.scStartMenuLeftOption').click()):(iteration-=1)>0&&setTimeout((function(){xyyz.LocationMan.RedButton(iteration)}),1500)},LocationManager.prototype.TriggerRedButton=function(){xyyz.debug.FuncStart(xyyz.LocationMan.TriggerRedButton.name),setTimeout((function(){xyyz.LocationMan.RedButton(10)}),1500),xyyz.debug.FuncEnd(xyyz.LocationMan.TriggerRedButton.name)},LocationManager.prototype.SetScMode=function(newValue){var newValueB='='+newValue;window.opener.location.href=window.opener.location.href.replace('=normal',newValueB).replace('=preview',newValueB).replace('=edit',newValueB)},LocationManager.prototype.AdminB=function(){xyyz.PageData.Opener.Document.getElementById('UserName').setAttribute('value','admin'),xyyz.PageData.Opener.Document.getElementById('Password').setAttribute('value','b'),xyyz.PageData.Opener.Document.getElementById('LogInBtn').click()},LocationManager}();class OneTreeNode{constructor(nodeId,nodeFriendly){this.NodeId=nodeId,this.NodeFriendly=nodeFriendly}}class PageData{constructor(openerWindow){xyyz.debug.FuncStart(this.constructor.name),openerWindow?(this.Opener={},this.Opener.Window=openerWindow,this.Opener.Document=openerWindow.document):xyyz.debug.Error(this.constructor.name,'No Opener Page'),this.DebugInfo(),xyyz.debug.FuncEnd(this.constructor.name)}CurrentOpenerPageState(){xyyz.debug.FuncStart(this.CurrentOpenerPageState.name);var toReturn=xyyz.InjectConst.PageType.Unknown;if(this.Opener.Window){var currentLoc=xyyz.PageData.Opener.Document.location.href;xyyz.debug.Log('currentLoc: '+currentLoc),toReturn=currentLoc.indexOf(xyyz.InjectConst.Url.Login)>-1?xyyz.InjectConst.PageType.LoginPage:currentLoc.indexOf(xyyz.InjectConst.Url.Desktop)>-1?xyyz.InjectConst.PageType.Desktop:currentLoc.indexOf(xyyz.InjectConst.Url.ContentEditor)>-1?xyyz.InjectConst.PageType.ContentEditor:currentLoc.indexOf(xyyz.InjectConst.Url.LaunchPad)>-1?xyyz.InjectConst.PageType.Launchpad:xyyz.InjectConst.PageType.Unknown}return xyyz.debug.FuncEnd(this.CurrentOpenerPageState.name+' '+toReturn),toReturn}DebugInfo(){xyyz.debug.FuncStart(this.DebugInfo.name),xyyz.debug.Log(this.Opener.Window),xyyz.debug.Log(this.Opener.Document),xyyz.debug.FuncEnd(this.DebugInfo.name)}}class SnapShotOneWindow{constructor(){this.TimeStamp=new Date,this.TimeStampFriendly=xyyz.Utilities.MakeFriendlyDate(this.TimeStamp),this.AllCEAr=[],this.Id=xyyz.Utilities.Uuidv4()}ShowDebugDataOneWindow(){xyyz.debug.FuncStart(this.ShowDebugDataOneWindow.name);var toReturn=[];toReturn.push(this.TimeStamp);for(var jdx=0;jdx<this.AllCEAr.length;jdx++){var oneCE=this.AllCEAr[jdx];toReturn.push(oneCE.GetDebugDataOneCE())}return xyyz.debug.FuncEnd(this.ShowDebugDataOneWindow.name),toReturn}}class SnapShotOneContentEditor{constructor(id){this.Id=id,this.__allTreeDataAr=[]}GetDebugDataOneCE(){xyyz.debug.FuncStart(this.GetDebugDataOneCE.name);var toReturn=[];toReturn.push('------ All Tree Nodes -----');for(var idx=0;idx<this.__allTreeDataAr.length;idx++)toReturn.push(this.__allTreeDataAr[idx].NodeId+' '+this.__allTreeDataAr[idx].NodeFriendly);return xyyz.debug.FuncEnd(this.GetDebugDataOneCE.name),toReturn}}class WindowTreeSnapShotManager{constructor(){this.CreateNewWindowTreeSnapShot()}PutCEDataToCurrentSnapShot(oneCeData){xyyz.debug.FuncStart(this.PutCEDataToCurrentSnapShot.name+' '+JSON.stringify(oneCeData));var matchingCeData=this.FindMatchingCeData(oneCeData);matchingCeData?matchingCeData=oneCeData:this.__activeWindowTreeSnapShot.AllCEAr.push(oneCeData),this.UpdateStorage(),this.ShowDebugData(),xyyz.debug.FuncEnd(this.PutCEDataToCurrentSnapShot.name)}UpdateStorage(){var snapShotAsString=JSON.stringify(this.__activeWindowTreeSnapShot);window.localStorage.setItem(xyyz.InjectConst.Storage.WindowRoot+this.__activeWindowTreeSnapShot.Id,snapShotAsString)}FindMatchingCeData(oneCeData){for(var toReturn=null,idx=0;idx<this.__activeWindowTreeSnapShot.AllCEAr;idx++){var candidate=this.__activeWindowTreeSnapShot.AllCEAr[idx];if(candidate.id===oneCeData.id){toReturn=candidate;break}}return toReturn}CreateNewWindowTreeSnapShot(){this.__activeWindowTreeSnapShot=new SnapShotOneWindow}ShowDebugData(){xyyz.debug.FuncStart(this.ShowDebugData.name);var allDebugData=[];allDebugData.push('------ One Window Snap Shot Start -----'),allDebugData.push('Id: '+this.__activeWindowTreeSnapShot.Id),allDebugData.push('TimeStamp: '+this.__activeWindowTreeSnapShot.TimeStamp),allDebugData.push('CE Count: '+this.__activeWindowTreeSnapShot.AllCEAr.length);for(var jdx=0;jdx<this.__activeWindowTreeSnapShot.AllCEAr.length;jdx++){allDebugData.push('------ One CE -----');var oneCE=this.__activeWindowTreeSnapShot.AllCEAr[jdx];allDebugData.push('Id: '+oneCE.Id);for(var allCeDebugDataAr=oneCE.GetDebugDataOneCE(),kdx=0;kdx<allCeDebugDataAr.length;kdx++)allDebugData.push(allCeDebugDataAr[kdx])}allDebugData.push('------ One Window Snap Shot End -----');for(var ldx=0;ldx<allDebugData.length;ldx++)xyyz.debug.Log(allDebugData[ldx]);xyyz.debug.FuncEnd(this.ShowDebugData.name)}}class Utilities{constructor(){}MakeFriendlyDate(date){return date.toDateString()+' '+date.toTimeString()}Uuidv4(){return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,(function(c){var r=16*Math.random()|0;return('x'==c?r:3&r|8).toString(16)}))}}(xyyz=xyyz||{}).InjectConst={ClassNames:{ContentTreeNode:'scContentTreeNode'},Url:{Desktop:'/sitecore/shell/default.aspx',Login:'/sitecore/login',ContentEditor:'/sitecore/shell/Applications/Content%20Editor.aspx',LaunchPad:'/sitecore/shell/sitecore/client/applications/launchpad'},Selector:{ContentTreeNodeGlyph:'.scContentTreeNodeGlyph',RootNodeId:'Tree_Node_11111111111111111111111111111111'},Storage:{WindowRoot:'xyyz.'},TreeExpandedPng:'treemenu_expanded.png',MaxIter:100,GuidEmpty:'00000000-0000-0000-0000-000000000000',prop:{AllTreeData:'AllTreeData'},Names:{HtmlToInject:'HtmlToInject',StylesToInject:'StylesToInject'},PageType:{Unknown:0,LoginPage:1,Desktop:2,ContentEditor:3,Launchpad:4}},(xyyz=(xyyz=xyyz||{})||{}).OneCEIframe=function(){this.Index=-1,this.TreeData={}},xyyz.TreeData=function(){this.DateStamp=Date.now(),this.AllCEIframes=[]},xyyz.StorageMan={DrawStorage:function(){try{for(var asAr=window.localStorage.getItem(xyyz.InjectConst.Storage.WindowRoot).split('},{'),idx=0;idx<asAr.length;idx++)xyyz.debug.Log(asAr[idx])}catch(e){xyyz.debug.Error(e.message)}},GetTreeData:function(treeIdx){xyyz.debug.Log('s) GetTreeData');var foundInStorageJson=window.localStorage.getItem(xyyz.InjectConst.Storage.WindowRoot);if(foundInStorageJson){var allTreeDataAr=JSON.parse(foundInStorageJson)[xyyz.InjectConst.prop.AllTreeData];allTreeDataAr.length<=treeIdx&&allTreeDataAr[treeIdx]}return xyyz.debug.Log('e) GetTreeData'),treeIdx}},(xyyz=(xyyz=xyyz||{})||{}).ManyTrees={GetAllLiveIframeData:function(targetDoc){xyyz.debug.FuncStart(this.GetAllLiveIframeData.name);var toReturn=[],iframeAr=targetDoc.querySelectorAll('iframe[src*=content]');if(iframeAr){xyyz.debug.Log('iframeAr: '+iframeAr.length);for(var ifrIdx=0;ifrIdx<iframeAr.length;ifrIdx++)xyyz.debug.Log('pushing: '+ifrIdx),toReturn.push(new ClassOneLivingIframe(ifrIdx,iframeAr[ifrIdx]))}return xyyz.debug.FuncEnd(this.GetAllLiveIframeData.name+' '+toReturn.length),toReturn},PlantTheTrees:function(targetDoc,treeIdx){xyyz.debug.Log('s) LookAtExistingData: '+treeIdx);var foundInStorage=xyyz.StorageMan.GetTreeData(treeIdx);if(foundInStorage){xyyz.debug.Log('foundInStorage: '+foundInStorage);var fromStorageAr=foundInStorage.split(',');if(fromStorageAr){xyyz.debug.Log('foundAr: '+fromStorageAr.length+' '+fromStorageAr);this.GetAllLiveIframeData(targetDoc)[treeIdx];for(var idx=0;idx<fromStorageAr.length;idx++){var candidate=fromStorageAr[idx].replace(/\u0022/gi,'');candidate=candidate.replace('[','').replace(']',''),xyyz.debug.Log('candidate: '+candidate);var foundOnPage=targetIframe.getElementById(candidate);if(foundOnPage){xyyz.debug.Log('foundOnPage');var currentSrc=foundOnPage.getAttribute('src');xyyz.debug.Log('currentSrc'+currentSrc),currentSrc.indexOf('treemenu_expanded.png')<0&&(xyyz.debug.Log('clicking it'),foundOnPage.click())}}}}},SaveOneContentEditor:function(id,docElem){xyyz.debug.FuncStart(this.SaveOneContentEditor.name),id||(id=xyyz.InjectConst.GuidEmpty),docElem||(docElem=xyyz.PageData.Opener.Document,xyyz.debug.Log('Assigning docElem: '+docElem));var CeSnapShot=new SnapShotOneContentEditor(id);CeSnapShot.__allTreeDataAr=xyyz.OneTree.GetOneLiveTreeData(id,docElem),xyyz.WindowTreeSnapShotMan.PutCEDataToCurrentSnapShot(CeSnapShot),xyyz.debug.FuncEnd(this.SaveOneContentEditor.name)},SaveOneDesktop:function(){xyyz.debug.FuncStart(this.SaveOneDesktop.name);var livingIframeAr=this.GetAllLiveIframeData(xyyz.PageData.Opener.Document);if(livingIframeAr&&livingIframeAr.length>0)for(var iframeIdx=0;iframeIdx<livingIframeAr.length;iframeIdx++){xyyz.debug.Log('iframeIdx: '+iframeIdx);var targetIframeObj=livingIframeAr[iframeIdx];xyyz.debug.Log('targetIframe: '+JSON.stringify(targetIframeObj)),this.SaveOneContentEditor(iframeIdx,targetIframeObj.DocElem)}xyyz.debug.Log('done gathering tree data'),xyyz.WindowTreeSnapShotMan.ShowDebugData(),xyyz.debug.FuncEnd(this.SaveOneDesktop.name)},SaveAllTrees:function(){xyyz.debug.FuncStart(this.SaveAllTrees.name),xyyz.WindowTreeSnapShotMan.CreateNewWindowTreeSnapShot();var currentState=xyyz.PageData.CurrentOpenerPageState();currentState===xyyz.InjectConst.PageType.ContentEditor?this.SaveOneContentEditor():currentState===xyyz.InjectConst.PageType.Desktop?this.SaveOneDesktop():xyyz.debug.Error(this.SaveAllTrees.name,'Invalid page location '+currentState),xyyz.debug.FuncEnd(this.SaveAllTrees.name)}},(xyyz=xyyz||{}).OneTree={GetFriendlyNameFromNode:function(inputNode){xyyz.debug.FuncStart(this.GetFriendlyNameFromNode.name);var toReturn='unknown',treeNode=inputNode.parentNode.querySelector('[id^=Tree_Node_]');return treeNode?toReturn=treeNode.innerText:xyyz.debug.Log('No treeNode'),xyyz.debug.FuncEnd(this.GetFriendlyNameFromNode.name+' '+toReturn),toReturn},WalkNodeRecursive:function(targetNode,depth){var toReturn=[];if(depth-=1,targetNode){if(targetNode.className===xyyz.InjectConst.ClassNames.ContentTreeNode){var firstImg=targetNode.querySelector(xyyz.InjectConst.Selector.ContentTreeNodeGlyph);if(firstImg)if(firstImg.getAttribute('src').indexOf(xyyz.InjectConst.TreeExpandedPng)>-1){var friendlyName=this.GetFriendlyNameFromNode(firstImg);toReturn.push(new OneTreeNode(firstImg.id,friendlyName))}}var childNodes=targetNode.children;if(childNodes&&childNodes.length>0&&depth>0)for(var jdx=0;jdx<childNodes.length;jdx++){var oneChild=childNodes[jdx];toReturn=toReturn.concat(this.WalkNodeRecursive(oneChild,depth))}}return toReturn},GetOneLiveTreeData:function(idx,targetDoc){xyyz.debug.FuncStart(this.GetOneLiveTreeData.name+' idx: '+idx);var toReturn=[];if(targetDoc){xyyz.debug.Log(JSON.stringify(targetDoc));var rootNode=targetDoc.getElementById(xyyz.InjectConst.Selector.RootNodeId);if(rootNode){xyyz.debug.Log('rootNode: '+rootNode.innerHTML);var rootParent=rootNode.parentElement;toReturn=this.WalkNodeRecursive(rootParent,xyyz.InjectConst.MaxIter),xyyz.debug.Log('foundNodes count: '+toReturn.length);var nodesAsString=JSON.stringify(toReturn);xyyz.debug.Log('toReturn as string: '+nodesAsString)}else xyyz.debug.Error(this.GetOneLiveTreeData.name,'no root node')}else xyyz.debug.Error(this.GetOneLiveTreeData.name,'no targetDoc');return xyyz.debug.FuncEnd(this.GetOneLiveTreeData.name),toReturn}},(xyyz=xyyz||{}).WireMenuButtons=function(){xyyz.debug.Log('s) WireMenuButtons'),document.getElementById('btnEdit').onclick=function(){xyyz.LocationMan.SetScMode('edit')},document.getElementById('btnPrev').onclick=function(){xyyz.LocationMan.SetScMode('preview')},document.getElementById('btnNorm').onclick=function(){xyyz.LocationMan.SetScMode('normal')},document.getElementById('btnAdminB').onclick=function(){xyyz.LocationMan.AdminB()},document.getElementById('btnDesktop').onclick=function(){xyyz.LocationMan.Desktop(window.opener)},document.getElementById('btnSaveTheTrees').onclick=function(){xyyz.ManyTrees.SaveAllTrees()},document.getElementById('btnPlantTheTrees').onclick=function(){xyyz.ManyTrees.PlantTheTrees(window.opener.document,0)},document.getElementById('btnDrawLocalStorage').onclick=function(){xyyz.StorageMan.DrawStorage()},xyyz.debug.Log('e) WireMenuButtons ')},(xyyz=xyyz||{}).debug=new Debug,xyyz.Utilities=new Utilities,xyyz.PageData=new PageData(window.opener),xyyz.WindowTreeSnapShotMan=new WindowTreeSnapShotManager,xyyz.LocationMan=new LocationManager,xyyz.WireMenuButtons();";
var StylesToInject = "button{color:green;background-color:light-gray;width:200px;border-radius:5px;height:30px;margin:7px;cursor:pointer}button:hover{background-color:#afff00}body{background-color:coral}textarea{width:100%;height:200px}";
var constants={taDebug:"ta-debug"},xyyz=xyyz||{};xyyz.ChildWindow={myWindow:null,WindowExists:function(){return this.mywindow&&"undefined"!==this.mywindow&&!this.mywindow.closed},WriteHtml:function(o){console.log("s) WriteHtml");var n="<head>";n+="<style>",console.log("marker a"),n+=StylesToInject,console.log("marker b"),n+="</style>",n+="<body>",n+=HtmlToInject,n+="<script>",n+=jsToInject,n+="<\/script>",n+="</body>",o.document.innerHtml="",o.document.write(n),console.log("e) WriteHtml")},CreateWindow:function(){console.log("new window"),console.log("Constants: "+constants.taDebug),window.mywindow=window.open("","mywindow","width=900, height=600"),this.WriteHtml(window.mywindow)},FocusWindow:function(){console.log("existing window"),window.mywindow.focus()}},xyyz.ChildWindow.WindowExists()?xyyz.ChildWindow.FocusWindow():xyyz.ChildWindow.CreateWindow(),console.log("Menu Finished"),console.log(jsToInject);}());
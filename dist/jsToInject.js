var xyyz;function SetScMode(newValue){var newValueB='='+newValue;window.opener.location.href=window.opener.location.href.replace('=normal',newValueB).replace('=preview',newValueB).replace('=edit',newValueB)}function AdminB(ownerDoc){xyyz.debug.Log('s) AdminB'),xyyz.debug.Log('s) AdminB'),ownerDoc.getElementById('UserName').setAttribute('value','admin'),ownerDoc.getElementById('Password').setAttribute('value','b'),ownerDoc.getElementById('LogInBtn').click(),xyyz.debug.Log('e) AdminB')}function Desktop(ownerWindow){xyyz.debug.FuncStart(this.Desktop.name),xyyz.debug.Log('owner: '+JSON.stringify(ownerWindow));var pat=new RegExp('.*'+ownerWindow.location.hostname);xyyz.debug.Log('pat: '+pat);var match=ownerWindow.location.href.match(pat);xyyz.debug.Log('match: '+match),ownerWindow.location.href='/sitecore/shell/default.aspx',TriggerRedButton(ownerWindow),xyyz.debug.FuncEnd(this.Desktop.name)}function TriggerRedButton(ownerWindow){xyyz.debug.Log('TriggerRedButton'),setTimeout((function(){RedButton(ownerWindow,10)}),1500)}function RedButton(ownerWindow,iteration){xyyz.debug.Log();var found=ownerWindow.document.getElementById('StartButton');xyyz.debug.Log('Red Button: '+found+'  '+ownerWindow.location.href+' '+iteration),found?(found.click(),ownerWindow.document.querySelector('.scStartMenuLeftOption').click()):(iteration-=1)>0&&setTimeout((function(){RedButton(ownerWindow,iteration)}),1500)}(xyyz=xyyz||{}).ClassOneLivingIframe=function(index,docElem){xyyz.debug.Log('s) OneLivingIframeData: '+index),this.Index=index,this.DocElem=docElem,xyyz.debug.Log('e) OneLivingIframeData')},(xyyz=xyyz||{}).debug={IndentCount:0,Log:function(text){text='  '.repeat(this.IndentCount)+text,console.log(text);var ta=document.getElementById('ta-debug');ta&&(ta.value+='\\n\\r'+text)},FuncStart:function(text){text='s) '+text,this.Log(text),this.IndentCount++},FuncEnd:function(text){text='e) '+text,this.Log(text),this.IndentCount--},Error:function(text){text='** ERROR ** '+text,this.Log(text)}},(xyyz=xyyz||{}).WireMenuButtons=function(){xyyz.debug.Log('s) WireMenuButtons'),document.getElementById('btnEdit').onclick=function(){SetScMode('edit')},document.getElementById('btnPrev').onclick=function(){SetScMode('preview')},document.getElementById('btnNorm').onclick=function(){SetScMode('normal')},document.getElementById('btnAdminB').onclick=function(){AdminB(window.opener.document)},document.getElementById('btnDesktop').onclick=function(){Desktop(window.opener)},document.getElementById('btnSaveTheTrees').onclick=function(){xyyz.ManyTrees.SaveAllTrees(window.opener.document)},document.getElementById('btnPlantTheTrees').onclick=function(){xyyz.ManyTrees.PlantTheTrees(window.opener.document,0)},xyyz.debug.Log('e) WireMenuButtons ')},(xyyz=xyyz||{}).InjectConst={ClassNames:{ContentTreeNode:'scContentTreeNode'},Selector:{ContentTreeNodeGlyph:'.scContentTreeNodeGlyph',RootNodeId:'Tree_Node_11111111111111111111111111111111'},Storage:{Root:'xyyz'},TreeExpandedPng:'treemenu_expanded.png',MaxIter:100,prop:{AllTreeData:'AllTreeData'},Names:{HtmlToInject:'HtmlToInject',StylesToInject:'StylesToInject'}},(xyyz=(xyyz=xyyz||{})||{}).OneCEIframe=function(){this.Index=-1,this.TreeData={}},xyyz.TreeData=function(){this.DateStamp=Date.now(),this.AllCEIframes=[]},xyyz.StorageMan={CreateNewAllTreeData:function(){},GetTreeData:function(treeIdx){xyyz.debug.Log('s) GetTreeData');var foundInStorageJson=window.localStorage.getItem(xyyz.InjectConst.Storage.Root);if(foundInStorageJson){var allTreeDataAr=JSON.parse(foundInStorageJson)[xyyz.InjectConst.prop.AllTreeData];allTreeDataAr.length<=treeIdx&&allTreeDataAr[treeIdx]}return xyyz.debug.Log('e) GetTreeData'),treeIdx}};class TreeDataManager{constructor(){this.AllTreeData=[]}PutTreeData(newTreeData){this.AllTreeData.push(newTreeData),window.localStorage.setItem(xyyz.InjectConst.Storage.Root+idx,nodesAsString)}CreateNewAllTreeData(){this.AllTreeData=[]}ShowDebugData(){xyyz.debug.FuncStart(this.ShowDebugData.name);for(var jdx=0;jdx<this.AllTreeData.length;jdx++)xyyz.debug.Log('Tree: '+jdx+' '+allTreeData[jdx]);xyyz.debug.FuncEnd(this.ShowDebugData.name)}}(xyyz=(xyyz=xyyz||{})||{}).TreeDataMan=new TreeDataManager,(xyyz=xyyz||{}).ManyTrees={GetAllLiveIframeData:function(targetDoc){xyyz.debug.FuncStart(this.GetAllLiveIframeData.name);var toReturn=[],iframeAr=targetDoc.querySelectorAll('iframe[src*=content]');if(iframeAr){xyyz.debug.Log('iframeAr: '+iframeAr.length);for(var jdx=0;jdx<iframeAr.length;jdx++)xyyz.debug.Log('pushing: '+jdx),toReturn.push(new xyyz.ClassOneLivingIframe(jdx,iframeAr[jdx].contentDocument))}return xyyz.debug.FuncEnd(this.GetAllLiveIframeData.name+' '+toReturn.length),toReturn},PlantTheTrees:function(targetDoc,treeIdx){xyyz.debug.Log('s) LookAtExistingData: '+treeIdx);var foundInStorage=xyyz.StorageMan.GetTreeData(treeIdx);if(foundInStorage){xyyz.debug.Log('foundInStorage: '+foundInStorage);var fromStorageAr=foundInStorage.split(',');if(fromStorageAr){xyyz.debug.Log('foundAr: '+fromStorageAr.length+' '+fromStorageAr);this.GetAllLiveIframeData(targetDoc)[treeIdx];for(var idx=0;idx<fromStorageAr.length;idx++){var candidate=fromStorageAr[idx].replace(/\u0022/gi,'');candidate=candidate.replace('[','').replace(']',''),xyyz.debug.Log('candidate: '+candidate);var foundOnPage=targetIframe.getElementById(candidate);if(foundOnPage){xyyz.debug.Log('foundOnPage');var currentSrc=foundOnPage.getAttribute('src');xyyz.debug.Log('currentSrc'+currentSrc),currentSrc.indexOf('treemenu_expanded.png')<0&&(xyyz.debug.Log('clicking it'),foundOnPage.click())}}}}},SaveAllTrees:function(targetDoc){xyyz.debug.FuncStart(this.SaveAllTrees.name),xyyz.TreeDataMan.CreateNewAllTreeData();var livingIframeAr=this.GetAllLiveIframeData(targetDoc);if(livingIframeAr&&livingIframeAr.length>0)for(var iframeIdx=0;iframeIdx<livingIframeAr.length;iframeIdx++){xyyz.debug.Log('iframeIdx: '+iframeIdx);var targetIframe=livingIframeAr[iframeIdx];xyyz.debug.Log('targetIframe: '+JSON.stringify(targetIframe));var oneCeData=xyyz.OneTree.GetOneLiveTreeData(iframeIdx,targetIframe.DocElem);xyyz.TreeDataMan.PutTreeData(oneCeData)}xyyz.debug.Log('done gathering tree data'),xyyz.TreeDataMan.ShowDebugData(),xyyz.debug.FuncEnd(this.SaveAllTrees.name)}},(xyyz=xyyz||{}).OneTree={WalkNodeRecursive:function(targetNode,depth){var toReturn=[];if(depth-=1,targetNode){targetNode.id;if(targetNode.className===xyyz.InjectConst.ClassNames.ContentTreeNode){var firstImg=targetNode.querySelector(xyyz.InjectConst.Selector.ContentTreeNodeGlyph);if(firstImg){var srcAttr=firstImg.getAttribute('src');srcAttr.indexOf(xyyz.InjectConst.TreeExpandedPng)>-1&&(xyyz.debug.Log('src: '+srcAttr),toReturn.push(firstImg.id))}}var childNodes=targetNode.children;if(childNodes&&childNodes.length>0&&depth>0)for(var jdx=0;jdx<childNodes.length;jdx++){var oneChild=childNodes[jdx];toReturn=toReturn.concat(this.WalkNodeRecursive(oneChild,depth))}}return toReturn},GetOneLiveTreeData:function(idx,targetDoc){if(xyyz.debug.FuncStart(this.GetOneLiveTreeData.name+' idx: '+idx),targetDoc){xyyz.debug.Log(JSON.stringify(targetDoc));var rootNode=targetDoc.getElementById(xyyz.InjectConst.Selector.RootNodeId);if(rootNode){xyyz.debug.Log('rootNode: '+rootNode.innerHTML);var rootParent=rootNode.parentElement,foundNodesAr=this.WalkNodeRecursive(rootParent,xyyz.InjectConst.MaxIter);xyyz.debug.Log('foundNodes count: '+foundNodesAr.length);JSON.stringify(foundNodesAr);xyyz.debug.Log('foundNodesAr as string: '+foundNodesAr)}else xyyz.debug.Error(this.GetOneLiveTreeData.name+'no root node')}else xyyz.debug.Error(this.GetOneLiveTreeData.name+' no targetDoc');xyyz.debug.FuncEnd(this.GetOneLiveTreeData.name)}},xyyz.WireMenuButtons();
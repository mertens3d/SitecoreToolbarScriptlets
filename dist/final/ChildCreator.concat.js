javascript:(function(){var StyleInject = "button{color:green;background-color:light-gray;width:200px;border-radius:5px;height:30px;margin:7px;cursor:pointer}button:hover{background-color:#afff00}body{background-color:coral}textarea{width:100%;height:200px}
";
var CodeToInject = "var xyyz;function SetScMode(e){var t=\"=\"+e;window.opener.location.href=window.opener.location.href.replace(\"=normal\",t).replace(\"=preview\",t).replace(\"=edit\",t)}function AdminB(e){xyyz.debug.log(\"s) AdminB\"),xyyz.debug.log(\"s) AdminB\"),e.querySelector(\"#UserName\").setAttribute(\"value\",\"admin\"),e.querySelector(\"#Password\").setAttribute(\"value\",\"b\"),e.querySelector(\"#LogInBtn\").click(),xyyz.debug.log(\"e) AdminB\")}function Desktop(e){xyyz.debug.log(\"owner: \"+e);var t=new RegExp(\".*\"+e.location.hostname);xyyz.debug.log(\"pat: \"+t);var n=e.location.href.match(t);xyyz.debug.log(\"match: \"+n),e.location.href=\"/sitecore/shell/default.aspx\",TriggerRedButton(e)}function TriggerRedButton(e){xyyz.debug.log(\"TriggerRedButton\"),setTimeout(function(){RedButton(e,10)},1500)}function RedButton(e,t){xyyz.debug.log();var n=e.document.getElementById(\"StartButton\");xyyz.debug.log(\"Red Button: \"+n+\"  \"+e.location.href+\" \"+t),n?(n.click(),e.document.querySelector(\".scStartMenuLeftOption\").click()):(t-=1)>0&&setTimeout(function(){RedButton(e,t)},1500)}(xyyz=xyyz||{}).debug={log:function(e){console.log(e);var t=document.querySelector(\"#ta-debug\");t&&(t.value+=\"\\n\\r\"+e)}},(xyyz=xyyz||{}).WireMenuButtons=function(){xyyz.debug.log(\"s) WireMenuButtons\"),document.querySelector(\"#btnEdit\").onclick=function(){SetScMode(\"edit\")},document.querySelector(\"#btnPrev\").onclick=function(){SetScMode(\"preview\")},document.querySelector(\"#btnNorm\").onclick=function(){SetScMode(\"normal\")},document.querySelector(\"#btnAdminB\").onclick=function(){AdminB(window.opener.document)},document.querySelector(\"#btnDesktop\").onclick=function(){Desktop(window.opener)},document.querySelector(\"#btnSaveTheTrees\").onclick=function(){xyyz.ManyTrees.SaveAllTrees(window.opener.document)},document.querySelector(\"#btnPlantTheTrees\").onclick=function(){xyyz.ManyTrees.PlantTheTrees(window.opener.document,0)},xyyz.debug.log(\"e) WireMenuButtons \")},(xyyz=xyyz||{}).InjectConst={ClassNames:{ContentTreeNode:\"scContentTreeNode\"},Selector:{ContentTreeNodeGlyph:\".scContentTreeNodeGlyph\",RootNodeId:\"#Tree_Node_11111111111111111111111111111111\"},Storage:{Root:\"xyyz\"},TreeExpandedPng:\"treemenu_expanded.png\",MaxIter:100,prop:{AllTreeData:\"AllTreeData\"}},(xyyz=xyyz||{}).OneCEIframe=function(){this.Index=-1,this.TreeData={}},xyyz.TreeData=function(){this.DateStamp=Date.now(),this.AllCEIframes=[]},xyyz.StorageMan={GetTreeData:function(e){xyyz.debug.log(\"s) GetTreeData\");var t=window.localStorage.getItem(xyyz.InjectConst.Storage.root);if(t){var n=JSON.parse(t)[xyyz.InjectConst.prop.AllTreeData];n.length<=e&&n[e]}return xyyz.debug.log(\"e) GetTreeData\"),e}},xyyz.OneLivingTreeData=function(e,t){xyyz.debug.log(\"s) OneLivingTreeData: \"+e),this.Index=e,this.DocElem=t,xyyz.debug.log(\"e) OneLivingTreeData\")},(xyyz=xyyz||{}).ManyTrees={GetAllLiveTreeData:function(e){xyyz.debug.log(\"s) GetAllLiveTreeData\");var t=[],n=e.querySelectorAll(\"iframe[src*=content]\");if(n){xyyz.debug.log(\"iframeAr: \"+n.length);for(var o=0;o<n.length;o++)xyyz.debug.log(\"pushing: \"+o),t.push(new xyyz.OneLivingTreeData(o,n[o].contentDocument))}return xyyz.debug.log(\"e) GetAllLiveTreeData\"),t},PlantTheTrees:function(e,t){xyyz.debug.log(\"s) LookAtExistingData: \"+t);var n=xyyz.StorageMan.GetTreeData(t);if(n){xyyz.debug.log(\"foundInStorage: \"+n);var o=n.split(\",\");if(o){xyyz.debug.log(\"foundAr: \"+o.length+\" \"+o);for(var r=this.GetAllLiveTreeData(e)[t],a=0;a<o.length;a++){var y=o[a].replace(/\"/gi,\"\");y=y.replace(\"[\",\"\").replace(\"]\",\"\"),xyyz.debug.log(\"candidate: \"+y);var l=r.getElementById(y);if(l){xyyz.debug.log(\"foundOnPage\");var i=l.getAttribute(\"src\");xyyz.debug.log(\"currentSrc\"+i),i.indexOf(\"treemenu_expanded.png\")<0&&(xyyz.debug.log(\"clicking it\"),l.click())}}}}},SaveAllTrees:function(e){xyyz.debug.log(\"s) \"+this.SaveAllTrees.name);var t=[],n=this.GetAllLiveTreeData(e);if(n&&n.length>0){for(var o=0;o<n.length;o++){var r=n[o],a=xyyz.oneCeData.GetOneLiveCeData(o,r.contentDocument);t.push(a)}xyyz.debug.log(\"e) \"+this.SaveAllTrees.name)}for(var y=0;y<t.length;y++)xyyz.debug(\"Tree: \"+y+\" \"+t[y])}},(xyyz=xyyz||{}).OneTree={WalkNodeRecursive:function(e,t){var n=[];if(t-=1,e){e.id;if(e.className===xyyz.InjectConst.ClassName.ContentTreeNode){var o=e.querySelector(xyyz.InjectConst.Selector.ContentTreeNodeGlyph);if(o){var r=o.getAttribute(\"src\");r.indexOf(xyyz.InjectConst.TreeExpandedPng)>-1&&(xyyz.debug.log(\"src: \"+r),n.push(o.id))}}var a=e.children;if(a&&a.length>0&&t>0)for(var y=0;y<a.length;y++){var l=a[y];n=n.concat(this.WalkNodeRecursive(l,t))}}return n},GetOneLiveTreeData:function(e,t){xyyz.debug.log(\"s) SaveOneCeData idx: \"+e);new xyyz.Storage.LivingCE(e,t);var n=t.querySelector(xyyz.InjectConst.Selector.RootNodeId);if(xyyz.debug.log(\"rootNode: \"+n.innerHTML),n){var o=n.parentElement,r=this.WalkNodeRecursive(o,xyyz.InjectConst.MaxIter);xyyz.debug.log(\"foundNodes: \"+r.length),xyyz.debug.log(\"foundNodes: \"+r),window.localStorage.setItem(xyyz.Storage.root+e,JSON.stringify(r))}xyyz.debug.log(\"e) SaveOneCeData\")}},xyyz.WireMenuButtons();";
var HtmlToInject = "<body><div><button id='btnEdit' type='button'>sc_mode=edit</button> <button id='btnPrev' type='button'>sc_mode=prev</button> <button id='btnNorm' type='button'>sc_mode=normal</button> <button id='btnAdminB' type='button'>Admin B</button> <button id='btnDesktop' type='button'>Desktop</button> <button id='btnSaveTheTrees' type='button'>Save the Trees</button> <button id='btnPlantTheTrees' type='button'>Plant the Trees</button></div><textarea id='ta-debug'></textarea></body>";
var constants = {
    taDebug : 'ta-debug',
}
var xyyz = xyyz || {};

xyyz.ChildWindow = {
    myWindow: null,

    WindowExists: function () {

        var toReturn = this.mywindow && this.mywindow !== "undefined" && !this.mywindow.closed;

        return toReturn;
    },
    WriteHtml: function (targetWindow) {

        var fullMarkup = "<head>";
        fullMarkup += "<style>";
        fullMarkup += StyleInject;
        fullMarkup += "</style>";
        fullMarkup += "<body>";
        fullMarkup += HtmlToInject;
        fullMarkup += "<script>";
        fullMarkup += CodeToInject;
        fullMarkup += "</script>";
        fullMarkup += "</body>";

        targetWindow.document.innerHtml = "";

        console.log(fullMarkup);
        targetWindow.document.write(fullMarkup);
    },
    CreateWindow: function () {
        console.log('new window');
        console.log("Constants: " + constants.taDebug);
        window.mywindow = window.open("", "mywindow", "width=800, height=400");
        this.WriteHtml(window.mywindow);
    },
    FocusWindow: function () {
        console.log('existing window');
        window.mywindow.focus();
    }
};

if (xyyz.ChildWindow.WindowExists()) {
    xyyz.ChildWindow.FocusWindow();

} else {
    xyyz.ChildWindow.CreateWindow();
}}());
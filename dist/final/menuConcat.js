javascript:(function(){var CodeToInject = "var xyyz;function WireMenuButtons(){document.querySelector(\"#btnEdit\").onclick=function(){SetScMode(\"edit\")},document.querySelector(\"#btnPrev\").onclick=function(){SetScMode(\"preview\")},document.querySelector(\"#btnNorm\").onclick=function(){SetScMode(\"normal\")},document.querySelector(\"#btnAdminB\").onclick=function(){AdminB(window.opener.document)},document.querySelector(\"#btnDesktop\").onclick=function(){Desktop(window.opener)},document.querySelector(\"#btnSaveTheTrees\").onclick=function(){SaveTheTrees(window.opener.document)},document.querySelector(\"#btnPlantTheTrees\").onclick=function(){PlantTheTrees(window.opener.document)}}function SetScMode(e){var t=\"=\"+e;window.opener.location.href=window.opener.location.href.replace(\"=normal\",t).replace(\"=preview\",t).replace(\"=edit\",t)}function AdminB(e){xyyz.debug.log(\"s) AdminB\"),xyyz.debug.log(\"s) AdminB\"),e.querySelector(\"#UserName\").setAttribute(\"value\",\"admin\"),e.querySelector(\"#Password\").setAttribute(\"value\",\"b\"),e.querySelector(\"#LogInBtn\").click(),xyyz.debug.log(\"e) AdminB\")}function Desktop(e){xyyz.debug.log(\"owner: \"+e);var t=new RegExp(\".*\"+e.location.hostname);xyyz.debug.log(\"pat: \"+t);var n=e.location.href.match(t);xyyz.debug.log(\"match: \"+n),e.location.href=\"/sitecore/shell/default.aspx\",TriggeRedButton(e)}function TriggeRedButton(e){xyyz.debug.log(\"TriggeRedButton\"),setTimeout(function(){RedButton(e,10)},1500)}function RedButton(e,t){xyyz.debug.log();var n=e.document.getElementById(\"StartButton\");xyyz.debug.log(\"Red Button: \"+n+\"  \"+e.location.href+\" \"+t),n?(n.click(),e.document.querySelector(\".scStartMenuLeftOption\").click()):(t-=1)>0&&setTimeout(function(){RedButton(e,t)},1500)}function WalkNodeRecursive(e,t){var n=[];if(t-=1,e){var o=e.id;if(e.className===xyyz.InjectConst.ClassName.ContentTreeNode){var r=e.querySelector(xyyz.InjectConst.Selector.ContentTreeNodeGlyph);if(r){var c=r.getAttribute(\"src\");c.indexOf(xyyz.InjectConst.TreeExpandedPng)>-1&&(xyyz.debug.log(\"src: \"+c),n.push(r.id))}}if(o)o.indexOf(\"Tree_Node_\");var u=e.children;if(u&&u.length>0&&t>0)for(var d=0;d<u.length;d++){var l=u[d];n=n.concat(WalkNodeRecursive(l,t))}}return n}function GetIframe(e){var t=null,n=e.querySelectorAll(\"iframe[src*=content]\");if(n){xyyz.debug.log(\"iframeAr: \"+n.length);for(var o=0;o<n.length;o++)t=n[o].contentDocument}return t}function PlantTheTrees(e){xyyz.debug.log(\"s) LookAtExistingData\");var t=window.localStorage.getItem(\"nodeData-0\");if(t){xyyz.debug.log(\"foundInStorage: \"+t);var n=t.split(\",\");if(n){xyyz.debug.log(\"foundAr: \"+n.length+\" \"+n);for(var o=GetIframe(e),r=0;r<n.length;r++){var c=n[r].replace(/\"/gi,\"\");c=c.replace(\"[\",\"\").replace(\"]\",\"\"),xyyz.debug.log(\"candidate: \"+c);var u=o.getElementById(c);if(u){xyyz.debug.log(\"foundOnPage\");var d=u.getAttribute(\"src\");xyyz.debug.log(\"currentSrc\"+d),d.indexOf(\"treemenu_expanded.png\")<0&&(xyyz.debug.log(\"clicking it\"),u.click())}}}}}function SaveTheTrees(e){if(xyyz.debug.log(\"s) SaveTheTrees\"),GetIframe(e)){var t=oneIframeDoc.querySelector(\"#Tree_Node_11111111111111111111111111111111\");if(xyyz.debug.log(\"rootNode: \"+t.innerHTML),t){var n=WalkNodeRecursive(t.parentElement,100);xyyz.debug.log(\"foundNodes: \"+n.length),xyyz.debug.log(\"foundNodes: \"+n),window.localStorage.setItem(\"nodeData-\"+idx,JSON.stringify(n))}xyyz.debug.log(\"e) SaveTheTrees\")}}(xyyz=xyyz||{}).debug={valueCombine:\"\",log:function(e){console.log(e);var t=document.querySelector(\"#ta-debug\");t&&(t.value+=\"\\n\\r\"+e)}},(xyyz=xyyz||{}).InjectConst={ClassNames:{ContentTreeNode:\"scContentTreeNode\"},Selector:{ContentTreeNodeGlyph:\".scContentTreeNodeGlyph\"},TreeExpandedPng:\"treemenu_expanded.png\"};";
var HtmlToInject = "<head><style>button {
            color: green;
            background-color: light-gray;
            width: 200px;
            border-radius: 5px;
            height: 30px;
            margin: 7px;
            cursor: pointer;
        }

        button:hover {
            background-color: #afff00;
        }

        body {
            background-color: coral;
        }
        textarea{
            width: 100%;
            height: 100%;
        }</style></head><body><div><button id='btnEdit' type='button'>sc_mode=edit</button> <button id='btnPrev' type='button'>sc_mode=prev</button> <button id='btnNorm' type='button'>sc_mode=normal</button> <button id='btnAdminB' type='button'>Admin B</button> <button id='btnDesktop' type='button'>Desktop</button> <button id='btnSaveTheTrees' type='button'>Save the Trees</button> <button id='btnPlantTheTrees' type='button'>Plant the Trees</button></div><textarea id='ta-debug'></textarea></body>";
var constants = {
    taDebug : 'ta-debug',
}

// function WriteDebug(value){
//     console.log(value);
//     mywindow.document.write(value);
// }

// open a new window



function WriteHtml(targetWindow) {

    targetWindow.document.innerHtml = "";

    targetWindow.document.write(HtmlToInject);
    console.log(HtmlToInject);
    targetWindow.document.write("<script>");
    targetWindow.document.write(CodeToInject);
    // targetWindow.document.write(MenuText);
    targetWindow.document.write("WireMenuButtons()");
    //console.log(commandSetEdit);
    //mywindow.document.write(commandSetEdit);
    //mywindow.document.write("var parent=" + mywindow.opener);
    // var command = "function(){window.opener.location.href = 'https://www.google.com/';}";

    // mywindow.opener.document.write("parent.document.write(console.log('click'));}");
    targetWindow.document.write("</script>");
}


if (!window.mywindow || window.mywindow === "undefined" || window.mywindow.closed) {
    console.log('new window');
    console.log("Constants: " + constants.taDebug );
    window.mywindow = window.open("", "mywindow", "width=800, height=400");
    window.mywindow.document.innerHtml = '';
    WriteHtml(window.mywindow);
} else {
    console.log('existing window');
    window.mywindow.focus();
}

}());
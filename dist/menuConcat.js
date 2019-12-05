javascript:(function(){var CodeToInject = "var debug={valueCombine:\"\",log:function(e){console.log(e);var t=document.querySelector(\"#ta-debug\");t&&(t.value+=\"\\n\\r\"+e)}};function WireMenuButtons(){document.querySelector(\"#btnEdit\").onclick=function(){SetScMode(\"edit\")},document.querySelector(\"#btnPrev\").onclick=function(){SetScMode(\"preview\")},document.querySelector(\"#btnNorm\").onclick=function(){SetScMode(\"normal\")},document.querySelector(\"#btnAdminB\").onclick=function(){AdminB(window.opener.document)},document.querySelector(\"#btnDesktop\").onclick=function(){Desktop(window.opener)},document.querySelector(\"#btnSaveTheTrees\").onclick=function(){SaveTheTrees(window.opener.document)},document.querySelector(\"#btnPlantTheTrees\").onclick=function(){PlantTheTrees(window.opener.document)}}function SetScMode(e){var t=\"=\"+e;window.opener.location.href=window.opener.location.href.replace(\"=normal\",t).replace(\"=preview\",t).replace(\"=edit\",t)}function AdminB(e){debug.log(\"s) AdminB\"),debug.log(\"s) AdminB\"),e.querySelector(\"#UserName\").setAttribute(\"value\",\"admin\"),e.querySelector(\"#Password\").setAttribute(\"value\",\"b\"),e.querySelector(\"#LogInBtn\").click(),debug.log(\"e) AdminB\")}function Desktop(e){debug.log(\"owner: \"+e);var t=new RegExp(\".*\"+e.location.hostname);debug.log(\"pat: \"+t);var o=e.location.href.match(t);debug.log(\"match: \"+o),e.location.href=\"/sitecore/shell/default.aspx\",TriggeRedButton(e)}function TriggeRedButton(e){debug.log(\"TriggeRedButton\"),setTimeout(function(){RedButton(e,10)},1500)}function RedButton(e,t){debug.log();var o=e.document.getElementById(\"StartButton\");debug.log(\"Red Button: \"+o+\"  \"+e.location.href+\" \"+t),o?(o.click(),e.document.querySelector(\".scStartMenuLeftOption\").click()):(t-=1)>0&&setTimeout(function(){RedButton(e,t)},1500)}function WalkNodeRecursive(e,t){var o=[];if(t-=1,e){var n=e.id;if(\"scContentTreeNode\"===e.className){var r=e.querySelector(\".scContentTreeNodeGlyph\");if(r){var c=r.getAttribute(\"src\");c.indexOf(\"treemenu_expanded.png\")>-1&&(debug.log(\"*******************************src: \"+c),o.push(r.id))}}if(n)n.indexOf(\"Tree_Node_\");var u=e.children;if(u&&u.length>0&&t>0)for(var i=0;i<u.length;i++){var l=u[i];o=o.concat(WalkNodeRecursive(l,t))}}return o}function GetIframe(e){var t=null,o=e.querySelectorAll(\"iframe[src*=content]\");if(o){debug.log(\"iframeAr: \"+o.length);for(var n=0;n<o.length;n++)t=o[n].contentDocument}return t}function PlantTheTrees(e){debug.log(\"s) LookAtExistingData\");var t=window.localStorage.getItem(\"nodeData-0\");if(t){debug.log(\"foundInStorage: \"+t);var o=t.split(\",\");if(o){debug.log(\"foundAr: \"+o.length+\" \"+o);for(var n=GetIframe(e),r=0;r<o.length;r++){var c=o[r].replace(/\"/gi,\"\");c=c.replace(\"[\",\"\").replace(\"]\",\"\"),debug.log(\"candidate: \"+c);var u=n.getElementById(c);if(u){debug.log(\"foundOnPage\");var i=u.getAttribute(\"src\");debug.log(\"currentSrc\"+i),i.indexOf(\"treemenu_expanded.png\")<0&&(debug.log(\"clicking it\"),u.click())}}}}}function SaveTheTrees(e){if(debug.log(\"s) SaveTheTrees\"),GetIframe(e)){var t=oneIframeDoc.querySelector(\"#Tree_Node_11111111111111111111111111111111\");if(debug.log(\"rootNode: \"+t.innerHTML),t){var o=WalkNodeRecursive(t.parentElement,100);debug.log(\"foundNodes: \"+o.length),debug.log(\"foundNodes: \"+o),window.localStorage.setItem(\"nodeData-\"+idx,JSON.stringify(o))}debug.log(\"e) SaveTheTrees\")}}";
var HtmlToInject = "<div style='display: block; width: 100%; height: 100%; background-color: brown;'><button id='btnEdit' type='button'>sc_mode=edit</button> <button id='btnPrev' type='button'>sc_mode=prev</button> <button id='btnNorm' type='button'>sc_mode=normal</button> <button id='btnAdminB' type='button'>Admin B</button> <button id='btnDesktop' type='button'>Desktop</button> <button id='btnSaveTheTrees' type='button'>Save the Trees</button> <button id='btnPlantTheTrees' type='button'>Plant the Trees</button><div style='width:100%;color:blue;'><textarea id='ta-debug' cols='80' rows='16'></textarea></div></div>";
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
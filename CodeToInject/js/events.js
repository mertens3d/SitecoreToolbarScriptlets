var xyyz = xyyz || {};


xyyz.WireMenuButtons = function() {
    xyyz.debug.log('s) WireMenuButtons' );
    
    document.querySelector('#btnEdit').onclick = function () { SetScMode('edit'); };
    document.querySelector('#btnPrev').onclick = function () { SetScMode('preview'); };
    document.querySelector('#btnNorm').onclick = function () { SetScMode('normal'); };
    document.querySelector('#btnAdminB').onclick = function () { AdminB(window.opener.document); };
    document.querySelector('#btnDesktop').onclick = function () { Desktop(window.opener); };
    document.querySelector('#btnSaveTheTrees').onclick = function () { xyyz.ManyTrees.SaveAllTrees(window.opener.document); };
    document.querySelector('#btnPlantTheTrees').onclick = function () { xyyz.ManyTrees.PlantTheTrees(window.opener.document, 0); };
    xyyz.debug.log('e) WireMenuButtons ');
}
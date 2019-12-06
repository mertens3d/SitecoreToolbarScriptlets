var xyyz = xyyz || {};


xyyz.WireMenuButtons = function () {
    xyyz.debug.Log('s) WireMenuButtons');

    document.getElementById('btnEdit').onclick = function () {
        SetScMode('edit');
    };
    document.getElementById('btnPrev').onclick = function () {
        SetScMode('preview');
    };
    document.getElementById('btnNorm').onclick = function () {
        SetScMode('normal');
    };
    document.getElementById('btnAdminB').onclick = function () {
        AdminB(window.opener.document);
    };
    document.getElementById('btnDesktop').onclick = function () {
        Desktop(window.opener);
    };
    document.getElementById('btnSaveTheTrees').onclick = function () {
        xyyz.ManyTrees.SaveAllTrees(window.opener.document);
    };
    document.getElementById('btnPlantTheTrees').onclick = function () {
        xyyz.ManyTrees.PlantTheTrees(window.opener.document, 0);
    };
    xyyz.debug.Log('e) WireMenuButtons ');
};
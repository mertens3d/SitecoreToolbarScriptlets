var xyyz = xyyz || {};

xyyz.WireMenuButtons = function () {
  xyyz.debug.Log('s) WireMenuButtons');

  document.getElementById('btnEdit').onclick = function () {
    xyyz.LocationMan. SetScMode('edit');
  };
  document.getElementById('btnPrev').onclick = function () {
    xyyz.LocationMan.    SetScMode('preview');
  };
  document.getElementById('btnNorm').onclick = function () {
    xyyz.LocationMan.SetScMode('normal');
  };
  document.getElementById('btnAdminB').onclick = function () {
    xyyz.LocationMan.AdminB();
  };
  document.getElementById('btnDesktop').onclick = function () {
    xyyz.LocationMan.Desktop(window.opener);
  };
  document.getElementById('btnSaveTheTrees').onclick = function () {
    xyyz.ManyTrees.SaveAllTrees();
  };
  document.getElementById('btnPlantTheTrees').onclick = function () {
    xyyz.ManyTrees.PlantTheTrees(window.opener.document, 0);
  };
  document.getElementById('btnDrawLocalStorage').onclick = function () {
    xyyz.StorageMan.DrawStorage();
  };
  xyyz.debug.Log('e) WireMenuButtons ');
};
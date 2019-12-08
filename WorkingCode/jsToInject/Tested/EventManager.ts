console.log('EventManager loaded');
class EventManager extends SpokeBase {
  constructor(xyyz: Hub) {
    super(xyyz);
  }
  WireMenuButtons() {
    this.Xyyz.debug.FuncStart(EventManager.name + ' ' + this.WireMenuButtons.name);

    var thisObj = this;

    document.getElementById('btnEdit').onclick = function () {
      thisObj.Xyyz.LocationMan.SetScMode('edit');
    };
    document.getElementById('btnPrev').onclick = function () {
      thisObj.Xyyz.LocationMan.SetScMode('preview');
    };
    document.getElementById('btnNorm').onclick = function () {
      thisObj.Xyyz.LocationMan.SetScMode('normal');
    };
    document.getElementById('btnAdminB').onclick = function () {
      thisObj.Xyyz.LocationMan.AdminB();
    };
    document.getElementById('btnDesktop').onclick = function () {
      thisObj.Xyyz.LocationMan.Desktop();
    };
    document.getElementById('btnSaveTheTrees').onclick = function () {
      thisObj.Xyyz.ManyTreesMan.SaveAllTrees();
    };
    document.getElementById('btnPlantTheTrees').onclick = function () {
      thisObj.Xyyz.ManyTreesMan.PlantTheTrees(window.opener.document, 0);
    };
    document.getElementById('btnDrawLocalStorage').onclick = function () {
      //todo   this.Xyyz.ManyTreesMan.DrawStorage();
      console.log('todo');
    };
    this.Xyyz.debug.FuncEnd(this.WireMenuButtons.name);
  };
}
var xyyz = xyyz || {};

xyyz.ManyTrees = {
  GetAllLiveIframeData: function (targetDoc) {
    xyyz.debug.FuncStart(this.GetAllLiveIframeData.name);
    var toReturn = [];
    var iframeAr = targetDoc.querySelectorAll('iframe[src*=content]');
    if (iframeAr) {
      xyyz.debug.Log('iframeAr: ' + iframeAr.length);
      for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
        xyyz.debug.Log('pushing: ' + ifrIdx);
        toReturn.push(new ClassOneLivingIframe(ifrIdx, iframeAr[ifrIdx]));
      }
    }
    xyyz.debug.FuncEnd(this.GetAllLiveIframeData.name + ' ' + toReturn.length);
    return toReturn;
  },

  PlantTheTrees: function (targetDoc, treeIdx) {
    xyyz.debug.Log('s) LookAtExistingData: ' + treeIdx);
    var foundInStorage = xyyz.StorageMan.GetTreeData(treeIdx);

    if (foundInStorage) {
      xyyz.debug.Log('foundInStorage: ' + foundInStorage);
      var fromStorageAr = foundInStorage.split(',');
      if (fromStorageAr) {
        xyyz.debug.Log('foundAr: ' + fromStorageAr.length + ' ' + fromStorageAr);

        var allData = this.GetAllLiveIframeData(targetDoc)[treeIdx];

        for (var idx = 0; idx < fromStorageAr.length; idx++) {
          var candidate = fromStorageAr[idx].replace(/\u0022/gi, '');
          candidate = candidate.replace('[', '').replace(']', '');
          xyyz.debug.Log('candidate: ' + candidate);
          var foundOnPage = targetIframe.getElementById(candidate);
          if (foundOnPage) {
            xyyz.debug.Log('foundOnPage');
            var currentSrc = foundOnPage.getAttribute('src');
            xyyz.debug.Log('currentSrc' + currentSrc);
            if (currentSrc.indexOf('treemenu_expanded.png') < 0) {
              xyyz.debug.Log('clicking it');

              foundOnPage.click();
            }
          }
        }
      }
    }
  },

  SaveOneContentEditor: function (id, docElem) {
    xyyz.debug.FuncStart(this.SaveOneContentEditor.name);

    if (!id) {
      id = xyyz.InjectConst.GuidEmpty;
    }
    if (!docElem) {
      docElem = xyyz.PageData.Opener.Document;
      xyyz.debug.Log('Assigning docElem: ' + docElem);
    }
    var CeSnapShot = new SnapShotOneContentEditor(id);
    CeSnapShot.__allTreeDataAr = xyyz.OneTree.GetOneLiveTreeData(id, docElem);

    xyyz.WindowTreeSnapShotMan.PutCEDataToCurrentSnapShot(CeSnapShot);

    xyyz.debug.FuncEnd(this.SaveOneContentEditor.name);
  },

  SaveOneDesktop: function () {
    xyyz.debug.FuncStart(this.SaveOneDesktop.name);
    var livingIframeAr = this.GetAllLiveIframeData(xyyz.PageData.Opener.Document);
    if (livingIframeAr && livingIframeAr.length > 0) {
      for (var iframeIdx = 0; iframeIdx < livingIframeAr.length; iframeIdx++) {
        xyyz.debug.Log('iframeIdx: ' + iframeIdx);

        var targetIframeObj = livingIframeAr[iframeIdx];
        xyyz.debug.Log('targetIframe: ' + JSON.stringify(targetIframeObj));
        this.SaveOneContentEditor(iframeIdx, targetIframeObj.DocElem);
      }
    }

    xyyz.debug.Log('done gathering tree data');
    xyyz.WindowTreeSnapShotMan.ShowDebugData();
    xyyz.debug.FuncEnd(this.SaveOneDesktop.name);
  },
  SaveAllTrees: function () {
    xyyz.debug.FuncStart(this.SaveAllTrees.name);

    xyyz.WindowTreeSnapShotMan.CreateNewWindowTreeSnapShot();

    var currentState = xyyz.PageData.CurrentOpenerPageState();
    if (currentState === xyyz.InjectConst.PageType.ContentEditor) {
      this.SaveOneContentEditor();
    }
    else if (currentState === xyyz.InjectConst.PageType.Desktop) {
      this.SaveOneDesktop();
    } else {
      xyyz.debug.Error(this.SaveAllTrees.name, 'Invalid page location ' + currentState);
    }
    xyyz.debug.FuncEnd(this.SaveAllTrees.name);
  }
};
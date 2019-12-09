console.log('ManyTrees loaded');

class ManyTrees extends SpokeBase {
  constructor(xyyz: Hub) {
    xyyz.debug.FuncStart(ManyTrees.name);
    super(xyyz)
    xyyz.debug.FuncEnd(ManyTrees.name);
  }

  GetAllLiveIframeData(targetDoc) {
    this.Xyyz.debug.FuncStart(this.GetAllLiveIframeData.name);
    var toReturn = [];
    var iframeAr = targetDoc.querySelectorAll('iframe[src*=content]');
    if (iframeAr) {
      this.Xyyz.debug.Log('iframeAr: ' + iframeAr.length);
      for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
        this.Xyyz.debug.Log('pushing: ' + ifrIdx);
        toReturn.push(new ClassOneLivingIframe(ifrIdx, iframeAr[ifrIdx], this.Xyyz));
      }
    }
    this.Xyyz.debug.FuncEnd(this.GetAllLiveIframeData.name + ' ' + toReturn.length);
    return toReturn;
  }

  PlantTheTrees(targetDoc, treeIdx) {
    this.Xyyz.debug.Log('s) LookAtExistingData: ' + treeIdx);
    var foundInStorage = null;//todo   this.Xyyz.StorageMan.GetTreeData(treeIdx);

    if (foundInStorage) {
      this.Xyyz.debug.Log('foundInStorage: ' + foundInStorage);
      var fromStorageAr = foundInStorage.split(',');
      if (fromStorageAr) {
        this.Xyyz.debug.Log('foundAr: ' + fromStorageAr.length + ' ' + fromStorageAr);

        var allData = this.GetAllLiveIframeData(targetDoc)[treeIdx];

        for (var idx = 0; idx < fromStorageAr.length; idx++) {
          var candidate = fromStorageAr[idx].replace(/\u0022/gi, '');
          candidate = candidate.replace('[', '').replace(']', '');
          this.Xyyz.debug.Log('candidate: ' + candidate);
          var foundOnPage = null;//todo targetIframe.getElementById(candidate);
          if (foundOnPage) {
            this.Xyyz.debug.Log('foundOnPage');
            var currentSrc = foundOnPage.getAttribute('src');
            this.Xyyz.debug.Log('currentSrc' + currentSrc);
            if (currentSrc.indexOf('treemenu_expanded.png') < 0) {
              this.Xyyz.debug.Log('clicking it');

              foundOnPage.click();
            }
          }
        }
      }
    }
  }

  SaveOneContentEditor(id, docElem: Document) {
    this.Xyyz.debug.FuncStart('SaveOneContentEditor');
    this.Xyyz.debug.Log('SaveOneContentEditor');;
    this.Xyyz.debug.Log('docElem is null: ' + (docElem === null));;

    if (!id) {
      id = this.Xyyz.InjectConst.GuidEmpty;
    }
    if (!docElem) {
      docElem = this.Xyyz.PageData.WinData.Opener.Document;
      this.Xyyz.debug.Log('Assigning docElem: ' + docElem);
    }
    this.Xyyz.debug.Log('docElem is null: ' + (docElem === null));;
    var CeSnapShot: IDataOneCE = this.Xyyz.SnapShotOneContentEditorMan.MakeNewData(id);
    CeSnapShot.AllTreeNodeAr = this.Xyyz.OneTreeMan.GetOneLiveTreeData(CeSnapShot, docElem);

    this.Xyyz.WindowTreeSnapShotMan.DrawDebugDataPretty(null);
    this.Xyyz.WindowTreeSnapShotMan.PutCEDataToCurrentSnapShot(CeSnapShot);

    this.Xyyz.debug.FuncEnd('SaveOneContentEditor');
  }

  SaveOneDesktop() {
    this.Xyyz.debug.FuncStart(this.SaveOneDesktop.name);;
    this.Xyyz.debug.FuncStart('SaveOneDesktop');;
    var livingIframeAr = this.GetAllLiveIframeData(this.Xyyz.PageData.WinData.Opener.Document);
    if (livingIframeAr && livingIframeAr.length > 0) {
      for (var iframeIdx = 0; iframeIdx < livingIframeAr.length; iframeIdx++) {
        this.Xyyz.debug.Log('iframeIdx: ' + iframeIdx);

        var targetIframeObj = livingIframeAr[iframeIdx];
        this.Xyyz.debug.Log('targetIframe: ' + JSON.stringify(targetIframeObj));
        this.SaveOneContentEditor(iframeIdx, targetIframeObj.DocElem);
      }
    }

    this.Xyyz.debug.Log('done gathering tree data');
    this.Xyyz.WindowTreeSnapShotMan.DrawDebugDataPretty(null);
    this.Xyyz.debug.FuncEnd(this.SaveOneDesktop.name);
  }

  SaveAllTrees() {
    this.Xyyz.debug.FuncStart(this.SaveAllTrees.name);

    this.Xyyz.WindowTreeSnapShotMan.CreateNewWindowTreeSnapShot();

    var currentState = this.Xyyz.PageData.CurrentOpenerPageState();
    if (currentState === PageType.ContentEditor) {
      this.Xyyz.debug.Log('is Content Editor');
      this.SaveOneContentEditor(null, null);
    }
    else if (currentState === PageType.Desktop) {
      this.Xyyz.debug.Log('is Desktop');
      this.SaveOneDesktop();
    } else {
      this.Xyyz.debug.Error(this.SaveAllTrees.name, 'Invalid page location ' + currentState);
    }
    this.Xyyz.debug.FuncEnd(this.SaveAllTrees.name);;
  }
};
import { SnapShotFlavor } from "../../../../Shared/scripts/Enums/SnapShotFlavor";
import { IHindSiteScUiProxy } from "../../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateOfContentEditor } from "../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentEditor";
import { IStateOfDesktop } from "../../../../Shared/scripts/Interfaces/Data/States/IStateOfDesktop";
import { IStateOfDTFrame } from "../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTFrame";
import { IStateOfScContentTreeNodeDeep } from "../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNode";
import { IStateOfScUiProxy } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { _HindeCoreBase } from "../../../../Shared/scripts/LoggableBase";
import { IStateOfContentTree } from "../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree";
import { IStateOfScWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IStateOfScWindow";

export class RecipeAutoSaveState extends _HindeCoreBase {
  private ScUiProxy: IHindSiteScUiProxy;
  private AtticAgent: IContentAtticAgent;

  constructor(hindeCore: IHindeCore, scUiProxy: IHindSiteScUiProxy, atticAgent: IContentAtticAgent) {
    super(hindeCore);
    this.ScUiProxy = scUiProxy;
    this.AtticAgent = atticAgent;
  }

  async ExecuteAsync(windowStatePrior: IStateOfScUiProxy): Promise<IStateOfScUiProxy> {
    return new Promise(async (resolve, reject) => {
      this.ScUiProxy.GetStateOfScUiProxyWindow(SnapShotFlavor.Autosave)
        .then((windowStateNew: IStateOfScUiProxy) => {
          if (!this.AreStateOfSitecoreWindowsEqual(windowStateNew, windowStatePrior)) {
            this.Logger.Log('states are different, save snap shot');

            this.AtticAgent.WriteStateOfSitecoreToStorage(windowStateNew);
          } else {
            this.Logger.Log('states are same, no save');
          }
          resolve(windowStateNew);
        })
        .catch((err) => reject(err));
    });
  }

  AreStateOfContentTreeNodesEqual(stateOfScContentTreeNodeA: IStateOfScContentTreeNodeDeep, stateOfContentTreeNodeB: IStateOfScContentTreeNodeDeep): boolean {
    let toReturn: boolean = true;
    toReturn = toReturn && (((stateOfScContentTreeNodeA === null) === (stateOfContentTreeNodeB === null)));
    if (stateOfScContentTreeNodeA !== null) {
      toReturn = toReturn && (stateOfScContentTreeNodeA.ItemId.Raw === stateOfContentTreeNodeB.ItemId.Raw);
      toReturn = toReturn && (stateOfScContentTreeNodeA.IsActive === stateOfContentTreeNodeB.IsActive);
      toReturn = toReturn && (stateOfScContentTreeNodeA.IsExpanded === stateOfContentTreeNodeB.IsExpanded);
    }
    this.Logger.LogVal(this.AreStateOfContentTreeNodesEqual.name, toReturn);
    return toReturn;
  }

  AreStatesOfTreeEqual(StateOfContentTreeProxyA: IStateOfContentTree, StateOfContentTreeProxyB: IStateOfContentTree): boolean {
    let toReturn: boolean = true;

    toReturn = toReturn && (((StateOfContentTreeProxyA === null) === (StateOfContentTreeProxyB === null)));

    if (StateOfContentTreeProxyA) {
      toReturn = toReturn && (StateOfContentTreeProxyA.ActiveNodeFlat === StateOfContentTreeProxyB.ActiveNodeFlat);

      //todo - put back
      //for (var idx = 0; idx < stateOfTreeA.StateOfTreeNodes.length; idx++) {
      //  toReturn = toReturn && this.AreStateOfContentTreeNodesEqual(stateOfTreeA.StateOfTreeNodes[idx], stateOfTreeB.StateOfTreeNodes[idx]);
      //}
    }

    this.Logger.LogVal(this.AreStatesOfTreeEqual.name, toReturn);
    return toReturn;
  }

  AreStatesOfContentEditorEqual(stateOfContentEditorA: IStateOfContentEditor, stateOfContentEditorB: IStateOfContentEditor): boolean {
    let toReturn: boolean = true;

    toReturn = toReturn && (((stateOfContentEditorA === null) === (stateOfContentEditorB === null)));

    if (stateOfContentEditorA) {
      toReturn = toReturn && this.AreStatesOfTreeEqual(stateOfContentEditorA.StateOfContentTree, stateOfContentEditorB.StateOfContentTree);
    }

    this.Logger.LogVal(this.AreStatesOfContentEditorEqual.name, toReturn);

    return toReturn;
  }

  AreStatesOfFrameEqual(stateOfFrameA: IStateOfDTFrame, stateOfFrameB: IStateOfDTFrame): boolean {
    let toReturn: boolean = true;

    toReturn = toReturn && (((stateOfFrameA === null) === (stateOfFrameB === null)));

    if (stateOfFrameA) {
      toReturn = toReturn && (stateOfFrameA.ZIndex === stateOfFrameB.ZIndex);
      toReturn = toReturn && this.AreStatesOfContentEditorEqual(stateOfFrameA.StateOfContentEditor, stateOfFrameB.StateOfContentEditor)
    }
    this.Logger.LogVal(this.AreStatesOfFrameEqual.name, toReturn);
    return toReturn;
  }

  AreStateOfSitecoreWindowsEqual(stateOfSitecoreWindowA: IStateOfScUiProxy, stateOfSitecoreWindowB: IStateOfScUiProxy): boolean {
    this.Logger.FuncStart(this.AreDataSitecoreWindowStatesEqual.name);

    let toReturn: boolean = true;

    toReturn = toReturn && (((stateOfSitecoreWindowA === null) === (stateOfSitecoreWindowB === null)));

    toReturn = toReturn && this.AreDataSitecoreWindowStatesEqual(stateOfSitecoreWindowA.StateOfScWindow, stateOfSitecoreWindowB.StateOfScWindow);

    this.Logger.LogVal(this.AreStateOfSitecoreWindowsEqual.name, toReturn);
    this.Logger.FuncEnd(this.AreDataSitecoreWindowStatesEqual.name);
    return toReturn;
  }

  AreDataSitecoreWindowStatesEqual(stateOfSitecoreWindowA: IStateOfScWindow, stateOfSitecoreWindowB: IStateOfScWindow): boolean {
    let toReturn: boolean = true;

    toReturn = toReturn && (((stateOfSitecoreWindowA === null) === (stateOfSitecoreWindowB === null)));

    if (stateOfSitecoreWindowA !== null) {
      toReturn = toReturn && this.AreStateOfDesktopTheSame(stateOfSitecoreWindowA.StateOfDesktop, stateOfSitecoreWindowB.StateOfDesktop);
      toReturn = toReturn && this.AreStatesOfContentEditorEqual(stateOfSitecoreWindowA.StateOfContentEditor, stateOfSitecoreWindowB.StateOfContentEditor);
    }

    this.Logger.LogVal(this.AreDataSitecoreWindowStatesEqual.name, toReturn);
    return toReturn;
  }

  AreStateOfDesktopTheSame(stateOfDesktopA: IStateOfDesktop, stateOfDesktopB: IStateOfDesktop): boolean {
    let toReturn: boolean = true;

    //todo - this is a crude comparison and will not cover cases of different order
    toReturn = stateOfDesktopA.StateOfDTArea.ActiveDTFrameIndex === stateOfDesktopB.StateOfDTArea.ActiveDTFrameIndex

    toReturn = toReturn && (stateOfDesktopA.StateOfDTArea.StateOfDTFrames.length === stateOfDesktopB.StateOfDTArea.StateOfDTFrames.length);

    if (toReturn && stateOfDesktopA.StateOfDTArea.StateOfDTFrames.length > 0) {
      for (var idx = 0; idx < length; idx++) {
        toReturn = toReturn && this.AreStatesOfFrameEqual(stateOfDesktopA.StateOfDTArea.StateOfDTFrames[idx], stateOfDesktopB.StateOfDTArea.StateOfDTFrames[idx]);
      }
    }

    return toReturn;
  }
}
import { SnapShotFlavor } from "../../../../Shared/scripts/Enums/SnapShotFlavor";
import { IHindSiteScUiProxy } from "../../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IStateOfContentEditorProxy } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfContentEditor";
import { IDataStateOfDesktopProxy } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDesktop";
import { IStateOfDTFrameProxy } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDTFrame";
import { IStateOfScContentTreeNodeProxy } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfScContentTreeNode";
import { IStateOfScUiProxy } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IStateOfContentEditorTreeProxy } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfTree";
import { IStateOfScWindowProxy } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStates";
import { LoggableBase } from "../../../../Shared/scripts/LoggableBase";

export class RecipeAutoSaveState extends LoggableBase {
  private ScUiProxy: IHindSiteScUiProxy;
  private AtticAgent: IContentAtticAgent;

  constructor(logger: ILoggerAgent, scUiProxy: IHindSiteScUiProxy, atticAgent: IContentAtticAgent) {
    super(logger);
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

  AreStateOfContentTreeNodesEqual(stateOfTreeNodeA: IStateOfScContentTreeNodeProxy, stateOfTreeNodeB: IStateOfScContentTreeNodeProxy): boolean {
    let toReturn: boolean = true;
    toReturn = toReturn && (((stateOfTreeNodeA === null) === (stateOfTreeNodeB === null)));
    if (stateOfTreeNodeA !== null) {
      toReturn = toReturn && (stateOfTreeNodeA.ItemId.Raw === stateOfTreeNodeB.ItemId.Raw);
      toReturn = toReturn && (stateOfTreeNodeA.IsActive === stateOfTreeNodeB.IsActive);
      toReturn = toReturn && (stateOfTreeNodeA.IsExpanded === stateOfTreeNodeB.IsExpanded);
    }
    this.Logger.LogVal(this.AreStateOfContentTreeNodesEqual.name, toReturn);
    return toReturn;
  }

  AreStatesOfTreeEqual(stateOfTreeA: IStateOfContentEditorTreeProxy, stateOfTreeB: IStateOfContentEditorTreeProxy): boolean {
    let toReturn: boolean = true;

    toReturn = toReturn && (((stateOfTreeA === null) === (stateOfTreeB === null)));

    if (stateOfTreeA) {
      toReturn = toReturn && (stateOfTreeA.ActiveNodeCoord.SiblingIndex === stateOfTreeB.ActiveNodeCoord.SiblingIndex);

      //todo - put back
      //for (var idx = 0; idx < stateOfTreeA.StateOfTreeNodes.length; idx++) {
      //  toReturn = toReturn && this.AreStateOfContentTreeNodesEqual(stateOfTreeA.StateOfTreeNodes[idx], stateOfTreeB.StateOfTreeNodes[idx]);
      //}
    }

    this.Logger.LogVal(this.AreStatesOfTreeEqual.name, toReturn);
    return toReturn;
  }

  AreStatesOfContentEditorEqual(stateOfContentEditorA: IStateOfContentEditorProxy, stateOfContentEditorB: IStateOfContentEditorProxy): boolean {
    let toReturn: boolean = true;

    toReturn = toReturn && (((stateOfContentEditorA === null) === (stateOfContentEditorB === null)));

    if (stateOfContentEditorA) {
      toReturn = toReturn && this.AreStatesOfTreeEqual(stateOfContentEditorA.StateOfContentEditorTreeProxy, stateOfContentEditorB.StateOfContentEditorTreeProxy);
    }

    this.Logger.LogVal(this.AreStatesOfContentEditorEqual.name, toReturn);

    return toReturn;
  }

  AreStatesOfFrameEqual(stateOfFrameA: IStateOfDTFrameProxy, stateOfFrameB: IStateOfDTFrameProxy): boolean {
    let toReturn: boolean = true;

    toReturn = toReturn && (((stateOfFrameA === null) === (stateOfFrameB === null)));

    if (stateOfFrameA) {
      toReturn = toReturn && (stateOfFrameA.ZIndex === stateOfFrameB.ZIndex);
      toReturn = toReturn && this.AreStatesOfContentEditorEqual(stateOfFrameA.StateOfContentEditorProxy, stateOfFrameB.StateOfContentEditorProxy)
    }
    this.Logger.LogVal(this.AreStatesOfFrameEqual.name, toReturn);
    return toReturn;
  }

  AreStateOfSitecoreWindowsEqual(stateOfSitecoreWindowA: IStateOfScUiProxy, stateOfSitecoreWindowB: IStateOfScUiProxy): boolean {
    this.Logger.FuncStart(this.AreDataSitecoreWindowStatesEqual.name);

    let toReturn: boolean = true;

    toReturn = toReturn && (((stateOfSitecoreWindowA === null) === (stateOfSitecoreWindowB === null)));

    toReturn = toReturn && this.AreDataSitecoreWindowStatesEqual(stateOfSitecoreWindowA.StateOfScWindowProxy, stateOfSitecoreWindowB.StateOfScWindowProxy);

    this.Logger.LogVal(this.AreStateOfSitecoreWindowsEqual.name, toReturn);
    this.Logger.FuncEnd(this.AreDataSitecoreWindowStatesEqual.name);
    return toReturn;
  }

  AreDataSitecoreWindowStatesEqual(stateOfSitecoreWindowA: IStateOfScWindowProxy, stateOfSitecoreWindowB: IStateOfScWindowProxy): boolean {
    let toReturn: boolean = true;

    toReturn = toReturn && (((stateOfSitecoreWindowA === null) === (stateOfSitecoreWindowB === null)));

    if (stateOfSitecoreWindowA !== null) {
      toReturn = toReturn && this.AreStateOfDesktopTheSame(stateOfSitecoreWindowA.StateOfDesktopProxy, stateOfSitecoreWindowB.StateOfDesktopProxy);
      toReturn = toReturn && this.AreStatesOfContentEditorEqual(stateOfSitecoreWindowA.StateOfContentEditor, stateOfSitecoreWindowB.StateOfContentEditor);
    }

    this.Logger.LogVal(this.AreDataSitecoreWindowStatesEqual.name, toReturn);
    return toReturn;
  }

  AreStateOfDesktopTheSame(stateOfDesktopA: IDataStateOfDesktopProxy, stateOfDesktopB: IDataStateOfDesktopProxy): boolean {
    let toReturn: boolean = true;

    //todo - this is a crude comparison and will not cover cases of different order
    toReturn = stateOfDesktopA.StateOfDTAreaProxy.IndexOfActiveDTFrameProxy === stateOfDesktopB.StateOfDTAreaProxy.IndexOfActiveDTFrameProxy

    toReturn = toReturn && (stateOfDesktopA.StateOfDTAreaProxy.StateOfDTFrameProxies.length === stateOfDesktopB.StateOfDTAreaProxy.StateOfDTFrameProxies.length);

    if (toReturn && stateOfDesktopA.StateOfDTAreaProxy.StateOfDTFrameProxies.length > 0) {
      for (var idx = 0; idx < length; idx++) {
        toReturn = toReturn && this.AreStatesOfFrameEqual(stateOfDesktopA.StateOfDTAreaProxy.StateOfDTFrameProxies[idx], stateOfDesktopB.StateOfDTAreaProxy.StateOfDTFrameProxies[idx]);
      }
    }

    return toReturn;
  }
}
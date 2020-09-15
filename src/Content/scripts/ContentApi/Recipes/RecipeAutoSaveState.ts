import { __RecipeBase } from "./__RecipeBase/__RecipeBase";
import { ICommandRecipes } from "../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { ICommandHndlrDataForContent } from "../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfDesktop } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDesktop";
import { IDataStateOfFrame } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfFrame";
import { IDataStateOfContentEditor } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfContentEditor";
import { IDataStateOfTree } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfTree";
import { IDataStateOfScContentTreeNode } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfScContentTreeNode";
import { IDataSitecoreWindowStates } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStates";
import { LoggableBase } from "../../Managers/LoggableBase";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ScWindowManager } from "../../Managers/ScWindowManager/ScWindowManager";
import { IContentAtticAgent } from "../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IScWindowManager } from "../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { SnapShotFlavor } from "../../../../Shared/scripts/Enums/SnapShotFlavor";

export class RecipeAutoSaveState extends LoggableBase {
  private ScWinMan: IScWindowManager;
  private AtticAgent: IContentAtticAgent;

  constructor(logger: ILoggerAgent, scWinMan: IScWindowManager, atticAgent: IContentAtticAgent) {
    super(logger);
    this.ScWinMan = scWinMan;
    this.AtticAgent = atticAgent;
  }

  async ExecuteAsync(windowStatePrior: IDataStateOfSitecoreWindow): Promise<IDataStateOfSitecoreWindow> {
    return new Promise(async (resolve, reject) => {
      this.ScWinMan.GetStateOfSitecoreWindow()
        .then((windowStateNew: IDataStateOfSitecoreWindow) => {
          windowStateNew.Meta.Flavor = SnapShotFlavor.Autosave;
          windowStateNew.Friendly.Flavor = SnapShotFlavor[windowStateNew.Meta.Flavor];
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

  AreStateOfContentTreeNodesEqual(stateOfTreeNodeA: IDataStateOfScContentTreeNode, stateOfTreeNodeB: IDataStateOfScContentTreeNode): boolean {
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

  AreStatesOfTreeEqual(stateOfTreeA: IDataStateOfTree, stateOfTreeB: IDataStateOfTree): boolean {
    let toReturn: boolean = true;

    toReturn = toReturn && (((stateOfTreeA === null) === (stateOfTreeB === null)));

    if (stateOfTreeA ) {
      toReturn = toReturn && (stateOfTreeA.ActiveTreeNodeIndex === stateOfTreeB.ActiveTreeNodeIndex);

      for (var idx = 0; idx < stateOfTreeA.StateOfTreeNodes.length; idx++) {
        toReturn = toReturn && this.AreStateOfContentTreeNodesEqual(stateOfTreeA.StateOfTreeNodes[idx], stateOfTreeB.StateOfTreeNodes[idx]);
      }
    }

    this.Logger.LogVal(this.AreStatesOfTreeEqual.name, toReturn);
    return toReturn;
  }

  AreStatesOfContentEditorEqual(stateOfContentEditorA: IDataStateOfContentEditor, stateOfContentEditorB: IDataStateOfContentEditor): boolean {
    let toReturn: boolean = true;

    toReturn = toReturn && (((stateOfContentEditorA === null) === (stateOfContentEditorB === null)));

    if (stateOfContentEditorA) {
      toReturn = toReturn && this.AreStatesOfTreeEqual(stateOfContentEditorA.StateOfTree, stateOfContentEditorB.StateOfTree);
    }

    this.Logger.LogVal(this.AreStatesOfContentEditorEqual.name, toReturn);

    return toReturn;
  }

  AreStatesOfFrameEqual(stateOfFrameA: IDataStateOfFrame, stateOfFrameB: IDataStateOfFrame): boolean {
    let toReturn: boolean = true;

    toReturn = toReturn && (((stateOfFrameA === null) === (stateOfFrameB === null)));

    if (stateOfFrameA) {
      toReturn = toReturn && (stateOfFrameA.ZIndex === stateOfFrameB.ZIndex);
      toReturn = toReturn && this.AreStatesOfContentEditorEqual(stateOfFrameA.StateOfContentEditor, stateOfFrameB.StateOfContentEditor)
    }
    this.Logger.LogVal(this.AreStatesOfFrameEqual.name, toReturn);
    return toReturn;
  }

  AreStateOfSitecoreWindowsEqual(stateOfSitecoreWindowA: IDataStateOfSitecoreWindow, stateOfSitecoreWindowB: IDataStateOfSitecoreWindow): boolean {
    this.Logger.FuncStart(this.AreDataSitecoreWindowStatesEqual.name);

    let toReturn: boolean = true;

    toReturn = toReturn && (((stateOfSitecoreWindowA === null) === (stateOfSitecoreWindowB === null)));

    toReturn = toReturn && this.AreDataSitecoreWindowStatesEqual(stateOfSitecoreWindowA.States, stateOfSitecoreWindowB.States);

    this.Logger.LogVal(this.AreStateOfSitecoreWindowsEqual.name, toReturn);
    this.Logger.FuncEnd(this.AreDataSitecoreWindowStatesEqual.name);
    return toReturn;
  }

  AreDataSitecoreWindowStatesEqual(stateOfSitecoreWindowA: IDataSitecoreWindowStates, stateOfSitecoreWindowB: IDataSitecoreWindowStates): boolean {
    let toReturn: boolean = true;

    toReturn = toReturn && (((stateOfSitecoreWindowA === null) === (stateOfSitecoreWindowB === null)));

    if (stateOfSitecoreWindowA !== null) {
      toReturn = toReturn && this.AreStateOfDesktopTheSame(stateOfSitecoreWindowA.StateOfDesktop, stateOfSitecoreWindowB.StateOfDesktop);
      toReturn = toReturn && this.AreStatesOfContentEditorEqual(stateOfSitecoreWindowA.StateOfContentEditor, stateOfSitecoreWindowB.StateOfContentEditor);
    }

    this.Logger.LogVal(this.AreDataSitecoreWindowStatesEqual.name, toReturn);
    return toReturn;
  }

  AreStateOfDesktopTheSame(stateOfDesktopA: IDataStateOfDesktop, stateOfDesktopB: IDataStateOfDesktop): boolean {
    let toReturn: boolean = true;

    //todo - this is a crude comparison and will not cover cases of different order
    toReturn = stateOfDesktopA.IndexOfActiveFrame === stateOfDesktopB.IndexOfActiveFrame

    toReturn = toReturn && (stateOfDesktopA.StateOfFrames.length === stateOfDesktopB.StateOfFrames.length);

    if (toReturn && stateOfDesktopA.StateOfFrames.length > 0) {
      for (var idx = 0; idx < length; idx++) {
        toReturn = toReturn && this.AreStatesOfFrameEqual(stateOfDesktopA.StateOfFrames[idx], stateOfDesktopB.StateOfFrames[idx]);
      }
    }

    return toReturn;
  }
}
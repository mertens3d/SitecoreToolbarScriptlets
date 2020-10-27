import { ScProxyDisciminator } from "../../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IJacketOfType } from "../../../../../../../Shared/scripts/IJacketOfType";
import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../../../../Shared/scripts/Interfaces/InjectConst";
import { IScElemProxy } from "../../../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullElemProxy";
import { IScContentTreeNodeCoord } from "../../../../../../../Shared/scripts/Interfaces/StateOf/IScContentTreeNodeCoord";
import { IStateOfScContentTreeNodeDeep } from "../../../../../../../Shared/scripts/Interfaces/StateOf/IStateOfScContentTreeNode";
import { _BaseElemProxy } from "../../../../Desktop/DesktopProxy/FrameProxies/_BaseElemProxy";
import { IConResolver } from "./IConResolver";
import { ScContentTreeNodeGetState } from "./ScContentTreeNodeGetState";
import { TreeNodeProperties } from "./TreeNodeProperties";
import { TreeNodeProxyCandidate } from "./TreeNodeProxyCandidate";

//scContentTreeNode is the name sitecore uses
export class ScContentTreeNodeProxy extends _BaseElemProxy<IStateOfScContentTreeNodeDeep> implements IScElemProxy {
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.ContentTreeNode;
  readonly ScProxyDisciminatorFriendly: string = ScProxyDisciminator[ScProxyDisciminator.ContentTreeNode];
  public TreeNodeProperties: TreeNodeProperties;

  constructor(apiCore: IAPICore, candidateTreeNode: TreeNodeProxyCandidate, sourceElemJacket: IJacketOfType, parent: ScContentTreeNodeProxy, conResolver: IConResolver) {
    super(apiCore, sourceElemJacket);

    this.Logger.CTORStart(ScContentTreeNodeProxy.name);

    this.TreeNodeProperties = new TreeNodeProperties(apiCore, candidateTreeNode, sourceElemJacket, this,  conResolver, parent)
    this.Logger.CTOREnd(ScContentTreeNodeProxy.name);
  }

  async InstantiateAwaitElementsSelf(): Promise<void> {
    this.Logger.FuncStart([ScContentTreeNodeProxy.name, this.InstantiateAwaitElementsSelf.name], this.TreeNodeProperties.Friendly());
    await this.TreeNodeProperties.InstantiateAwaitElementsSelf()
      .then(() => this.TreeNodeProperties.Children.forEach((treeNodeProxy: IScElemProxy) => this.HostedProxies.push(treeNodeProxy)))
      .catch((err: any) => {
        Promise.reject(this.ErrorHand.FormatRejectMessage([ScContentTreeNodeProxy.name, this.InstantiateAwaitElementsSelf.name], err));
      });
    this.Logger.FuncEnd([ScContentTreeNodeProxy.name, this.InstantiateAwaitElementsSelf.name], this.TreeNodeProperties.Friendly() + ' ' + this.HostedProxies.length);
  }

  async GetStateOfSelf(): Promise<IStateOfScContentTreeNodeDeep> {
    return new Promise(async (resolve, reject) => {
      let contentTreeNodeProxyGetState: ScContentTreeNodeGetState = new ScContentTreeNodeGetState(this.ApiCore, this.TreeNodeProperties);

      await contentTreeNodeProxyGetState.GetStateOfScContentTreeNodeGeneric(true)
        .then((stateOfScContentTreeNodeDeep: IStateOfScContentTreeNodeDeep) => resolve(stateOfScContentTreeNodeDeep))
        .catch((err: any) => reject(this.GetStateOfSelf.name + ' | ' + err));
    });
  }

  //async GetStateOfScContentTreeNodeFlat(): Promise<IStateOfScContentTreeNodeShallow> {
  //  return new Promise(async (resolve, reject) => {
  //    this.Logger.FuncStart(this.GetStateOfScContentTreeNodeFlat.name);

  //    await this.GetStateOfScContentTreeNodeGeneric(false)
  //      .then((stateOfContentTreeNodeShallow: IStateOfScContentTreeNodeShallow) => resolve(stateOfContentTreeNodeShallow))
  //      .catch((err: any) => reject(this.GetStateOfScContentTreeNodeDeep.name + ' | ' + err));

  //    this.Logger.FuncEnd(this.GetStateOfScContentTreeNodeFlat.name);
  //  });
  //}

  async SetStateOfTreeNode(newData: IStateOfScContentTreeNodeDeep, depth: number): Promise<void> {
    try {
      if (newData.IsExpanded) {
        await this.ExpandNode();
      }

      if (newData.IsActive) {
        await this.ActivateNode();
      }
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.SetStateOfTreeNode.name, err);
    }
  }
  private async ActivateNode(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ActivateNode.name);

      this.Logger.Log('activating node: ' + this.TreeNodeProperties.Friendly());

      await this.TreeNodeProperties.CandidateTreeNode.LinkNodeElem.WaitForElemToHaveClassOrReject(
        [ContentConst.Const.ClassNames.SC.scContentTreeNodeActive, ContentConst.Const.ClassNames.SC.scContentTreeNodeNormal],
        this.TreeNodeProperties.Friendly())
      this.TreeNodeProperties.CandidateTreeNode.LinkNodeElem.NativeElement.click();

      await this.TreeNodeProperties.CandidateTreeNode.LinkNodeElem.WaitForElemToHaveClassOrReject([ContentConst.Const.ClassNames.SC.scContentTreeNodeActive],
        this.TreeNodeProperties.Friendly())
        .then(() => resolve())
        .catch((err: any) => reject(this.ActivateNode.name + ' | ' + err));

      this.Logger.FuncEnd(this.ActivateNode.name);
    });
  }

  async ExpandNode(): Promise<void> {
    try {
      if (!this.TreeNodeProperties.IsExpanded) {
        this.TreeNodeProperties.CandidateTreeNode.glyphElem.NativeElement.click();
      }
    }
    catch (err: any) {
      this.ErrorHand.HandleFatalError(this.ExpandNode.name, err);
    }
  }
}
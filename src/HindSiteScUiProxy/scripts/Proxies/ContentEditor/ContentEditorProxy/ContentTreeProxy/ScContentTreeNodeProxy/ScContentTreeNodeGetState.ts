import { ElementImgJacket } from "../../../../../../../DOMJacket/scripts/Elements/ElementImgJacket";
import { DefaultStateOfScContentTreeNode } from "../../../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfScContentTreeNode";
import { Guid } from "../../../../../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../../../../../Shared/scripts/Helpers/GuidData";
import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../../../../Shared/scripts/Interfaces/InjectConst";
import { IStateOfScContentTreeNodeDeep } from "../../../../../../../Shared/scripts/Interfaces/StateOf/IStateOfScContentTreeNode";
import { _APICoreBase } from "../../../../../../../Shared/scripts/_APICoreBase";
import { TreeNodeProperties } from "./TreeNodeProperties";

export class ScContentTreeNodeGetState extends _APICoreBase {
  private TreeNodeProperties: TreeNodeProperties;
  private StateOfScContentTreeNode: IStateOfScContentTreeNodeDeep;

  constructor(apiCore: IAPICore, treeNodeProperties: TreeNodeProperties) {
    super(apiCore);
    this.TreeNodeProperties = treeNodeProperties;
  }

  public async GetStateOfScContentTreeNodeGeneric(includeChildren: boolean): Promise<IStateOfScContentTreeNodeDeep> {
    return new Promise(async (resolve, reject) => {
      //let stateOfChildrenAr: Promise<IStateOfScContentTreeNodeDeep>[] = [];

      this.StateOfScContentTreeNode = new DefaultStateOfScContentTreeNode();

      if (this.TreeNodeProperties) {
        //private StateOfScContentTreeNode: IStateOfScContentTreeNodeDeep = new DefaultStateOfScContentTreeNode();

        this.StateOfScContentTreeNode.Coord.LevelWidth = this.TreeNodeProperties.CandidateTreeNode.Coord.LevelWidth;
        this.StateOfScContentTreeNode.Coord.SiblingIndex = this.TreeNodeProperties.CandidateTreeNode.Coord.SiblingIndex;
        this.StateOfScContentTreeNode.Coord.LevelIndex = this.TreeNodeProperties.CandidateTreeNode.Coord.LevelIndex;

        await this.HarvestNodeState()
          .catch((err: any) => this.ErrorHand.HandleFatalError(this.GetStateOfScContentTreeNodeGeneric.name, err));
      }

      //if (includeChildren) {
      //  this.HostedProxies.forEach((child: ScContentTreeNodeProxy) => stateOfChildrenAr.push(child.GetStateOfScContentTreeNodeDeep()));
      //}
      ////await Promise.all(stateOfChildrenAr)
      ////  .then((result: IStateOfScContentTreeNodeDeep[]) => {
      ////    this.StateOfScContentTreeNode.Children = [];
      ////    result.forEach((stateoOfScContentTreeNodeChild: IStateOfScContentTreeNodeDeep) => {
      //      if (stateoOfScContentTreeNodeChild.IsActive || stateoOfScContentTreeNodeChild.IsExpanded) {
      //        this.StateOfScContentTreeNode.Children.push(stateoOfScContentTreeNodeChild);
      //      }
      //    })
      //  })
      //  .then(() => ))
      //  .catch ((err: any) => reject(this.GetStateOfScContentTreeNodeGeneric.name + ' | ' + err));

      resolve(this.StateOfScContentTreeNode);
    });
  }


  private GetOwnProperties(): void {
    this.Logger.FuncStart([ScContentTreeNodeGetState.name, this.GetOwnProperties.name]);
    this.ErrorHand.ThrowIfNullOrUndefined(this.GetOwnProperties.name, [this.TreeNodeProperties.CandidateTreeNode.LinkNodeElem, this.TreeNodeProperties.CandidateTreeNode.glyphElem]);

    this.StateOfScContentTreeNode.IsActive = this.TreeNodeProperties.IsActive;
    this.StateOfScContentTreeNode.IsExpanded = this.TreeNodeProperties.IsExpanded;
    this.StateOfScContentTreeNode.Friendly = this.TreeNodeProperties.CandidateTreeNode.LinkNodeElem.NativeElement.innerText;
    this.StateOfScContentTreeNode.ItemId = this.GetApparentItemId(this.TreeNodeProperties.CandidateTreeNode.glyphElem);
    this.StateOfScContentTreeNode.IconSrc = this.TreeNodeProperties.GetIconSrc();

    this.Logger.FuncEnd([ScContentTreeNodeGetState.name, this.GetOwnProperties.name]);
  }

  private GetApparentItemId(htmlImageElement: ElementImgJacket): GuidData {
    let glyphNodeIdSuffix = htmlImageElement.NativeElement.id.replace(ContentConst.Const.Names.SC.TreeGlyphPrefix, '');
    let toReturnGuidData: GuidData = Guid.ParseGuid(glyphNodeIdSuffix, true);
    return toReturnGuidData;
  }

  private async HarvestNodeState(forceRefreshData: boolean = false): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.GetOwnProperties();
      resolve();
    });
  }
}
import { PromisesBasic } from '../../../Shared/scripts/Classes/PromiseGeneric';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { IDataPublishChain } from '../../../Shared/scripts/Interfaces/IDataPublishChain';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { ContentHub } from '../Managers/ContentHub/ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';

export class PromiseOneStep extends ContentManagerBase {
  constructor(hub: ContentHub, AllAgents: IAllAgents) {
    super(hub, AllAgents);
    this.AllAgents.Logger.FuncStart(PromisesBasic.name);
    this.AllAgents.Logger.FuncEnd(PromisesBasic.name);
  }





}
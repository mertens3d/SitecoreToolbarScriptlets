import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IBaseScProxy } from "../../../../Shared/scripts/Interfaces/ScProxies/IBaseScProxy";
import { IStateOf_ } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";

export abstract class _BaseScProxy extends _APICoreBase implements IBaseScProxy {
  abstract readonly ScProxyDisciminator: ScProxyDisciminator;
  abstract readonly ScProxyDisciminatorFriendly: string;
  readonly HostedProxies: IBaseScProxy[] = [];
  StateHasBeenSet: boolean = false;

  //protected readonly DocumentJacket: DocumentJacket;
  //readonly ContainerJacket: GenericElemJacket;
  WireEventsSelf(): void {
    //empty by default
  }

  async InstantiateAsyncMembersSelf(): Promise<void> {
    //empty by default
  }

  constructor(apiCore: IAPICore) {
    super(apiCore);

    //if (container instanceof DocumentJacket) {
    //  this.DocumentJacket = <DocumentJacket>container;
    //} else if (container instanceof GenericElemJacket) {
    //  this.ContainerJacket = <GenericElemJacket>container;
    //}
  }

  TriggerEventsForInboundSelf(): void {
    this.TriggerEventsForInboundSelf();
  }

  protected TriggerInboundEventsAsyncOnHosted() {
    if (this.HostedProxies) {
      this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => hostedProxy.TriggerEventsForInboundSelf());
    }
  }

  GetHostedByDisciminator(needleScProxyDiscriminator: ScProxyDisciminator): IBaseScProxy {
    let toReturn: IBaseScProxy = null;
    if (this.HostedProxies) {
      this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => { if (hostedProxy.ScProxyDisciminator === needleScProxyDiscriminator) { toReturn = hostedProxy } });
    }
    return toReturn;
  }

  async OnFocus(): Promise<any> {
    // empty by default
  }

  protected async GetStateOfHosted(): Promise<IStateOf_[]> {
    return new Promise(async (resolve, reject) => {
      let promAr: Promise<IStateOf_>[] = [];

      if (this.HostedProxies) {
        this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => promAr.push(hostedProxy.GetStateOfSelf()));
        //await this.HostedStateFullProxy.GetState()
        //  .then((statefullProxyState: IStateOf_) => stateOfDTFrame.StateOfHostedProxies.push(statefullProxyState))
        //  .catch((err: any) => reject(this.GetStateOfSelf.name + ' | ' + err));
      }

      await Promise.all(promAr)
        .then((promAllResult: IStateOf_[]) => resolve(promAllResult))
        .catch((err) => reject(this.ErrorHand.FormatRejectMessage([_BaseScProxy.name, this.GetStateOfHosted.name], err)));
    });
  }

  async GetStateOfSelf(): Promise<any> {
  }

  async SetStateSelf(state: any): Promise<any> {
  }

  GetMatchingHostedProxy(needleDiscriminator: ScProxyDisciminator): IBaseScProxy {
    let toReturn: IBaseScProxy = null;

    if (this.HostedProxies) {
      this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => {
        if (hostedProxy.ScProxyDisciminator === needleDiscriminator
          &&
          !hostedProxy.StateHasBeenSet) {
          toReturn = hostedProxy;
        }
      })
    }

    return toReturn;
  }

  async SetStateOfHosted(states: IStateOf_[]): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!states) { states = [] };

      let promAr: Promise<any>[] = [];

      states.forEach((stateOf: IStateOf_) => {
        // find matching proxy without state restored
        let foundMatch: IBaseScProxy = this.GetMatchingHostedProxy(stateOf.Disciminator);
        if (foundMatch) {
          foundMatch.StateHasBeenSet = true;
          promAr.push(foundMatch.SetStateSelf(stateOf));
        }
      });

      await Promise.all(promAr)
        .then((promArResults: any[]) => resolve(promArResults))
        .catch((err) => reject(this.ErrorHand.FormatRejectMessage([_BaseScProxy.name, this.SetStateOfHosted.name, this.ScProxyDisciminatorFriendly], err)));
    });
  }

  TriggerEventsForInboundHosted() {
    if (this.HostedProxies) {
      this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => hostedProxy.TriggerEventsForInboundSelf ());
    }
  }
  //empty by default;

  //return new Promise((resolve, reject) => {
  //  if (this.HostedProxies) {
  //    let promAr: Promise<any>[] = [];

  //    this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => {
  //      promAr.push(hostedProxy.SetStateSelf())
  //    })

  //  }

  //})

  protected async InstantiateAsyncMembersOnHostedProxies(): Promise<void> {
    if (this.HostedProxies) {
      let promAr: Promise<void>[] = [];

      this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => promAr.push(hostedProxy.InstantiateAsyncMembersSelf()));

      await Promise.all(promAr)
        .catch((err) => this.ErrorHand.HandleFatalError(this.ScProxyDisciminatorFriendly, err));
    }
  }

  protected WireEventsOnHostedProxies() {
    this.Logger.FuncStart([_BaseScProxy.name, this.WireEventsOnHostedProxies.name], 'On behalf of : ' + this.ScProxyDisciminatorFriendly);
    if (this.HostedProxies) {
      this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => {
        if (hostedProxy) {
          hostedProxy.WireEventsSelf();
        } else {
          this.ErrorHand.WarningAndContinue(this.WireEventsOnHostedProxies.name, 'Null hosted proxy. On behalf of: ' + this.ScProxyDisciminatorFriendly);
        }
      });
    }
    this.Logger.FuncEnd([_BaseScProxy.name, this.WireEventsOnHostedProxies.name], 'On behalf of : ' + this.ScProxyDisciminatorFriendly);
  }
}
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { IterationDrone } from '../../../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';

export class AsyncLock extends _APICoreBase {
  private IsLocked: boolean = false;
  CreatorFriendly: string = '';
  CurrentOwnerFriendly: string = '';

  public ReleaseLock(): void {
    this.Logger.FuncStart(this.ReleaseLock.name, this.CurrentOwnerFriendly);
    this.IsLocked = false;
    this.CurrentOwnerFriendly = '';
    this.Logger.FuncEnd(this.ReleaseLock.name, this.CurrentOwnerFriendly);
  }

  async WaitForLockControl(candidate: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForLockControl.name, this.CurrentOwnerFriendly);

      var iterationJr = new IterationDrone(this.ApiCore, this.WaitForLockControl.name, true, 30);

      let lastResultWasLocked: boolean = true;


      while (lastResultWasLocked  && iterationJr.DecrementAndKeepGoing()) {
        //it seems to need to go through this look at least once
        this.Logger.LogVal('candidate', candidate);
        this.Logger.LogVal('current owner', this.CurrentOwnerFriendly);
        lastResultWasLocked = this.IsLocked;
        await iterationJr.Wait();
      }

      if (! lastResultWasLocked) {
        this.Logger.Log('not locked');
        this.CurrentOwnerFriendly = candidate;
        this.IsLocked = true;
        resolve();
      }
      if (iterationJr.IsExhausted) {
        reject(iterationJr.IsExhaustedMsg);
      }

      this.Logger.FuncEnd(this.WaitForLockControl.name, this.CurrentOwnerFriendly);
    });
  }
}
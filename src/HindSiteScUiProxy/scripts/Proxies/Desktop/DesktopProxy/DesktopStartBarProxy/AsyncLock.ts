import { _HindeCoreBase } from "../../../../../../Shared/scripts/_HindeCoreBase";
import { IterationDrone } from '../../../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';

export class AsyncLock extends _HindeCoreBase {
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

            var iterationJr = new IterationDrone(this.HindeCore, this.WaitForLockControl.name, true, 30);

            while (this.IsLocked && iterationJr.DecrementAndKeepGoing()) {
                this.Logger.LogVal('candidate', candidate);
                this.Logger.LogVal('current owner', this.CurrentOwnerFriendly);
                await iterationJr.Wait();
            }

            if (!this.IsLocked) {
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

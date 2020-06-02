import { IGuid } from "./IGuid";

export interface IGuidHelper {
  ParseGuid(AsString: string): IGuid;
  EmptyGuid(): IGuid;
  NewGuid(): IGuid;
}
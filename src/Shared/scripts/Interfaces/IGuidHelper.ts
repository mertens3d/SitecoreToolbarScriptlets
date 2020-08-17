import { IGuid } from "./IGuid";

export interface IGuidHelper {
  ParseGuid(AsString: string, throwOnError: boolean): IGuid;
  EmptyGuid(): IGuid;
  NewGuid(): IGuid;
}
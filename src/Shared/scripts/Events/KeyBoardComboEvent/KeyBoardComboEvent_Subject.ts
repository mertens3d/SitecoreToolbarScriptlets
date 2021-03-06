﻿import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";
import { HindeSiteEvent_Subject } from "../_HindSiteEvent/HindeSiteEvent_Subject";
import { IKeyBoardComboEvent_Payload } from "./IKeyBoardComboEvent_Payload";

export class KeyBoardComboEvent_Subject extends HindeSiteEvent_Subject<IKeyBoardComboEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.KeyBoardComboEvent_Subject;
  ShowLogActions = true;
}
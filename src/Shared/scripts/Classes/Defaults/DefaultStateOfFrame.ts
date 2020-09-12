﻿import { IDataStateOfFrame } from "../../Interfaces/Data/States/IDataStateOfFrame";
import { DefaultStateOfContentEditor } from "./DefaultStateOfContentEditor";

export class DefaultStateOfFrame implements IDataStateOfFrame {
    ContentEditorState = new DefaultStateOfContentEditor();
}

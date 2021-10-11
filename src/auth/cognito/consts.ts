import { BaseResponse } from "./types";

export const NOT_AUTHENTICATED: BaseResponse<undefined> = { success: false, data: { error: "noUserAuthed" } };

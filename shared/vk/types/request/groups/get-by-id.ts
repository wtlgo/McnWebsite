export type FieldT = "cover";

export interface GroupsGetByIdParams {
    groupIds?: (number | string)[];
    fields?: FieldT[];
}

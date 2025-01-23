export enum ChecklistStatus {
    VALID,
    INVALID,
    INDETERMINATE,
}

export interface ChecklistValue {
    status: ChecklistStatus;
    title: string;
}

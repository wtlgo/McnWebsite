import type { TPayload } from "../types/payload";

type User = TPayload | null;
const isMember = (user: User) => !!user?.isMember;
const notMember = (user: User) => !!user && !user.isMember;
const isAdmin = (user: User) => isMember(user) && !!user?.isAdmin;

export const accessCabinet = defineAbility(isMember);
export const accessAdminPanel = defineAbility(isAdmin);
export const accessRuleBook = defineAbility(notMember);
export const accessEnrtyForm = defineAbility(notMember);

export const canChangePassword = defineAbility(isMember);
export const canChangeSkin = defineAbility(isMember);
export const canViewPlayerList = defineAbility(isMember);
export const canPopularityVote = defineAbility(isMember);
export const canViewProfiles = defineAbility(isMember);
export const canFetchMojangSkin = defineAbility(isMember);
export const canFetchLocalSkin = defineAbility(isMember);

export const canTest = defineAbility(
    (user: User) => isAdmin(user) && user?.id === 99806575
);

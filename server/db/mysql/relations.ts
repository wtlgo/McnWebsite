import { relations } from "drizzle-orm/relations";
import { mcnpVkVkUsers, mcnpVkBukkitPlayers } from "./schema";

export const mcnpVkBukkitPlayersRelations = relations(mcnpVkBukkitPlayers, ({one}) => ({
	mcnpVkVkUser: one(mcnpVkVkUsers, {
		fields: [mcnpVkBukkitPlayers.vkUserId],
		references: [mcnpVkVkUsers.id]
	}),
}));

export const mcnpVkVkUsersRelations = relations(mcnpVkVkUsers, ({many}) => ({
	mcnpVkBukkitPlayers: many(mcnpVkBukkitPlayers),
}));
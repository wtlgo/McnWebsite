import {
    mysqlTable,
    mysqlSchema,
    AnyMySqlColumn,
    unique,
    varchar,
    double,
    float,
    smallint,
    int,
    char,
    index,
    timestamp,
    text,
    bigint,
    tinyint,
    mediumint,
    foreignKey,
} from "drizzle-orm/mysql-core";

export const authme = mysqlTable(
    "authme",
    {
        id: mediumint().autoincrement().notNull(),
        username: varchar({ length: 255 }).notNull(),
        realname: varchar({ length: 255 }).notNull(),
        password: varchar({ length: 255 }).notNull(),
        salt: varchar({ length: 255 }),
        ip: varchar({ length: 40 }),
        lastlogin: bigint({ mode: "number" }),
        x: double().notNull(),
        y: double().notNull(),
        z: double().notNull(),
        world: varchar({ length: 255 }).default("'world'").notNull(),
        regdate: bigint({ mode: "number" }).notNull(),
        regip: varchar({ length: 40 }),
        yaw: float(),
        pitch: float(),
        email: varchar({ length: 255 }),
        isLogged: smallint().notNull(),
        hasSession: smallint().notNull(),
        totp: varchar({ length: 32 }),
        uuid: varchar({ length: 36 }),
    },
    (table) => [unique("username").on(table.username)]
);

export const discordsrvAccounts = mysqlTable(
    "discordsrv_accounts",
    {
        link: int().autoincrement().notNull(),
        discord: varchar({ length: 32 }).notNull(),
        uuid: varchar({ length: 36 }).notNull(),
    },
    (table) => [
        unique("accounts_discord_uindex").on(table.discord),
        unique("accounts_uuid_uindex").on(table.uuid),
    ]
);

export const discordsrvCodes = mysqlTable(
    "discordsrv_codes",
    {
        code: char({ length: 4 }).notNull(),
        uuid: varchar({ length: 36 }).notNull(),
        expiration: bigint({ mode: "number" }).notNull(),
    },
    (table) => [unique("codes_uuid_uindex").on(table.uuid)]
);

export const luckpermsActions = mysqlTable("luckperms_actions", {
    id: int().autoincrement().notNull(),
    time: bigint({ mode: "number" }).notNull(),
    actorUuid: varchar("actor_uuid", { length: 36 }).notNull(),
    actorName: varchar("actor_name", { length: 100 }).notNull(),
    type: char({ length: 1 }).notNull(),
    actedUuid: varchar("acted_uuid", { length: 36 }).notNull(),
    actedName: varchar("acted_name", { length: 36 }).notNull(),
    action: varchar({ length: 300 }).notNull(),
});

export const luckpermsGroups = mysqlTable("luckperms_groups", {
    name: varchar({ length: 36 }).notNull(),
});

export const luckpermsGroupPermissions = mysqlTable(
    "luckperms_group_permissions",
    {
        id: int().autoincrement().notNull(),
        name: varchar({ length: 36 }).notNull(),
        permission: varchar({ length: 200 }).notNull(),
        value: tinyint().notNull(),
        server: varchar({ length: 36 }).notNull(),
        world: varchar({ length: 64 }).notNull(),
        expiry: bigint({ mode: "number" }).notNull(),
        contexts: varchar({ length: 200 }).notNull(),
    },
    (table) => [index("luckperms_group_permissions_name").on(table.name)]
);

export const luckpermsMessenger = mysqlTable("luckperms_messenger", {
    id: int().autoincrement().notNull(),
    time: timestamp({ mode: "string" })
        .default("current_timestamp()")
        .notNull(),
    msg: text().notNull(),
});

export const luckpermsPlayers = mysqlTable(
    "luckperms_players",
    {
        uuid: varchar({ length: 36 }).notNull(),
        username: varchar({ length: 16 }).notNull(),
        primaryGroup: varchar("primary_group", { length: 36 }).notNull(),
    },
    (table) => [index("luckperms_players_username").on(table.username)]
);

export const luckpermsTracks = mysqlTable("luckperms_tracks", {
    name: varchar({ length: 36 }).notNull(),
    groups: text().notNull(),
});

export const luckpermsUserPermissions = mysqlTable(
    "luckperms_user_permissions",
    {
        id: int().autoincrement().notNull(),
        uuid: varchar({ length: 36 }).notNull(),
        permission: varchar({ length: 200 }).notNull(),
        value: tinyint().notNull(),
        server: varchar({ length: 36 }).notNull(),
        world: varchar({ length: 64 }).notNull(),
        expiry: bigint({ mode: "number" }).notNull(),
        contexts: varchar({ length: 200 }).notNull(),
    },
    (table) => [index("luckperms_user_permissions_uuid").on(table.uuid)]
);

export const mcnpVkBukkitPlayers = mysqlTable("mcnp_vk_bukkit_players", {
    id: int().autoincrement().notNull(),
    uuid: text(),
    name: text().notNull(),
    vkUserId: int("vk_user_id")
        .notNull()
        .references(() => mcnpVkVkUsers.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
});

export const mcnpVkData = mysqlTable("mcnp_vk_data", {
    key: varchar({ length: 128 }).notNull(),
    value: int().notNull(),
});

export const mcnpVkVkUsers = mysqlTable("mcnp_vk_vk_users", {
    id: int().autoincrement().notNull(),
    vkId: int("vk_id").notNull(),
});

export const premium = mysqlTable(
    "premium",
    {
        userId: int("UserID").autoincrement().notNull(),
        uuid: varchar("UUID", { length: 36 }),
        name: varchar("Name", { length: 32 }).notNull(),
        premium: tinyint("Premium").notNull(),
        lastIp: varchar("LastIp", { length: 255 }).notNull(),
        lastLogin: timestamp("LastLogin", { mode: "string" })
            .default("current_timestamp()")
            .notNull(),
        floodgate: int("Floodgate"),
    },
    (table) => [unique("Name").on(table.name)]
);

export const spartanBans = mysqlTable("spartan_bans", {
    id: int().autoincrement().notNull(),
    creation: bigint({ mode: "number" }),
    expiration: bigint({ mode: "number" }),
    punished: varchar({ length: 36 }),
    punisher: varchar({ length: 20 }),
    reason: varchar({ length: 4096 }),
});

export const spartanLogs = mysqlTable("spartan_logs", {
    id: int().autoincrement().notNull(),
    creationDate: varchar("creation_date", { length: 30 }),
    pluginVersion: varchar("plugin_version", { length: 16 }),
    serverVersion: varchar("server_version", { length: 7 }),
    serverTps: double("server_tps"),
    onlinePlayers: int("online_players"),
    type: varchar({ length: 32 }),
    information: varchar({ length: 4096 }),
    playerUuid: varchar("player_uuid", { length: 36 }),
    playerLatency: int("player_latency"),
    playerX: int("player_x"),
    playerY: int("player_y"),
    playerZ: int("player_z"),
    functionality: varchar({ length: 32 }),
    violationLevel: int("violation_level"),
    cancelViolation: int("cancel_violation"),
});

export const srCache = mysqlTable("sr_cache", {
    name: varchar({ length: 16 }).notNull(),
    uuid: varchar({ length: 36 }),
    timestamp: bigint({ mode: "number" }).notNull(),
});

export const srCooldowns = mysqlTable("sr_cooldowns", {
    uuid: varchar({ length: 36 }).notNull(),
    groupName: varchar("group_name", { length: 36 }).notNull(),
    creationTime: bigint("creation_time", { mode: "number" }).notNull(),
    duration: bigint({ mode: "number" }).notNull(),
});

export const srCustomSkins = mysqlTable("sr_custom_skins", {
    name: varchar({ length: 36 }).notNull(),
    value: text().notNull(),
    signature: text().notNull(),
    displayName: text("display_name"),
});

export const srPlayers = mysqlTable("sr_players", {
    uuid: varchar({ length: 36 }).notNull(),
    skinIdentifier: varchar("skin_identifier", { length: 2083 }).default(
        "NULL"
    ),
    skinVariant: varchar("skin_variant", { length: 20 }),
    skinType: varchar("skin_type", { length: 20 }),
});

export const srPlayerFavourites = mysqlTable("sr_player_favourites", {
    uuid: varchar({ length: 36 }).notNull(),
    timestamp: bigint({ mode: "number" }).notNull(),
    skinIdentifier: varchar("skin_identifier", { length: 2083 }).notNull(),
    skinVariant: varchar("skin_variant", { length: 20 }),
    skinType: varchar("skin_type", { length: 20 }).notNull(),
});

export const srPlayerHistory = mysqlTable("sr_player_history", {
    uuid: varchar({ length: 36 }).notNull(),
    timestamp: bigint({ mode: "number" }).notNull(),
    skinIdentifier: varchar("skin_identifier", { length: 2083 }).notNull(),
    skinVariant: varchar("skin_variant", { length: 20 }),
    skinType: varchar("skin_type", { length: 20 }).notNull(),
});

export const srPlayerSkins = mysqlTable("sr_player_skins", {
    uuid: varchar({ length: 36 }).notNull(),
    lastKnownName: varchar("last_known_name", { length: 16 }),
    value: text().notNull(),
    signature: text().notNull(),
    timestamp: bigint({ mode: "number" }).notNull(),
});

export const srUrlIndex = mysqlTable("sr_url_index", {
    url: varchar({ length: 266 }).notNull(),
    skinVariant: varchar("skin_variant", { length: 20 }),
});

export const srUrlSkins = mysqlTable("sr_url_skins", {
    url: varchar({ length: 266 }).notNull(),
    mineSkinId: varchar("mine_skin_id", { length: 36 }),
    value: text().notNull(),
    signature: text().notNull(),
    skinVariant: varchar("skin_variant", { length: 20 }),
});

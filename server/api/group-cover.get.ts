export default defineCachedEventHandler(
    async () => {
        const groups = await ServiceVkAPI.groupsGetById({
            groupIds: [197680365],
            fields: ["cover"],
        });
        return groups[0]?.cover?.images ?? [];
    },
    { maxAge: 24 * 60 * 60 }
);

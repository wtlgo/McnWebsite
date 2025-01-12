module.exports = {
    apps: [
        {
            name: "McsWebsite",
            port: "3000",
            exec_mode: "cluster",
            instances: "max",
            script: "./.output/server/index.mjs",
        },
    ],
};

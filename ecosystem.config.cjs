module.exports = {
    apps: [
        {
            name: "McsWebsite",
            port: "3000",
            exec_mode: "cluster",
            instances: "max",
            script: "./.output/server/index.mjs",
            max_memory_restart: '250M'
        },
    ],
};

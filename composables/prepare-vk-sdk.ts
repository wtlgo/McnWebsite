import { Config } from "@vkid/sdk";

export const usePrepareVkSdk = createGlobalState(() => {
    const vkSdkIsReady = useState("vk-sdk-ready", () => false);
    const codeVerifier = useCookie("pkce-code-verifier", { watch: true });
    const runtimeConfig = useRuntimeConfig();
    const pkce = usePkce();

    watchImmediate(pkce, (pkce) => {
        if (!pkce) return;

        codeVerifier.value = pkce.code_verifier;
        Config.init({
            app: +runtimeConfig.public.vkApiClientId,
            redirectUrl: import.meta.dev
                ? `${location.protocol}//${location.host}/vk-auth`
                : "https://mikchan.net/vk-auth",
            codeChallenge: pkce.code_challenge,
            scope: "groups",
        });
        vkSdkIsReady.value = true;
    });

    return vkSdkIsReady;
});

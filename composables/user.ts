import { jwtDecode } from "jwt-decode";
import { parsePayload } from "~/shared/types/payload";

export const useUser = createGlobalState(() => {
    const token = useToken();
    return computed(() => {
        if (token.value === null) return null;
        return parsePayload(jwtDecode(token.value));
    });
});

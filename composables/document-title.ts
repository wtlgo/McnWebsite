export const useDocumentTitle = (placeholder?: string) => {
    const title = ref(placeholder ?? "");

    const refreshTitle = () => {
        if (import.meta.client) title.value = document.title;
    };
    const observer = ref<MutationObserver | null>(null);

    onMounted(() => {
        if (!import.meta.client) return;
        refreshTitle();

        const dt = document.querySelector("title");
        if (!dt) return;

        observer.value = new MutationObserver(refreshTitle);
        observer.value.observe(dt, {
            characterData: true,
            childList: true,
            subtree: true,
        });
    });

    onUnmounted(() => observer.value?.disconnect());

    return readonly(title);
};

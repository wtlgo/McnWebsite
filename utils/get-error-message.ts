export const getErrorMessage = (error: TValue<any>): string | null => {
    const data = toValue(error)?.data;
    if (!data) return null;
    return data.message?.toString() ?? "Неизвестная ошибка";
};

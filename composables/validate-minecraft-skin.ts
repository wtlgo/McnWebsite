import sizeOf from "image-size";

export type MinecraftSkinValidationResult =
    | { isValid: false; errors: string[] }
    | {
          isValid: true;
          errors: undefined;
      };

export const useValidateMinecraftSkin = (f: TValue<File | null>) => {
    const fileName = computed(() => toValue(f)?.name);
    const { data } = useQuery({
        queryKey: queryKeys.localValidateMinecraftSkin(fileName),
        queryFn: async (): Promise<MinecraftSkinValidationResult | null> => {
            const file = toValue(f);
            if (!file) return null;

            const errors: string[] = [];

            if (file.type !== "image/png") {
                errors.push("Некорректный формат данных. Только PNG.");
            }

            const maxSizeInBytes = 5 * 1024 * 1024;
            if (file.size > maxSizeInBytes) {
                errors.push("Размер файла превышает 5 MB.");
            }

            try {
                const dimensions = sizeOf(
                    new Uint8Array(await file.arrayBuffer())
                );
                if (!(dimensions.width === 64 && dimensions.height === 64)) {
                    errors.push(
                        "Неправильный размер изображения. Должен быть 64x64."
                    );
                }
            } catch (error) {
                errors.push("Ошибка анализа изображения.");
                console.error(error);
            }

            return errors.length === 0
                ? { isValid: true, errors: undefined }
                : {
                      isValid: false,
                      errors,
                  };
        },
    });

    return data;
};

const SALT_LENGTH = 16;

const hashWithSalt = async (password: string, salt: string) =>
    sha256((await sha256(password)) + salt);

export const authmePasswordHash = async (password: string): Promise<string> => {
    const salt = randomHex(SALT_LENGTH);
    const hash = await hashWithSalt(password, salt);
    return `$SHA$${salt}$${hash}`;
};

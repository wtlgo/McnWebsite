import colors from "vuetify/util/colors";
import stringHash from "string-hash";

const colorNames = [
    "red",
    "pink",
    "purple",
    "deepPurple",
    "indigo",
    "blue",
    "lightBlue",
    "cyan",
    "teal",
    "green",
    "lightGreen",
    "lime",
    "yellow",
    "amber",
    "orange",
    "deepOrange",
    "brown",
    "blueGrey",
    "grey",
] as const;

export const colorHash = (str: string) => {
    const hash = stringHash(str);
    return colors[colorNames[hash % colorNames.length]].base;
};

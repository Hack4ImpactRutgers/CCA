// deepClone works only if the object does not contain any function attributes.
export const deepClone = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj)) as T;
};

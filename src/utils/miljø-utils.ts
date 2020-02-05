export const getMiljø = (): string => {
    const settings = (window as any).appSettings;
    if (!settings) {
        return 'local';
    }
    return settings.MILJO || 'local';
};

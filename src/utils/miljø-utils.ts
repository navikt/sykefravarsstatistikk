export const erProd = (): boolean => {
    const settings = (window as any).appSettings;
    if (!settings) {
        return false;
    }
    return (settings.MILJO === 'prod-sbs');
};

export async function withCurrentLocation(url: string, assertion: () => void) {
    const original = window.location;
    window.location = new URL(url) as any;
    await assertion();
    window.location = original;
}
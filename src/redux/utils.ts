export const calculateDistance = (latA: number, lonA: number, latB: number, lonB: number): number => {
    const R = 6371000;
    const phiA = latA * Math.PI / 180;
    const phiB = latB * Math.PI / 180;
    const phiDelta = (latB - latA) * Math.PI / 180;
    const lambdaDelta = (lonB - lonA) * Math.PI / 180;

    const a = Math.sin(phiDelta / 2) ** 2 + Math.cos(phiA) * Math.cos(phiB) * Math.sin(lambdaDelta) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d;
}
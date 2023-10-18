export function createPlayer(marker) {
    const _marker = marker;
    const getMarker = () => _marker;

    return { getMarker };
}
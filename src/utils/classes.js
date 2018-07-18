export function classesMaster(obj) {
    return Object.keys(obj).reduce((v, n) => {
        if (obj[n]) v.push(n);
        return v;
    }, []).join(' ');
}



export function get(url) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(url);
        if (response.status !== 200) {
            reject();
            return;
        }
        resolve(response.json());
    })
}
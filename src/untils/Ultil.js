export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };

        reader.onerror = (error) => {
            reject(error);
        };
    });
}

export const checkEmptyObject = (obj) => {
    if (!obj) return true;
    return (!obj || Object.keys(obj).length === 0)
        && Object.getPrototypeOf(obj) === Object.prototype
}
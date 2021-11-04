// #region module
export const numberToLetterColumn = (
    num: number,
) =>{
    let s = '';
    let t;

    while (num > 0) {
        t = (num - 1) % 26;
        s = String.fromCharCode(65 + t) + s;
        num = (num - t) / 26 | 0;
    }

    return s || undefined;
}


export const getLocationsFromString = (
    value: string,
) => {
    let z = '';
    let y = '';
    let x = '';
    let setting = 'z';

    for (const character of value) {
        const asInteger = parseInt(character);

        if (typeof asInteger === 'number' && !isNaN(asInteger)) {
            if (setting === 'z') {
                z += character;
            } else {
                x += character;
            }
        } else {
            setting = 'y';
            y += character;
        }
    }

    return {
        z,
        y,
        x,
    };
}
// #endregion module

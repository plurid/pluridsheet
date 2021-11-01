// #region imports
    // #region external
    import PluridsheetFormularParser from '../PluridsheetFormularParser';
    // #endregion external
// #endregion imports



// #region module
export interface PluridsheetCellLocation {
    z: string;
    y: string;
    x: string;
}

export type PluridsheetCellChange = PluridsheetCellLocation & {
    value: string | number;
}

export type PluridsheetCellData = PluridsheetCellLocation & {
    value: string | number;
    display: string;
    resolved: boolean;
}

export type PluridsheetRows = Record<string, PluridsheetCellData>;
export type PluridsheetColumns = Record<string, PluridsheetRows>;
export type PluridsheetLayers = Record<string, PluridsheetColumns>;


class PluridsheetEngine {
    private value: PluridsheetLayers = {};


    constructor(
        value?: PluridsheetLayers,
    ) {
        if (value) {
            this.value = value;
        }
    }


    private resolveFormula(
        value: string,
    ) {
        const parser = new PluridsheetFormularParser(value);
        const formula = parser.parse();
        if (!formula) {
            return {
                resolved: false,
                display: '',
            };
        }

        let formulaValue = 0;
        let resolved = false;

        switch (formula.type) {
            case '*': {
                const left = this.getCell(formula.left as any);
                const right = this.getCell(formula.right as any);
                formulaValue += (left.value as any) * (right.value as any);
                resolved = true;
                break;
            }
            case '/': {
                const left = this.getCell(formula.left as any);
                const right = this.getCell(formula.right as any);
                formulaValue += (left.value as any) / (right.value as any);
                resolved = true;
                break;
            }
            case '+': {
                const left = this.getCell(formula.left as any);
                const right = this.getCell(formula.right as any);
                formulaValue += (left.value as any) + (right.value as any);
                resolved = true;
                break;
            }
            case '-': {
                const left = this.getCell(formula.left as any);
                const right = this.getCell(formula.right as any);
                formulaValue += (left.value as any) - (right.value as any);
                resolved = true;
                break;
            }
            case 'v':
                break;
        }

        return {
            resolved,
            display: formulaValue + '',
        };
    }


    public setCell(
        data: PluridsheetCellChange,
    ) {
        const {
            x,
            y,
            z,
            value,
        } = data;

        if (!this.value[z]) {
            this.value[z] = {};
        }

        if (!this.value[z][y]) {
            this.value[z][y] = {};
        }

        const resolve = this.resolveValue(value);

        this.value[z][y][x] = {
            ...data,
            ...resolve,
        };
    }

    public getCell(
        location: string | PluridsheetCellLocation,
    ): PluridsheetCellData {
        try {
            if (typeof location === 'string') {
                const locations = location.trim().split('');
                const [
                    z,
                    y,
                    x,
                ] = locations;

                const cell = this.value[z][y][x];

                const resolve = this.resolveValue(cell.value);

                return {
                    ...cell,
                    ...resolve,
                };
            }

            const {
                x,
                y,
                z,
            } = location;

            const cell = this.value[z][y][x];
            const resolve = this.resolveValue(cell.value);

            return {
                ...cell,
                ...resolve,
            };
        } catch (error) {
            return {
                z: '',
                x: '',
                y: '',
                value: '',
                display: '',
                resolved: false,
            };
        }
    }

    public resolveValue(
        value: string | number,
    ) {
        if (typeof value !== 'string') {
            return {
                resolved: true,
                display: value + '',
            };
        }

        if (value.trim().startsWith('=')) {
            return this.resolveFormula(
                value.replace('=', '').trim(),
            );
        }

        return {
            resolved: true,
            display: value + '',
        };
    }
}
// #endregion module



// #region exports
export default PluridsheetEngine;
// #endregion exports

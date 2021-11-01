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
            return '';
        }

        let formulaValue = 0;

        switch (formula.type) {
            case '*': {
                const left = this.getCell(formula.left as any);
                const right = this.getCell(formula.right as any);
                formulaValue += (left.value as any) * (right.value as any);
                break;
            }
            case '/': {
                const left = this.getCell(formula.left as any);
                const right = this.getCell(formula.right as any);
                formulaValue += (left.value as any) / (right.value as any);
                break;
            }
            case '+': {
                const left = this.getCell(formula.left as any);
                const right = this.getCell(formula.right as any);
                formulaValue += (left.value as any) + (right.value as any);
                break;
            }
            case '-': {
                const left = this.getCell(formula.left as any);
                const right = this.getCell(formula.right as any);
                formulaValue += (left.value as any) - (right.value as any);
                break;
            }
            case 'v':
                break;
        }

        return formulaValue + '';
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

        this.value[z][y][x] = {
            ...data,
            display: this.resolveValue(value),
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

                return {
                    ...cell,
                    display: this.resolveValue(cell.value),
                };
            }

            const {
                x,
                y,
                z,
            } = location;

            const cell = this.value[z][y][x];

            return {
                ...cell,
                display: this.resolveValue(cell.value),
            };
        } catch (error) {
            return {
                z: '',
                x: '',
                y: '',
                value: '',
                display: '',
            };
        }
    }

    public resolveValue(
        value: string | number,
    ) {
        if (typeof value !== 'string') {
            return value + '';
        }

        if (value.trim().startsWith('=')) {
            return this.resolveFormula(
                value.replace('=', '').trim(),
            );
        }

        return value + '';
    }
}
// #endregion module



// #region exports
export default PluridsheetEngine;
// #endregion exports

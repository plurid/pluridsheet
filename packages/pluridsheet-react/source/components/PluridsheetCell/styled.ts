// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledPluridsheetCell {
    theme: Theme;
}

export const StyledPluridsheetCell = styled.div<IStyledPluridsheetCell>`
    /* padding: 1rem; */
    border: 1px solid white;

    input {
        background-color: transparent;
        outline: none;
        border: none;
        color: white;
        width: 100px;
        padding: 1rem;
        text-align: center;

        ::placeholder {
            color: #bbb;
        }
    }
`;
// #region module

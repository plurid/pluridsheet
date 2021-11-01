// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledPluridsheetPlane {
    theme: Theme;
}

export const StyledPluridsheetPlane = styled.div<IStyledPluridsheetPlane>`
    font-family: 'Ubuntu';
    display: flex;
`;


export const StyledPluridsheetRow = styled.div`
    display: flex;
    flex-direction: column;
`;
// #region module

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
    padding: 2rem;
    display: grid;
`;


export interface IStyledPluridsheetArea {
    theme: Theme;
}

export const StyledPluridsheetArea = styled.div<IStyledPluridsheetArea>`
    display: flex;
    max-width: 800px;
    max-height: 400px;
    overflow: scroll;
    padding: 1.5rem;

    background-color: ${
        ({
            theme,
        }: IStyledPluridsheetArea) => theme.backgroundColorTertiary
    };
    box-shadow: ${
        ({
            theme,
        }: IStyledPluridsheetArea) => theme.boxShadowAntumbraInset
    };
`;


export const StyledPluridsheetRow = styled.div`
    display: flex;
    flex-direction: column;
`;
// #region module

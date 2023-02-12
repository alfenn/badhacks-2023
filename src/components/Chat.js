import React from 'react';
import styled from 'styled-components';

import { MText } from './styled';

const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(16, 163, 127);
    
    height: 30px;
    width: 30px;
`

const Container = styled.div`
    display: flex;
    width: 80%;
    border-bottom: 1px solid var(--lightest-black);
    padding: 15px;
    align-items: center;
    gap: 20px;
`

export const Chat = ({text, ai}) => {
    return (
        <Container>
            <Logo>
                <img src="openai.svg" alt="openai logo" height="25"></img>
            </Logo>
            <MText>{text}</MText>
        </Container>
    )
}


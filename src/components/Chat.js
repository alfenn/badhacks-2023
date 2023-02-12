import React from 'react';
import styled from 'styled-components';

import { MText } from './styled';

const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.ai ? 'rgb(16, 163, 127)' : 'rgb(255, 153, 51)'};
    
    min-height: 30px;
    min-width: 30px;
`

const Container = styled.div`
    display: flex;
    width: 80%;
    border-bottom: 1px solid var(--lightest-black);
    padding: 15px;
    align-items: center;
    gap: 20px;
    text-align: left;
`

export const Chat = ({text, ai}) => {
    return (
        <Container>
            <Logo ai={ai}>
                {ai ?
                    <img src="openai.svg" alt="openai logo" height="25"></img> :
                    <img src="person.svg" alt="user icon" height="25"></img>
                }
            </Logo>
            <MText>{text}</MText>
        </Container>
    )
}


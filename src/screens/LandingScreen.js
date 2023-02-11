import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { Wrapper } from '../components/Wrapper'
import { HeroText, LText, MText, Spacer, EnticeButton } from '../components/styled'
import styled from 'styled-components';

const Section = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
`

const Stack = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SectionImg = styled.img`
    height: 300px;
`

export const LandingScreen = () => {
    const navigate = useNavigate()

    return (
        <Wrapper>
            <Spacer />
            <Section>
                <HeroText>Thinking about Breaking Up With Someone?</HeroText>
                <SectionImg src="/breakup.jpg"></SectionImg>
            </Section>
            <Spacer />
            <Stack style={{backgroundColor: 'var(--secondary)'}}>
                <LText>It doesn't have to be hard, Crush Killer is here to help.</LText>
            </Stack>
            <Spacer times={4} />
            <Section>
                <EnticeButton onClick={() => navigate('get-crushed')}>Get Your Heart Broken</EnticeButton>
            </Section>
        </Wrapper>
    )
}
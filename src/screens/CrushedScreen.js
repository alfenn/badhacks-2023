import React, { useState } from 'react';

import { Wrapper } from '../components/Wrapper'
import { Button, HeroText, LText, MText, Spacer } from '../components/styled'
import { Chat } from '../components/Chat';
import styled from 'styled-components';

const Input = styled.div`
    display: flex;
    flex-grow: 0;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1));
    width: 100%;
    border-radius: 10px;
    position: fixed;
    bottom: 0;
    padding: 10px;
    justify-content: center;
    align-items: center;
`

const TextArea = styled.textarea`
    overflow-y: hidden;
    resize: none;
    backgroundColor: transparent;
    height: 34px;
    width: 80%;
    padding: 9px;
    box-sizing: border-box;
    border: none;
    overflow: auto;
    outline: none;
    border-radius: 10px;
    font-size: 14px;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
`

const ChatHistory = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap:
`

const EmptyStateContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Card = styled.div`
    height: 100px;
    width: 200px;
    background-color: var(--lightest-black);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;
`

const EmptyState = () => {
    return (
        <EmptyStateContainer>
            <LText>Crush Killer, powered by GPT-3 Ada</LText>
            <Spacer />
            <MText>Try asking...</MText>
            <Spacer />
            <Container style={{flexDirection: 'row', gap: '20px'}}>
                <Card><MText>My crush isn't responding to my texts. What do I do?</MText></Card>
                <Card><MText>My SO has been texting me ex...I'm worried about what that means.</MText></Card>
                <Card><MText>My partner's romantic, but lately he's been seeming distant...</MText></Card>
            </Container>
            
        </EmptyStateContainer>   
    )
}


export const CrushedScreen = () => {
    const [curMsg, setCurMsg] = useState('')
    const [messages, setMessages] = useState([])

    function appendMessage(text, ai=false) {
        setMessages([...messages, {text, ai}])
        console.log(messages)
    }

    return (
        <Wrapper>
            {messages.length === 0 ?
                <EmptyState /> :
                <ChatHistory>
                    {messages.map((msg, i) => {
                        return <Chat key={i} text={msg.text} ai={msg.ai}></Chat>
                    })}
                </ChatHistory>
            }      
            <Input>
                <TextArea value={curMsg} onChange={(e) => setCurMsg(e.target.value)}/>
                <Button onClick={(e) => { appendMessage(curMsg); setCurMsg('')}}>Send</Button>
            </Input>
        </Wrapper>
    )
}
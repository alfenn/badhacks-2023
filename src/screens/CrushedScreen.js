import React, { useState, Fragment } from 'react';

import { Wrapper } from '../components/Wrapper'
import { Button, LText, MText, Spacer, Row, FlexGrow } from '../components/styled'
import { Chat } from '../components/Chat';
import styled from 'styled-components';

var Filter = require('bad-words'),
    filter = new Filter();
    filter.addWords('porn', 'grope', 'rape', 'blow job', 'blowjob', 'hang', 'torture', 'bang', 'Christian', 'Muslim');

const Input = styled.div`
    display: flex;
    flex-direction: column;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1));
    width: 90%;
    left: 5%;
    border-radius: 10px;
    position: fixed;
    bottom: 0;
    padding-bottom: 10px;
`

const TextArea = styled.textarea`
    overflow-y: hidden;
    resize: none;
    backgroundColor: transparent;
    height: 34px;
    width: 100%;
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
    padding-bottom: 120px;
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
    padding: 10px;
    border-radius: 10px;
`

const Suggestions = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`

const SuggestButton = styled(Button)`
    background-color: white;
    margin: 10px;
    margin-left: 0px;
`

const EmptyState = () => {
    return (
        <EmptyStateContainer>
            <LText>r/Relationship_Therapist, powered by GPT-3 Curie</LText>
            <Spacer />
            <MText>Try asking...</MText>
            <Spacer />
            <Container style={{flexDirection: 'row', gap: '20px'}}>
                <Card><MText>My crush isn't responding to my texts. What do I do?</MText></Card>
                <Card><MText>My ex has been texting my crush about me...I'm worried about what that means. What should I say?</MText></Card>
                <Card><MText>My crush seems to like me, but lately they've been seeming distant...what should I bring up and when?</MText></Card>
            </Container>
        </EmptyStateContainer>   
    )
}


export const CrushedScreen = () => {
    const [curMsg, setCurMsg] = useState('')
    const [lastPrompt, setLastPrompt] = useState('')
    const [messages, setMessages] = useState([])
    const [useSpeech, setUseSpeech] = useState(true)

    function changeUseSpeech() {
        window.speechSynthesis.cancel()
        setUseSpeech(!useSpeech)
    }

    function textToSpeech(text) {
        if (useSpeech) {
            var msg = new SpeechSynthesisUtterance();
            msg.text = text;
            window.speechSynthesis.speak(msg);
        }
    }

    function cleanText(text) {
        filter.clean(text);
        const first_attempt = text.slice(text.indexOf('.') + 1, text.lastIndexOf('.') + 1).trim()
        if (first_attempt.length !== 0) {
            return first_attempt
        } else {
            return text
        }
    }

    async function userInput(text) {
        window.speechSynthesis.cancel()
        const err_msg = 'Sorry, your prompt wasn\'t able to be answered. Try again later.'
        try {
            await queryAIResponse(text).then((data) => {
                // Get first response text
                if (data.error) {
                    setMessages((messages) => [...messages, {text: err_msg, ai: true}])
                    textToSpeech(err_msg)
                } else {
                    const cleaned_text = cleanText(data.choices[0].text)
                    setMessages((messages) => [...messages, {text: cleaned_text, ai: true}])
                    textToSpeech(cleaned_text)
                }
            })
        } catch {
            setMessages((messages) => [...messages, {text: err_msg, ai: true}])
            textToSpeech(err_msg)
        }
    }

    async function queryAIResponse(text) {
        const url = 'https://api.openai.com/v1/completions'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: text,
                max_tokens: 200,
                model: 'curie:ft-personal:done-bot-2023-02-12-02-43-37'
            })
        })
        return response.json()
    }

    async function sendQuestion() {
        setMessages([...messages, {text: curMsg, ai: false}])
        setLastPrompt(curMsg)
        setCurMsg('')
        await userInput(curMsg)
    }

    async function askForMore() {
        // use the previous output as an input
        setMessages([...messages, {text: 'Tell me more.', ai: false}])
        setCurMsg('')
        await userInput(messages[messages.length - 1].text)
    }

    async function sayAgain() {
        // reuse same prompt.
        setMessages([...messages, {text: 'I\'m confused, can you say that again?', ai: false}])
        setCurMsg('')
        await userInput(lastPrompt)
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
                
                    <Suggestions>
                        {messages.length !== 0 &&
                            <Fragment>
                                <SuggestButton onClick={async () => await askForMore()}>Tell me more.</SuggestButton>
                                <SuggestButton onClick={async () => await sayAgain()}>I'm confused, can you say that again?</SuggestButton>
                            </Fragment>
                        }
                        <FlexGrow />
                        <SuggestButton style={{marginRight: '0'}}
                                       onClick={() => changeUseSpeech()}>
                                        {useSpeech ? 'Mute' : 'Speak'}
                        </SuggestButton>
                    </Suggestions>
                
                <Row style={{width: '100%'}}>
                    <TextArea value={curMsg} onChange={(e) => setCurMsg(e.target.value)}/>
                    <Button onClick={async () => await sendQuestion()}>Send</Button>
                </Row>
            </Input>
        </Wrapper>
    )
}
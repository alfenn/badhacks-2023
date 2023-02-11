import React from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { FlexGrow, Button, BText } from './styled'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  width: calc(100vw - 40px);
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  position: fixed;
  align-items: center;
  background-color: var(--primary);
`

const Logo = styled.img`
  height: 30px;
  margin-right: 5px;
`

const Brand = styled.div`
  height: 40px;
  min-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const Content = styled.div`
  margin: 60px 0px;
  height: 100%;
`


export const Wrapper = ({children}) => {
  const navigate = useNavigate()

  return (
    <Container>
      <Header>
        <Brand onClick={() => navigate('/')}><Logo src="/logo192.png" /><BText>Crush Killer</BText></Brand>
      </Header>
      <Content>
        {children}
      </Content>
    </Container>
  )
}

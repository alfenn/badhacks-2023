import styled from 'styled-components';

export const Column = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const FlexGrow = styled.div`
  flex-grow: 1;
`

export const Button = styled.button`
  min-width: ${props => props.minWidth ? props.minWidth : 70}px;
  min-height: 30px;
  font-size: 13px;
  border: 1px solid var(--black);
  cursor: pointer;
  color: var(--black);
  background-color: inherit;
  display: flex;
  flew-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background-color: var(--lightest-black);
  }
`

export const Spacer = styled.div`
  height: ${props => (props.times ? props.times : 1) * 20}px;
`

export const SText = styled.div`
  font-size: 12px;
`

export const A = styled.span`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

export const MText = styled.div`
  font-size: 16px;
`

export const BText = styled.div`
  font-weight: bold;
  font-size: 20px;
`

export const LText = styled.div`
  font-weight: bold;
  font-size: 30px;
`

export const HeroText = styled.div`
  font-weight: bold;
  font-size: 50px;
`

export const EnticeButton = styled.button`
  min-height: 50px;
  font-size: 25px;
  cursor: pointer;
  border: 2px solid var(--black);
  padding: 10px;
  color: var(--black);
  background-color: var(--primary);
  display: flex;
  flew-direction: row;
  align-items: center;
  border-radius: 4px;

  &:hover {
    background-color: var(--secondary);
  }
`
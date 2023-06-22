import { styled } from "styled-components";

export const Container = styled.div`
  height: 100px;
  background-color: #fff;
  width: 30%;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 15px;
  transition: all ease 0.3s;
  
  @media (max-width: 750px){
    width: 20%;

    p{
      font-size: 12px;
    }

    span{
      font-size: 20px;
    }

    svg {
      display: none;
    }
  }
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  gap: 10px;
  margin: 15px auto;

  svg {
    width: 25px;
    height: 25px;
  }
`
export const HeaderTitle = styled.p`
  font-size: 20px;
`

export const Total = styled.span`
  font-size: 30px;
  font-weight: bold;
`

import styled from "styled-components"

export const Tr = styled.tr``;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.aligncenter ? "center" : "start")};
  word-break: break-all;
  

  svg {
    width: 18px;
    height: 18px;
  }

  .desc-checkbox {
    margin-right: 8px;
    outline: none;
    border-radius: 50%;
    accent-color: black;
    cursor: pointer;
  }
`
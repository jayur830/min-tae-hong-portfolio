import styled from "styled-components";

const BlackButton = styled.button`
    background-color: black;
    color: white;
    font: 18px 'HeirofLight Regular';
    border: none;
    margin: 5px 10px;
    padding: 8px 20px;
    cursor: pointer;
    transition: all 0.15s ease;
    transform: rotate(0.03deg);
    
    &:hover {
        background-color: #a5a5a5;
    }
    
    &:active {
        background-color: #505050;
    }
    
    @media screen and (max-width: 1120px) {
        font-size: 13px;
        padding: 5px 15px;
    }
`;

export default BlackButton;
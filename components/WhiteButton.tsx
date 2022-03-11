import styled from "styled-components";

const WhiteButton = styled.button`
    background-color: white;
    color: black;
    font: 18px 'HeirofLight Regular';
    border: none;
    margin: 5px 10px;
    padding: 8px 20px;
    cursor: pointer;
    transition: all 0.15s ease;
    transform: rotate(0.03deg);
    
    &:hover {
        background-color: #e7e7e7;
    }
    
    &:active {
        background-color: #c2c2c2;
    }
    
    @media screen and (max-width: 1120px) {
        font-size: 13px;
        padding: 5px 15px;
    }
`;

export default WhiteButton;
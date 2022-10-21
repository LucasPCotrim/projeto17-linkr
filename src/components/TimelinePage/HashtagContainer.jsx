import styled from "styled-components";
import { Link } from "react-router-dom";

export default function HashtagContainer(){
    return(
        <OutterBox> 
            <span><h1>trending</h1></span>
            <div>
            <Link to={`/hashtag/:hashtag`}>
                <h2># javascript</h2>
                <h2># react</h2>
                <h2># react-native</h2>
                <h2># material</h2>
                <h2># web-dev</h2>
                <h2># mobile</h2>
                <h2># css</h2>
                <h2># html</h2>
                <h2># node</h2>
                <h2># sql</h2>
            </Link>
            </div>
        </OutterBox>
    )
}

const OutterBox = styled.main`
    display:auto;
    max-width: 301px;
    width: 100%;
    height: 406px;
    background-color: #171717;
    border-radius: 16px;
    margin: 0 auto;
    margin-top: 228px;
    margin-bottom: 100px;

    @media (max-width: 670px){
        display: none;
    }

    span{
        width: 100%;
        height: 61px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-bottom: 1px solid #484848;
        padding-left: 16px;

        h1{
            font-size: 27px;
            font-weight: 700;
            color: #FFFFFF;
            font-family: "Oswald", sans-serif;
            cursor: default;
        }
    }

    div{
        width: 100%;
        padding-left: 16px;
        padding-top: 20px;

        h2{
            font-size: 19px;
            font-weight: 700;
            color: #FFFFFF;
            font-family: "Lato", sans-serif;
            padding: 5px 0;
            cursor: pointer;
        }
    }


`
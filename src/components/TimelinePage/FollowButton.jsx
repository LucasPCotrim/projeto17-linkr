import styled from "styled-components"

export default function FollowButton(){
    return (
        <OutterButton>
            <div>Follow</div>
        </OutterButton>
    );
}

const OutterButton = styled.main`
    width: 112px;
    height: 31px;
    background-color: #1877F2;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 168px;
    margin-right: 10px;
    //visibility: hidden;
    @media (max-width: 820px) {
       margin-top: 1px;
       margin-right: 5px;
       margin-bottom: 5px;
  }

    div{
    display: flex; 
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700; 
    color: #FFFFFF;
    font-family:  "Lato", sans-serif;
    }
`
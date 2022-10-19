import styled from "styled-components";

export default function SignUp() {
  return (
    <OutterContainer>
      <MainBox>
        <PageSlogan>
          <section>
            <h1>linkr</h1>
            <h2>save, share and discover the best links on the web</h2>
          </section>
        </PageSlogan>
        <PageForm>
          <input required name="email" placeholder="e-mail"></input>
          <input
            required
            name="password"
            type="password"
            placeholder="password"
          ></input>
          <input required name="username" placeholder="username"></input>
          <input required name="image" placeholder="picture url"></input>
          <FormButton>Sign Up</FormButton>
          <p> Switch back to log in</p>
        </PageForm>
        
      </MainBox>
    </OutterContainer>
  );
}

const OutterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #333333;
`;

const MainBox = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 614px){
    flex-direction: column;
    overflow-y: scroll;

}
  
`;

const PageSlogan = styled.div`
    display: flex; 
    align-items: center;
    justify-content: center;
    background-color: #151515;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    word-wrap: wrap;
    word-break: break-word;
    cursor: default;

    section{
        width: 90%;
        padding-left: 30px;
        padding-bottom: 100px;

        @media (max-width: 614px){
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            word-break: break-word;
            padding: 40px 0 10px 0;
           
        }

        h1{
            font-size: 106px;
            font-weight: 700;
            color: #FFFFFF;
            font-family: 'Passion One', cursive;

            @media (max-width: 614px){
                max-width: 167px;
                width: 100%;
                font-size: 76px;
                
            }

        }

        h2{
            font-size: 43px;
            font-weight: 700;
            color: #FFFFFF;
            font-family: 'Oswald', sans-serif;
            max-width: 442px;
            height: 128px;

            @media (max-width: 614px){
                font-size: 23px;
                max-width: 237px;
                width: 100%;
                height: 68px;
                
            }

        }

    }
`;

const PageForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #333333;
    width: 80%;
    height: 100%;
    word-wrap: wrap;
    word-break: break-word;
    gap: 13px;
    cursor: default;

    @media (max-width: 614px){
    padding: 40px 0 91px 0;    
}

    input{
        max-width: 429px;
        width: 90%;
        height: 65px;
        border-radius: 6px;
        background-color: #ffffff;
        outline: none;
        border: 1px solid #d4d4d4;
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        font-weight: 400;
        color: #333333;
        padding-left: 10px;
        cursor: default;
        ::placeholder {
          color: #9F9F9F;
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
        }
    }
    p{
        width: 181px;
        height: 24px;
        font-size: 20px;
        font-weight: 400;
        color: #FFFFFF;
        text-decoration: underline;
        cursor: pointer;
        font-family: 'Lato', sans-serif;

    }
`;

const FormButton = styled.button`
    max-width: 429px;
    width: 90%;
    height: 65px;
    border: none;
    outline: 1px solid #1877F2;
    border-radius: 6px;
    background-color: #1877F2;
    font-size: 27px;
    font-weight: 700;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    
`


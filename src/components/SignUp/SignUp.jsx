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
  background-color: green;
`;

const MainBox = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  
`;

const PageSlogan = styled.div`
    display: flex; 
    align-items: center;
    justify-content: center;
    background-color: #151515;
    width: 100%;

    section{
        display: flex;
        flex-direction:column;
        align-items: center;
        justify-content: space-between;

        h1{
            font-size: 106px;
            font-weight: 700;
            color: #FFFFFF;
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
`;

const FormButton = styled.button`
    
`
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { IoDesktopOutline } from "react-icons/io5";
import { IoServerOutline } from "react-icons/io5";

const FooterContainer = styled.footer`
  display: grid;
  grid-template-columns: 1.2fr 3fr 1.5fr;
  width: 100%;
  height: 10em;
  background-color: #212121;
`;
const Icon = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  color: #cfcfcf;
`;

const TeamMember = styled.span`
  display: flex;
  align-items: flex-end;
  font-size: 0.8em;
  color: white;
  margin: 3em 5em 3em 2em;
`;
const PartArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 0 1.2em 0 0; */
`;
const Members = styled.div`
  display: flex;
`;
const P = styled.span`
  cursor: pointer;
  display: flex;
  position: relative;
  padding: 0.2em 0;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.1em;
    background-color: #ff71ce;
    opacity: 0;
    transition: opacity 300ms, transform 300ms;
  }
  &::after {
    opacity: 1;
    transform: scale(0);
    transform-origin: center;
  }
  &:hover::after,
  :focus::after {
    transform: scale(1);
  }

  margin: 0.3em 0.8em 0.3em 0.8em;
`;

const Logo = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 2em;
`;

const Copyright = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  color: #cfcfcf;
`;

export default function Footer() {
  const history = useHistory();
  return (
    <FooterContainer>
      <Logo
        onClick={() => {
          history.push("/");
        }}
      >
        <img src="Logo.png" width="140" height="60" />
      </Logo>
      <Copyright>Copyright © SSG-GA All Rights Reserved.</Copyright>
      <TeamMember>
        <PartArea>
          <Icon>
            <IoDesktopOutline />
            FrontEnd
          </Icon>
          <Members>
            <P>
              <a
                className="line"
                href="https://github.com/TaeGyeong1026"
                target="_blank"
                rel="developer"
              >
                노태경
              </a>
            </P>
            <P>
              <a
                className="line"
                href="https://github.com/Gryffindor0ne"
                target="_blank"
                rel="developer"
              >
                이욱재
              </a>
            </P>
          </Members>
        </PartArea>

        <PartArea>
          <Icon>
            <IoServerOutline />
            BackEnd
          </Icon>
          <Members>
            <P>
              <a
                className="line"
                href="https://github.com/eensungkim"
                target="_blank"
                rel="developer"
              >
                김은성
              </a>
            </P>
            <P>
              <a
                className="line"
                href="https://github.com/Hsource39"
                target="_blank"
                rel="developer"
              >
                황현수
              </a>
            </P>
          </Members>
        </PartArea>
      </TeamMember>
    </FooterContainer>
  );
}

// Footer 컴포넌트 입니다

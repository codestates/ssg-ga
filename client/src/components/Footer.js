import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { IoDesktopOutline } from "react-icons/io5";
import { IoServerOutline } from "react-icons/io5";
import theme from "../style/theme";

const FooterContainer = styled.footer`
  display: grid;
  position: relative;
  width: 100%;

  background-color: #212121;
  @media ${(props) => props.theme.minimum} {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas: "Logo" "Copyright" "Members";
    height: 20em;
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas: "Logo" "Copyright" "Members";
    height: 20em;
  }
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: 2fr 1.5fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "Logo ." "Copyright Members";
    height: 20em;
  }
  @media ${(props) => props.theme.desktop} {
    grid-template-columns: 1.2fr 3fr 1.5fr;
    grid-template-areas: "Logo Copyright Members";
    height: 10em;
  }
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
  grid-area: Members;
  display: flex;
  justify-content: flex-end;
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
  justify-content: center;
  align-items: center;
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
  grid-area: Logo;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 2em;
`;

const Copyright = styled.a`
  grid-area: Copyright;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  color: #cfcfcf;
`;

export default function Footer() {
  const history = useHistory();
  return (
    <FooterContainer theme={theme}>
      <Logo
        onClick={() => {
          history.push("/");
        }}
      >
        <img src="../Logo.png" width="140" height="60" />
      </Logo>
      <Copyright
        className="line"
        href="https://github.com/codestates/ssg-ga"
        target="_blank"
        rel="developer"
      >
        Copyright © SSG-GA All Rights Reserved.
      </Copyright>
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

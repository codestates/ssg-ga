import { Link } from "react-router-dom";
import styled from "styled-components";

const LandingContainer = styled.div`
  > section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 770px;
    border-bottom: 1px solid black;

    > a {
      border: 1px solid green;
      color: green;
      padding: 20px;
    }
    > a:hover {
      background-color: green;
      color: white;
    }
  }
  animation: fadein 2s;
  -moz-animation: fadein 2s;
  -webkit-animation: fadein 2s;
  -o-animation: fadein 2s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
export default function Landing() {
  return (
    <LandingContainer>
      <section>
        <Link to="/main">Go to main</Link>
      </section>
      <section>섹션2</section>
      <section>섹션3</section>
      <section>섹션4</section>
    </LandingContainer>
  );
}

// 랜딩 페이지 입니다

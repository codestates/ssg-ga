import styled from "styled-components";
import {
  inCupDecoArr,
  inCupDecoLabel,
  outCupDecoArr,
  outCupDecoLabel,
} from "../style/decoSet";
import theme from "../style/theme";

const DecoSelectorContainer = styled.form`
  width: 100%;
  border-radius: 10px;
  margin: 20px 0;
  > h2 {
    text-align: center;
  }
  > div {
    border-top: 2px solid #ff71ce;
    border-bottom: 2px solid #ff71ce;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    @media ${(props) => props.theme.minimum} {
      grid-template-columns: repeat(2, 1fr);
    }
    @media ${(props) => props.theme.mobile} {
      grid-template-columns: repeat(3, 1fr);
    }
    @media ${(props) => props.theme.tablet} {
      grid-template-columns: repeat(2, 1fr);
    }
    grid-row-gap: 10px;
    padding: 20px 0;
    margin-top: 20px;
    > input {
      display: none;
      &:checked + label {
        color: #fdf250;
        font-weight: bold;
        ::after {
          width: 50%;
        }
      }
    }
    > label {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      cursor: pointer;
      &:hover {
        color: #fdf250;
      }
      ::after {
        content: "";
        position: absolute;
        bottom: -5px;
        width: 0%;
        height: 100%;
        border-bottom: 2px solid #fdf250;
        transition-duration: 200ms;
      }
    }
  }
`;

export default function DecoSelector({ deco, setDeco }) {
  const handleCheckBox = (state, type, position) => {
    const copied = deco.slice();
    copied[position][type] = state;

    setDeco(copied);
  };

  return (
    <DecoSelectorContainer theme={theme}>
      <h2>장식선택</h2>
      <div>
        {inCupDecoArr.map((el, index) => {
          return (
            <>
              <input
                id={el + "Chk"}
                type="checkbox"
                name={el + "Chk"}
                checked={deco[0][el]}
                onChange={(event) =>
                  handleCheckBox(event.target.checked, el, 0)
                }
              />
              <label for={el + "Chk"}>{inCupDecoLabel[index]}</label>
            </>
          );
        })}
        {outCupDecoArr.map((el, index) => {
          return (
            <>
              <input
                id={el + "Chk"}
                type="checkbox"
                name={el + "Chk"}
                checked={deco[1][el]}
                onChange={(event) =>
                  handleCheckBox(event.target.checked, el, 1)
                }
              />
              <label for={el + "Chk"}>{outCupDecoLabel[index]}</label>
            </>
          );
        })}
      </div>
    </DecoSelectorContainer>
  );
}

// thumbnail deco 컴포넌트 입니다
/*
 0 bubble
 1 ice
 2 lemon green
 3 lemon yellow
*/

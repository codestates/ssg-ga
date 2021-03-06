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
  padding: 20px;
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
      grid-template-columns: repeat(2, 1fr);
    }
    @media ${(props) => props.theme.tablet} {
      grid-template-columns: repeat(2, 1fr);
    }
    grid-row-gap: 10px;
    padding: 20px 0;
    margin-top: 20px;
    > div {
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
      <h2>옵션 선택</h2>
      <div>
        {inCupDecoArr.map((el, index) => {
          return (
            <div key={"incupinput" + index}>
              <input
                id={el + "Chk"}
                type="checkbox"
                name={el + "Chk"}
                checked={deco[0][el]}
                onChange={(event) =>
                  handleCheckBox(event.target.checked, el, 0)
                }
              />
              <label htmlFor={el + "Chk"}>{inCupDecoLabel[index]}</label>
            </div>
          );
        })}
        {outCupDecoArr.map((el, index) => {
          return (
            <div key={"outcupinput" + index}>
              <input
                id={el + "Chk"}
                type="checkbox"
                name={el + "Chk"}
                checked={deco[1][el]}
                onChange={(event) =>
                  handleCheckBox(event.target.checked, el, 1)
                }
              />
              <label htmlFor={el + "Chk"}>{outCupDecoLabel[index]}</label>
            </div>
          );
        })}
      </div>
    </DecoSelectorContainer>
  );
}

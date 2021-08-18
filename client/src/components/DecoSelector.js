import styled from "styled-components";
import {
  inCupDecoArr,
  inCupDecoLabel,
  outCupDecoArr,
  outCupDecoLabel,
} from "../style/decoSet";

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
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 10px;
    padding: 20px 0;
    margin-top: 20px;
    > input {
      display: none;
      &:checked + label {
        color: #ff71ce;
      }
    }
    > label {
      text-align: center;
      cursor: pointer;
      &:hover {
        color: #ff71ce;
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
    <DecoSelectorContainer>
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

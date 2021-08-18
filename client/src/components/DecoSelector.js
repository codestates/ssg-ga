import styled from "styled-components";
import {
  inCupDecoArr,
  inCupDecoLabel,
  outCupDecoArr,
  outCupDecoLabel,
} from "../style/decoSet";

const DecoSelectorContainer = styled.form``;

export default function DecoSelector({ deco, setDeco }) {
  const handleCheckBox = (state, type, position) => {
    const copied = deco.slice();
    copied[position][type] = state;

    setDeco(copied);
  };

  return (
    <DecoSelectorContainer>
      {inCupDecoArr.map((el, index) => {
        return (
          <>
            <input
              id={el + "Chk"}
              type="checkbox"
              name={el + "Chk"}
              checked={deco[0][el]}
              onChange={(event) => handleCheckBox(event.target.checked, el, 0)}
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
              onChange={(event) => handleCheckBox(event.target.checked, el, 1)}
            />
            <label for={el + "Chk"}>{outCupDecoLabel[index]}</label>
          </>
        );
      })}
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

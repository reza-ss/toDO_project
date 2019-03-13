import React from "react";
import cancel from "../cancel.png";

function CatList(props) {
  return (
    <>
      {props.children}
      <img src={cancel} alt="" onClick={props.remove} />
      <button className="edit_btn" onClick={props.addDo}>
        افزودن کار
      </button>
    </>
  );
}
export default CatList;

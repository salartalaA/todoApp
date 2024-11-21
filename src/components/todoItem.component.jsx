import React from "react";
import DoneIcon from "../assets/Vector (1).png";
import NotYetIcon from "../assets/Vector.png";
import DeleteIcon from "../assets/delete.png";
export default function TodoItem(props) {
  return (
    <div className="flex gap-3 justify-between rounded-md bg-[#262626] p-4 text-[#F2F2F2]">
      <div
        className="flex gap-3 "
        onClick={() => {
          props.handleCompleteTask(props.id);
        }}
      >
        <img
          src={props.isCompleted ? DoneIcon : NotYetIcon}
          className="w-[17.45px] h-[17.45px]"
          alt={props.text}
        />
        {props.text}
      </div>
      <div
        className="h-full flex items-center cursor-pointer"
        onClick={() => {
          props.handleDelete(props.id);
        }}
      >
        <img src={DeleteIcon} alt={props.text} className="w-[12.48px] h-fit" />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import AddForm from "./AddForm";

export default function AddFormPortal() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const handleShow = () => setIsShow(!isShow);

  return (
    <div>
      <button onClick={() => setIsShow(!isShow)} className="text-lg text-white">
        ＋追加
      </button>
      <div
        id="dialog"
        className="fixed top-0 left-0 bg-gradient-to-b from-gray-200 to-gray-600 p-4 shadow-lg rounded-lg w-full m-2"
        hidden={!isShow}
      ></div>
      {isShow &&
        createPortal(
          <div>
            <button
              onClick={() => setIsShow(!isShow)}
              className="text-lg font-bold"
            >
              －
            </button>
            <AddForm handleShow={handleShow} />
          </div>,
          document.getElementById("dialog") as HTMLElement
        )}
    </div>
  );
}

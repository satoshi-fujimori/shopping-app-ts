"use client";

import React, { useContext, useEffect, useState } from "react";
import * as actions from "@/lib/action";
import { MyContext } from "./ListsView";
import type { Form, Input, Item } from "@/types";

export default function AddForm({ handleShow }: { handleShow: () => void }) {
  const [tags, setTags] = useState<string[]>([]);
  const [form, setForm] = useState<Form>({
    name: "",
    tag: "",
    unit: "",
  });
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const { updateList } = useContext(MyContext);

  useEffect(() => {
    const fetchTags = async () => {
      const data = await actions.getTags();
      setTags(data);
    };
    fetchTags();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(newForm);
  };
  const handleSelect = (tagName: string) => {
    const newForm = {
      ...form,
      tag: tagName,
    };
    setForm(newForm);
    setIsFocus(false);
  };
  const handleSubmit = async () => {
    const input: Input = {
      ...form,
      status: false,
    };
    const id = await actions.addItem(input);
    const newItem: Item = {
      ...input,
      id: id,
      amount: 0,
      price: 0,
    };
    updateList(newItem);
    handleShow();
  };
  return (
    <form action={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Item</label>
        <input
          className="m-2 p-2 border border-gray-500"
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
        />
        <label htmlFor="tag">Tag</label>
        <input
          className="m-2 p-2 border border-gray-500 text-black"
          name="tag"
          id="tag"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={form.tag}
          onChange={handleChange}
        />
        {isFocus && (
          <div className=" h-full -mt-3 mx-2 bg-white">
            {tags
              .filter((tag) => tag.includes(form.tag))
              .map((tag, index) => (
                <p key={index} onClick={() => handleSelect(tag)}>
                  {tag}
                </p>
              ))}
          </div>
        )}
        <label htmlFor="unit">Unit</label>
        <input
          className="m-2 p-2 border border-gray-500"
          name="unit"
          id="unit"
          value={form.unit}
          onChange={handleChange}
        />
        <button type="submit" className="m-2 p-2 bg-blue-500 text-white">
          追加
        </button>
      </div>
    </form>
  );
}

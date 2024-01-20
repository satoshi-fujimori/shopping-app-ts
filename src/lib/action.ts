"use server";

import prisma from "@/lib/prisma";
import type { Item, Input } from "@/types";
import * as historyActions from "./historyAction";

export const getAllItem = async () => {
  return await prisma.item.findMany();
};

export const updateItem = async (items: Item[]) => {
  for (const item of items) {
    try {
      await isAddHistory(item);
      await prisma.item.update({
        data: {
          ...item,
        },
        where: {
          id: item.id,
        },
      });
    } catch (e) {
      console.error(`id:${item.id}でエラー:${e}`);
    }
  }
};

const isAddHistory = async (item: Item) => {
  const initItem = await prisma.item.findUnique({
    where: {
      id: item.id,
    },
  });
  if (initItem?.status !== item.status) {
    await historyActions.addHistory(item);
  }
};

export const getTags = async () => {
  const tags: string[] = [];
  const items = await getAllItem();
  for (const item of items) {
    if (!tags.includes(item.tag)) {
      tags.push(item.tag);
    }
  }
  return tags;
};

export const addItem = async (item: Input): Promise<number> => {
  const addedItem = await prisma.item.create({
    data: {
      ...item,
      amount: 0,
      price: 0,
    },
  });
  console.log(`added:${addedItem}`);
  return addedItem.id;
};

export const deleteItem = async (id: number) => {
  await prisma.item.delete({
    where: {
      id: id,
    },
  });
};

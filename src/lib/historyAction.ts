"use server";

import type { History, HistoryForm, Item } from "@/types";
import prisma from "./prisma";

export const addHistory = async (item: Item) => {
  const { id: itemId, amount, price } = { ...item };
  const purchased: Date = new Date();
  const newHistory: HistoryForm = {
    amount,
    price,
    itemId,
    purchased: purchased.toISOString(),
    unitPrice: Math.floor(price / amount),
  };
  //特にリターンしない
  const addedHistory = await prisma.purchasedHistory.create({
    data: {
      ...newHistory,
    },
  });
};

export const getHitoryByItemId = async (itemId: number): Promise<History[]> => {
  const histories: History[] = await prisma.purchasedHistory.findMany({
    where: {
      itemId: itemId,
    },
  });
  return histories;
};

export const getAllHistory = async (): Promise<History[]> => {
  return await prisma.purchasedHistory.findMany();
};

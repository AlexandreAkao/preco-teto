"use client";

import { useReducer, StrictMode } from "react";
import { Plus, Minus } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";

type AddRemoveMagicAction = {
  type: "add" | "remove";
};

type MagicActions =
  | {
      type: "currentPrice" | "lastIncome";
      payload: {
        value: number;
        index: number;
      };
    }
  | AddRemoveMagicAction;

type MagicState = {
  currentPrice: number;
  lastIncome: number;
}[];

const reducer = (state: MagicState, action: MagicActions) => {
  if (action.type === "currentPrice") {
    const { index, value } = action.payload;
    if (value < 0) {
      return [...state];
    }
    state[index].currentPrice = value;
    return [...state];
  } else if (action.type === "lastIncome") {
    const { index, value } = action.payload;
    if (value < 0) {
      return [...state];
    }
    state[index].lastIncome = value;
    return [...state];
  } else if (action.type === "add") {
    state.push({ currentPrice: 0, lastIncome: 0 });
    return [...state];
  } else if (action.type === "remove") {
    if (state.length === 1) {
      return [...state];
    }
    state.pop();
    return [...state];
  }
  throw Error("Unknown action.");
};

const initialState = [
  {
    currentPrice: 0,
    lastIncome: 0,
  },
];

const MagicNumber = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addNew = () => dispatch({ type: "add" });
  const removeNew = () => dispatch({ type: "remove" });

  return (
    <StrictMode>
      <div className="flex flex-col gap-2 md:w-full w-dvw">
        <Card className="shadow-slate-400 shadow-lg">
          <CardHeader>
            <CardTitle>Magic Number 🧙‍♂️</CardTitle>
            <CardDescription>
              Número de cotas para a bola de neve
            </CardDescription>
          </CardHeader>
          {state.map((magic, index) => {
            const quantity =
              magic.currentPrice === 0 || magic.lastIncome === 0
                ? "-"
                : Math.ceil(magic.currentPrice / magic.lastIncome);

            const price =
              typeof quantity === "number"
                ? `R$ ${Intl.NumberFormat("pt-br", { currency: "BRL" }).format(
                    Number(quantity) * magic.currentPrice
                  )}`
                : "-";

            return (
              <>
                <CardContent
                  className="grid sm:grid-cols-4 grid-cols-2 gap-4 items-end"
                  key={index}
                >
                  <div className="grid gap-1">
                    <Label htmlFor="current-price">Cotação Atual</Label>
                    <Input
                      value={magic.currentPrice}
                      id="current-price"
                      placeholder="0,00"
                      step="0.01"
                      type="number"
                      onChange={(event) =>
                        dispatch({
                          type: "currentPrice",
                          payload: {
                            index: index,
                            value: Number(event.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="last-income">Último Rendimento</Label>
                    <Input
                      value={magic.lastIncome}
                      id="last-income"
                      placeholder="0,00"
                      step="0.01"
                      type="number"
                      onChange={(event) =>
                        dispatch({
                          type: "lastIncome",
                          payload: {
                            index: index,
                            value: Number(event.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label
                      htmlFor="current-price"
                      className="flex justify-center"
                    >
                      Quantidade de cotas
                    </Label>
                    <span className="h-10 text-2xl flex items-center text-slate-700 font-extrabold justify-center">
                      {quantity}
                    </span>
                  </div>
                  <div className="grid gap-1">
                    <Label
                      htmlFor="current-price"
                      className="flex justify-center"
                    >
                      Valor investido
                    </Label>
                    <span className="h-10 text-2xl flex items-center text-slate-700 font-extrabold  justify-center">
                      {price}
                    </span>
                  </div>
                </CardContent>
                {index !== state.length - 1 && <Separator className="mb-6" />}
              </>
            );
          })}
          <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 items-end ml-6 mb-6">
            <Button type="button" onClick={addNew}>
              <Plus className="mr-2" />
              Adicionar fundo
            </Button>
            <Button type="button" onClick={removeNew}>
              <Minus className="mr-2" />
              Remover fundo
            </Button>
          </div>
        </Card>
      </div>
    </StrictMode>
  );
};

export default MagicNumber;

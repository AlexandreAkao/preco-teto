"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Bazin() {
  const [divYear1, setDivYear1] = useState("");
  const [divYear2, setDivYear2] = useState("");
  const [divYear3, setDivYear3] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  const calcAverageDiv = () =>
    (Number(divYear1) + Number(divYear2) + Number(divYear3)) / 3;

  const calcAverageDivPorcent = () => {
    if (Number(currentPrice) === 0) return "-";

    const divMedio = calcAverageDiv();

    const result = (divMedio / Number(currentPrice)) * 100;

    return isNaN(result) ? "-" : `${result.toFixed(3)}%`;
  };

  const calcAverageYearDiv = () => {
    const divMedio = calcAverageDiv();

    return isNaN(divMedio) ? "-" : `R$ ${divMedio.toFixed(3)}`;
  };

  const calcProfit = () => {
    return {
      "6": `R$ ${(calcAverageDiv() / 0.06).toFixed(3)}`,
      "7": `R$ ${(calcAverageDiv() / 0.07).toFixed(3)}`,
      "8": `R$ ${(calcAverageDiv() / 0.08).toFixed(3)}`,
      "10": `R$ ${(calcAverageDiv() / 0.1).toFixed(3)}`,
    };
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="sm:flex grid gap-2">
        <Card className="shadow-slate-400 shadow-lg">
          <CardHeader>
            <CardTitle>Preço teto</CardTitle>
            <CardDescription>Calcular o preço teto Bazin</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="current-price">Cotação Atual</Label>
              <Input
                id="current-price"
                placeholder="0,00"
                step="0.01"
                type="number"
                onChange={(event) => setCurrentPrice(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Dividend dos últimos 3 anos</Label>
              <div className="grid gap-1 grid-cols-3">
                <div>
                  <Input
                    id="dividend-1"
                    placeholder="0,00"
                    step="0.01"
                    type="number"
                    onChange={(event) => setDivYear1(event.target.value)}
                  />
                </div>
                <div>
                  <Input
                    id="dividend-2"
                    placeholder="0,00"
                    step="0.01"
                    type="number"
                    onChange={(event) => setDivYear2(event.target.value)}
                  />
                </div>
                <div>
                  <Input
                    id="dividend-3"
                    placeholder="0,00"
                    step="0.01"
                    type="number"
                    onChange={(event) => setDivYear3(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-slate-400 shadow-lg bg-slate-700 flex flex-col justify-around">
          <CardHeader className="pb-1">
            <CardTitle className="text-white">Div. Médio %</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            {calcAverageDivPorcent()}
          </CardContent>

          <Separator />

          <CardHeader className="pb-1">
            <CardTitle className="text-white">Div. Médio Anual</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            {calcAverageYearDiv()}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-slate-400 shadow-lg">
        <CardHeader>
          <CardTitle>Retorno Esperado (%)</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-4">
            <Label className="w-10" htmlFor="current-price">
              10%
            </Label>
            <Input
              id="current-price"
              placeholder="R$ 0,00"
              disabled
              value={calcProfit()[10]}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-10" htmlFor="current-price">
              8%
            </Label>
            <Input
              id="current-price"
              placeholder="R$ 0,00"
              disabled
              value={calcProfit()[8]}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-10" htmlFor="current-price">
              7%
            </Label>
            <Input
              id="current-price"
              placeholder="R$ 0,00"
              disabled
              value={calcProfit()[7]}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-10" htmlFor="current-price">
              6%
            </Label>
            <Input
              id="current-price"
              placeholder="R$ 0,00"
              disabled
              value={calcProfit()[6]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "../ui/checkbox";

export default function FiisCalc() {
  const [timeType, setTimeType] = useState("year");
  const [hasReinvest, setHasReinvest] = useState(true);

  return (
    <div className="flex flex-col gap-2">
      <Card className="shadow-slate-400 shadow-lg">
        <CardHeader>
          <CardTitle>Calculadora de Fundos Imobiliários</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <div className="grid gap-1">
            <Label htmlFor="current-price">Preço da cota</Label>
            <Input
              id="current-price"
              placeholder="0,00"
              step="0.01"
              type="number"
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="last-income">Último rendimento</Label>
            <Input
              id="last-income"
              placeholder="0,00"
              step="0.01"
              type="number"
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="quantity">Quantidade de cotas iniciais</Label>
            <Input id="quantity" placeholder="0" step="1" type="number" />
          </div>
        </CardContent>
        <CardContent className="grid grid-cols-3 gap-4">
          <div className="grid gap-1">
            <Label htmlFor="current-price">Investimento mensal</Label>
            <Input
              id="current-price"
              placeholder="0,00"
              step="0.01"
              type="number"
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="last-income">Prazo</Label>
            <div className="flex">
              <Input id="last-income" placeholder="0" step="1" type="number" />
              <Select onValueChange={setTimeType} defaultValue={timeType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Selecione o tipo de tempo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="year">Anos</SelectItem>
                    <SelectItem value="month">Meses</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardContent className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={hasReinvest}
              id="reinvest"
              onCheckedChange={(e) => setHasReinvest(e as boolean)}
            />
            <Label htmlFor="reinvest">Reinvestir dividendos ganhos</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

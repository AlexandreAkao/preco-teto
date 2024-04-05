"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ErrorContainer from "@/components/ErrorContainer";

type dataTable = {
  month: number;
  quotas: number;
  totalInvest: number;
  totalDividend: number;
  monthlyDividend: number;
  inCount: number;
};

const errorMessage = {
  required_error: "Coloque um número válido",
  invalid_type_error: "Coloque um número válido",
};

const errorGtMessage = {
  message: "Coloque um número maior que 0",
};

const fiisCalcSchema = z.object({
  currentPrice: z.number(errorMessage).gt(0, errorGtMessage),
  lastIncome: z.number(errorMessage).gt(0, errorGtMessage),
  quantity: z.number(errorMessage).gte(0, {
    message: "Coloque um número maior ou igual a 0",
  }),
  monthlyInvest: z.number(errorMessage).gt(0, errorGtMessage),
  time: z.number(errorMessage).gt(0, errorGtMessage),
});

type FiisCalcSchemaType = z.infer<typeof fiisCalcSchema>;

export default function FiisCalc() {
  const [timeType, setTimeType] = useState("year");
  const [hasReinvest, setHasReinvest] = useState(true);
  const [data, setData] = useState<dataTable[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FiisCalcSchemaType>({
    resolver: zodResolver(fiisCalcSchema),
  });

  const calc: SubmitHandler<FiisCalcSchemaType> = (fiisCalcData) => {
    if (!isValid) return;

    const { currentPrice, lastIncome, quantity, monthlyInvest, time } =
      fiisCalcData;
    const size = timeType === "year" ? Number(time) * 12 : Number(time);
    const arr: dataTable[] = [];

    for (let index = 0; index < size; index++) {
      if (index === 0) {
        const quantityBuy = Math.floor(
          Number(monthlyInvest) / Number(currentPrice)
        );
        const quotas = Number(quantity) + quantityBuy;
        arr.push({
          month: index + 1,
          quotas,
          totalInvest: Number(monthlyInvest),
          inCount: quotas * Number(lastIncome),
          totalDividend: quotas * Number(lastIncome),
          monthlyDividend: quotas * Number(lastIncome),
        });
      } else {
        const prev = arr.at(-1);
        const currentInCount = Number(monthlyInvest) + (prev?.inCount ?? 0);

        const quantityBuy = Math.floor(currentInCount / Number(currentPrice));

        const quotas = (prev?.quotas ?? 0) + quantityBuy;

        arr.push({
          month: index + 1,
          quotas,
          totalInvest:
            (prev?.totalInvest ?? 0) + quantityBuy * Number(currentPrice),
          inCount:
            currentInCount -
            quantityBuy * Number(currentPrice) +
            quotas * Number(lastIncome),
          totalDividend:
            (prev?.totalDividend ?? 0) + quotas * Number(lastIncome),
          monthlyDividend: quotas * Number(lastIncome),
        });
      }
    }

    setData(arr);
  };

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit(calc)}>
        <Card className="shadow-slate-400 shadow-lg">
          <CardHeader>
            <CardTitle>Calculadora de Fundos Imobiliários</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 items-end pb-3">
            <ErrorContainer
              className="grid gap-1"
              errorMessage={errors.currentPrice?.message}
            >
              <Label htmlFor="current-price">Preço da cota</Label>
              <Input
                id="current-price"
                placeholder="0,00"
                step="0.01"
                type="number"
                {...register("currentPrice", { valueAsNumber: true })}
              />
            </ErrorContainer>
            <ErrorContainer
              className="grid gap-1"
              errorMessage={errors.lastIncome?.message}
            >
              <Label htmlFor="last-income">Último rendimento</Label>
              <Input
                id="last-income"
                placeholder="0,00"
                step="0.01"
                type="number"
                {...register("lastIncome", { valueAsNumber: true })}
              />
            </ErrorContainer>
            <ErrorContainer
              className="grid gap-1"
              errorMessage={errors.quantity?.message}
            >
              <Label htmlFor="quantity">Quantidade de cotas iniciais</Label>
              <Input
                id="quantity"
                placeholder="0"
                step="1"
                type="number"
                {...register("quantity", { valueAsNumber: true })}
              />
            </ErrorContainer>
          </CardContent>
          <CardContent className="grid grid-cols-3 gap-4 items-end">
            <ErrorContainer
              className="grid gap-1"
              errorMessage={errors.monthlyInvest?.message}
            >
              <Label htmlFor="monthly-invest">Investimento mensal</Label>
              <Input
                id="monthly-invest"
                placeholder="0,00"
                step="0.01"
                type="number"
                {...register("monthlyInvest", { valueAsNumber: true })}
              />
            </ErrorContainer>
            <ErrorContainer
              className="grid gap-1"
              errorMessage={errors.time?.message}
            >
              <Label htmlFor="time">Prazo</Label>
              <div className="flex">
                <Input
                  id="time"
                  placeholder="0"
                  step="1"
                  type="number"
                  {...register("time", { valueAsNumber: true })}
                />
                <Select onValueChange={setTimeType} defaultValue={timeType}>
                  <SelectTrigger className="w-32 bg-slate-700 text-white">
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
            </ErrorContainer>
          </CardContent>
          <CardContent className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={hasReinvest}
                id="reinvest"
                onCheckedChange={(e) => setHasReinvest(e as boolean)}
                disabled
              />
              <Label htmlFor="reinvest">Reinvestir dividendos ganhos</Label>
            </div>
          </CardContent>
          <CardContent className="grid">
            <Button type="submit">Simular</Button>
          </CardContent>
        </Card>
      </form>

      <Card className="shadow-slate-400 shadow-lg mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Mês</TableHead>
              <TableHead>N&#186; de cotas</TableHead>
              <TableHead>Em conta</TableHead>
              <TableHead>Total investido</TableHead>
              <TableHead>Total dividendos ganhos</TableHead>
              <TableHead className="text-right">Dividendo mensal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((v) => (
              <TableRow key={v.month}>
                <TableCell className="font-medium">{v.month}</TableCell>
                <TableCell>{v.quotas}</TableCell>
                <TableCell>R$ {v.inCount}</TableCell>
                <TableCell>R$ {v.totalInvest}</TableCell>
                <TableCell>R$ {v.totalDividend}</TableCell>
                <TableCell className="text-right">
                  R$ {v.monthlyDividend}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

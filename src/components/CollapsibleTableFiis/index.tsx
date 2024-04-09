"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type dataTable = {
  month: number;
  quotas: number;
  totalInvest: number;
  totalDividend: number;
  monthlyDividend: number;
  inCount: number;
};

type CollapsibleTableFiisType = {
  year: number;
  elements: dataTable[];
};

const CollapsibleTableFiis = ({ year, elements }: CollapsibleTableFiisType) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="z-20 p-6 relative bg-white hover:bg-gray-400 w-full text-start border-b-2 flex justify-between">
        <span>Ano {year}</span>
        <span
          className={`ease-in-out transition-all transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="transform transition-all ease-out data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up p-2 border-primary border-4">
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
            {elements.map((v) => (
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
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleTableFiis;

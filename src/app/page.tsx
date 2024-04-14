import Bazin from "@/components/Bazin";
import FiisCalc from "@/components/FiisCalc";
import MagicNumber from "@/components/MagicNumber";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-5">
      <Tabs defaultValue="method-bazin">
        <TabsList className="grid w-full grid-cols-3 gap-4">
          <TabsTrigger value="method-bazin">Método Bazin</TabsTrigger>
          <TabsTrigger value="fiis-calc">Calculadora de Fiis</TabsTrigger>
          <TabsTrigger value="magic-number">Magic Number</TabsTrigger>
        </TabsList>
        <TabsContent className="grid gap-4" value="method-bazin">
          <Bazin />
        </TabsContent>
        <TabsContent className="grid gap-4" value="fiis-calc">
          <FiisCalc />
        </TabsContent>
        <TabsContent className="grid gap-4" value="magic-number">
          <MagicNumber />
        </TabsContent>
      </Tabs>
    </main>
  );
}

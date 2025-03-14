"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import dataBaseVendas from "@/app/database/vendas.json";
import { useState } from "react";
import LogoDiniz from "@/public/LOGO-DINIZ.png";
import LogoMXO from "@/public/LOGO-MXO.png";
import LogoPrime from "@/public/LOGO-PRIME.png";
import LogoPaulista from "@/public/LOGO-PAULISTA.png";
import Image from "next/image";
import { StaticImageData } from "next/image";

// ✅ Registrar os componentes necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function GraficSales() {
  const [lojaSelected, setLojaSelected] = useState<string>("All Business");
  const [logoSelected, setLogoSelected] = useState(LogoMXO);


  function handleLojaChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const loja = e.target.value as keyof typeof logos; // Garante que a chave está no tipo do objeto
    setLojaSelected(loja);

    const logos: Record<string, StaticImageData> = {
      "ÓTICA DINIZ": LogoDiniz,
      "ÓTICA OURO PRIME": LogoPrime,
      "ÓTICA OURO PAULISTA": LogoPaulista,
      "All Business": LogoMXO,
    };

    setLogoSelected(logos[loja] || LogoMXO);
  }

  // ✅ Filtrar os dados pela loja selecionada
  const vendasFiltradas = dataBaseVendas.filter(
    (venda) => lojaSelected === "All Business" || venda.LOJA === lojaSelected
  );

  // ✅ Somar os valores por forma de pagamento
  const pagamentosAgrupados = vendasFiltradas.reduce((acc, venda) => {
    Object.entries(venda.FORMAPAGAMENTO).forEach(([forma, valor]) => {
      acc[forma] = (acc[forma] || 0) + valor;
    });
    return acc;
  }, {} as Record<string, number>);

  // ✅ Criar arrays para Chart.js
  const labels = Object.keys(pagamentosAgrupados); // Formas de pagamento
  const valores = Object.values(pagamentosAgrupados); // Valores totais

  // ✅ Configuração dos dados do gráfico
  const data = {
    labels: labels,
    datasets: [
      {
        label: lojaSelected,
        data: valores, // Valores por forma de pagamento
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className=" p-10 w-[800px] h-[400px]">
      <Image className=" w-24 h-24" src={logoSelected} alt="Logos" />

      <div className="flex flex-col w-64 bg-red-500">
        {/* Botão para abrir/fechar */}
        <label htmlFor="selectBusiness">Select a business:</label>
        <select
          id="selectBusiness"
          name="selectBusiness"
          onChange={handleLojaChange}
        >
          <option defaultValue={"All Business"} value="All Business">
            All Business
          </option>
          {dataBaseVendas.map((loja) => (
            <option key={loja.ID} value={loja.LOJA}>
              {loja.LOJA}
            </option>
          ))}
        </select>
      </div>

      <h1>Gráfico de Vendas</h1>
      <Bar data={data} />
    </div>
  );
}

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
  const [dataSelecionada, setDataSelecionada] = useState("");

  function handleLojaChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const loja = e.target.value as keyof typeof logos;
    setLojaSelected(loja);

    const logos: Record<string, StaticImageData> = {
      "ÓTICA DINIZ": LogoDiniz,
      "ÓTICA OURO PRIME": LogoPrime,
      "ÓTICA OURO PAULISTA": LogoPaulista,
      "All Business": LogoMXO,
    };

    setLogoSelected(logos[loja] || LogoMXO);
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDataSelecionada(e.target.value);
  }

  // ✅ Extraindo mês e ano da data selecionada
  const [anoSelecionado, mesSelecionado] = dataSelecionada.split("-") ?? [
    "",
    "",
  ];

  // ✅ Filtrando os dados pela loja e pela data selecionada
  const vendasFiltradas = dataBaseVendas.filter((venda) => {
    const [ano, mes] = venda.DATA.split("-"); // Supondo que DATA esteja no formato "YYYY-MM-DD"

    const filtroLoja =
      lojaSelected === "All Business" || venda.LOJA === lojaSelected;
    const filtroData =
      !dataSelecionada || (ano === anoSelecionado && mes === mesSelecionado);

    return filtroLoja && filtroData;
  });

  // ✅ Agrupando valores por forma de pagamento
  const pagamentosAgrupados = vendasFiltradas.reduce((acc, venda) => {
    Object.entries(venda.FORMAPAGAMENTO).forEach(([forma, valor]) => {
      acc[forma] = (acc[forma] || 0) + valor;
    });
    return acc;
  }, {} as Record<string, number>);

  // ✅ Criar arrays para Chart.js
  const labels = Object.keys(pagamentosAgrupados);
  const valores = Object.values(pagamentosAgrupados);

  // ✅ Configuração dos dados do gráfico
  const data = {
    labels: labels,
    datasets: [
      {
        label: lojaSelected,
        data: valores,
        backgroundColor: [
          "#32a852",
          "#36A2EB",
          "#35e6d4",
          "#c90a0a",
          "#f25824",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-2.5 p-10 w-[800px] h-[400px]">
      <div className="flex flex-row gap-4 bg-gray-300 p-3.5 rounded-3xl">
        <Image className="w-24 h-24" src={logoSelected} alt="Logos" />
        <div className="flex flex-col w-64 gap-3">
          <label className="uppercase" htmlFor="selectBusiness">Select a business:</label>
          <select
            className="bg-white rounded-2xl p-5"
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

          {/* ✅ Campo de filtro por data */}
          <input
            className="bg-white rounded-2xl p-1"
            placeholder="Data"
            type="date"
            id="date"
            name="date"
            value={dataSelecionada}
            onChange={handleDateChange}
          />
        </div>
      </div>

      <div className="bg-gray-300 p-3.5 rounded-3xl">
        <h2 className="text-center text-4xl uppercase font-semibold">
          Gráfico de Vendas
        </h2>
        <Bar data={data} />
      </div>
    </div>
  );
}

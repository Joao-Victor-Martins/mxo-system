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

import dataBaseDespesas from "@/app/database/despesas.json";

// ✅ Registrar os componentes necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function GraficDespesas({
  lojaSelected,
  dataSelecionada,
}: {
  lojaSelected: string;
  dataSelecionada: string;
}) {
  // ✅ Extraindo mês e ano da data selecionada
  const [anoSelecionado, mesSelecionado] = dataSelecionada.split("-") ?? [
    "",
    "",
  ];

  // ✅ Filtrando os dados pela loja e pela data selecionada
  const despesasFiltradas = dataBaseDespesas.filter((despesa) => {
    const [ano, mes] = despesa.DATA.split("-"); // Supondo que DATA esteja no formato "YYYY-MM-DD"

    const filtroLoja =
      lojaSelected === "ALL BUSINESS" || despesa.LOJA === lojaSelected;
    const filtroData =
      !dataSelecionada || (ano === anoSelecionado && mes === mesSelecionado);

    return filtroLoja && filtroData;
  });

  // ✅ Agrupando valores por forma de pagamento
  const categoriasAgrupadas = despesasFiltradas.reduce((acc, despesa) => {
    Object.entries(despesa.CATEGORIAS).forEach(([forma, valor]) => {
      acc[forma] = (acc[forma] || 0) + valor;
    });
    return acc;
  }, {} as Record<string, number>);

  // ✅ Criar arrays para Chart.js
  const labels = Object.keys(categoriasAgrupadas);
  const valores = Object.values(categoriasAgrupadas);

  // ✅ Configuração dos dados do gráfico
  const data = {
    labels: labels,
    responsive: true,
    maintainAspectRatio: false, // Permite que o gráfico se ajuste ao tamanho do contêiner
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    datasets: [
      {
        label: lojaSelected,
        data: valores,
        backgroundColor: [
          "#f25824",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-10 w-full h-full">
      <div className="bg-gray-300 p-3.5 rounded-3xl">
        <h2 className="text-center text-4xl uppercase font-semibold">
          Gráfico de Despesas
        </h2>
        <Bar data={data} />
      </div>
    </div>
  );
}

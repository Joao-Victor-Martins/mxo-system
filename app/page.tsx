"use client";
import Image from "next/image";
import { GraficSales } from "./components/GraficSales";
import { GraficReceitas } from "./components/GraficReceitas";
import { GraficDespesas } from "./components/GraficDespesas";
import dataBaseVendas from "@/app/database/vendas.json";
import LogoDiniz from "@/public/LOGO-DINIZ.png";
import LogoMXO from "@/public/LOGO-MXO.png";
import LogoPrime from "@/public/LOGO-PRIME.png";
import LogoPaulista from "@/public/LOGO-PAULISTA.png";
import { StaticImageData } from "next/image";
import { useState } from "react";

export default function Home() {
  const [lojaSelected, setLojaSelected] = useState<string>("ALL BUSINESS");
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [logoSelected, setLogoSelected] = useState(LogoMXO);

  function handleLojaChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const loja = e.target.value as keyof typeof logos;
    setLojaSelected(loja);

    const logos: Record<string, StaticImageData> = {
      "ÓTICA DINIZ": LogoDiniz,
      "ÓTICA OURO PRIME": LogoPrime,
      "ÓTICA OURO PAULISTA": LogoPaulista,
      "ALL BUSINESS": LogoMXO,
    };

    setLogoSelected(logos[loja] || LogoMXO);
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDataSelecionada(e.target.value);
  }

  return (
    <main className="p-4 flex flex-col">
      <div className="flex-col flex lg:flex-row justify-between items-center gap-4 bg-gray-300 p-3.5 rounded-3xl">
        <div className="flex flex-row lg:w-64 gap-4">
          <Image className="w-24 h-24" src={logoSelected} alt="Logos" />
          <div className="flex flex-col w-64 gap-3">
            <label className="uppercase" htmlFor="selectBusiness">
              Select a business:
            </label>
            <select
              className="bg-white rounded-2xl p-5"
              id="selectBusiness"
              name="selectBusiness"
              onChange={handleLojaChange}
            >
              <option defaultValue={"ALL BUSINESS"} value="ALL BUSINESS">
                ALL BUSINESS
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
        <h1 className="text-center align-middle text-4xl font-bold uppercase">
          Relátorio Financeiro
        </h1>
      </div>

      <div className="flex-col lg:flex flex-row gap-5 w-full">
        <GraficSales
          lojaSelected={lojaSelected}
          dataSelecionada={dataSelecionada}
        />
        <GraficReceitas
          lojaSelected={lojaSelected}
          dataSelecionada={dataSelecionada}
        />
      </div>
      <div className="flex-col lg:flex flex-row gap-5 w-full">
        <GraficDespesas
          lojaSelected={lojaSelected}
          dataSelecionada={dataSelecionada}
        />
      </div>
    </main>
  );
}

"use client";
import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Definir o tipo correto para o valor do calendário
type Value = Date | [Date, Date] | null;

export default function CalendarSelected() {
  const [date, setDate] = useState<Value>(new Date());

  // Função intermediária para garantir o tipo correto
  const handleChange: CalendarProps["onChange"] = (value) => {
    setDate(value as Value);
  };

  return (
    <div>
      <h2>Selecione uma data:</h2>
      <Calendar onChange={handleChange} value={date} />
      <p>Data selecionada: {Array.isArray(date) ? `${date[0].toDateString()} - ${date[1].toDateString()}` : date?.toDateString()}</p>
    </div>
  );
}

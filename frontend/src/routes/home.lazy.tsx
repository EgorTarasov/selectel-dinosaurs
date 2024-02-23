import BankCard from "@/components/cards/BankCard";
import { HomeFilters } from "@/components/home/HomeFilters";
import { HomeStore } from "@/stores/home.service";
import { FCVM } from "@/utils/vm";
import { createFileRoute } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const Index: FCVM<HomeStore> = observer(() => {
  const [vm] = useState(() => new HomeStore());

  return (
    <>
      <HomeFilters vm={vm} />

      <div className="section mt-8 mb-7">
        <h3 className="font-semibold text-2xl">Подходящие банки крови</h3>
      </div>
    </>
  );
});

export const Route = createFileRoute("/home")({
  component: () => <Index />
});

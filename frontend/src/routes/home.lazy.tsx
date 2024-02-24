import BankCard from "@/components/cards/BankCard";
import DonationCard from "@/components/cards/DonationCard";
import SocialDonationCard from "@/components/cards/SocialDonationCard";
import { HomeFilters } from "@/components/home/HomeFilters";
import HomeSceleton from "@/components/home/HomeSceleton";
import { Toaster } from "@/components/ui/toaster";
import { HomeStore } from "@/stores/home.service";
import { createFileRoute } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const Index = observer(() => {
  const [vm] = useState(() => new HomeStore());

  useEffect(() => {
    vm.applyFilters();
  }, [vm]);

  return (
    <div>
      <HomeFilters vm={vm} />

      <div className="section mt-8 mb-7">
        <h3 className="font-semibold text-2xl">Подходящие банки крови</h3>
      </div>

      <div className="section">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vm.isLoading
            ? Array.from({ length: 3 }).map((_, i) => <HomeSceleton key={i} />)
            : vm.banks.map((bank) => <BankCard key={bank.id} {...bank} />)}

          {vm.banks.length === 0 && !vm.isLoading && (
            <div className="w-full text-slate-500">Нет подходящих банков крови</div>
          )}
        </div>
      </div>

      <div className="section mt-8 mb-7">
        <h3 className="font-semibold text-2xl">Подходящие доноры</h3>
      </div>

      <div className="section">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vm.isLoading
            ? Array.from({ length: 3 }).map((_, i) => <HomeSceleton key={i} />)
            : vm.donations.map((donation) => <DonationCard key={donation.id} {...donation} />)}

          {vm.donations.length === 0 && !vm.isLoading && (
            <div className="w-full text-slate-500">Нет подходящих доноров</div>
          )}
        </div>
      </div>

      <div className="section mt-8 mb-7">
        <h3 className="font-semibold text-2xl">Похожие запросы в соц. сетях</h3>
      </div>

      <div className="section">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vm.socialDonations.map((socialDonation) => (
            <SocialDonationCard key={socialDonation.id} {...socialDonation} />
          ))}
        </div>
      </div>

      <Toaster />
    </div>
  );
});

export const Route = createFileRoute("/home")({
  component: () => <Index />
});

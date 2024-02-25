import BankCard from "@/components/cards/BankCard";
import DonationCard from "@/components/cards/DonationCard";
import HomeRequestCard from "@/components/cards/HomeRequestCard";
import SocialDonationCard from "@/components/cards/SocialDonationCard";
import { HomeFilters } from "@/components/home/HomeFilters";
import HomeSceleton from "@/components/home/HomeSceleton";
import { Toaster } from "@/components/ui/toaster";
import { homeStore } from "@/stores/home.service";
import { createFileRoute } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const Index = observer(() => {
  const [vm] = useState(() => homeStore);

  useEffect(() => {
    vm.applyFilters();
  }, [vm]);

  return (
    <div className="pb-10">
      <Toaster />
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
        <h3 className="font-semibold text-2xl">Подходящие реципиенты</h3>
      </div>

      <div className="section">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vm.isLoading
            ? Array.from({ length: 3 }).map((_, i) => <HomeSceleton key={i} />)
            : vm.requests.map((request) => <HomeRequestCard key={request.id} {...request} />)}

          {vm.donations.length === 0 && !vm.isLoading && (
            <div className="w-full text-slate-500">Нет подходящих реципиентов</div>
          )}
        </div>
      </div>

      <div className="section mt-8 mb-7">
        <h3 className="font-semibold text-2xl">Похожие запросы в соц. сетях</h3>
      </div>

      <div className="section">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vm.isLoading
            ? Array.from({ length: 3 }).map((_, i) => <HomeSceleton key={i} />)
            : vm.socialDonations.map((socialDonation) => (
                <SocialDonationCard key={socialDonation.id} {...socialDonation} />
              ))}

          {vm.socialDonations.length === 0 && !vm.isLoading && (
            <div className="w-full text-slate-500">Нет похожих запросов</div>
          )}
        </div>
      </div>
    </div>
  );
});

export const Route = createFileRoute("/")({
  component: () => <Index />
});

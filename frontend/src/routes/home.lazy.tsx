import BankCard from "@/components/cards/BankCard";
import DonationCard from "@/components/cards/DonationCard";
import SocialDonationCard from "@/components/cards/SocialDonationCard";
import { HomeFilters } from "@/components/home/HomeFilters";
import { HomeStore } from "@/stores/home.service";
import { createFileRoute } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const Index = observer(() => {
  const [vm] = useState(() => new HomeStore());

  return (
    <>
      <HomeFilters vm={vm} />

      <div className="section mt-8 mb-7">
        <h3 className="font-semibold text-2xl">Подходящие банки крови</h3>
      </div>

      <div className="section">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vm.banks.map((bank) => (
            <BankCard key={bank.id} {...bank} />
          ))}
        </div>
      </div>

      <div className="section mt-8 mb-7">
        <h3 className="font-semibold text-2xl">Подходящие доноры</h3>
      </div>

      <div className="section">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vm.donations.map((donation) => (
            <DonationCard key={donation.id} {...donation} />
          ))}
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
    </>
  );
});

export const Route = createFileRoute("/home")({
  component: () => <Index />
});

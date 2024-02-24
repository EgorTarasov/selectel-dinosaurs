import { PrivateRoute } from "@/components/hoc/PrivateRoute";
import { CommunicationSection } from "@/components/pages/profile/CommunicationSection";
import { ContactsSection } from "@/components/pages/profile/ContactsSection";
import { NameSection } from "@/components/pages/profile/NameSection";
import { PetsSection } from "@/components/pages/profile/PetsSection";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs/Tabs";
import { ProfileStore } from "@/stores/profile.store";
import { createFileRoute } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const Profile = observer(() => {
  const [vm] = useState(() => new ProfileStore());

  return (
    <div className="section flex flex-col pt-6 pb-24">
      <div className="w-fit">
        <Tabs
          activeTab={vm.tab}
          variant="secondary"
          onTabChange={(tab) => (vm.tab = tab)}
          tabs={["settings", "pets"]}
          renderTab={(tab) => (tab === "settings" ? "Мой профиль" : "Мои питомцы")}
        />
      </div>

      {vm.tab === "settings" && (
        <>
          <div className="flex justify-end">
            <Button variant="secondary">Обновить данные</Button>
          </div>
          <NameSection vm={vm} />
          <span className="h-16" />
          <ContactsSection vm={vm} />
          <span className="h-16" />
          <CommunicationSection vm={vm} />
        </>
      )}

      {vm.tab === "pets" && (
        <>
          <PetsSection vm={vm} />
        </>
      )}
    </div>
  );
});

export const Route = createFileRoute("/profile")({
  component: () => (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  )
});

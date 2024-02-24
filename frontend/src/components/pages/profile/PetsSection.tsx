import { PetEditableCard } from "@/components/cards/PetEditableCard";
import { SkeletonCard } from "@/components/cards/SkeletonCard";
import { Button } from "@/components/ui/button";
import { ProfileStore } from "@/stores/profile.store";
import { FCVM } from "@/utils/vm";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export const PetsSection: FCVM<ProfileStore> = observer(({ vm }) => {
  useEffect(() => {
    vm.fetchPets();
  }, [vm]);

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => vm.addPet()} variant="secondary">
          Добавить питомца
        </Button>
      </div>

      <div className="flex flex-wrap gap-8 mt-8">
        {vm.isPetsLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          vm.pets.map((pet, i) => <PetEditableCard key={pet.id} vm={vm} pet={pet} index={i} />)
        )}
      </div>
    </>
  );
});

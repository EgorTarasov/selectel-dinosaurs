import BloodRequestCard from "@/components/cards/BloodRequestCard";
import DonationRequestCard from "@/components/cards/DonationRequestCard";
import { SkeletonCard } from "@/components/cards/SkeletonCard";
import { ProfileStore } from "@/stores/profile.store";
import { FCVM } from "@/utils/vm";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export const RequestsSection: FCVM<ProfileStore> = observer(({ vm }) => {
  useEffect(() => {
    vm.fetchRequests();
  }, [vm]);

  return (
    <div className="flex-wrap mt-8 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {vm.isRequestsLoading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        vm.donationRequests
          .map((donationRequest) => (
            <DonationRequestCard key={donationRequest.id} {...donationRequest} />
          ))
          .concat(
            vm.bloodRequests.map((bloodRequest) => (
              <BloodRequestCard key={bloodRequest.id} {...bloodRequest} />
            ))
          )
      )}
    </div>
  );
});

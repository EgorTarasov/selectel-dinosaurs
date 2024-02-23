import { cn } from "@/lib/utils";
import { ProfileStore } from "@/stores/profile.store";
import { FCVM } from "@/utils/vm";
import { PlusIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export const Avatar: FCVM<ProfileStore> = observer(({ vm }) => {
  const [dragOverImage, setDragOverImage] = useState(false);

  if (vm.item.loading) {
    return (
      <div className="w-28 h-28 rounded-md bg-slate-200 flex items-center justify-center">
        <div className="w-10 h-10">
          <div className="animate-pulse bg-slate-300 rounded-full w-full h-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-32 h-32 rounded-md overflow-hidden relative",
        dragOverImage && "border-2 border-slate-500"
      )}>
      <input
        type="file"
        className="absolute w-full h-full opacity-0"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            vm.onImageUpload(file);
          }
          setDragOverImage(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOverImage(true);
        }}
        onDragLeave={() => setDragOverImage(false)}
      />
      {vm.item.data.avatar ? (
        <img
          alt="Ваша фотография"
          className="w-full h-full object-cover"
          src={vm.item.data.avatar ?? undefined}
        />
      ) : (
        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
          <PlusIcon className="w-10 h-10 text-slate-500" />
        </div>
      )}
    </div>
  );
});

import { Pet } from "@/api/models";
import { ProfileStore } from "@/stores/profile.store";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { Text } from "../typography/Text";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, CrossCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Animal, CatBloodType, DogBloodType } from "@/constants";
import { PopoverContent, Popover, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Switch } from "../ui/switch";
import { PetsEndpoint } from "@/api/endpoints/pet.endpoint";
import { useToast } from "../ui/use-toast";
import { homeStore } from "@/stores/home.service";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogTrigger } from "../ui/dialog";
import DonationDialog from "../dialogs/DonationDialog";
import { BloodDonationsEndpoint } from "@/api/endpoints/donations.endpoint";

type PetAvatarProps = {
  vm: ProfileStore;
  index: number;
};

function pluralizeDaysRussian(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return `${count} день`;
  } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return `${count} дня`;
  } else {
    return `${count} дней`;
  }
}

const PetAvatar: FC<PetAvatarProps> = observer(({ vm, index }) => {
  const [dragOverImage, setDragOverImage] = useState(false);

  if (vm.isPetsLoading) {
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
        "w-32 h-32 rounded-md overflow-hidden relative cursor-pointer",
        dragOverImage && "border-2 border-slate-500"
      )}>
      <input
        type="file"
        className="absolute w-full h-full opacity-0"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            vm.onPetImageUpload(file, index);
          }
          setDragOverImage(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOverImage(true);
        }}
        onDragLeave={() => setDragOverImage(false)}
      />
      {vm.pets[index]?.avatar ? (
        <img
          alt="Ваша фотография"
          className="w-full h-full object-cover cursor-pointer"
          src={vm.pets[index].avatar ?? undefined}
        />
      ) : (
        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
          <PlusIcon className="w-10 h-10 text-slate-500" />
        </div>
      )}
    </div>
  );
});

type PetEditableCardProps = {
  pet: Pet;
  vm: ProfileStore;
  index: number;
};

export const PetEditableCard: FC<PetEditableCardProps> = observer(({ vm, pet, index }) => {
  const [illness, setIllness] = useState("");
  const [bloodVolume, setBloodVolume] = useState("");
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(undefined);
  const [isNeedDonation, setIsNeedDonation] = useState(false);
  const { toast } = useToast();

  const applyFilters = () => {
    homeStore.bloodType = pet.bloodType as DogBloodType | CatBloodType | null;
    homeStore.bloodVolume = +bloodVolume;
    homeStore.expirationDate = expirationDate;
    homeStore.animal = pet.type === "dog" ? Animal.Dog : Animal.Cat;
  };

  return (
    <>
      <div className="relative flex flex-col bg-white rounded-sm w-full p-5">
        <div className="flex justify-end absolute top-5 right-5">
          <Button onClick={() => vm.savePet(index)} variant="outline">
            {vm.getIsNewPet(index) ? "Добавить питомца" : "Обновить данные"}
          </Button>
        </div>

        <div className="flex items-center gap-9 w-full">
          <PetAvatar vm={vm} index={index} />
          <div className="flex flex-col justify-between h-full">
            <Text.H4>Основное</Text.H4>

            <div className="flex gap-5">
              <fieldset className="gap-2 flex flex-col">
                <Label htmlFor="name">Кличка</Label>
                <Input
                  id="name"
                  value={pet.name}
                  onChange={(v) => (vm.pets[index].name = v.target.value)}
                />
              </fieldset>

              <fieldset className="gap-2 flex flex-col">
                <div className="grid min-w-40 flex-auto items-center gap-1.5">
                  <Label htmlFor="animal">Животное</Label>

                  <Select onValueChange={(value: Animal) => vm.setAnimal(value, index)}>
                    <SelectTrigger>
                      <SelectValue defaultValue={Animal.Dog} placeholder={Animal.Dog} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Animal).map((animal) => (
                        <SelectItem key={animal} value={animal}>
                          {animal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </fieldset>

              <fieldset className="gap-2 flex flex-col">
                <Label htmlFor="breed">Порода</Label>
                <Input
                  id="breed"
                  value={pet.breed}
                  onChange={(v) => (vm.pets[index].breed = v.target.value)}
                />
              </fieldset>
            </div>
          </div>
        </div>

        <div className="flex gap-5 flex-wrap mt-5">
          <fieldset className="grid  min-w-40 max-w-[200px] flex-auto items-center gap-1.5">
            <Label htmlFor="bloodType">Группа крови</Label>
            <Select
              value={vm.pets[index].bloodType ?? ""}
              onValueChange={(value: DogBloodType | CatBloodType) =>
                (vm.pets[index].bloodType = value)
              }>
              <SelectTrigger>
                <SelectValue placeholder={"Не выбрана"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"Не выбрана"}>Не выбрана</SelectItem>

                {vm.getBloodTypes(index).length &&
                  vm.getBloodTypes(index).map((bloodType) => (
                    <SelectItem key={bloodType} value={bloodType}>
                      {bloodType}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </fieldset>

          <fieldset className="gap-2 flex flex-col">
            <Label htmlFor="age">Возраст, лет</Label>
            <Input
              id="age"
              value={pet.age.toString()}
              onChange={(e) => vm.setBloodVolume(e.target.value.replace(/[^0-9]/g, ""), index)}
            />
          </fieldset>

          <fieldset className="gap-2 flex flex-col">
            <Label htmlFor="weight">Вес, кг</Label>
            <Input
              id="weight"
              value={pet.weight.toString()}
              onChange={(e) => vm.setWeight(e.target.value.replace(/[^0-9]/g, ""), index)}
            />
          </fieldset>
        </div>

        <div className="flex flex-col justify-between mt-5 w-full sm:w-1/2 gap-4">
          <Text.H4>Прививки</Text.H4>

          {pet.vaccines.map((vaccine, vaccineId) => (
            <>
              <div key={vaccineId} className="flex justify-between gap-4 items-end">
                <fieldset className="gap-2 flex flex-col">
                  {vaccineId === 0 && <Label htmlFor="vaccine">Название прививки</Label>}
                  <Input
                    id="vaccine"
                    value={vm.pets[index].vaccines[vaccineId].name}
                    onChange={(v) => (vm.pets[index].vaccines[vaccineId].name = v.target.value)}
                  />
                </fieldset>

                <fieldset className="grid flex-auto items-center gap-1.5">
                  {vaccineId === 0 && <Label htmlFor="date">Дата прививки</Label>}

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !vaccine.date && "text-muted-foreground"
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {vaccine.date ? format(vaccine.date, "PPP") : <span>Выбирте дату</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date(vaccine.date)}
                        onSelect={(date) => (vaccine.date = date?.toISOString() ?? "")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </fieldset>

                <Button
                  onClick={() => {
                    vm.removeVaccine(index, vaccineId);
                  }}
                  variant="outline"
                  size="icon">
                  <CrossCircledIcon className="h-4 w-4" />
                </Button>
              </div>
            </>
          ))}

          <div className="flex justify-end w-full mt-5">
            <Button
              onClick={() => {
                vm.addVaccine(index);
              }}
              variant="outline">
              Добавить прививку
            </Button>
          </div>
        </div>

        <hr className="border-t border-gray-200 mt-5 mb-5" />

        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              onCheckedChange={(value) => {
                setIsNeedDonation(value);
                if (value) {
                  pet.able_to_donate = false;
                }
              }}
              checked={isNeedDonation}
              id="needDonation"
            />
            <Label htmlFor="needDonation">Нуждается в переливании</Label>
          </div>

          <div className="flex items-center space-x-2">
            {pet.cooldown_donation_days <= 0 ? (
              <>
                <Switch
                  checked={pet.able_to_donate}
                  defaultChecked={pet.able_to_donate}
                  onCheckedChange={(value) => {
                    vm.pets[index].able_to_donate = value;

                    PetsEndpoint.setPetAbleToDonate(pet.id, value).then(() => {
                      toast({
                        title: "Статус изменен",
                        description: "Статус готовности к донорству изменен"
                      });
                    });
                  }}
                  id="readyToDonate"
                />
                <Label htmlFor="readyToDonate">Готов к донортсву</Label>
              </>
            ) : (
              `До следующей донации должно пройти ещё ${pluralizeDaysRussian(pet.cooldown_donation_days)}`
            )}
          </div>
        </div>

        {isNeedDonation && (
          <div className="flex gap-5 flex-wrap w-full mt-10">
            <div className="grid flex-auto items-center gap-1.5">
              <Label htmlFor="illness">Заболевание</Label>
              <Input
                onChange={(e) => setIllness(e.target.value)}
                value={illness}
                type="illness"
                id="illness"
                placeholder="Город"
              />
            </div>

            <div className="grid flex-auto items-center gap-1.5">
              <Label htmlFor="bloodVolume">Количество крови, мл</Label>
              <Input
                value={bloodVolume?.toString() ?? ""}
                onChange={(e) => setBloodVolume(e.target.value.replace(/[^0-9]/g, ""))}
                type="bloodVolume"
                id="bloodVolume"
                placeholder="0"
              />
            </div>

            <div className="grid flex-auto items-center gap-1.5">
              <Label htmlFor="bloodVolume">Дата окончания поиска</Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !expirationDate && "text-muted-foreground"
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expirationDate ? format(expirationDate, "PPP") : <span>Выбирте дату</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={expirationDate}
                    onSelect={(date) => setExpirationDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid flex-auto items-center gap-1.5 mt-10">
              <Link to={"/"}>
                <Button className={`relative min-w-40}`} onClick={() => applyFilters()}>
                  Найти донора
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="flex justify-start w-full mt-10">
          {pet.able_to_donate && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Добавить заявку на донорство</Button>
              </DialogTrigger>
              <DonationDialog
                confirmLabel="Добавить"
                description="Чтобы ее могли видеть другие пользователи"
                title="Добавить заявку на донорство"
                msgLabel="Заболевание"
                initialValue={0}
                callback={({ address, amount, date, msg }) => {
                  BloodDonationsEndpoint.postDonation({
                    amount,
                    address,
                    date: date?.toISOString().slice(0, -1) || "",
                    msg,
                    petId: pet.id
                  }).then(() => {
                    toast({
                      title: "Заявка добавлена",
                      description: "Заявка на донорство добавлена"
                    });
                  });
                }}
              />
            </Dialog>
          )}

          {isNeedDonation && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Добавить заявку на переливание</Button>
              </DialogTrigger>
              <DonationDialog
                confirmLabel="Добавить"
                description="Чтобы ее могли видеть другие пользователи"
                title="Добавить заявку на переливание"
                initialValue={0}
                msgLabel="Пожелание"
                callback={({ address, amount, date, msg }) => {
                  BloodDonationsEndpoint.postRequest({
                    amount,
                    address,
                    due_date: date?.toISOString().slice(0, -1) || "",
                    msg,
                    petId: pet.id
                  }).then(() => {
                    toast({
                      title: "Заявка добавлена",
                      description: "Заявка на переливание добавлена"
                    });
                  });
                }}
              />
            </Dialog>
          )}
        </div>
      </div>
    </>
  );
});

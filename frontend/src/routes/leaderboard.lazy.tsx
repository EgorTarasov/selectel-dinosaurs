import { Text } from "@/components/typography/Text";
import { mockUsers } from "@/constants/leaderboard-mock";
import { createLazyFileRoute } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import VictoryIcon from "@/assets/victory.svg";

const Leaderboard = observer(() => {
  return (
    <main className="section flex flex-col mt-10 pb-10">
      <Text.H2>Лучшие доноры</Text.H2>
      <Text.H3 className="mt-5">
        Вы на <span className="text-primary">первом</span> месте!
      </Text.H3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {mockUsers.map((user, index) => (
          <div key={index} className="flex p-4 rounded-lg bg-white relative gap-5">
            <Text.H4 className="flex justify-center items-center top-0 right-0 w-8 h-8 text-center bg-primary absolute text-white rounded-tr-lg rounded-bl-lg">
              <span>{index + 1}</span>
            </Text.H4>
            <img src={user.avatarSrc} alt="avatar" className="w-8 h-8 rounded-full" />
            <div className="flex flex-col">
              <Text.H4>{user.name}</Text.H4>
              <Text.Subtle>{user.city}</Text.Subtle>
              <div className="flex items-center mt-2 gap-1">
                <VictoryIcon />
                <Text.Small className="text-slate-500">{user.donationCount}</Text.Small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
});

export const Route = createLazyFileRoute("/leaderboard")({
  component: Leaderboard
});

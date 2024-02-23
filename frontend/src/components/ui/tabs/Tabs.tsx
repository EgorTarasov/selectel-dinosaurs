import { Text } from "@/components/typography/Text";
import { cn } from "@/lib/utils";
import { NoInfer } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";

interface TabsProps<T extends string> {
  tabs: T[];
  renderTab: (tab: T) => React.ReactNode;
  activeTab: NoInfer<T>;
  onTabChange: (tab: T) => void;
  variant?: "default" | "secondary";
}

export const Tabs = observer(<T extends string>(x: TabsProps<T>) => {
  const variant = x.variant ?? "default";
  return (
    <ul className={cn("flex align-end", variant === "secondary" && "gap-4")}>
      {x.tabs.map((tab) => (
        <li key={tab} className="flex-1 h-fit">
          <button
            onClick={() => x.onTabChange(tab)}
            className={cn(
              "w-full items-center border-b border-b-transparent py-3",
              x.activeTab === tab
                ? "text-foreground border-b border-b-primary"
                : `text-slate-400 ${variant === "default" && "border-b-slate-200"}`
            )}>
            {variant === "default" ? (
              <Text.H4 className="whitespace-nowrap px-2">{x.renderTab(tab)}</Text.H4>
            ) : (
              <Text.SubleSemi className="whitespace-nowrap px-2">{x.renderTab(tab)}</Text.SubleSemi>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
});

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { flushSync } from "react-dom";

export const Route = createLazyFileRoute("/playground")({
  component: About
});

function About() {
  const [count, setCount] = useState(0);

  const onClick = () => {
    flushSync(() => {
      setCount(count + 1);
    });
  };

  return (
    <div className="p-2">
      <Popover>
        <PopoverTrigger>Count is: {count}</PopoverTrigger>
        <PopoverContent>
          <Button onClick={onClick}>Click me</Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

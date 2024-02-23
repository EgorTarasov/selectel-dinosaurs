import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";

interface FormSchema {
  username: string;
}

const Index = observer(() => {
  const form = useForm<FormSchema>({
    defaultValues: {
      username: ""
    }
  });

  function onSubmit(data: FormSchema) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
  }

  return (
    <>
      <div className="section">
        <h1 className="">Данные для поиска</h1>
      </div>

      <div className="section rounded-xl bg-white border border-gray-200 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
});

export const Route = createFileRoute("/home")({
  component: () => <Index />
});

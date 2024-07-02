import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export function EditUserForm() {
  return (
    <form className="flex max-w-md flex-col gap-4">
      <div className="mb-2 block">
        <Label htmlFor="email1" value="Your email" />
      </div>
      <TextInput
        id="email1"
        type="email"
        placeholder="name@flowbite.com"
        required
      />
      <div className="mb-2 block">
        <Label htmlFor="password1" value="Your password" />
      </div>
      <TextInput id="password1" type="password" required />
      <Button type="submit">Submit</Button>
    </form>
  );
}

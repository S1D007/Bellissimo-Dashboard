import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAdmin } from "@/stores/useAdmin";

export default function UpdateCategory({ value = "", _id = "" }) {
  const { updateCategory }: any = useAdmin();
  const [category, setcategory] = useState(value);
  const [icon, seticon] = useState<File>();
  return (
    <main>
      <SheetHeader>
        <SheetTitle>update categories</SheetTitle>
        <SheetDescription>
          Make changes to your categories here. Click update when you're done.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-3 py-5">
        <Label htmlFor="newcategories" className="text-left">
          Name categories
        </Label>
        <Input
          id="newcategories"
          placeholder="e.g : medicines etc.."
          value={category}
          onChange={(e) => {
            setcategory(e.target.value);
          }}
          className="col-span-3"
          autoComplete={"off"}
        />
      </div>
      <div className="grid gap-3 mb-5">
        <Label htmlFor="newcategories" className="text-left">
          Update Icon
        </Label>
        <Input
          id="icon"
          type="file"
          onChange={(e: any) => {
            const file = e.target.files[0];
            seticon(file);
          }}
          // className="col-span-3"
          autoComplete={"off"}
        />
      </div>
      <SheetFooter>
        <SheetClose>
          <Button
            type="submit"
            onClick={() => updateCategory({
                name: category,
                icon,
            }, _id)}
          >
            Update Categories
          </Button>
        </SheetClose>
      </SheetFooter>
    </main>
  );
}

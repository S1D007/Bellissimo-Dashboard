"use client";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/stores/useAdmin";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdModeEdit, MdDelete } from "react-icons/md";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateCategories from "./CreateCategories";
import UpdateCategory from "./UpdateCategory";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Categories() {
  const { fetchAllCategory, allCategory, deleteCategory } = useAdmin();
  const [categoriesList, setcategoriesList] = useState(allCategory);
  useEffect(() => {
    fetchAllCategory();
  }, []);
  // update categories
  useEffect(() => {
    setcategoriesList(allCategory);
  }, [allCategory]);

  return (
    <main>
      <header className="flex items-center gap-5 justify-between my-5">
        <div>
          <h1 className="d_heading">All categories</h1>
          <h1 className="d_paragraph">View and manage all categories</h1>
        </div>
        {/*  */}
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add categories</Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <CreateCategories />
          </SheetContent>
        </Sheet>
      </header>
      {/* categores  */}
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.No</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoriesList.length == 0 ? (
            <p>No Category Found</p>
          ) : (
            <>
              {categoriesList.map((e: any, i: any) => (
                <TableRow key={e._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell><img src={e.icon} style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain",
                    borderRadius: "50%",
                  }} /></TableCell>
                  {/* <TableCell className="font-medium select-text">{e._id}</TableCell> */}
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{new Date(e.createdAt).toDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="ml-auto flex items-center w-fit justify-center gap-3">
                      {/* update sheet */}
                      <Sheet>
                        <SheetTrigger asChild>
                          <MdModeEdit />
                        </SheetTrigger>
                        <SheetContent side={"left"}>
                          <UpdateCategory value={e.name} _id={e._id} />
                        </SheetContent>
                      </Sheet>

                      {/* delete category modal */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <MdDelete />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Delte category {e.name}</DialogTitle>
                            <DialogDescription>
                              This process is not reversible are you sure want
                              to delte this category
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogTrigger asChild>
                              <Button variant="outline">No , keep it</Button>
                            </DialogTrigger>
                            <DialogTrigger asChild>
                              <Button
                                variant="destructive"
                                onClick={() => {
                                  alert("You cant delete category now! Please contact Siddhant");
                                  // deleteCategory(e._id);
                                }}
                              >
                                Yes , delete
                              </Button>
                            </DialogTrigger>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
        <TableFooter className="fixed bottom-0 right-0" >
          <TableRow>
            <TableCell colSpan={3}>total</TableCell>
            <TableCell className="text-right">{allCategory.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
}

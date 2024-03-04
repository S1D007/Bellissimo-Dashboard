"use client";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/stores/useAdmin";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TbEyeSearch } from "react-icons/tb";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Users() {
  const { fetchAllUsers, allUsers }: any = useAdmin();
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <main>
      <header className="flex items-center gap-5 justify-between my-5">
        <div>
          <h1 className="d_heading">All Users</h1>
          <h1 className="d_paragraph">View and manage Users</h1>
        </div>
        {/*  */}
      </header>
      {/* categores  */}
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[2rem]">S.No</TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers.length == 0 ? (
            <p className="w-full">No Users Found</p>
          ) : (
            <>
              {allUsers.map((e: any, i: any) => (
                <TableRow key={e._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  {/* <TableCell className="font-medium select-text">{e._id}</TableCell> */}
                  <TableCell>{e.name.firstName}</TableCell>
                  <TableCell>{e.name.lastName}</TableCell>
                  <TableCell>{e.phoneNumber}</TableCell>
                  <TableCell>{e.email}</TableCell>
                  <TableCell>{new Date(e.createdAt).toDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="ml-auto flex items-center w-fit justify-center gap-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <TbEyeSearch />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{e.name.firstName}</DialogTitle>
                            <DialogDescription>
                              Phone Number: {e.phoneNumber}<br/>
                              Email: {e.email}
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogTrigger asChild>
                              <Button variant="outline">close</Button>
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}>total</TableCell>
            <TableCell className="text-right">{allUsers.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
}

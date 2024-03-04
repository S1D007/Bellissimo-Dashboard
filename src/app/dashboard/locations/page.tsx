"use client"
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/stores/useAdmin'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MdModeEdit, MdDelete } from "react-icons/md";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateLocation from './CreateLocation'
import UpdateLocation from './UpdateLocation'

export default function Location() {
  const { fetchAllLocation, allLocations, deleteLocation }: any = useAdmin();
  useEffect(() => {
    fetchAllLocation()
  }, [])


  return (
    <main>
      <header className='flex items-center gap-5 justify-between my-5'>
        <div>
          <h1 className='d_heading'>Delivery location</h1>
          <h1 className='d_paragraph'>View and manage Delivery location</h1>
        </div>
        {/*  */}
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add Location</Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <CreateLocation />
          </SheetContent>
        </Sheet>
      </header>
      {/* categores  */}
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.No</TableHead>
            <TableHead>name</TableHead>
            <TableHead>pincode</TableHead>
            <TableHead>charge</TableHead>
            <TableHead>location</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allLocations.length == 0 ? <p>no products found</p> :
            <>
              {allLocations.map((e: any, i: any) => (
                <TableRow key={e._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  {/* <TableCell className="font-medium select-text">{e._id}</TableCell> */}
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.pincode}</TableCell>
                  <TableCell>{e.deliveryCharge}</TableCell>
                  <TableCell>{e.location}</TableCell>
                  <TableCell>{new Date(e.createdAt).toDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className='ml-auto flex items-center w-fit justify-center gap-3'>
                      {/* update sheet */}
                      <Sheet>
                        <SheetTrigger asChild>
                          <MdModeEdit />
                        </SheetTrigger>
                        <SheetContent side={"left"}>
                          <UpdateLocation
                            vName={e.name}
                            vPincode={e.pincode?.toString()}
                            vDeliveryCharge={e.deliveryCharge?.toString()}
                            vLocation={e.location}
                            _id={e._id} />
                        </SheetContent>
                      </Sheet>

                      {/* delete category modal */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <MdDelete />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Delte delivery location {e.name}</DialogTitle>
                            <DialogDescription>
                              This process is not reversible are you sure want to delte this category
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogTrigger asChild>
                              <Button variant="outline">No , keep it</Button>
                            </DialogTrigger>
                            <DialogTrigger asChild>
                              <Button variant="destructive" onClick={() => { deleteLocation(e._id) }}>Yes , delete</Button>
                            </DialogTrigger>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          }
        </TableBody>
        <TableFooter className="fixed bottom-0 right-0">
          <TableRow>
            <TableCell colSpan={6}>total</TableCell>
            <TableCell className='text-right'>{allLocations.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  )
}

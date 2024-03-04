"use client"
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/stores/useAdmin'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TbEyeSearch } from "react-icons/tb";
import { Badge } from "@/components/ui/badge"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Orders() {
  const { fetchAllOrders, allOrders }: any = useAdmin();
  useEffect(() => {
    if(allOrders.length == 0)
        fetchAllOrders()
  }, [])

  return (
    <main>
      <header className='flex items-center gap-5 justify-between my-5'>
        <div>
          <h1 className='d_heading'>All orders</h1>
          <h1 className='d_paragraph'>View and manage Orders</h1>
        </div>
        {/*  */}

      </header>
      {/* categores  */}
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[2rem]">S.No</TableHead>
            <TableHead>name</TableHead>
            <TableHead>contact</TableHead>
            <TableHead>product name</TableHead>
            <TableHead>price</TableHead>
            <TableHead>status</TableHead>
            <TableHead>paymentMethod</TableHead>
            <TableHead>order At</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allOrders.length == 0 ? <p>no orders found</p> :
            <>
              {allOrders.map((e: any, i: any) => (
                <TableRow key={e._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  {/* <TableCell className="font-medium select-text">{e._id}</TableCell> */}
                  <TableCell className='truncate'>{e.user.name.firstName+" " + e.user.name.lastName}</TableCell>
                  <TableCell>{e?.user.phoneNumber || e?.user?.email}</TableCell>
                  <TableCell className='truncate'>{e?.product?.name.length > 20 ? e?.product?.name.slice(0,20)+"..." :e?.product?.name.slice(0,20)}</TableCell>
                  <TableCell className='truncate'>{e?.status}</TableCell>
                  <TableCell className='truncate'><Badge>{e?.status}</Badge></TableCell>
                  <TableCell className='truncate'>{e?.paymentMethod}</TableCell>
                  <TableCell>{new Date(e.createdAt).toDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className='ml-auto flex items-center w-fit justify-center gap-3'>
                      <Dialog>
                        <DialogTrigger asChild>
                          <TbEyeSearch />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                        hii
                          <DialogFooter>
                            <DialogTrigger asChild>
                              <Button variant="outline">ok</Button>
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}>total</TableCell>
            <TableCell className='text-right'>{allOrders.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  )
}


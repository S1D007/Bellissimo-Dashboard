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
import { MdModeEdit, MdDelete } from "react-icons/md";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewProduct from "./NewProduct";
import UpdateProduct from "./UpdateProduct";

export default function Products() {
  const {
    fetchAllProducts,
    allProducts,
    deleteLocation,
    fetchAllCategory,
    fetchAllLocation,
    deleteProducts,
    removeUpdatdData,
  } = useAdmin();
  useEffect(() => {
    fetchAllProducts();
    fetchAllCategory();
    fetchAllLocation();
  }, []);

  return (
    <main>
      <header className="flex items-center gap-5 justify-between my-5">
        <div>
          <h1 className="d_heading">Products</h1>
          <h1 className="d_paragraph">view and manage all products</h1>
        </div>
        {/*  */}
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add Products</Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <NewProduct />
          </SheetContent>
        </Sheet>
      </header>
      {/* categores  */}
      <Table className="visibleScrollBar">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className="capitalize text-center">
            <TableHead className="w-[2rem]">S.No</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Total price</TableHead>
            <TableHead>gstRate</TableHead>
            <TableHead>multiPack</TableHead>
            <TableHead>stock</TableHead>
            {/* <TableHead>reviews</TableHead> */}
            {/* <TableHead>variants</TableHead> */}
            <TableHead>eanCode</TableHead>
            <TableHead>hsnCode</TableHead>
            <TableHead>size</TableHead>
            <TableHead>Locations</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {allProducts.length == 0 ? (
            <p>no products found</p>
          ) : (
            <>
              {allProducts.map((e: any, i: any) => (
                <TableRow key={e._id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  {/* <TableCell className="font-medium select-text">{e._id}</TableCell> */}
                  <TableCell>
                    <img
                      src={e.images[0]}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                        borderRadius: "50%",
                      }}
                    />
                  </TableCell>
                  <TableCell>{e.name}</TableCell>
                  <TableCell className="flex gap-2 items-center justify-center">
                    {e.discount?.percentage > 0 ? (
                      <p className="line-through text-white">{e.price}</p>
                    ) : null}
                    {e.discount?.percentage > 0 ? (
                      <p className="font-bold text-white ">
                        {e.discount?.newAmount}rs
                      </p>
                    ) : null}
                    {/* {e.discount?.percentage === 0 ? (
                      <p className="font-semibold text-gray-200 line-through">
                        {e.price}
                      </p>
                    ) : (
                      <p className="font-bold text-white ">{e.price}</p>
                    )} */}
                  </TableCell>
                  <TableCell>{e.gstRate}%</TableCell>
                  <TableCell>{e.multiPack == true ? "Yes" : "No"}</TableCell>
                  <TableCell>{e.stock}</TableCell>
                  {/* <TableCell>{e.reviews.length}</TableCell> */}
                  {/* <TableCell>{e.variants.length}</TableCell> */}
                  <TableCell>{e.eanCode}</TableCell>
                  <TableCell>{e.hsnCode}</TableCell>
                  <TableCell>
                    {e?.size?.amount}
                    {e?.size?.unit.toUpperCase()}
                  </TableCell>
                  <TableCell>{e.deliveryLocations.length} place</TableCell>
                  <TableCell>{new Date(e.createdAt).toDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="ml-auto flex items-center w-fit justify-center gap-3">
                      {/* update sheet */}
                      <Sheet>
                        <SheetTrigger asChild>
                          <MdModeEdit />
                        </SheetTrigger>
                        <SheetContent
                          onCloseAutoFocus={() => {
                            removeUpdatdData();
                          }}
                          side={"left"}
                        >
                          <UpdateProduct
                            _id={e._id}
                            name={e?.name}
                            price={e?.price}
                            gstRate={e?.gstRate}
                            multiPack={e?.multiPack}
                            stock={e?.stock}
                            eanCode={e?.eanCode}
                            hsnCode={e?.hsnCode}
                            deliveryLocations={e?.deliveryLocations}
                            category={e?.category}
                            description={e?.description}
                            discount={e?.discount}
                            howToUse={e?.howToUse}
                            images={e?.images}
                            size={e?.size}
                          />
                        </SheetContent>
                      </Sheet>

                      {/* delete category modal */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <MdDelete />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Delete Product {e.name}</DialogTitle>
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
                                  deleteProducts(e._id);
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
        <TableFooter className="w-full">
          <TableRow>
            <TableCell colSpan={6}>Total</TableCell>
            <TableCell className="text-right">{allProducts.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
}

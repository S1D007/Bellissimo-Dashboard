"use client"
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/stores/useAdmin";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export default function Page() {
  // image array 
  const {crousalImage , fetchcarousel ,Deletecarousel , Addcarousel}:any = useAdmin();
  React.useEffect(() => {
    if(crousalImage.length == 0){
      fetchcarousel()
    }
}, [])
const [image, setimage] = React.useState('')

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <main className="p-2 flex flex-col items-center justify-center flex-wrap">
     <header className="flex flex-col items-center gap-5 justify-between my-5">
        <div>
          <h1 className="d_heading">All crausal images</h1>
          <h1 className="d_paragraph">View and manage  crausal images</h1>
        </div>
        {/*  */}
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add new image</Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
          <Input
          className="my-4"
          id="image"
          type="file"
          onChange={async(e: any) => {
            setimage(e.target.files[0]);
          }}
          // className="col-span-3"
          autoComplete={"off"}
        />
          <SheetClose>
          <Button
            type="submit"
            onClick={() => {
              Addcarousel({ image });
            }}
          >
            Add New Crousal Image
          </Button>
        </SheetClose>
          </SheetContent>
        </Sheet>
      </header>
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-sm mx-auto"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {crousalImage?.map((e:any, index:number) => (
            <CarouselItem className="w-full">
              <img className="rounded" src={e?.image}/>
              <Button variant={"destructive"} onClick={()=>{
                Deletecarousel(e._id)
              }} className="m-2">Delete</Button>
              </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}

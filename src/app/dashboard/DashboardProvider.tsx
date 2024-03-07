"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import DashboardSidebar from "@/components/local/DashboardSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/stores/useAuth";
import Link from "next/link";
import { useAdmin } from "@/stores/useAdmin";
import ModelSpinner from "@/components/local/ModelSpinner";

export default function DashboardProvider({ children }: any) {
  const { isLogged, fetchLogin, fetchLoading }: any = useAuth();
  const {isLoading }:any = useAdmin();
  const { setTheme } = useTheme();
  useEffect(() => {
    fetchLogin();
      }, []);
  if (fetchLoading) {
    return <ModelSpinner/>;
  }
  if (!isLogged) {
    return (
      <div className="flex flex-col gap-3 items-center h-[100vh] justify-center w-full">
        <h1 className="text-lg font-semibold capitalize text-center">
          it seems you are not logged , <br /> please login to access dashboard
        </h1>
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="overflow-hidden h-[100vh] w-[100vw] flex flex-col">
      {/* top nav */}
      {isLoading && <ModelSpinner/>}
      <nav className="h-[5rem] flex items-center justify-between bg-primary-foreground px-5 shadow">
        <h1 className="text-xl font-bold italic">Bellismo dashboard</h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="icon"
            className=" w-[2.5rem] h-[2.5rem]"
          >
            <SunIcon
              className="p-2 w-full h-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:hidden"
              onClick={() => {
                setTheme("dark");
              }}
            />
            <MoonIcon
              className="p-2 w-full h-full  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hidden dark:block"
              onClick={() => {
                setTheme("light");
              }}
            />
            <span className="sr-only">theme</span>
          </Button>
          {/* profile */}
          {isLogged ? (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </nav>

      {/* flex layout for dashboard and navbar */}
      <section className="flex flex-row h-[100%] w-full overflow-hidden">
        {/* sidebar navigation */}
        <nav className="overflow-hidden overflow-y-auto h-full bg-primary-foreground/50 min-w-[16rem] flex  flex-col p-1 gap-1">
          <DashboardSidebar />
        </nav>
        {/* children */}
        <section className="overflow-hidden overflow-y-auto flex-1 flex  flex-col gap-32 p-2">
          {children}
        </section>
      </section>
    </main>
  );
}

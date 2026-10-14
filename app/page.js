import { Suspense } from "react";
import Home from "@/components/Home";
import HomeNews from "@/components/HomeNews";

export default function Page() {
  return (
    <Home
      news={
        <Suspense>
          <HomeNews />
        </Suspense>
      }
    />
  );
}

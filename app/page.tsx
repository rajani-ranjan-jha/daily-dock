import Image from "next/image";
import Weather from "./components/Weather";
import Quotes from "./components/Quote";

export default function Home() {
  return (
    <div className="font-poppins flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      
      {/* <Weather/> */}
      <Quotes/>
      
    </div>
  );
}

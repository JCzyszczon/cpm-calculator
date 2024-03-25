import Image from "next/image";
import MainPanel from "./components/mainPanel";

export default function Home() {
  return (
    <main className="w-full flex flex-row justify-center items-center min-h-screen ">
      <MainPanel/>
    </main>
  );
}

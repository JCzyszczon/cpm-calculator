import MainPanel from "./components/mainPanel";
import LearnMore from "./components/learnMore";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className='w-full flex flex-col justify-start items-center min-h-screen mt-[68px]'>
      <MainPanel />
      <LearnMore />
      <Footer />
    </main>
  );
}

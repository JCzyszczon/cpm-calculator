import MainPanel from "./components/mainPanel";
import LearnMore from "./components/learnMore";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="w-full flex flex-col justify-center items-center min-h-screen">
      <MainPanel/>
      {/*<LearnMore/>
      <Footer/>*/}
    </main>
  );
}

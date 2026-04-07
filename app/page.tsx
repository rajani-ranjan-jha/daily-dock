import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="handle-scroll font-poppins flex flex-col min-h-screen bg-foreground dark:bg-background text-primary dark:text-foreground">
      <Header />
      <LandingPage />
      {/* <Hero/> */}
      <Footer/>
    </div>
  );
}

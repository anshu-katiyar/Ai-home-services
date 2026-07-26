
import MainLayout from "../layouts/MainLayout";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import Stats from "../components/home/Stats";
import WhyChooseUs from "../components/home/WhyChooseUs";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Categories />
      <Stats />
      <WhyChooseUs />
    </MainLayout>
  );
}
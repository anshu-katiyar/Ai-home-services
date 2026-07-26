
import MainLayout from "../layouts/MainLayout";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import Stats from "../components/home/Stats";
import WhyChooseUs from "../components/home/WhyChooseUs";
import PopularProviders from "../components/home/PopularProviders";




export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Categories />
      <Stats />
      <WhyChooseUs />
      <PopularProviders />
    </MainLayout>
  );
}
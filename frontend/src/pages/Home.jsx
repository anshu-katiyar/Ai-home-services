
import MainLayout from "../layouts/MainLayout";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import Stats from "../components/home/Stats";


export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Categories />
      <Stats />
    </MainLayout>
  );
}
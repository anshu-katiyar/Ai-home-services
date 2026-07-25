{/* <div className="bg-red-500 text-white text-3xl p-5 text-center">
  Tailwind Working
</div>


import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import PopularServices from "../components/PopularServices";
import WhyChooseUs from "../components/WhyChooseUs";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <PopularServices />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;

 */}


//  export default function Home() {
//   return (
//     <div className="bg-red-500 text-white text-5xl p-10">
//       Tailwind Working 🚀
//     </div>
//   );
// }


// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import Categories from "../components/Categories";
// import Footer from "../components/Footer";

// export default function Home() {
//   return (
//     <div className="bg-slate-50 min-h-screen">
//       <Navbar />
//       <Hero />
//       <Categories />
//       <Footer />
//     </div>
//   );
// }

import MainLayout from "../layouts/MainLayout";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Categories />
    </MainLayout>
  );
}
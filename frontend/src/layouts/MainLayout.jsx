import Footer from "../components/layout/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
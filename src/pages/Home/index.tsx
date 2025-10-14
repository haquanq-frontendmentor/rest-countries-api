import { Header } from "@/components/Header";
import { Container } from "@/layouts/Container";
import { CountrySection } from "./components/CountrySection";

export const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <CountrySection />
        </Container>
      </main>
    </>
  );
};

import { Header } from "@/components/Header";
import { Container } from "@/layouts/Container";
import { CountrySection } from "./components/CountrySection";

export const Home = () => {
  return (
    <>
      <Header title="Where in the world" />
      <main>
        <Container>
          <CountrySection />
        </Container>
      </main>
    </>
  );
};

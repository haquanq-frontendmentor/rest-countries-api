import { Country } from "./components/Country/Country";
import { Header } from "./components/Header";
import { Container } from "./layouts/Container";

export const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-blue-950">
      <Header />
      <main>
        <Container>
          <Country />
        </Container>
      </main>
    </div>
  );
};

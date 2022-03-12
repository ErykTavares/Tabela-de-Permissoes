import Footer from "./components/Footer";
import Header from "./components/Header";
import Permissions from "./components/pages/Permissions";
import { GlobalStyled } from "./components/style/GlobalStyled";


function App() {
  return (
    <main>
      <GlobalStyled />
      <Header />
      <Permissions />
      <Footer />
    </main>
  );
}

export default App;

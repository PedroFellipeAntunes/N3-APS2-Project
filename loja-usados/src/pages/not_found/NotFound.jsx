import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { Link } from "react-router-dom";
import './index.css'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="notFound_main">
        <div>
          <h1>
              Esta página não existe
          </h1>
          <Link to="/">
            <h2>Voltar para a página inicial</h2>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
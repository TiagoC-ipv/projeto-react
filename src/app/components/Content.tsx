import { useEffect, useState } from "react";
import "./style.css";
import HeroInfo from "./HeroInfo";
import Loader from "../components/Loader";
import { useHeroes } from "../context/herocontext";
 import "../components/content.css"
export default function Content() {
  const { heroes, favorites } = useHeroes(); 
  const [loading, setLoading] = useState(true);
 
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
 
    return () => clearTimeout(timer);
  }, []);
 
  const favoriteHeroes = heroes
    .filter((hero) => favorites.includes(hero.id))
    .slice(0, 5);
 
  return (
    <main>
      <div className="fav-and-heroes">
        <h4 style={{ textAlign: "center", marginTop: "1%", marginBottom: "1%" }}>
          Top-3 Heróis Favoritos
        </h4>
 
        <br />
 
        <div className="imagensClass">
          {favoriteHeroes.map((hero) => (
            <HeroInfo
              key={hero.id}
              nome={hero.name}
              imagem={hero.image}
              superpower={hero.superpower}
            />
          ))}
         
        </div>
 
        <hr style={{ margin: "32px 0", borderColor: "#1f2937" }} />
 
        <h4 style={{ textAlign: "center", marginBottom: "1%" }}>
          Todos os Heróis
        </h4>
 
        <div className="imagensClass">
          {heroes.map((hero) => (
            <HeroInfo
              key={hero.id}
              nome={hero.name}
              imagem={hero.image}
              superpower={hero.superpower}
            />
          ))}
        </div>
{loading && <Loader />}
       
      </div>
    </main>
  );
}
 
 
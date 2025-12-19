import Link from "next/link";
import "./style.css";

interface HeaderProps {
  my_name: string;
  project_name: string;
}

export default function Header({ my_name, project_name }: HeaderProps) {
  return (
    <header className="imgHeader">
      <img
        className="img"
        src="https://images.hdqwalls.com/wallpapers/marvels-avengers-logo-lk.jpg"
        alt="Imagem Header"
      />

      <div className="class">
        <h1>{project_name}</h1>
        <h2>feito por {my_name}</h2>

        
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

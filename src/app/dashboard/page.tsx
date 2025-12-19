"use client";
 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHeroes } from "../context/herocontext";
import "../dashboard/dashboards.css";

export default function DashboardPage() {
  const {
    heroes,
    favorites,
    handleDelete,
    handleToggleFavorite,
    canEdit,
  } = useHeroes();

  const router = useRouter();
 
  const handleEdit = (id: number) => {
    router.push(`/dashboard/form?id=${id}`);
  };
 
  const truncate = (text: string, max: number) =>
    text.length > max ? text.slice(0, max - 3) + "..." : text;
 
  const MAX_FAVORITES = 3;
 
  const onToggleFavoriteClick = (id: number) => {
    const isFav = favorites.includes(id);
 
    if (isFav) {
      handleToggleFavorite(id);
      return;
    }
 
    if (favorites.length >= MAX_FAVORITES) {
      window.alert(`Só podes ter até ${MAX_FAVORITES} favoritos.`);
      return;
    }
 
    handleToggleFavorite(id);
  };
 
  const onDeleteClick = (id: number, name: string) => {
    const ok = window.confirm(
      `Tens a certeza que queres eliminar: ${name}?`
    );
    if (!ok) return;
    handleDelete(id);
  };
 
  return (
    <main className="dashboard">
      <h1>Dashboard</h1>
 
      
      <Link href="/dashboard/form">Adicionar Super-Herói</Link>
 
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Superpoder</th>
            <th>Ações</th>
          </tr>
        </thead>
 
        <tbody>
          {heroes.map((hero) => (
            <tr key={hero.id}>
              <td>{hero.id}</td>
 
              <td>
                <img src={hero.image} alt={hero.name} width={60} />
              </td>
 
              <td title={hero.name}>
                {truncate(hero.name, 20)}
              </td>
 
              <td title={hero.superpower?.trim() || "N/D"}>
                {truncate(
                  hero.superpower?.trim() || "N/D",
                  20
                )}
              </td>
 
              <td>
                <button
                  type="button"
                  disabled={!canEdit}
                  onClick={() =>
                    onDeleteClick(hero.id, hero.name)
                  }
                >
                  Eliminar
                </button>
 
                <button
                  type="button"
                  disabled={!canEdit}
                  onClick={() =>
                    onToggleFavoriteClick(hero.id)
                  }
                  className={
                    favorites.includes(hero.id)
                      ? "fav-btn is-fav"
                      : "fav-btn"
                  }
                >
                  {favorites.includes(hero.id)
                    ? "Remover Favorito"
                    : "Adicionar Favorito"}
                </button>
 
                <button
                  type="button"
                  disabled={!canEdit}
                  onClick={() => handleEdit(hero.id)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
    
  );
}

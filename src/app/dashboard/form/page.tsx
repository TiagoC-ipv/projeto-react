"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useHeroes } from "../../context/herocontext";
import "../../dashboard/form/addstyle.css";

type HeroFormState = {
  id?: number;
  name: string;
  image: string;
  superpower: string;
};

export default function HeroFormPage() {
  const { heroes, handleFormSubmit } = useHeroes();
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");

  const [hero, setHero] = useState<HeroFormState>({
    id: undefined,
    name: "",
    image: "",
    superpower: "",
  });

  useEffect(() => {
    if (!idParam) return;

    const id = Number(idParam);
    const existing = heroes.find((h) => h.id === id);

    if (existing) {
      setHero({
        id: existing.id,
        name: existing.name,
        image: existing.image,
        superpower: existing.superpower ?? "",
      });
    }
  }, [idParam, heroes]);

  const isEditMode = !!hero.id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHero((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFormSubmit({
      id: hero.id,
      name: hero.name,
      image: hero.image,
      superpower: hero.superpower,
    });
    router.push("/dashboard");
  };

  return (
    <main className="hero-form">
      <h1>{isEditMode ? "Editar Super-Herói" : "Adicionar Super-Herói"}</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={hero.name}
              onChange={handleChange}
              required
              placeholder="Ex: Batman"
            />
          </label>
        </div>

        <div>
          <label>
            Imagem (URL):
            <input
              type="text"
              name="image"
              value={hero.image}
              onChange={handleChange}
              required
              placeholder="https://..."
            />
          </label>
        </div>

        <div className="full">
          <label>
            Superpoder:
            <input
              type="text"
              name="superpower"
              value={hero.superpower}
              onChange={handleChange}
              placeholder="Ex: Super força"
            />
          </label>
        </div>

        <div className="actions">
          <button type="submit">Gravar</button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="btn-back"
          >
            Voltar
          </button>
        </div>
      </form>
    </main>
  );
}

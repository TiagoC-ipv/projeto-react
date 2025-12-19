"use client";

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
        {/* ... resto igual ... */}
      </form>
    </main>
  );
}

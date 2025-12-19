import { Suspense } from "react";
import HeroFormPage from "./HeroFormPage";

export default function Page() {
  return (
    <Suspense fallback={<div>A carregar...</div>}>
      <HeroFormPage />
    </Suspense>
  );
}

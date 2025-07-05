import { Suspense } from "react";
import { Routes } from "@/routes";

function App() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <Routes />
    </Suspense>
  );
}

export default App;

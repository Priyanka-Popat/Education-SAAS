import { Suspense } from "react";
import { Routes } from "@/routes";
import ClickSpark from "@/components/ui/click-spark";

function App() {
  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <Routes />
      </Suspense>
    </ClickSpark>
  );
}

export default App;

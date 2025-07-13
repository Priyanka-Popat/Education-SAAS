import { Suspense } from "react";
import { Routes } from "@/routes";
import ClickSpark from "@/components/ui/click-spark";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#131313", 
            color: "white",
            border: "2px solid #713CE9", 
            padding: "12px 16px",
            borderRadius: "0.75rem", 
            fontSize: "0.875rem",
          },
          success: {
            iconTheme: {
              primary: "#4ade80", 
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#f87171", 
              secondary: "white",
            },
          },
        }}
      />
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <Routes />
      </Suspense>
    </ClickSpark>
  );
}

export default App;

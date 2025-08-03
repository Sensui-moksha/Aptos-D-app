import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Add a type for window.aptos to avoid TypeScript errors
interface Window {
  aptos?: {
    isConnected: () => Promise<boolean>;
    connect: () => Promise<void>;
    account: () => Promise<{ address: string }>;
    disconnect: () => Promise<void>;
  };
}

export default function FirstPage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function check() {
      if (!window.aptos) {
        alert("Aptos wallet not found.");
        navigate("/");
        return;
      }
      try {
        const isConnected = await window.aptos.isConnected();
        console.log("Is connected:", isConnected);
        if (!isConnected) {
          alert("You are not connected to the wallet, redirecting to main page");
          console.log("Not connected, redirecting to home page.");
          navigate("/");
        } else {
          const add = await window.aptos.account();
          console.log("Account address:", add?.address);
        }
      } catch (error) {
        console.error("Error checking Aptos wallet:", error);
        alert("Error checking Aptos wallet.");
        navigate("/");
      }
    }
    check();
  }, [navigate]);

  async function Disconnfun() {
    if (window.aptos) {
      try {
        await window.aptos.disconnect();
      } catch (error) {
        console.error("Error disconnecting Aptos wallet:", error);
        alert("Error disconnecting Aptos wallet.");
      }
    }
    navigate("/");
  }

  return (
    <div>
      <p>This is the first page of your application.</p>
      <button onClick={Disconnfun}>Disconnect</button>
    </div>
  );
}
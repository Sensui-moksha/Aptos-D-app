import { useNavigate } from "react-router-dom";

// Add a type for window.aptos to avoid TypeScript errors
declare global {
    interface Window {
        aptos?: {
            isConnected: () => Promise<boolean>;
            connect: () => Promise<void>;
            account: () => Promise<{ address: string }>;
        };
    }
}

export default function Home() {
    const navigate = useNavigate();

    async function connectbtn() {
        if (!window.aptos) {
            alert("Aptos wallet not found.");
            return;
        }
        try {
            const isconnected = await window.aptos.isConnected();
            console.log("Is connected:", isconnected);
            if (!isconnected) {
                await window.aptos.connect();
                navigate("/first");
            } else {
                console.log("Already connected");
                const add = await window.aptos.account();
                console.log("Account address:", add?.address);
                navigate("/first");
            }
        } catch (error) {
            console.error("Error connecting to Aptos wallet:", error);
            alert("Failed to connect to Aptos wallet.");
        }
    }

    return (
        <>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of your application.</p>
            <button onClick={connectbtn}>Connect</button>
        </>
    );
}
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function FirstPage() {

    useEffect(() => {
        checkConnection()
    }, []);

    async function checkConnection() {
        const isConnected = await window.aptos.isConnected();
        console.log("Is connected:", isConnected);
        if (!isConnected) {
            alert("you are not connected to the wallet, redirecting to main page");
            console.log("Not connected, redirecting to home page.");
            navigate("/");
        } else {
            var add = await window.aptos.account();
            console.log("Account address:", add?.address);
        }
    }

    var navigate = useNavigate();

    async function Disconnfun() {
        window.aptos.disconnect();
        navigate("/");
    }



    return (
        <div>
            <p>This is the first page of your application.</p>
            <button onClick={Disconnfun}>Disconnect</button>
        </div>
    )
}
'use client';
import React, { useState } from "react";
import WalletConnectModal from "./wallet-connect-modal";
import WalletConnectButton from "./wallet-connect-button";
import { useWalletConnect } from "../hooks/wallet-connect.hook";
export default function WalletConnectComponent() {
    const { qrCode } = useWalletConnect();
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

    return (
        <>
            <WalletConnectButton onConnect={() => {
                console.log("connect");
                setIsModalOpen(true);
            }} />
            {isModalOpen && <WalletConnectModal value={qrCode} onClose={() => setIsModalOpen(false)} />}
        </>
    );
}
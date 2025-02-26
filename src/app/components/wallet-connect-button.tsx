'use client'

import { useWalletConnect } from "../hooks/wallet-connect.hook";

interface WalletConnectButtonProps {
  onConnect: () => void;
}

export default function WalletConnectButton({ onConnect }: WalletConnectButtonProps) {
  const { 
    connect,
    disconnect,
  } = useWalletConnect();

  async function connectWallet() {
    const accounts = await connect(
      process.env.NEXT_PUBLIC_REOWN_PROJECT_ID as string, 
      [1, 137, 8453, 42161],
      ["personal_sign", "eth_sendTransaction"]
    );

    console.log(accounts);
    
    onConnect();
  }

  return (
    <div>
      <button onClick={connectWallet}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
};
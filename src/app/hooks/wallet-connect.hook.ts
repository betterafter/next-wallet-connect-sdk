import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { useState } from "react";

export interface QrCodeProps {
    qrCode: string;
}

export function useWalletConnect() {
    const [ provider, setProvider ] = useState<any>(null);
    const [ qrCode, setQrCode ] = useState<string | null>(null);
    const [ isConnected, setIsConnected ] = useState<boolean>(false);

    async function connect(
        projectId: string,
        chainIds: number[],
        methods: string[],
    ) {
        try {
            const provider = await EthereumProvider.init({
                projectId,
                chains: chainIds,
                methods: methods,
                optionalChains: [1], // Add required optionalChains property
                showQrModal: false,
                // showQrModal: true,
                // qrModalOptions: {
                //     themeMode: "light",
                // },
            });
    
            
            await provider.enable();
            setIsConnected(true);
            setProvider(provider);
    
            const qrCode = provider.signer.uri;
            if (qrCode) {
                setQrCode(qrCode);
            }
    
            console.log(provider.signer);
            console.log(provider.signer.client);
            console.log(qrCode);

        } catch (e) {
            console.error(e);
        }
    }

    async function disconnect() {
        await provider.disconnect();
    }
  
    return {
        qrCode,
        isConnected,
        connect,
        disconnect,
    };
}





// import { useState } from "react";
// import WalletConnect from "@walletconnect/client";

// export default function useWalletConnect() {
//     const [ theme , setTheme ] = useState<string | null>(null);
//     const [ accentColor , setAccentColor ] = useState<string | null>(null);
//     const [ aooName , setAooName ] = useState<string | null>(null);
//     const [ autoConnect, setAutoConnect ] = useState<boolean>(false);
//     const [ projectId , setProjectId ] = useState<string | null>(null);
//     const [ connector, setConnector ] = useState<WalletConnect | null>(null);
//     const [ account, setAccount ] = useState<string | null>(null);

//     const initialize = (
//         theme: string,
//         accentColor: string,
//         aooName: string,
//         autoConnect: boolean,
//         projectId: string,
//     ) => {
//         setTheme(theme);
//         setAccentColor(accentColor);
//         setAooName(aooName);
//         setAutoConnect(autoConnect);
//         setProjectId(projectId);
//     }

//     const connectWallet = async () => {
        
        
//         // WalletConnect 인스턴스 생성
//         const connector = WalletConnectProvider.init({
//             projectId: projectId,
//             theme: theme,
//             accentColor: accentColor,
//             aooName: aooName,
//             autoConnect: autoConnect,
//         });

//         // QR 코드가 이미 연결되어 있는지 확인
//         if (!connector.connected) {
//             await connector.createSession();
//         }

//         // 지갑과 연결
//         const { accounts } = await connector.connect();
//         setAccount(accounts[0]);
//         setConnector(connector);
//     };

//     const disconnectWallet = async () => {
//         if (connector) {
//             await connector.killSession();
//             setAccount(null);
//             setConnector(null);
//         }
//     };

//     return {
//         initialize,
//         connectWallet,
//         disconnectWallet,
//         connector,  
//         account,
//     }
// }
'use client';
import { QRCodeCanvas } from "qrcode.react";
import { QrCodeProps } from "@/app/hooks/wallet-connect.hook";

interface WalletConnectModalProps {
    value: string | null;
    onClose: () => void;
}

export default function WalletConnectModal({ value, onClose }: WalletConnectModalProps) {
    const CustomQRCode: React.FC<QrCodeProps> = ({ qrCode }) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>Scan this QR Code:</h2>
                <QRCodeCanvas
                    value={qrCode || ""}
                    size={256} // QR 코드 크기
                    bgColor="#ffffff" // 배경색
                    fgColor="#000000" // QR 코드 색상
                    level="H" // 오류 수정 수준 (L, M, Q, H)
                    style={{ border: '2px solid #000', borderRadius: '10px' }} // 스타일 추가
                />
            </div>
        );
    };

    return (
        <div>
            <CustomQRCode qrCode={value || ""} />
        </div>
    );
}
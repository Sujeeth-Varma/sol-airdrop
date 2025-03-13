"use client";
import React from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import solanaLogo from "@/assets/image.png";

const NavBar = () => {
  return (
    <div className="sticky top-0">
      <div className="flex flex-col gap-6 md:gap-0 md:flex-row justify-between  items-center container mx-auto py-8 ">
        <div>
          <Image src={solanaLogo} alt="solanaLogo" height={32} width={242} />
        </div>
        <div className="flex gap-4">
          <WalletMultiButton />
          <WalletDisconnectButton />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [amount, setAmount] = useState<number | string>(0);
  const [processing, setProcessing] = useState(false);

  async function sendAirdrop() {
    if (!wallet.publicKey) {
      toast("Connect your solana wallet!");
      return;
    }

    try {
      setAmount(Number(amount));
    } catch (error) {
      toast(error?.toString());
      return;
    }

    if (Number(amount) <= 0 || Number(amount) > 2) {
      toast("please enter sol between 0 - 2");
      return;
    }
    const totalLamports = Number(amount) * Math.pow(10, 9);
    try {
      setProcessing(true);
      const response = await connection.requestAirdrop(
        wallet.publicKey,
        totalLamports
      );
      toast(`Txn Id : ${response}`);
    } catch (error) {
      console.log(error);
      toast("failed to send airdrop dude to rate limit");
    } finally {
      setProcessing(false);
      setAmount(0);
    }
  }

  function handleSolItemClick(getUnit: number) {
    setAmount(getUnit);
  }

  return (
    <section className="mt-20">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="border border-white/50 rounded-lg px-6 py-8 space-y-8">
            <div className="flex flex-col gap-10 md:flex-row md:gap-40 items-center">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-extrabold">Request Airdrop</h2>
                <p className="text-md text-white/60 ">
                  Maximum 2 requests every 8 hours
                </p>
              </div>
              <div className="border border-white/60 px-2 py-2 rounded-lg">
                <p className="font-bold">Devnet</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <input
                type="number"
                value={amount}
                placeholder="Amount"
                className="px-4 py-2 border border-white/60 rounded-lg"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />

              <div className="flex justify-around">
                {[0.1, 0.25, 0.5, 1].map((unit, index) => (
                  <Button
                    onClick={() => handleSolItemClick(unit)}
                    className={`bg-white/80 duration-300 transition-all   rounded-sm ${
                      amount === unit && "bg-pink-600 hover:bg-pink-800 "
                    }`}
                    key={index}
                  >
                    {unit}
                  </Button>
                ))}
              </div>
              <Button
                onClick={sendAirdrop}
                className="w-full bg-white text-black font-medium rounded-lg py-2 cursor-pointer"
                disabled={processing}
              >
                {processing && <Loader2 className="animate-spin" />}
                {processing ? "processing..." : "Confirm Airdrop"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Airdrop;

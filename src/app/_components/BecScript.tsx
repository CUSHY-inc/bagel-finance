"use client";

import Script from "next/script";

declare const TE: { onLoad: () => void };

export default function BecScript({}) {
  return (
    <Script
      src="https://bec.dmtp.tech/0.0.8/bec.js?walletAddress=KOv0WbOcK194peIdQNvWd0nt2sfzjug6vpwyC2F%2BNVE%3D"
      strategy="afterInteractive" // Loads the script after the page is interactive
      onLoad={() => {
        if (typeof TE.onLoad === "function") {
          TE.onLoad();
        } else {
          console.error("TE.onLoad is not a function");
        }
      }}
    />
  );
}

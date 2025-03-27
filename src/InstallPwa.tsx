import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const userChoice = await deferredPrompt.userChoice;
    console.log(userChoice);
    if (userChoice.outcome === "accepted") {
      console.log("✅ User installed PWA!");
    } else {
      console.log("❌ User rejected installation.");
    }
    setDeferredPrompt(null);
  };

  return (
    <>
      {deferredPrompt && (
        <button
          onClick={handleInstallClick}
          className="p-2 bg-blue-500 text-white rounded"
          type="button"
        >
          Install PWA
        </button>
      )}
    </>
  );
}


import { useState } from "react";
import ChatWindow from "./ChatWindow";

export default function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <ChatWindow onClose={() => setIsOpen(false)} />
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close HomeAI assistant" : "Open HomeAI assistant"}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-3xl text-white shadow-xl transition hover:scale-105 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300"
      >
        {isOpen ? "×" : "✦"}
      </button>
    </>
  );
}

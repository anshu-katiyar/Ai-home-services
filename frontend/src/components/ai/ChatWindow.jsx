
import { useEffect, useRef, useState } from "react";
import api from "../../services/api";



const suggestions = [
  "Customer care number do",
  "Find a Service",
  "Book a Service",
  "Check Service Price",
  "My Booking",
  "Register a Complaint",
];


export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Namaste! 👋 Main HomeAI Assistant hoon. Aapko ghar ki kis service mein help chahiye?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function sendMessage(text = input) {
    const message = text.trim();

    if (!message || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", text: message },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await api.post("/ai/chat", {
        message,
      });

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: response.data.reply,
        },
      ]);
    } catch (error) {
      console.error("HomeAI assistant error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            error.response?.data?.detail ||
            "Sorry, abhi AI se connect nahi ho pa raha hai. Please dobara try karein.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <section
      role="dialog"
      aria-label="HomeAI Assistant"
      className="fixed bottom-24 right-4 z-50 flex h-[min(600px,calc(100dvh-130px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:right-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-orange-600 px-4 py-4 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-2xl">
            ✦
          </div>

          <div>
            <h2 className="font-bold">HomeAI Assistant</h2>
            <p className="text-xs text-orange-100">
              AI-powered home service help
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-lg px-3 py-1 text-2xl hover:bg-white/20"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div
        className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4"
        aria-live="polite"
      >
        <div className="rounded-xl border border-orange-100 bg-orange-50 p-3 text-xs text-gray-600">
          I can help you find suitable home services. Confirm prices and
          availability through the actual service listings before booking.
        </div>

        {messages.map((message, index) => (
          <div
            key={`${index}-${message.role}`}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === "user"
                  ? "rounded-br-sm bg-orange-600 text-white"
                  : "rounded-bl-sm border border-gray-200 bg-white text-gray-800 shadow-sm"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {messages.length === 1 && (
          <div>
            <p className="mb-2 text-xs font-semibold text-gray-500">
              TRY ASKING
            </p>

            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  disabled={loading}
                  onClick={() => sendMessage(suggestion)}
                  className="rounded-full border border-orange-200 bg-white px-3 py-2 text-left text-xs text-orange-700 transition hover:bg-orange-50 disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        
<div className="mt-4 rounded-xl border border-orange-200 bg-white p-3">
  <p className="font-semibold text-gray-800">
    Need help?
  </p>

  <p className="mt-1 text-sm text-gray-600">
    HomeAI Customer Support
  </p>

  <a
    href="tel:8318120145"
    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700"
  >
    📞 Call 8318120145
  </a>
</div>


        {loading && (
          <div className="flex justify-start">
            <div
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500"
              role="status"
            >
              HomeAI is thinking...
            </div>
          </div>
        )}


<div className="mt-4 rounded-xl border border-gray-200 bg-white p-3">
  <p className="mb-3 font-semibold text-gray-800">
    How can we help you?
  </p>

  <div className="grid grid-cols-2 gap-2">
    <button
      type="button"
      disabled={loading}
      onClick={() => sendMessage("Help me find the right home service")}
      className="rounded-lg border border-orange-200 px-3 py-3 text-sm text-gray-700 hover:bg-orange-50 disabled:opacity-50"
    >
      🛠️ Find a Service
    </button>

    <button
      type="button"
      disabled={loading}
      onClick={() => sendMessage("I want to book a home service")}
      className="rounded-lg border border-orange-200 px-3 py-3 text-sm text-gray-700 hover:bg-orange-50 disabled:opacity-50"
    >
      📅 Book a Service
    </button>

    <button
      type="button"
      disabled={loading}
      onClick={() => sendMessage("Tell me the price of a home service")}
      className="rounded-lg border border-orange-200 px-3 py-3 text-sm text-gray-700 hover:bg-orange-50 disabled:opacity-50"
    >
      💰 Check Price
    </button>

    <button
      type="button"
      disabled={loading}
      onClick={() => sendMessage("Help me check my booking status")}
      className="rounded-lg border border-orange-200 px-3 py-3 text-sm text-gray-700 hover:bg-orange-50 disabled:opacity-50"
    >
      📋 My Booking
    </button>

    <button
      type="button"
      disabled={loading}
      onClick={() => sendMessage("I want to register a complaint")}
      className="col-span-2 rounded-lg border border-orange-200 px-3 py-3 text-sm text-gray-700 hover:bg-orange-50 disabled:opacity-50"
    >
      📝 Register a Complaint
    </button>
  </div>
</div>


        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-gray-200 bg-white p-3"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask HomeAI anything..."
          maxLength={2000}
          disabled={loading}
          aria-label="Message HomeAI"
          className="min-w-0 flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-100"
        />

        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send message"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-600 text-xl text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ➤
        </button>
      </form>
    </section>
  );
}

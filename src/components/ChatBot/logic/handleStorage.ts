import { WELCOME_MESSAGE } from "@/components/ChatBot/logic/WELCOME_MESSAGE";
import type { Message } from "@/types/Message";

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY
const MAX_HISTORY = import.meta.env.VITE_MAX_HISTORY;

export function loadHistory(): Message[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored) as Message[];
            return parsed.length > 0 ? parsed : [WELCOME_MESSAGE];
        }
    } catch {
    }
    return [WELCOME_MESSAGE];
}

export function saveHistory(messages: Message[]) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(messages.slice(-MAX_HISTORY))
        );
    } catch {
    }
}
export const clearHistory = ({ setMessages }: { setMessages: React.Dispatch<React.SetStateAction<Message[]>> }) => {
    setMessages([WELCOME_MESSAGE]);
    localStorage.removeItem(STORAGE_KEY);
};
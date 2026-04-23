import { instance } from "@/utils/instance"


export const askChatBot = async (question: string) => {
    const res = await instance.post("/ask", { question });
    return res.data;
}
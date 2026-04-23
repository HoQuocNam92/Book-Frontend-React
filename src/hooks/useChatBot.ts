
import { useMutation } from "@tanstack/react-query";
import { askChatBot } from "@/services/chatbot.services";
const useChatBot = () => {
    const askQuestion = useMutation({
        mutationFn: askChatBot,
    })

    return {
        askQuestion
    }

}

export default useChatBot;
import axios from "axios";
import { Logger } from "./FileOperations";

export default class GptAgent {
    private static instance: GptAgent;
    private static endpoints = {
        completion: "https://api.openai.com/v1/chat/completions",
    };

    private static openAiKey: string = "OPEN_AI_KEY_HERE";

    constructor() {
        if (!!GptAgent.instance) {
            Logger.logInfo('Trying to create a new instance of a singleton class. Returning the existing instance.');
            return GptAgent.instance;
        } else {
            Logger.logInfo('Creating a new instance of a singleton class.')
            GptAgent.instance = this;
            return this;
        }
    }

    async getChatCompletion(question: string): Promise<string> {
        Logger.logInfo('Getting chat completion from GPT-3 API.');
        return await gptCaller(GptAgent.openAiKey, question, GptAgent.endpoints.completion);
    }

}

async function gptCaller(openAiKey: string, question: string, completionEndpoint: string): Promise<string> {

    if (!validateOpenAiKey(openAiKey)) {
        throw new Error("Invalid OpenAI key. Go to https://platform.openai.com/account/api-keys to get your key.");
    }

    const gptBearerTokenHeader = `Bearer ${openAiKey}`;
    const gptHeaders = {
        "Content-Type": "application/json",
        Authorization: gptBearerTokenHeader,
    };

    const gptInferenceBody = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
    };

    try {
        const chatGptResponse = await axios.post(
            completionEndpoint,
            gptInferenceBody,
            {
                headers: gptHeaders,
            }
        );

        Logger.logInfo('Successfully called GPT-3 API.');

        return chatGptResponse?.data.choices[0].message?.content;
    } catch (error) {
        Logger.logError(`Error while calling GPT-3 API: \n${error}`);
        throw new Error(`Error while calling GPT-3 API: \n${error}`);
    }
}

function validateOpenAiKey(openAiKey: string): boolean {
    if (!openAiKey) return false;
    if (openAiKey === "OPEN_AI_KEY_HERE") return false;

    return true;
}
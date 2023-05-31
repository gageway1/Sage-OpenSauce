import * as FileSystem from "expo-file-system";

const saveAnswersFile = FileSystem.documentDirectory + "answers.json";
const saveLogFile = FileSystem.documentDirectory + "log.txt";
const encoding = { encoding: FileSystem.EncodingType.UTF8 };

export class Logger {

    public static async logInfo(message: string): Promise<void> {
        console.log(`${message} | Time: ${new Date().toISOString()}`)

        const logFile = await FileSystem.readAsStringAsync(saveLogFile);
        FileSystem.writeAsStringAsync(saveLogFile, logFile + `[Info | ${new Date().toISOString()}] ${message}\n`, encoding);
    }

    public static async logError(message: string): Promise<void> {
        await FileSystem.writeAsStringAsync(saveLogFile, `[Error] ${message}\n`, encoding);
    }

    public static async logWarning(message: string): Promise<void> {
        await FileSystem.writeAsStringAsync(saveLogFile, `[Warning] ${message}\n`, encoding);
    }

    public static async logDebug(message: string): Promise<void> {
        await FileSystem.writeAsStringAsync(saveLogFile, `[Debug] ${message}\n`, encoding);
    }

    public static async logFatal(message: string): Promise<void> {
        await FileSystem.writeAsStringAsync(saveLogFile, `[Fatal] ${message}\n`, encoding);
    }
}

export abstract class FileWriter {
    public static async saveConversation(conversation: string): Promise<void> {
        await FileSystem.writeAsStringAsync(saveAnswersFile, conversation, encoding);
    }
}
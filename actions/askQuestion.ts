'use server'

import { Message } from "@/components/Chat";
import { adminDb } from "@/firebaseAdmin";
import { generateLangChainCompletion } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
// import { generateLangchainCompletion } from "@/lib/langchain"

const FREE_LIMIT = 2;
const PRO_LIMIT = 20;

export async function askQuestion(id: string, question: string){
    auth().protect();
    const { userId } = await auth();

    const chatRef = adminDb
        .collection("users")
        .doc(userId!)
        .collection("files")
        .doc(id)
        .collection("chat");

    // check how many user messages are in the chat
    const chatSnapshot = await chatRef.get();
    const userMessages = chatSnapshot.docs.filter(
        (doc) => doc.data().role === "human"
    );

    // check membership limits for messages in a document
    const userRef = await adminDb.collection("users").doc(userId!).get();

    console.log("User ref: ", userRef.data());
    // limit the PRO/FREE users
    // check if user is on FREE plan and has asked more than the FREE number of questions
    if(!userRef.data()?.hasActiveMembership){
        console.log('user Messages length / free limit: ', userMessages.length, FREE_LIMIT);

        if(userMessages.length >= FREE_LIMIT){
            return {
                success: false,
                message: `You have reached the limit of ${FREE_LIMIT} questions for the free plan. Upgrade to the PRO plan to ask more questions. 🙂`
            };
        }
    }

    // check if user is on PRO plan and has asked more than 100 questions
    if(userRef.data()?.hasActiveMembership){
        console.log("user messages length / pro limit: ", userMessages.length, PRO_LIMIT);
        if(userMessages.length >= PRO_LIMIT){
            return {
                success: false,
                message: `You have reached the limit of ${PRO_LIMIT} questions per document! 🙂`
            };
            
        }
    }
    
    const userMessage: Message = {
        role: 'human',
        message: question,
        createdAt: new Date(),
    }

    await chatRef.add(userMessage);

    // Generate AI response
    const reply = await generateLangChainCompletion(id, question);

    const aiMessage: Message = {
        role: 'ai',
        message: reply,
        createdAt: new Date(),
    };

    await chatRef.add(aiMessage);

    return { success: true, message: null };
}
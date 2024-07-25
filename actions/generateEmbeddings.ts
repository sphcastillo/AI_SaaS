'use server'
import { generateEmbeddingsInPineconeVectorStore } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generateEmbeddings(docId: string) {
    // prevent users from accessing this function unless they are authenticated
    auth().protect();

    await generateEmbeddingsInPineconeVectorStore(docId);

    revalidatePath('/dashboard');

    return { completed: true };
}
import { model } from "@/lib/gemini";
import { getSystemPrompt } from "@/prePromts/sysPrompt";


import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
    console.log("Received request:", req.method);

    try {
        const body: { prompt?: string } = await req.json();
        const prompt = body.prompt;
        console.log("prompt", prompt)

        if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
            return NextResponse.json(
                { success: false, message: "Prompt must be a non-empty string" },
                { status: 400 }
            );
        }
        
        // const result = streamText({
        //     model: openai('gpt-4o'),
        //     system: 'You are a helpful assistant.',
        //     messages,
        //   });
        

        const encoder = new TextEncoder();

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const chatSession = model.startChat({
                        history: [
                          
                            {role:"user", parts:[{text:getSystemPrompt()}]}  ,

                            {role:"user", parts:[{text:`make a beautiful and color website and always use the latest version(tailwindcss, shadcn , typescript).`}]}
                        ],
                    });

                    const responseStream = await chatSession.sendMessageStream(prompt);

                    for await (const chunk of responseStream.stream) {
                        console.log(chunk.text())
                        const text = typeof chunk.text === "function" ? chunk.text() : String(chunk);
                        controller.enqueue(encoder.encode(text));
                    }
                } catch (error) {
                    controller.error(error);
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}

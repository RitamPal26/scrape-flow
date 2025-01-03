import { OpenAI } from "openai";

import { symmeticDecrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import { ExecutionEnvironment } from "@/types/executor";

import { ExtractDataWithAiTask } from "../task/ExtractDataWithAI";

export async function ExtractDataWithAiExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAiTask>
): Promise<boolean> {
  try {
    const content = environment.getInput("Content");
    if (!content) {
      environment.log.error("Input->content is not defined !!");
    }

    const credentials = environment.getInput("Credentials");
    if (!credentials) {
      environment.log.error("Input->credentials is not defined !!");
    }

    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("Input->prompt is not defined !!");
    }

    // Get credentials from DB
    const credential = await prisma.credential.findUnique({
      where: { id: credentials },
    });
    if (!credential) {
      environment.log.error("Credential not found !!");
      return false;
    }

    const plainCredentialValue = symmeticDecrypt(credential.value);
    if (!plainCredentialValue) {
      environment.log.error("Cannot decrypt credential !!");
      return false;
    }

    const mockExtractedData = {
      usernameSelector: "#username",
      passwordSelector: "#password",
      loginSelector: "body > div > form > input.btn.btn-primary",
    };

    /*const openAi = new OpenAI({
      apiKey: plainCredentialValue,
    });

    const response = await openAi.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explainations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text",
        },
        {
          role: "user",
          content: content,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
    });

    environment.log.info(`Prompt tokens: ${response.usage?.prompt_tokens}`);
    environment.log.info(
      `Completion tokens: ${response.usage?.completion_tokens}`
    );

    const result = response.choices[0].message?.content;
    if (!result) {
      environment.log.error("Empty response from AI !!");
      return false;
    }*/

    environment.setOutput("Extracted data", JSON.stringify(mockExtractedData));

    return true;
  } catch (error) {
    environment.log.error("Error in ExtractDataWithAIExecutor !!");
    return false;
  }
}

import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser  } from "langchain/output_parsers";
import z from 'zod'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z.string().describe('The mood of the person who wrote the journal entry'),
    summary: z.string().describe('A summary of the journal entry'),
    negative: z.boolean().describe('Is the journal entry negative?(i.e. does it contain negative emotions? )'),
    color: z.string().describe('a hexidecimal color code the represents the mood of the entry. Example #0101fe for blue representing happiness.') 
  })
)

export const analyze = async (prompt: string) => {
  const model = new OpenAI({temperature: 0.7, modelName: 'gpt-3.5-turbo'});
  const result = await model.call(prompt)
  console.log('analyze result', result) 
}
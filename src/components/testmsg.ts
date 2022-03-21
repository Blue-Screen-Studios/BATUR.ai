import { config } from 'dotenv'
import { Endpoint } from 'googleapis-common';

config()

const attributeThresholds = {
    'ATTACK_ON_AUTHOR': 0.75,
    'ATTACK_ON_COMMENTER': 0.75,
    'FLIRTATION': 0.75,
    'IDENTITY_ATTACK': 0.75,
    'INCOHERENT': 0.75,
    'INFLAMMATORY': 0.75,
    'INSULT': 0.75,
    'OBSCENE': 0.75,
    'PROFANITY': 0.75,
    'SEVERE_TOXICITY': 0.75,
    'SEXUALLY_EXPLICIT': 0.75,
    'THREAT': 0.75,
    'TOXICITY': 0.75,
    'SPAM': 0.75,
    'UNSUBSTANTIAL': 0.75
};

const defaultRequestedAttributes: { [key: string]: any; } = {};
for (const key in attributeThresholds) {
    defaultRequestedAttributes[key] = {};
}

/**
 * Analyze attributes in a block of text
 * @param {string} text - text to analyze
 * @return {json} res - analyzed attributes
 */
export async function analyzeText(client: Readonly<Endpoint>, text: string) {
    const analyzeRequest = {
        comment: { text: text },
        languages: ['en'],
        requestedAttributes: defaultRequestedAttributes,
    };

    console.log(analyzeRequest);

    // @ts-ignore
    const result = await client.comments.analyze({
        key: process.env.PERSPECTIVE_API_KEY,
        resource: analyzeRequest,
    });

    console.log(result);

    // This is the format the API expects

    const data: { [key: string]: any; } = {};

    for (const key in result['data']['attributeScores']) {
        data[key] =
            result['data']['attributeScores'][key]['summaryScore']['value'] >
            attributeThresholds[key as never];
    }
    return data;
}
export function createCodeBlock(msg: string, language: string)
{
    return "```" + language + "\n" + msg + "\n```";
}
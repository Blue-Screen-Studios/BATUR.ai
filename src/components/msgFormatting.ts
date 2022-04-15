export function makeBold(msg: string)
{ 
    return `**${msg}**`;
}

export function makeCode(msg: string)
{
    return `\`${msg}\``;
}

export function makeCodeBlock(msg: string, language: string)
{
    return `\`\`\`${language}\n${msg}\n\`\`\``;
}

export function makeItalic(msg: string)
{
     return `*${msg}*`; 
}

export function makeQuote(msg: string)
{
    return `> ${msg}`; 
}
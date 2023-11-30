import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

const NOTION_SC_KY = process.env.NOTION_SC_KY;
const NOTION_DB_ID = process.env.NOTION_DB_ID;

const postToNOtion = async (data) => {
    const notion = new Client({ auth: NOTION_SC_KY });
    const { word, def, prn, syn, ant, exp } = data;
    const response = await notion.pages.create({
        parent: {
            type: 'database_id',
            database_id: NOTION_DB_ID,
        },
        properties: {
            Definition: {
                rich_text: [
                    {
                        type: 'text',
                        text: {
                            content: def ?? '',
                            link: null,
                        },
                        annotations: {
                            bold: false,
                            italic: false,
                            strikethrough: false,
                            underline: false,
                            code: false,
                            color: 'default',
                        },
                        plain_text: def ?? '',
                        href: null,
                    },
                ],
            },
            Antonyms: {
                rich_text: [
                    {
                        type: 'text',
                        text: {
                            content: ant.join(', '),
                            link: null,
                        },
                        annotations: {
                            bold: false,
                            italic: false,
                            strikethrough: false,
                            underline: false,
                            code: false,
                            color: 'default',
                        },
                        plain_text: ant.join(', '),
                        href: null,
                    },
                ],
            },
            Example: {
                rich_text: [
                    {
                        type: 'text',
                        text: {
                            content: exp[0] ?? '',
                            link: null,
                        },
                        annotations: {
                            bold: false,
                            italic: false,
                            strikethrough: false,
                            underline: false,
                            code: false,
                            color: 'default',
                        },
                        plain_text: exp[0] ?? '',
                        href: null,
                    },
                ],
            },
            Pronunciation: {
                rich_text: [
                    {
                        type: 'text',
                        text: {
                            content: prn,
                            link: null,
                        },
                        annotations: {
                            bold: true,
                            italic: false,
                            strikethrough: false,
                            underline: false,
                            code: false,
                            color: 'default',
                        },
                        plain_text: prn,
                        href: null,
                    },
                ],
            },
            Synonyms: {
                rich_text: [
                    {
                        type: 'text',
                        text: {
                            content: syn.join(', '),
                            link: null,
                        },
                        annotations: {
                            bold: false,
                            italic: false,
                            strikethrough: false,
                            underline: false,
                            code: false,
                            color: 'default',
                        },
                        plain_text: syn.join(', '),
                        href: null,
                    },
                ],
            },
            Word: {
                title: [
                    {
                        type: 'text',
                        text: {
                            content: word,
                            link: null,
                        },
                        annotations: {
                            bold: false,
                            italic: false,
                            strikethrough: false,
                            underline: false,
                            code: false,
                            color: 'default',
                        },
                        plain_text: word,
                        href: null,
                    },
                ],
            },
        },
    });
    return response;
};

export async function POST(REQ) {
    try {
        const { data } = await REQ.json();
        const res = await postToNOtion(data);
        return NextResponse.json({ code: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ code: 400 });
    }
}

export async function GET() {
    try {
        if (!NOTION_SC_KY || !NOTION_DB_ID) throw new Error('Missing Sec/Id');
        const notion = new Client({ auth: NOTION_SC_KY });
        const query = await notion.databases.query({ database_id: NOTION_DB_ID });
        const rows = query.results.map((item) => item.properties);
        return NextResponse.json({ status: 200, data: rows });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 400, data: error });
    }
}
import { NextResponse } from 'next/server';

const encrytKey = process.env.API_KEY;
const timeStamp = "2023-11-03T17:53:32.670Z";
const base = 'https://www.wordsapi.com/mashape/words';
const headers = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "if-none-match": "W/\"831-+MvP4rLfvNbG/IYYcZYcNQ\"",
    "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "Referer": "https://www.wordsapi.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
}

export async function POST(req) {
    const { word } = await req.json();
    const url = `${base}/${word}?when=${timeStamp}&encrypted=${encrytKey}`;
    try {
        const response = await fetch(url, {
            "headers": headers,
            "body": null,
            "method": "GET"
        });
        if (!response.ok) throw new Error("Failed To get Data!")
        const { word, results, pronunciation } = await response.json();
        const def = results[0].definition
        const syn = results[0].synonyms ?? []
        const ant = results[0].antonyms ?? []
        const exp = results[0].examples ?? []
        const prn = pronunciation.all
        return NextResponse.json({ status: 200, data: { word, def, syn, ant, exp, prn } });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, data: error });
    }
}
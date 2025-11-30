import { NextResponse } from "next/server";
import { versions } from "@/lib/store";
import { getWordDiff } from "@/lib/diff";
import { v4 as uuid } from "uuid";

export async function GET() {
  return NextResponse.json(versions);
}

export async function POST(req) {
  const { text } = await req.json();

  const lastText = versions.length ? versions[versions.length - 1].text : "";

  const diff = getWordDiff(lastText, text);

  const newVersion = {
    id: uuid(),
    timestamp: new Date().toLocaleString(),
    ...diff,
    text
  };

  versions.push(newVersion);

  return NextResponse.json(newVersion);
}

export async function DELETE() {
  versions.length = 0;
  

  return NextResponse.json({ message: "Version history cleared" });
}
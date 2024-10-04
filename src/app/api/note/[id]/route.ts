import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    return NextResponse.json({message: "GET note by id"});
}
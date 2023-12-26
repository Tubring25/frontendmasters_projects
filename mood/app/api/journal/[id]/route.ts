import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async (request:Request, { params }) => {
  const { content } = await request.json()

  const user = await getUserByClerkId()
  const updateEntry = await prisma.journalEntry.update({
    where: {
      id: params.id,
      userId: user.id
    },
    data: {
      content
    }
  })

  return NextResponse.json({ data: updateEntry })
}
import { prisma } from "@/utils/db"
import { auth, currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const NewUser = async () => {
  const user = await currentUser()
  console.log('user', user)
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string
    }
  })

  if (!match) {
    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id as string,
        email: user?.emailAddresses[0]?.emailAddress as string,
      }
    })
  }

  redirect('/journal')
  return <div>hi</div>
}

export default NewUser
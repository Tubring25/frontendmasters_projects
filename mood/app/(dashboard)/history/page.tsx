import HistoryChart from "@/components/HistoryChart"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getData = async () => {
  const user = getUserByClerkId()
  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'asc'
    }
  })
  const sum = analysis.reduce((acc, curr) => acc + curr.sentimentScore, 0)
  const avg = Math.round(sum / analysis.length)
  return { analysis, avg }
}

const HistoryPage = async () => {
  const { analysis, avg } = await getData()
  return (
    <div className="w-full h-full">
      <div>{`Ang. Sentiment ${avg}`}</div>
      <div className="w-full h-full">
        <HistoryChart data={analysis} />
      </div>
    </div>
  )
}

export default HistoryPage
import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";


const getEntry = async (id) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId: user.id,
      id: id
    }
  })
  return entry
}


const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  const analysisData = [
    { name: 'Subject', value: '' },
    { name: 'Summary', value: '' },
    { name: 'Mood', value: '' },
    { name: 'Negative', value: 'False' },
  ]
  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((data) => (
              <li key={data.name}>
                <div className="px-2 py-4 flex justify-between items-center border-b border-t border-black/10">
                  <span className="text-lg">{data.name}</span>
                  <span>{data.value}</span>
                </div>
              </li>
            )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EntryPage;
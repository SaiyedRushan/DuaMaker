export function SavedDuas() {
  const savedDuas = [
    {
      id: 1,
      dua: 'Rabbana aatina fiddunya hasanah wa fil akhirati hasanah wa kina adhabannar',
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
    {
      id: 2,
      dua: 'Ya rab help me be the best version of myself',
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
    {
      id: 3,
      dua: 'Ya rab help me become strong and fit and lean and muscular and healthy and wealthy and wise and happy and successful and loved by all',
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
    {
      id: 4,
      dua: 'Ya rab help me get a very nice job with a very nice salary',
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
    {
      id: 5,
      dua: 'Ya rab help me grow thick and dense hair',
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      {savedDuas.map((dua) => (
        <div key={dua.id} className="border-b p-4">
          <h3 className="text-lg font-bold">{dua.dua}</h3>
        </div>
      ))}
    </div>
  )
}

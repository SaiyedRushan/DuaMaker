import { EditIcon, Loader2, PlusIcon, TrashIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { useState } from 'react'
import { ScrollArea } from './ui/scroll-area'

export function SavedDuas() {
  const [savedDuas, setSavedDuas] = useState([
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
    {
      id: 6,
      dua: 'Ya rab help me improve my communication skills. Help me become fluent and eloquent in my speech. Rabbish rahli sadri wa yassirli amri wahlul ukdatammilisaani yafkahu kawli',
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
    {
      id: 7,
      dua: 'Ya rab help me be able to speak in public without being nervous and anxious. Help me be able to answer questions confidently and without hesitation.',
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
    {
      id: 8,
      dua: 'Ya rab help me improve my confidence and self esteem. Help me be able to stand up for myself and speak my mind without being afraid of what people think.',
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDua, setCurrentDua] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editDuaId, setEditDuaId] = useState<number | null>(null)

  const handleSaveDua = () => {
    if (isEditing && editDuaId !== null) {
      setSavedDuas((prevDuas) => prevDuas.map((dua) => (dua.id === editDuaId ? { ...dua, dua: currentDua, updatedAt: new Date().toISOString() } : dua)))
    } else {
      setSavedDuas((prevDuas) => [
        ...prevDuas,
        {
          id: prevDuas.length + 1,
          dua: currentDua,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ])
    }
    setIsDialogOpen(false)
    setCurrentDua('')
    setIsEditing(false)
    setEditDuaId(null)
  }

  const openAddDialog = () => {
    setIsDialogOpen(true)
    setCurrentDua('')
    setIsEditing(false)
  }

  const openEditDialog = (duaId: number, duaText: string) => {
    setIsDialogOpen(true)
    setCurrentDua(duaText)
    setIsEditing(true)
    setEditDuaId(duaId)
  }

  const [isEnhancing, setIsEnhancing] = useState(false)
  const handleEnhanceDua = async () => {
    try {
      setIsEnhancing(true)
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: currentDua }),
      })
      const data = await response.json()
      setCurrentDua(data.reply)
    } catch (error) {
      console.error('Error enhancing dua:', error)
    } finally {
      setIsEnhancing(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={openAddDialog}>
          Add Dua
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="max-h-[80vh]">
        {savedDuas.map((dua) => (
          <div key={dua.id} className="border-b p-4 flex items-center justify-between">
            <h3 className="text-lg">{dua.dua}</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => openEditDialog(dua.id, dua.dua)}>
                <EditIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Dua' : 'Add New Dua'}</DialogTitle>
            </DialogHeader>
            <Textarea placeholder="Enter your dua here..." value={currentDua} onChange={(e) => setCurrentDua(e.target.value)} className="min-h-[120px] resize-y" />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline" onClick={handleSaveDua}>
                Save
              </Button>
              <Button variant="outline" onClick={handleEnhanceDua} disabled={isEnhancing}>
                {isEnhancing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enhancing...
                  </>
                ) : (
                  'Enhance'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

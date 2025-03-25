import { Delete, EditIcon, Loader2, PlusIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { useState, useEffect } from 'react'
import { ScrollArea } from './ui/scroll-area'
import { Input } from './ui/input'

interface Dua {
  id: number
  title: string
  dua: string
  created_at: string
  updated_at: string
}

export function SavedDuas() {
  const [savedDuas, setSavedDuas] = useState<Dua[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDua, setCurrentDua] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editDuaId, setEditDuaId] = useState<number | null>(null)
  const [currentTitle, setCurrentTitle] = useState('')

  useEffect(() => {
    fetchDuas()
  }, [])

  const fetchDuas = async () => {
    try {
      const response = await fetch('/api/duas')
      const data = await response.json()
      setSavedDuas(data)
    } catch (error) {
      console.error('Error fetching duas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveDua = async () => {
    try {
      if (isEditing && editDuaId !== null) {
        const response = await fetch(`/api/duas/${editDuaId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dua: currentDua, title: currentTitle }),
        })
        const data = await response.json()
        setSavedDuas((prevDuas) => prevDuas.map((dua) => (dua.id === editDuaId ? data : dua)))
      } else {
        const response = await fetch('/api/duas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dua: currentDua, title: currentTitle }),
        })
        const data = await response.json()
        setSavedDuas((prevDuas) => [data, ...prevDuas])
      }
      setIsDialogOpen(false)
      setCurrentDua('')
      setCurrentTitle('')
      setIsEditing(false)
      setEditDuaId(null)
    } catch (error) {
      console.error('Error saving dua:', error)
    }
  }

  const handleDeleteDua = async (id: number) => {
    try {
      await fetch(`/api/duas/${id}`, {
        method: 'DELETE',
      })
      setSavedDuas((prevDuas) => prevDuas.filter((dua) => dua.id !== id))
    } catch (error) {
      console.error('Error deleting dua:', error)
    }
  }

  const openAddDialog = () => {
    setIsDialogOpen(true)
    setCurrentDua('')
    setIsEditing(false)
    setCurrentTitle('')
  }

  const openEditDialog = (duaId: number, duaText: string, duaTitle: string) => {
    setIsDialogOpen(true)
    setCurrentDua(duaText)
    setIsEditing(true)
    setEditDuaId(duaId)
    setCurrentTitle(duaTitle)
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
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          savedDuas.map((dua) => (
            <div key={dua.id} className="border-b p-4 flex gap-1 items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-md font-bold italic">{dua.title}</h3>
                <p className="text-sm sm:text-base">{dua.dua}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <Button variant="outline" onClick={() => openEditDialog(dua.id, dua.dua, dua.title)}>
                  <EditIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => handleDeleteDua(dua.id)}>
                  <Delete className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </ScrollArea>

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Dua' : 'Add New Dua'}</DialogTitle>
            </DialogHeader>
            <Input placeholder="Enter title here..." value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)} />
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

import React, { useEffect, useState } from 'react'
import './App.css'
import type { Lekcija } from './api'
import { getLekcije, createLekcija, updateLekcija, deleteLekcija, searchLekcije } from './api'
import LessonList from './components/LessonList'
import AddEditLesson from './components/AddEditLesson'
import LessonPreview from './components/LessonPreview'

export default function App() {
  const [lekcije, setLekcije] = useState<Lekcija[]>([])
  
  const [loading, setLoading] = useState(false)
  
  const [error, setError] = useState<string | null>(null)
  
  const [currentPage, setCurrentPage] = useState<'list' | 'add' | 'preview'>('list')
  
  const [selectedLekcija, setSelectedLekcija] = useState<Lekcija | null>(null)
  
  const [formNaziv, setFormNaziv] = useState('')
  const [formOpis, setFormOpis] = useState('')
  const [formYtUrl, setFormYtUrl] = useState('')
  
  // ID lekcije, ki jo urejamo (null = dodajamo novo)
  const [editingId, setEditingId] = useState<number | null>(null)
  
  const [searchQuery, setSearchQuery] = useState('')

  // Funkcija za nalaganje vseh lekcij iz API-ja
  async function naloziLekcije() {
    setLoading(true)
    setError(null)
    
    try {
      const data = await getLekcije()
      setLekcije(data)
    } catch (err) {
      setError('Napaka pri nalaganju lekcij')
    } finally {
      setLoading(false)
    }
  }

  // Naloži lekcije ob prvem prikazu strani
  useEffect(() => {
    naloziLekcije()
  }, [])

  // Iskanje lekcij z debouncing (500ms zakasnitev)
  useEffect(() => {
    if (searchQuery.trim() === '') {
      naloziLekcije()
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      setError(null)
      
      try {
        const data = await searchLekcije(searchQuery)
        setLekcije(data)
      } catch (err) {
        setError('Napaka pri iskanju lekcij')
      } finally {
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Funkcija za spreminjanje iskalnega niza
  function handleSearchChange(query: string) {
    setSearchQuery(query)
  }

  // Funkcija za shranjevanje nove ali urejanje obstoječe lekcije
  async function shraniLekcijo(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    
    // Preveri, če je naziv izpolnjen
    if (!formNaziv.trim()) {
      setError('Naziv je obvezen')
      return
    }
    
    const lekcijaData: Lekcija = {
      naziv: formNaziv.trim(),
      opis: formOpis.trim(),
      yt_url: formYtUrl.trim(),
    }
    
    try {
      if (editingId === null) {
        // Dodajamo novo lekcijo
        await createLekcija(lekcijaData)
      } else {
        // Urejamo obstoječo lekcijo
        await updateLekcija(editingId, lekcijaData)
      }
      
      // Počisti obrazec
      ponastaviObrazec()
      
      // Naloži posodobljen seznam
      await naloziLekcije()
      
      // Vrni se na seznam
      setCurrentPage('list')
    } catch (err) {
      setError('Napaka pri shranjevanju lekcije')
    }
  }

  function urediLekcijo(lekcija: Lekcija) {
    setEditingId(lekcija.id ?? null)
    setFormNaziv(lekcija.naziv)
    setFormOpis(lekcija.opis)
    setFormYtUrl(lekcija.yt_url)
    setCurrentPage('add')
  }

  async function izbrisiLekcijo(id?: number) {
    if (!id) return
    
    const potrdi = confirm('Res želite izbrisati to lekcijo?')
    if (!potrdi) return
    
    try {
      await deleteLekcija(id)
      await naloziLekcije()
    } catch (err) {
      setError('Napaka pri brisanju lekcije')
    }
  }

  function odpriPredogled(lekcija: Lekcija) {
    setSelectedLekcija(lekcija)
    setCurrentPage('preview')
  }

  // Funkcija za pripravo YouTube embed URL-ja
  function pripraviYouTubeUrl(url: string): string | null {
    if (!url) return null
    
    try {
      const urlObj = new URL(url)
      let videoId = null
      
      if (urlObj.hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v')
      }
      else if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1)
      }
      
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?rel=0`
      }
    } catch {
      // Če URL ni veljaven, poskusi uporabiti kot ID
      return `https://www.youtube.com/embed/${url}?rel=0`
    }
    
    return null
  }

  function ponastaviObrazec() {
    setFormNaziv('')
    setFormOpis('')
    setFormYtUrl('')
    setEditingId(null)
  }

  // Odpiranje obrazca za dodajanje nove lekcije
  function odpriDodajanje() {
    ponastaviObrazec()
    setCurrentPage('add')
  }

  function vrniSeNaSeznam() {
    ponastaviObrazec()
    setSelectedLekcija(null)
    setSearchQuery('') // Počisti iskanje
    setCurrentPage('list')
  }

  // STRAN 1: Seznam vseh lekcij
  if (currentPage === 'list') {
    return (
      <LessonList
        lekcije={lekcije}
        loading={loading}
        error={error}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onOdpriDodajanje={odpriDodajanje}
        onOdpriPredogled={odpriPredogled}
        onUrediLekcijo={urediLekcijo}
        onIzbrisiLekcijo={izbrisiLekcijo}
      />
    )
  }

  // STRAN 2: Dodajanje ali urejanje lekcije
  if (currentPage === 'add') {
    return (
      <AddEditLesson
        formNaziv={formNaziv}
        setFormNaziv={setFormNaziv}
        formOpis={formOpis}
        setFormOpis={setFormOpis}
        formYtUrl={formYtUrl}
        setFormYtUrl={setFormYtUrl}
        editingId={editingId}
        error={error}
        onShraniLekcijo={shraniLekcijo}
        onVrniSeNaSeznam={vrniSeNaSeznam}
      />
    )
  }

  // STRAN 3: Predogled lekcije z YouTube videom
  if (currentPage === 'preview' && selectedLekcija) {
    return (
      <LessonPreview
        selectedLekcija={selectedLekcija}
        onUrediLekcijo={urediLekcijo}
        onIzbrisiLekcijo={izbrisiLekcijo}
        onVrniSeNaSeznam={vrniSeNaSeznam}
        pripraviYouTubeUrl={pripraviYouTubeUrl}
      />
    )
  }

  // Če nobena stran ni aktivna
  return null
}

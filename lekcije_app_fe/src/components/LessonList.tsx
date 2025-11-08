import type { Lekcija } from '../api';

interface LessonListProps {
  lekcije: Lekcija[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOdpriDodajanje: () => void;
  onOdpriPredogled: (lekcija: Lekcija) => void;
  onUrediLekcijo: (lekcija: Lekcija) => void;
  onIzbrisiLekcijo: (id?: number) => void;
}

export default function LessonList({
  lekcije,
  loading,
  error,
  searchQuery,
  onSearchChange,
  onOdpriDodajanje,
  onOdpriPredogled,
  onUrediLekcijo,
  onIzbrisiLekcijo,
}: LessonListProps) {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Vse Lekcije</h1>
        <button className="btn btn-add" onClick={onOdpriDodajanje}>
          + Dodaj lekcijo
        </button>
      </header>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Išči lekcije po nazivu..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="search-clear" 
            onClick={() => onSearchChange('')}
            aria-label="Počisti iskanje"
          >
            ✕
          </button>
        )}
      </div>

      {loading && <div className="loading">Nalagam...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && lekcije.length === 0 && searchQuery && (
        <div className="no-results">
          Ni najdenih lekcij za '<strong>{searchQuery}</strong>'
        </div>
      )}

      {!loading && lekcije.length === 0 && !searchQuery && (
        <div className="no-results">
          Še ni dodanih lekcij. Dodaj prvo lekcijo!
        </div>
      )}

      <ul className="lessons-grid">
        {lekcije.map((lekcija) => (
          <li key={lekcija.id} className="lesson-card">
            <div className="lesson-content" onClick={() => onOdpriPredogled(lekcija)}>
              <h3 className="lesson-title">{lekcija.naziv}</h3>
              <p className="lesson-description">{lekcija.opis}</p>
            </div>
            <div className="lesson-actions">
              <button
                className="btn btn-edit"
                onClick={() => onUrediLekcijo(lekcija)}
              >
                Uredi
              </button>
              <button
                className="btn btn-delete"
                onClick={() => onIzbrisiLekcijo(lekcija.id)}
              >
                Izbriši
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
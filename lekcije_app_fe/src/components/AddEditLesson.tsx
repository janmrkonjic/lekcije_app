interface AddEditLessonProps {
  formNaziv: string;
  setFormNaziv: (value: string) => void;
  formOpis: string;
  setFormOpis: (value: string) => void;
  formYtUrl: string;
  setFormYtUrl: (value: string) => void;
  editingId: number | null;
  error: string | null;
  onShraniLekcijo: (e: React.FormEvent) => Promise<void>;
  onVrniSeNaSeznam: () => void;
}

export default function AddEditLesson({
  formNaziv,
  setFormNaziv,
  formOpis,
  setFormOpis,
  formYtUrl,
  setFormYtUrl,
  editingId,
  error,
  onShraniLekcijo,
  onVrniSeNaSeznam,
}: AddEditLessonProps) {
  return (
    <div className="app-container">
      <header className="app-header">
        <button className="btn btn-back" onClick={onVrniSeNaSeznam}>
          ← Nazaj
        </button>
        <h1>{editingId === null ? 'Dodaj lekcijo' : 'Uredi lekcijo'}</h1>
      </header>

      {error && <div className="error-message">{error}</div>}

      <form className="lesson-form" onSubmit={onShraniLekcijo}>
        <div className="form-field">
          <label>Naziv lekcije</label>
          <input
            type="text"
            name="naziv"
            value={formNaziv}
            onChange={(e) => setFormNaziv(e.target.value)}
            placeholder="Vnesite naziv lekcije"
            required
          />
        </div>

        <div className="form-field">
          <label>YouTube URL</label>
          <input
            type="text"
            name="yt_url"
            value={formYtUrl}
            onChange={(e) => setFormYtUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>

        <div className="form-field">
          <label>Opis</label>
          <textarea
            name="opis"
            value={formOpis}
            onChange={(e) => setFormOpis(e.target.value)}
            rows={5}
            placeholder="Vnesite opis lekcije"
          />
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            {editingId === null ? 'Dodaj' : 'Shrani'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onVrniSeNaSeznam}
          >
            Prekliči
          </button>
        </div>
      </form>
    </div>
  );
}
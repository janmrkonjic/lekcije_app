import type { Lekcija } from '../api';

interface LessonPreviewProps {
  selectedLekcija: Lekcija;
  onUrediLekcijo: (lekcija: Lekcija) => void;
  onIzbrisiLekcijo: (id?: number) => void;
  onVrniSeNaSeznam: () => void;
  pripraviYouTubeUrl: (url: string) => string | null;
}

export default function LessonPreview({
  selectedLekcija,
  onUrediLekcijo,
  onIzbrisiLekcijo,
  onVrniSeNaSeznam,
  pripraviYouTubeUrl,
}: LessonPreviewProps) {
  const videoUrl = pripraviYouTubeUrl(selectedLekcija.yt_url);

  return (
    <div className="app-container preview-view">
      <header className="app-header">
        <button className="btn btn-back" onClick={onVrniSeNaSeznam}>
          ← Nazaj
        </button>
      </header>

      <div className="preview-content">
        <h1 className="preview-title">{selectedLekcija.naziv}</h1>
        <p className="preview-description">{selectedLekcija.opis}</p>

        <div className="video-container">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={selectedLekcija.naziv}
            />
          ) : (
            <div className="no-video">
              <p>Video ni na voljo</p>
              {selectedLekcija.yt_url && (
                <a href={selectedLekcija.yt_url} target="_blank" rel="noopener noreferrer">
                  Odpri povezavo
                </a>
              )}
            </div>
          )}
        </div>

        <div className="preview-actions">
          <button className="btn btn-edit" onClick={() => onUrediLekcijo(selectedLekcija)}>
            Uredi
          </button>
          <button className="btn btn-delete" onClick={() => {
            onIzbrisiLekcijo(selectedLekcija.id);
            onVrniSeNaSeznam();
          }}>
            Izbriši
          </button>
        </div>
      </div>
    </div>
  );
}
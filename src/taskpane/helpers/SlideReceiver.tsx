import React, { useState } from 'react';
import { vstoBridge, SlideInfo } from './vstoBridge1';

interface SlideReceiverProps {
  onSlideInfoReceived?: (slides: SlideInfo[]) => void;
}

const SlideReceiver: React.FC<SlideReceiverProps> = ({ onSlideInfoReceived }) => {
  const [slidesInfo, setSlidesInfo] = useState<SlideInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Solicita todas las diapositivas desde VSTO
   */
  const fetchAllSlidesInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      await vstoBridge.refreshActivePresentation();

      const slides = await vstoBridge.getActiveSlideInfo(); // ahora retorna SlideInfo[]
      setSlidesInfo([slides]);

      if (onSlideInfoReceived) {
        onSlideInfoReceived([slides]);
      }
    } catch (err) {
      console.error('Error al obtener diapositivas:', err);
      setError('No se pudo obtener la información de la presentación');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Renderiza estadísticas agregadas de todas las slides
   */
  const renderAggregateStats = () => {
    if (slidesInfo.length === 0) return null;

    const totalSlides = slidesInfo.length;
    const totalElements = slidesInfo.reduce((sum, slide) => sum + slide.elements.length, 0);
    const totalWords = slidesInfo.reduce(
      (sum, slide) =>
        sum +
        slide.elements.reduce((s, e) => s + (e.text?.wordCount || 0), 0),
      0
    );
    const totalChars = slidesInfo.reduce(
      (sum, slide) =>
        sum +
        slide.elements.reduce((s, e) => s + (e.text?.characterCount || 0), 0),
      0
    );

    return (
      <div style={{ marginTop: 16 }}>
        <h4>Resumen general</h4>
        <p>Diapositivas: {totalSlides}</p>
        <p>Elementos totales: {totalElements}</p>
        <p>Palabras totales: {totalWords}</p>
        <p>Caracteres totales: {totalChars}</p>
      </div>
    );
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div>
        <button onClick={fetchAllSlidesInfo} disabled={loading}>
          {loading ? 'Cargando...' : 'Analizar presentación completa'}
        </button>
        {error && (
          <div style={{ color: 'red', marginTop: 8 }}>{error}</div>
        )}
      </div>

      {slidesInfo.length > 0 && renderAggregateStats()}
    </div>
  );
};

export default SlideReceiver;

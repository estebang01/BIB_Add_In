import React, { useState } from 'react';
import { SlideInfo } from './vstoBridge1';
import SlideReceiver from './SlideReceiver';

const PowerPointAnalyzer: React.FC = () => {
  const [currentSlideInfo, setCurrentSlideInfo] = useState<SlideInfo | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<SlideInfo[]>([]);

  const handleSlideInfoReceived = (slides: SlideInfo[]) => {
    if (slides.length === 0) return;
    setCurrentSlideInfo(slides[0]); // Usamos la primera para analizar
    setAnalysisHistory(prev => [...prev, ...slides]);
  };

  const saveAsJson = () => {
    if (!currentSlideInfo) return;
    const jsonString = JSON.stringify(currentSlideInfo, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `slide-${currentSlideInfo.slideNumber}-analysis.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

const renderDetailedStats = () => {
  if (!currentSlideInfo || !currentSlideInfo.elements) return null;

  const slideArea = currentSlideInfo.width * currentSlideInfo.height;
  const occupiedArea = currentSlideInfo.elements.reduce((total, element) => {
    return total + (element.width * element.height);
  }, 0);
  const occupiedPercentage = (occupiedArea / slideArea) * 100;

  return (
    <div className="detailed-stats">
      <h4>Estadísticas detalladas</h4>
      <p>Área ocupada: {occupiedPercentage.toFixed(2)}%</p>
      <p>
        Elementos con texto:{" "}
        {currentSlideInfo.elements?.filter(e => e.text?.content).length ?? 0}
      </p>
    </div>
  );
};


  return (
    <div className="powerpoint-analyzer">
      <h2>Analizador de PowerPoint</h2>

      <SlideReceiver onSlideInfoReceived={handleSlideInfoReceived} />

      {currentSlideInfo && (
        <div className="analysis-results">
          <h3>Resultados del análisis</h3>
          {renderDetailedStats()}
          <div className="actions">
            <button onClick={saveAsJson}>Guardar como JSON</button>
          </div>
        </div>
      )}

      {analysisHistory.length > 1 && (
        <div className="analysis-history">
          <h3>Historial de análisis</h3>
          <ul>
            {analysisHistory.map((info, index) => (
              <li key={index}>
                Diapositiva #{info.slideNumber}: {info.slideTitle || 'Sin título'} 
                ({info.elements.length} elementos)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PowerPointAnalyzer;

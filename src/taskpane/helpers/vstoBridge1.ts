// vstoBridge.ts
export interface SlideInfo {
  slideNumber: number;
  slideTitle: string;
  width: number;
  height: number;
  elements: ElementInfo[];
}

export interface ElementInfo {
  id: number;
  name: string;
  type: string;
  left: number;
  top: number;
  width: number;
  height: number;
  zOrderPosition: number;
  fill?: FillInfo;
  line?: LineInfo;
  text?: TextInfo;
}

export interface FillInfo {
  type: string;
  color?: string;
  transparency: number;
}

export interface LineInfo {
  weight: number;
  style: string;
  color?: string;
  transparency: number;
}

export interface TextInfo {
  content: string;
  wordCount: number;
  characterCount: number;
  format?: TextFormatInfo;
  paragraphs?: ParagraphInfo[];
}

export interface TextFormatInfo {
  font: string;
  size: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  color?: string;
}

export interface ParagraphInfo {
  text: string;
  alignment: string;
  indentLevel: number;
}

class VstoBridge {
  private callbackMap = new Map<string, (data: any) => void>();
  private callId = 0;

  constructor() {
    if ((window as any).chrome?.webview) {
      (window as any).chrome.webview.addEventListener("message", this.handleMessage);
    } else {
      console.warn("WebView2 no está disponible.");
    }
  }

  private handleMessage = (event: MessageEvent) => {
    const { id, data, error } = event.data;

    if (id && this.callbackMap.has(id)) {
      const callback = this.callbackMap.get(id);
      if (callback) {
        if (error) {
          console.error("Error desde VSTO:", error);
        } else {
          callback(data);
        }
        this.callbackMap.delete(id);
      }
    }
  };

  public getActiveSlideInfo(): Promise<SlideInfo> {
    return new Promise((resolve, reject) => {
      const id = `slide_info_${this.callId++}`;

      this.callbackMap.set(id, (data) => {
        if (data) {
          resolve(data as SlideInfo);
        } else {
          reject(new Error("No se pudo obtener la información de la diapositiva"));
        }
      });

      (window as any).chrome.webview.postMessage({
        command: "getActiveSlideInfo",
        id
      });
    });
  }

  public refreshActivePresentation(): Promise<boolean> {
    return new Promise((resolve) => {
      const id = `refresh_${this.callId++}`;

      this.callbackMap.set(id, (success) => {
        resolve(!!success);
      });

      (window as any).chrome.webview.postMessage({
        command: "refreshActivePresentation",
        id
      });
    });
  }
}

export const vstoBridge = new VstoBridge();

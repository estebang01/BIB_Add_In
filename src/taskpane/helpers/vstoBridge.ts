// vstoBridge.ts
type MessageAction = "fixIssue" | "selectSlide"| "sendDummy"

interface VstoMessage {
  action: MessageAction;
  data: any;
}

type InitializeCallback = (data: any) => void;

class VSTOBridge {
  private static instance: VSTOBridge;
  private callback?: InitializeCallback;

  private constructor() {
    (window as any).initializeDataFromVSTO = (data: any) => {
      console.log("📩 Datos recibidos desde VSTO:", data);
      if (this.callback) this.callback(data);
    };
  }

  public static getInstance(): VSTOBridge {
    if (!VSTOBridge.instance) {
      VSTOBridge.instance = new VSTOBridge();
    }
    return VSTOBridge.instance;
  }

  public onInitialize(callback: InitializeCallback) {
    this.callback = callback;
  }

  public sendMessage(action: MessageAction, data: any) {
    const message: VstoMessage = { action, data };
    try {
      (window as any).chrome?.webview?.postMessage(message);
    } catch (err) {
      console.error("Error al enviar mensaje a VSTO:", err);
    }
  }
}

export const vstoBridge = VSTOBridge.getInstance();

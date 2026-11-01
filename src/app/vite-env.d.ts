/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />

// The File System Access API's save dialog, which only Chromium browsers have so far.
interface SaveFilePickerOptions {
  suggestedName?: string;
  types?: { description?: string; accept: Record<string, string[]> }[];
}

interface Window {
  showSaveFilePicker?: (options?: SaveFilePickerOptions) => Promise<FileSystemFileHandle>;
}

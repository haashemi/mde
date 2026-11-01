import { registerSW } from "virtual:pwa-register";

const UPDATE_INTERVAL_MS = 15 * 60 * 1000;

// An open tab never re-checks the service worker on its own, so updates are polled and checked on return.
export const registerServiceWorker = () =>
  registerSW({
    immediate: true,
    onRegisteredSW: (_url, registration) => {
      if (!registration) return;

      const checkForUpdate = () => {
        if (registration.installing || !navigator.onLine) return;
        registration.update().catch(() => undefined);
      };

      setInterval(checkForUpdate, UPDATE_INTERVAL_MS);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") checkForUpdate();
      });
      window.addEventListener("online", checkForUpdate);
    },
  });

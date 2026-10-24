const STORAGE_KEY = "arqlab-completed";

// Storage may be unavailable or contain data from an older version.
export function loadProgress(storage, lessonCount) {
  try {
    const saved = JSON.parse(storage.getItem(STORAGE_KEY) || "[]");
    return new Set(
      Array.isArray(saved)
        ? saved.filter(
            (index) =>
              Number.isInteger(index) && index >= 0 && index < lessonCount,
          )
        : [],
    );
  } catch {
    return new Set();
  }
}

export function saveProgress(storage, completed) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
    return true;
  } catch {
    return false;
  }
}

export function getBrowserStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export const getItem: typeof window.localStorage.getItem = (key) => {
  if (!storageAvailable("localStorage")) {
    return null;
  }
  return window.localStorage.getItem(key);
};

export const setItem: typeof window.localStorage.setItem = (key, value) => {
  if (!storageAvailable("localStorage")) {
    return null;
  }
  return window.localStorage.setItem(key, value);
};

export const removeItem: typeof window.localStorage.removeItem = (key) => {
  if (!storageAvailable("localStorage")) {
    return null;
  }
  return window.localStorage.removeItem(key);
};

// See https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
function storageAvailable(type: "localStorage" | "sessionStorage") {
  if (typeof window === "undefined") {
    return false;
  }
  let storage;
  try {
    storage = window[type];
    let x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

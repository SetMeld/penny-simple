import { useEffect, useRef } from "react";

// Based on https://github.com/jacobbuck/react-beforeunload/blob/673a9f42d7e07f2764aebd36a8d2b47256b34ae0/src/useBeforeunload.js
// The MIT License (MIT)

// Copyright (c) 2021 Jacob Buck

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

export function useBeforeUnload(handler?: EventListener) {
  const eventListenerRef = useRef<typeof handler | null>(null);

  useEffect(() => {
    eventListenerRef.current = (event) => {
      if (typeof handler !== "function") {
        eventListenerRef.current = null;
        return;
      }
      const returnValue = handler(event);
      // Handle legacy `event.returnValue` property
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
      if (typeof returnValue === "string") {
        (event as any).returnValue = returnValue;
        return returnValue;
      }
      // Chrome doesn't support `event.preventDefault()` on `BeforeUnloadEvent`,
      // instead it requires `event.returnValue` to be set
      // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload#browser_compatibility
      if (event.defaultPrevented) {
        return ((event as any).returnValue = "");
      }
    };
  }, [handler]);

  useEffect(() => {
    // Don't add an event listener if none is given,
    // as it disables the browser's back/forward cache.
    // See https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event#usage_notes.
    if (typeof eventListenerRef.current !== "function") {
      return;
    }
    const currentEventListener = eventListenerRef.current;
    window.addEventListener("beforeunload", currentEventListener);
    return () => {
      window.removeEventListener("beforeunload", currentEventListener);
    };
  }, [eventListenerRef.current]);
}

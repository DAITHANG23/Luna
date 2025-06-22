// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// global.document.createRange = () => ({
//     setStart: () => {},
//     setEnd: () => {},
//     commonAncestorContainer: {
//         nodeName: 'BODY',
//         ownerDocument: document
//     }
// })

const noop = () => {};
Object.defineProperty(window, "scrollTo", { value: noop, writable: true });

jest.mock("lodash/debounce", () => ({
  __esModule: true,
  default: jest.fn(),
}));

if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // Deprecated
    removeListener: () => {}, // Deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

jest.mock("next/router", () => ({
  __esModule: true, // quan trọng để Jest hiểu là ESM module
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    isFallback: false,
  })),
  default: {
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    beforePopState: jest.fn(),
    ready: true,
  },
}));

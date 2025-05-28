// src/setupTests.ts
import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from 'util';

// Solução universal e compatível com TypeScript
globalThis.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
globalThis.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;

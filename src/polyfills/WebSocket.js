// Polyfill for WebSocket to fix Supabase realtime build issues
export default class WebSocket {
  constructor() {
    throw new Error('WebSocket is not available in this environment');
  }
}

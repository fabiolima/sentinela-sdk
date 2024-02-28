import { getUserId, getDefaultEndpoint, getDeviceData } from './helpers'

export class Sentinela {
  endpoint;
  domain;
  userId;

  constructor({ domain }) {
    this.domain = domain
    this.endpoint = getDefaultEndpoint();
    this.userId = getUserId()

    this.#startMonitor()
  }

  #startMonitor() {
    window.addEventListener("error", (eventError) => this.onError({
      source: 'global',
      message: eventError.error.message,
      stack: eventError.error.stack,
      filename: eventError.filename,
      lineno: eventError.lineno,
      colno: eventError.colno
    }))
  }

  async onError(errorPayload) {
    try {
      await this.sendError(errorPayload)
    } catch (er) {
      console.error(er)
    }
  }

  async sendError(payload) {
    const deviceData = getDeviceData()

    payload = {
      ...payload,
      ...deviceData,
      user_id: this.userId,
      date: new Date().toISOString(),
      href: location.href,
      referrer: document.referrer || null,
      domain: this.domain
    }

    const endpoint = `${this.endpoint}/errors`

    return fetch(endpoint, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });
  }
}
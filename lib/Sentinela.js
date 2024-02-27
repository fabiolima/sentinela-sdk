import { getUserId, getDefaultEndpoint } from './helpers'

export class Sentinela {
  endpoint;
  domain;
  userId;

  constructor() {}

  start() {
    this.endpoint = getDefaultEndpoint();
    this.domain = document.currentScript.getAttribute('data-domain')
    this.userId = getUserId()

    this.#startMonitor()
  }

  #startMonitor() {
    window.addEventListener("error", (error) => this.#onError(error))
  }

  async #onError(eventError) {

    const payload = {
      message: eventError.error.message,
      stack: eventError.error.stack,
      filename: eventError.filename,
      lineno: eventError.lineno,
      colno: eventError.colno
    }

    try {
      await this.sendError(payload)
    } catch (er) {
      console.error(er)
    }
  }

  async sendError(payload) {
    payload = {
      ...payload,
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
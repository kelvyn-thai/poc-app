class HTTP {
  baseURL: string;

  controller: AbortController;

  requestInit: RequestInit;

  constructor({ baseURL }: { baseURL: string }) {
    this.baseURL = baseURL;
    this.controller = new AbortController();
    this.requestInit = {
      cache: "no-cache",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
  }

  get(url: string) {
    const { signal } = this.controller;
    return fetch(`${this.baseURL}/${url}`, {
      ...this.requestInit,
      method: "GET",
      signal,
    })
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(error);
      });
  }

  post(url: string, data?: any) {
    const { signal } = this.controller;
    return fetch(`${this.baseURL}/${url}`, {
      ...this.requestInit,
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(data), // body data type must match "Content-Type" header
      signal,
    })
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(error);
      });
  }

  put(url: string, data?: any) {
    const { signal } = this.controller;
    return fetch(`${this.baseURL}/${url}`, {
      ...this.requestInit,
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(data), // body data type must match "Content-Type" header
      signal,
    })
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(error);
      });
  }

  delete(url: string, data?: any) {
    const { signal } = this.controller;
    return fetch(`${this.baseURL}/${url}`, {
      ...this.requestInit,
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(data), // body data type must match "Content-Type" header
      signal,
    })
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(error);
      });
  }

  abort() {
    this.controller.abort();
  }
}

export default HTTP;

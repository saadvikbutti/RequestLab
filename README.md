# RequestLab
# RequestLab

A lightweight, browser-based API workbench built with HTML, CSS and vanilla JavaScript.

**Explore APIs. Send requests. See what happens.**

[**Live Demo →**](https://saadvikbutti.github.io/RequestLab/)

## About

RequestLab gives you a simple space to experiment with APIs, send HTTP requests, inspect server responses and understand what happens behind every request — without complicated setup.

## Features

- **HTTP Methods:** Send GET, POST, PUT and DELETE requests.
- **Custom Headers:** Add and manage request headers.
- **JSON Request Body:** Send JSON data with POST and PUT requests.
- **Response Viewer:** Inspect JSON, text and XML responses.
- **Response Details:** View HTTP status codes and response time.
- **Error Handling:** Handle HTTP errors, network failures and empty responses.
- **Request History:** Automatically save previous requests.
- **Restore Requests:** Revisit previous requests using the history panel.
- **History Management:** Remove individual entries or clear the entire history.
- **Local Storage:** Keep request history saved in your browser.

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- Fetch API
- Browser Local Storage

## Getting Started

Clone the repository:

```bash
git clone https://github.com/SaadvikButti/RequestLab.git
```

Navigate into the project:

```bash
cd RequestLab
```

Open `index.html` in your browser.

No additional dependencies or installation required.

## How to Use

1. Select an HTTP method.
2. Enter the API endpoint URL.
3. Add custom headers if required.
4. Enter a JSON request body for POST or PUT requests.
5. Click **Send Request**.
6. Inspect the response, status code and response time.
7. Revisit previous requests through the History panel.

## Example API Endpoints

Try these endpoints to experiment with different requests:

| Method | Endpoint |
|---|---|
| GET | `https://jsonplaceholder.typicode.com/posts/1` |
| GET | `https://jsonplaceholder.typicode.com/users` |
| POST | `https://jsonplaceholder.typicode.com/posts` |
| PUT | `https://jsonplaceholder.typicode.com/posts/1` |
| DELETE | `https://jsonplaceholder.typicode.com/posts/1` |

## What I Learned

Building RequestLab helped me understand:

- How HTTP requests and responses work.
- Using the Fetch API to communicate with servers.
- JavaScript promises and async/await.
- Working with JSON and response content types.
- Handling HTTP and network errors.
- Dynamically creating and updating DOM elements.
- Persisting application data using Local Storage.

## Limitations

- Some APIs may block browser requests because of CORS restrictions.
- Binary responses such as images and PDFs are not previewed.
- Request history is stored locally in the browser.

## Future Improvements

- Import and export requests.
- Organize requests into collections.
- Environment variables.
- Response syntax highlighting.
- Support for additional response previews.

---

Built as a hands-on project to learn JavaScript, APIs and HTTP fundamentals.
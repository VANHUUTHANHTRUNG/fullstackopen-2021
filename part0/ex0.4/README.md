# Ex0.4 #

Sequence Diagram

```
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
server-->browser: Redirect URL, HTTP code 304
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "Custome message", date: "2021-07-05" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note

```

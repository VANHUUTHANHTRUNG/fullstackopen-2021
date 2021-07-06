# Ex0.6 #

Sequence Diagram

```

note over browser:
browser create and append note into current notes
end note

note over browser:
browser redraw notes
end note

note over browser:
browser sends JSON-data to server
end note
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
server-->browser: HTTP code 201, "message": "note created"

```

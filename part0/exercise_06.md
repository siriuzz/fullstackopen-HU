```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST 201 https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: json document
    deactivate server

```
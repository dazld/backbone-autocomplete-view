To run demo, build app.js from demo.js using Browserify:
- browserify demo.js -o app.js -x jquery

Uses external jQuery, but you could also include jQuery's npm module (in which case you don't need the `-x jquery`)

---
paths:
  - 'routes/**'
---

# Routes

## Use resource routes for controllers
Always use resource routes for controllers (`Route::resource()`), except for invokable (single-action) controllers. If not all resource methods are used, use partial resource routes (`->only([...])` / `->except([...])`).

# ˚୨୧⋆ Simplex ｡˚ ⋆

### A simple implementation of a **[Simplex Tableau](https://en.wikipedia.org/wiki/Simplex_algorithm)** solver

### ✩ _If you like this project, consider giving it a star!_ ✩

### ♡ **What features does this have?**

To keep it short - this has everything that [this](https://www.math.cmu.edu/~bkell/pivot.html) doesn't have!

- Editable matrix at any time by clicking the "Edit" button
- Resizable matrix which persists existing values when resized
- A (seperate) `clear` button to clear the entire matrix
- Manual pivoting by clicking a cell (0-cells can't be pivoted)
- Previous pivot states (you can `unpivot` until the initial tableau!)
- Automatic pivoting (a single time, useful for checking working)
- Solving and unsolving the whole Tableau in a single click
- Persistent state through `localStorage` (everything is saved)

### ♡ **Why does this exist?**

I came across [this](https://www.math.cmu.edu/~bkell/pivot.html) recently, because I wanted to check my working was correct when solving `Simplex Tableau` questions.

It's simple and allows for manual pivoting, which is exactly what I needed - except there were some issues:

- If I changed the dimensions of the tableau, all of the values I already had in it were cleared.
- If I reload the page, all the values I set were also cleared.
- If I pivot incorrectly, there's no `undo` button.
- There's no button to automatically pivot once or to start again from the initial tableau.

### ♡ **Where do I find this?**

You can find a deployed version of the project [here](https://acquitelol.github.io/simplex/).

### ♡ **How do I run locally?**

- Clone it to your machine

```console
$ git clone git@github.com:acquitelol/simplex.git
```

- Install dependencies and deploy

```console
$ cd simplex
$ pnpm i
$ pnpm dev
```

### ♡ **Licensing**

- Copyright © 2025 Rosie ([acquitelol](https://github.com/acquitelol))

<hr />

<a href="#top">⇡ Back to top️!</a>

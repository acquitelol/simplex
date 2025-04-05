# ˚୨୧⋆ Simplex Solver ｡˚ ⋆

### A simple implementation of a **[Simplex Tableau](https://en.wikipedia.org/wiki/Simplex_algorithm)** solver

### ✩ _If you like this project, consider giving it a star!_ ✩

### ♡ **What features does this have?**

To keep it short - this has everything that [this](https://www.math.cmu.edu/~bkell/pivot.html) doesn't have (and more)!

- Editable matrix at any time by clicking the "Edit" button
- Resizable matrix which persists existing values when resized
- A (seperate) `clear` button to clear the entire matrix
- Manual pivoting by clicking a cell (0-cells can't be pivoted)
- Previous pivot states (you can `unpivot` until the initial tableau!)
- Automatic pivoting (a single time, useful for checking working)
- Solving and unsolving the whole Tableau in a single click
- Persistent state through `localStorage` (everything is saved)

> [!TIP]
> You can hover over a button to get more information about it.

### ♡ **Why does this exist?**

I came across [this](https://www.math.cmu.edu/~bkell/pivot.html) recently, as I needed a basic solver for `Simplex Tableau` questions.

It's simple and allows for manual pivoting, which is exactly what I needed - except there were some issues:

- If I changed the dimensions of the tableau or reloaded the page, all of the values were cleared.
- If I pivot incorrectly, there's no `undo` or `unpivot` button. I have to completely refill the tableau.
- There's no button to automatically pivot once or to go back to the initial tableau.

Therefore, I decided to make my own implementation. This is "inspired" by the solver I referenced above, but no source code was used from it.

### ♡ **Where do I find this?**

- You can find a deployed version of the project [here](https://acquitelol.github.io/simplex/).

### ♡ **How do I run locally?**

- Clone it to your machine:

```console
$ git clone git@github.com:acquitelol/simplex.git
```

- Install dependencies and deploy:

```console
$ cd simplex
$ pnpm i
$ pnpm dev
```

### ♡ **Licensing**

- See the [LICENSE.md](https://github.com/acquitelol/simplex/blob/main/LICENSE.md)
- Copyright © 2025 Rosie ([acquitelol](https://github.com/acquitelol))

<hr />

<a href="#top">⇡ Back to top️!</a>

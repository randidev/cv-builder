# CV Builder

## Table of Contents

- [Core Technologies](#core-technologies)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Code Scaffolding](#code-scaffolding)
- [Development Documentation](#development-documentation)

### Core Technologies

- Frontend :
  - [Next.js (React)](https://nextjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Redux Toolkit](https://redux-toolkit.js.org/)

### Getting Started

```bash
# Install dependencies for the host
yarn

# Start the application
yarn dev
```

### Project Structure

| Name                  | Description                                         |
| --------------------- | --------------------------------------------------- |
| **src/components**/\* | All app wise common components                      |
| **src/config**/\*     | Any app level environment configs should go here.   |
| **src/dummy**/\*      | Any dummy contents.                                 |
| **src/hooks**/\*      | Custom react hooks                                  |
| **src/pages**/\*      | App pages                                           |
| **src/redux**/\*      | Redux store that stores all global state of the app |
| **src/styles**/\*     | Common/Global styles                                |
| **src/utils**/\*      | Utility functions                                   |
| .eslintrc.json        | Eslint configuration                                |
| .gitignore            | Folder and files ignored by git.                    |
| next.config.js        | Next.js configuration                               |
| package.json          | NPM dependencies.                                   |
| tsconfig.json         | Contains typescript configuration for this project. |

## Code Scaffolding

### Components ( if needed )

Check the `components` folder if you have neccessary components needed to finish your screen. If not, you can define the component in the screen itself or add any components here if you think it is reusable between screens.

1. Create a folder for the component in `src/components`. The name should be able to give others the idea what the component is about.
2. Create a root component file called `index.tsx` under that folder. This file will define the component itself.
3. (Optional) You can also create a component within a component for complex components.

### Pages

The screen defines a collection of components. You can define some components here if you think it is only usable within the screen but preferrably components should be resuable. Any logic, API request, or retrieving from redux store should be defined here.

1. Create a folder under `src/pages`. Make sure the name is concise enough to understand what the component is about.
2. Create a root page file called `index.tsx`. This file will define the page itself.

## Naming Convention

### For variables, files and folders

Use `camelCase` for files and folders that are not components or pages and `camelCase` for variables within files. The only exception would be the component and pages names which should be `PascalCase`.

```
// File name is Button.tsx

const Button: React.FC = () => {
  const propName = 'Sample'
  return <EditProfile name={propName} />;
};
```

In some cases, we include the file `functionality` in its file name in the format:

`<file-name>-<functionality>.<extension>`
`<file-name><functionality>.<extension>`

Non-component/screen file/folder naming example:

- rootReducer.ts

Pages/component file/folder naming example:

- Navbar
- Breadcrumb
- Layout

## Development Documentation

# CV Builder

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Code Scaffolding](#code-scaffolding)
- [Development Documentation](#development-documentation)

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

## 1. Project Overview

### 1.1 Project Description

The project is focused on developing a resume builder tool tailored for recruitment agencies. The tool aims to streamline the process of creating and managing professional resumes for candidates, ensuring a consistent and polished presentation.

#### Key User Stories

**User Story 1: Customizable Resume Templates**
As a Recruitment Agency Representative, I want to create and save a customizable template for our agency's resumes so that we can maintain a consistent and professional format for all candidate profiles we prepare. The tool should enable users to define or replicate the basic structure of their agency's resume format, establishing a standard template reusable to generate candidates’ resumes.

- **Acceptance Criteria:**
  - The system must allow users to create a new resume template from scratch.
  - Users should be able to customize various aspects of the resume template, including font size, type, color schemes, and layout (e.g., header, footer, margins), with or without code.
  - Once a template is created or edited, users must be able to save it for future use. Saved templates should be easily retrievable and editable.
  - The system must allow users to add a watermark (e.g., agency’s logo).

**User Story 2: Adding Candidate Details and Generating Resumes**
As a Recruitment Agency Representative, I want to be able to add a candidate’s details and generate a resume. The tool should allow for easy input of individual candidate details into the predefined resume template. Once the details are added, the system should enable the generation and downloading of the complete resume in a professional, ready-to-share format, such as PDF, ensuring a streamlined process for creating personalized resumes for each candidate before sending them to clients.

- **Acceptance Criteria:**
  - The system must allow users to input individual candidate details such as name, contact information, work experience, education, skills, and other relevant information into the resume template.
  - The process of entering candidate details should be intuitive and user-friendly, minimizing the need for extensive training or technical knowledge.
  - Once candidate details are inputted, users should be able to edit or update this information easily.
  - Users should be able to preview the final resume before generating it, allowing for any necessary adjustments.
  - The completed resume should be available for download in a ready-to-share format, such as PDF, ensuring compatibility with various operating systems and devices.
  - After the candidate details are added, the system should allow users to generate a resume based on the inputted data and the selected template.

### 1.2 Repository Details

- **Repository Name**: cv-builder
- **URL**: [URL](https://github.com/randidev/cv-builder/)
- **Primary Technologies**:
  - [Next.js (React)](https://nextjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Redux Toolkit](https://redux-toolkit.js.org/)

## 2. Research Process

### 2.1 Initial Research

- **Objective**: To understand the requirements and best practices for developing a resume builder specifically tailored for recruitment agencies, focusing on customizable templates and an intuitive candidate input system.

- **Sources Consulted**:
  - Notion Page
- **Findings**:
  - **Customizable Templates**: The resume builder must allow users to create and save customizable templates. This includes features for defining layout, color schemes, fonts, and adding watermarks, with flexibility for both code-based and no-code customizations.
  - **Candidate Details Input**: The tool should provide an easy-to-use interface for inputting candidate details into predefined templates. The system should support previewing and editing of resumes before finalizing and downloading them in formats such as PDF.
  - **Usability and Flexibility**: Emphasis on creating a user-friendly experience that minimizes the need for extensive training or technical knowledge. The tool should ensure that templates and resumes are compatible with various devices and operating systems.

### 2.2 Technology Stack Evaluation

- **Technologies Chosen**:
  - **Next.js (React)**: For building the frontend with server-side rendering capabilities and a seamless user experience.
  - **TypeScript**: To provide static typing and improved development experience with early error detection and better code quality.
  - **Redux Toolkit**: For state management, allowing efficient handling of complex state logic and improving the maintainability of the application.
- **Rationale**:
  - **Next.js**: Provides a robust framework for React applications with built-in support for server-side rendering, static site generation, and optimized performance.
  - **TypeScript**: Enhances the development process with strong typing, helping to prevent runtime errors and facilitating code maintenance.
  - **Redux Toolkit**: Simplifies state management with a standardized approach, making it easier to manage and debug application state.

### 2.3 Design and Architecture

- **Design Principles**: Focus on user-centric design, allowing easy customization of templates and straightforward input of candidate details.
- **Design Patterns**: Implementation of SOLID principles to ensure that the application is modular, maintainable, and scalable.
  - **Single Responsibility Principle (SRP)**: Each component and module in the application has a single responsibility, improving code clarity and ease of maintenance.
  - **Open/Closed Principle (OCP)**: The system is designed to be open for extension but closed for modification, allowing new features or changes to be added with minimal impact on existing code.
  - **Liskov Substitution Principle (LSP)**: Components and classes are designed so that they can be replaced with their subtypes without altering the correctness of the application.
  - **Interface Segregation Principle (ISP)**: Interfaces are designed to be specific to the needs of the clients using them, avoiding large, monolithic interfaces.
  - **Dependency Inversion Principle (DIP)**: High-level modules are not dependent on low-level modules, but both are dependent on abstractions. Abstractions should not depend on details, but details should depend on abstractions.
- **Architecture Overview**:
  - **Frontend**: Developed using Next.js with TypeScript for a scalable and maintainable codebase. Redux Toolkit is used for managing application state and ensuring smooth interactions between components.
  - **Database**: Since the project requires full client-side development, local storage or browser-based storage solutions are used for persisting user-created templates and candidate data.
- **Design Challenges**:
  - Ensuring a responsive design that functions well across different devices and screen sizes.
  - Implementing a flexible template system that supports both code-based and no-code customizations within a client-side environment.

## 3. Development Process

### 3.1 Planning and Requirements

- **Initial Requirements**:
  - **Customizable Templates**: Users must be able to create, customize, save, and retrieve resume templates. Customization includes layout, fonts, color schemes, and watermarks.
  - **Candidate Details Input**: The tool should allow easy input of candidate details into templates, support previewing, editing, and generating downloadable resumes in formats like PDF.
- **Changes to Requirements**:
  - Enhanced support for additional template customization options based on user feedback.
  - Added functionality for previewing and adjusting the final resume before downloading.

### 3.2 Implementation

- **Development Phases**:
  - **Phase 1**: Set up the project structure and initial configuration with Next.js, TypeScript, and Redux Toolkit.
  - **Phase 2**: Implement core features including template creation, customization, and saving.
  - **Phase 3**: Develop the candidate details input system, including preview and resume generation.
  - **Phase 4**: Finalize UI/UX and conduct testing to ensure a seamless user experience.
- **Key Features Implemented**:
  - **Feature 1**: Template creation and customization with options for layout, fonts, and color schemes.
  - **Feature 2**: Candidate details input and resume generation with preview functionality.
  - **Feature 3**: Downloadable resumes in PDF format with template-based formatting.
- **Challenges and Solutions**:

  - **Challenge 1**: Saving data to the browser side for persistence.

    - **Solution**: Used Redux Toolkit Persist to manage and persist state across page reloads, ensuring that user-created templates and candidate data are saved and retrieved efficiently.

  - **Challenge 2**: Building a CV builder that supports multiple layout templates using React PDF.
    - **Solution**: Implemented React PDF to handle the generation of PDF resumes from various layout templates, allowing for flexible and customizable resume formats that meet different user needs. across various devices.

## 4. Conclusion

### 4.1 Summary of Findings

The resume builder meets the specified requirements, providing a robust solution for creating and managing professional resumes. The application supports customizable templates and an intuitive interface for adding candidate details, with features for previewing and downloading resumes.

### 4.2 Future Work

- **Additional Features**: Implement support for more template formats and advanced customization options.
- **Performance Improvements**: Continue optimizing the application for better performance and responsiveness.
- **User Feedback**: Collect and integrate user feedback to refine and enhance the overall user experience.

### 4.3 Lessons Learned

- **Importance of Flexibility**: Ensuring the template system is flexible and user-friendly was crucial for meeting diverse user needs.
- **Testing and Optimization**: Thorough testing and performance optimization are essential for delivering a smooth user experience.

## 5. References

- Notion Page
- [GitHub Repository](https://github.com/randidev/cv-builder/)

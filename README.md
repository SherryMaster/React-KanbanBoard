# 📋 React Kanban Board

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A modern, feature-rich Kanban board application built with React, TypeScript, and @dnd-kit. Organize your workflow with an intuitive drag-and-drop interface.

![Kanban Board Preview](https://via.placeholder.com/800x400?text=Kanban+Board+Preview)

## ✨ Features

- **🔄 Drag and Drop Interface**: Seamlessly reorganize tasks and columns with smooth drag-and-drop functionality
- **📝 Task Management**: Create, edit, and delete tasks with ease
- **🗂️ Column Organization**: Add and customize columns to fit your workflow
- **🎨 Clean Modern UI**: Intuitive interface with visual feedback for drag operations
- **📱 Responsive Design**: Works across different screen sizes
- **⚡ Blazing Fast**: Built with Vite for optimal development and production performance

## 🛠️ Technologies

- **React**: UI library for building the component-based interface
- **TypeScript**: For type-safe code and better developer experience
- **@dnd-kit**: Powerful, accessible drag-and-drop library
- **TailwindCSS**: Utility-first CSS framework for styling
- **Vite**: Next generation frontend tooling for faster development

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SherryMaster/React-KanbanBoard.git
   cd kanban-board
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

### Creating a Column
Click the "Add Column" button on the right side of the board.

### Creating a Task
1. Navigate to the column where you want to add a task
2. Click the "Add Task" button at the bottom of the column

### Editing Tasks
1. Hover over a task
2. Click the edit (pencil) icon
3. Modify the title and/or description
4. Click the check icon to save your changes

### Moving Items
- **Tasks**: Drag and drop tasks within a column or between columns
- **Columns**: Drag and drop to reorder columns

## 🏗️ Project Structure

```
src/
├── components/
│   ├── KanbanBoard.tsx    # Main component that manages the board state
│   ├── ColumnContainer.tsx # Handles column rendering and interactions
│   └── TaskContainer.tsx  # Handles task rendering and interactions
├── icons/
│   ├── PlusIcon.tsx
│   ├── TrashIcon.tsx
│   ├── EditIcon.tsx
│   └── CheckIcon.tsx
├── types.tsx         # TypeScript type definitions
├── App.tsx
└── main.tsx
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Connect with Me

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SherryMaster)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shaheer-ahmed-987068282/)
[![Facebook](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/profile.php?id=100076044710923)

---

Made with ❤️ by Shaheer Ahmed

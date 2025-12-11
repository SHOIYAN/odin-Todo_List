# 🗂️ odin-Todo_App
A modular Todo List app built for The Odin Project.

## ✨ Features
- Create, delete, and switch between multiple projects  
- Add todos with title, description, date, and priority  
- Edit or remove individual todos  
- LocalStorage persistence for all projects & todos  
- Fully modular codebase using factory functions and controllers  
- Bundled with Webpack for development and production builds  

## 🧩 Architecture Overview
**components/**  
Factory functions for core data models like `Project` and `Todo`.

**controllers/**  
Handles app logic :  creating projects, managing todos, loading/saving data.

**dom/**  
All DOM rendering and event listeners.

This separation keeps logic, UI, and data independent, easy to maintain, and scalable.

## 🛠️ Built With
**JavaScript (ES6+)** — modular structure, factory functions  

**HTML5 & CSS3** — simple and clean UI  

**Webpack** — module bundling, asset pipeline  

**LocalStorage API** — persistent user data  

## 🚀 Live Demo
[Todo App](https://shoiyan.github.io/odin-Todo_List/)

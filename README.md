# An Advanced ToDo Application

# 📝 Advanced To-Do List Application  
A feature-rich and modern to-do management web application built using **React, TypeScript, and Vite**.  
This project aims to solve real productivity needs by combining scheduling, recurring tasks, filtering, and calendar-based navigation—all inside a clean, minimal UI.

---
# View Demo
**link: ** https://advancedtodo-maheedhar3s-projects.vercel.app?_vercel_share=2pLhWvoGnSAgo93ratzwfkTFbHzTf4KJ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## 🚀 Features

### ✅ 1. Task Categories
Organize tasks into:
- **Today**
- **Daily Routine**
- **Weekly**
- **Monthly**
- **Yearly**
- **Custom Date**

Each task belongs to exactly one category for clean organization.

---

### 🕒 2. Time & Date Scheduling
While creating a task, users can set:
- Start date + time  
- End date + time (optional)  
- Enable **repeat until disabled** for recurring categories  

---

### 📌 3. Task Status Tracking
Each task supports statuses:
- **Not Started**
- **Ongoing**
- **Completed**

Status is visual and color-coded for clarity.

---

### 🔍 4. Smart Dashboard + Filters
Users can filter tasks by:
- Today
- Tomorrow
- Specific Date
- Daily / Weekly / Monthly / Yearly categories  
- Search by name, category, or date

All tasks are shown by default.

---

### ⚙️ 5. Full CRUD Operations
Each task supports:
- Edit  
- Delete  
- Status update  

---

### 🗂 6. UI Elements & Layout
The interface includes:
- Add Task modal  
- Search bar  
- Real-time clock + date display  
- Calendar panel to jump between days  
- Organized task list in card layout  

The UI is fully responsive and minimalistic.

---

## 🧱 Tech Stack

| Layer        | Technology |
|--------------|------------|
| Frontend     | React + TypeScript |
| Bundler      | Vite |
| Icons        | React Icons / Custom |
| Styling      | CSS (or your chosen styling method) |

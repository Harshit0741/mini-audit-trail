Mini Audit Trail Generator
==========================

A micro web app built with **Next.js** that allows users to edit text and generate an automatic **change-history (audit trail)** every time the text is modified and saved.

This project demonstrates:

*   Frontend + Backend communication
    
*   Custom change-detection logic
    
*   State management
    
*   Timestamps
    
*   REST API creation
    

🚀 Features
-----------

*   **Content Editor** – A live text editor (textarea)
    
*   **Save Version** – Saves the current version of the text
    
*   **Version History** – Displays a list of all saved changes
    
*   **Word Diff Detection**
    
    *   Added words
        
    *   Removed words
        
*   **Old vs New text length**
    
*   **Timestamp** for every saved version
    
*   **Modern SaaS-style UI**
    

📦 Tech Stack
-------------

*   **Frontend:** React + Next.js (App Router)
    
*   **Backend:** Next.js API Routes (Node.js)
    
*   **Styling:** Tailwind CSS
    
*   **Storage:** In-memory Array (as allowed for the task)
    

📡 API Endpoints
----------------

### 1\. Save a new version

**POST** /api/versions(Equivalent to: /save-version)

**Request Body:**

```bash
{
  "text": "Your updated content here"
}
```

**Response Example:**

```bash   
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2025-11-26 13:40",
  "addedWords": ["adoption", "dashboard"],
  "removedWords": ["pilot"],
  "oldLength": 43,
  "newLength": 51
}
```

### 2\. Get all versions

**GET** /api/versions(Equivalent to: /versions)

**Response Example:**

 ```bash
 [
  {
    "id": "uuid",
    "timestamp": "2025-11-26 13:40",
    "addedWords": ["adoption", "dashboard"],
    "removedWords": ["pilot"],
    "oldLength": 43,
    "newLength": 51
  }
]
```

🧠 Custom Logic Implemented
---------------------------

No external diff libraries or online templates were used at all logic was written from scratch:

*   Text is split into word arrays
    
*   Compared with the last saved version
    
*   **Added words** are extracted
    
*   **Removed words** are extracted
    
*   **Length difference** is calculated
    
*   A final **summary object** is generated
    

🗂 Data Storage
---------------

Currently implemented using:

✅ **In-memory array**

```bash
let versions = [];   
```

This was chosen because it is **acceptable for a short task (2 hours)**.

▶️ How to Run the Project
-------------------------

```bash
npm install  npm run dev
```

Then open in browser:

```bash
http://localhost:3000
```

🎯 Proof of Skills
------------------

This project demonstrates:

*   Full-stack development (React + API)
    
*   Custom algorithm implementation
    
*   REST API architecture
    
*   State management
    
*   SaaS-style UI design
    
*   Version control & logging concepts
    

✅ Status
--------

All task requirements **have been successfully completed and exceeded**.

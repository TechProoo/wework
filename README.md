# WEWORK

A modern, mobile-first landing page built with React and Node.js.  
Designed to help organizations showcase remote work and skills programs with a clean, muted color palette.

![WEWORK Screenshot](./screenshot.png) <!-- Optional: add your own screenshot -->

## 🌟 Features

- **Responsive Design** – Optimized for mobile, tablet, and desktop.
- **Modern Tech Stack** – React for the frontend, Node.js for backend integration.
- **Reusable CSS Variables** – Easy to update colors and styles in one place.
- **Clean Aesthetic** – Muted light grey, mauve, slate, and forest green palette.
- **Easy Customization** – Change content, palette, and branding to match your needs.

## 🎨 Color Palette

Defined in `:root` for easy styling:

```css
:root {
  --color-light: #f4f2f3; /* Very light grey */
  --color-mauve: #c0a9bd; /* Mauve */
  --color-slate: #94a7ae; /* Muted slate blue/grey */
  --color-forest: #64766a; /* Muted forest green */
}
```

🚀 Getting Started
Prerequisites

Node.js
(v18+ recommended)

npm
or Yarn

Installation

Clone the repo:

git clone https://github.com/your-username/wework.git
cd wework

Install dependencies:

npm install

# or

yarn install

Running Locally

Start the development server:

npm run dev

# or

yarn dev

Open http://localhost:3000
to see the landing page.

📂 Project Structure
wework/
├─ public/ # Static assets
├─ src/
│ ├─ components/ # Reusable UI components
│ ├─ pages/ # Pages
│ ├─ styles/ # Global styles and variables
│ └─ App.jsx # Main React app
└─ server/ # Node.js backend (optional)

📝 Customization

Edit content in src/pages and src/components to change text/images.

Update :root variables in src/styles/global.css to change the color palette.

Add your own branding, logos, or links as needed.

📜 License

This project is licensed under the MIT License – see the LICENSE
file for details.

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a pull request.

✨ About WEWORK

WEWORK is inspired by the need to connect African talent with global opportunities. It’s a starting point for landing pages promoting remote work, training programs, or tech skill initiatives.

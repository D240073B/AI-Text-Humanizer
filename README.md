# AI Text Humanizer

This project is a simple web application that allows you to humanize text using an external AI service. It consists of a Node.js/Express backend and a static frontend served from the `public` folder.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- An API key for your chosen AI service (e.g., OpenAI, Gemini, etc.)

## Setup Instructions

1. **Clone or Download the Repository**

2. **Install Dependencies**

   Open a terminal in the project directory and run:
   
   ```powershell
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory and add your API key:
   
   ```env
   API_KEY=your_api_key_here
   ```

4. **Start the Server**

   In the terminal, run:
   
   ```powershell
   node server.js
   ```

   The server will start on [http://localhost:3000](http://localhost:3000).

5. **Open the Website**

   Open your web browser and go to [http://localhost:3000](http://localhost:3000) to use the application.

## Project Structure

- `server.js` - Express backend server
- `public/` - Frontend files (HTML, CSS, JS)
- `.env` - Environment variables (not included, you must create this)

## Notes

- Make sure to update the API endpoint and request structure in `server.js` to match your chosen AI service.
- Do not share your API key publicly.

## Troubleshooting

- If you encounter errors, check that your `.env` file is set up correctly and that your API key is valid.
- Ensure all dependencies are installed with `npm install`.

---

Feel free to modify and extend this project as needed!

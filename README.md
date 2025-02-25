# Web Content Q&A Tool

An intelligent web application that allows users to analyze content from multiple web sources and ask questions about them using Google's Gemini AI.

## Features

- 🌐 Multiple URL Analysis
- 🤖 AI-Powered Q&A
- ⚡ Real-time URL Validation
- 📝 Smart Content Extraction
- 🎯 Contextual Responses
- 👤 User Profile Integration

## Technology Stack

### Frontend
- React.js with Vite
- Axios for API calls
- CSS for styling

### Backend
- Flask (Python)
- BeautifulSoup4 for web scraping
- Google Gemini AI for content analysis
- CORS support
- Environment variable configuration

## Setup

### Prerequisites
- Node.js and npm
- Python 3.7+
- Google API Key for Gemini AI

### Environment Variables
Create a `.env` file in the backend directory:
```
GOOGLE_API_KEY=your_gemini_api_key
PORT=3000
```

Create a `.env` file in the frontend directory:
```
VITE_BACKEND_URL=http://localhost:3000
```

### Installation

1. Frontend Setup
```bash
cd WebQandA
npm install
npm run dev
```

2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

## Usage

1. **Adding Web Sources**
   - Enter valid URLs in the input fields
   - Click "Add Source" to include more URLs
   - Use "Remove" button to delete unwanted URLs

2. **Content Analysis**
   - Click "Analyze Content" to fetch and process web content
   - Wait for the confirmation snackbar

3. **Asking Questions**
   - Enter your query in the question field
   - Click "Generate Response" for AI-powered answers
   - View the formatted response with citations

## Features in Detail

### URL Management
- Real-time URL validation
- Dynamic addition/removal of URL fields
- Visual feedback for valid/invalid URLs

### Content Processing
- Intelligent web scraping
- Main content extraction
- Removal of irrelevant elements (ads, navigation, etc.)
- Content cleaning and formatting

### AI Integration
- Powered by Google's Gemini 1.5 Flash
- Context-aware responses
- Source citation in answers
- Structured response formatting

### User Experience
- Loading states for all operations
- Success notifications via snackbars
- Smooth scrolling to answers
- User profile modal
- Responsive design

## Error Handling

- Invalid URL detection
- Network error management
- API error handling
- User feedback for all operations

## Security

- Input sanitization
- CORS protection
- Environment variable security
- Safe HTML rendering

## Performance

- Optimized content extraction
- Efficient API calls
- Response caching
- Minimal dependencies

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

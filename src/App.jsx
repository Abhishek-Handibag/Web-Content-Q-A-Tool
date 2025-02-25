import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './App.css'

export default function App() {
  const [urls, setUrls] = useState([''])
  const [content, setContent] = useState({})
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [questionLoading, setQuestionLoading] = useState(false)
  const [validUrls, setValidUrls] = useState([false])
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [showAnswerSnackbar, setShowAnswerSnackbar] = useState(false)
  const answerRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const mockUser = {
    name: 'Abhishek Ramdhan Handibag',
    email: 'abhishek.handibag12@gmail.com',
  }

  useEffect(() => {
    validateUrls(urls)
  }, [urls])

  const validateUrl = (url) => {
    try {
      new URL(url)
      return url.trim() !== ''
    } catch {
      return false
    }
  }

  const validateUrls = (urlList) => {
    const validationResults = urlList.map(url => validateUrl(url))
    setValidUrls(validationResults)
  }

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls]
    newUrls[index] = value
    setUrls(newUrls)
  }

  const addUrlField = () => {
    setUrls([...urls, ''])
    setValidUrls([...validUrls, false])
  }

  const deleteUrl = (index) => {
    if (urls.length > 1) {
      const newUrls = urls.filter((_, i) => i !== index)
      setUrls(newUrls)
      const newValidUrls = validUrls.filter((_, i) => i !== index)
      setValidUrls(newValidUrls)
    }
  }

  const isAnyUrlValid = () => validUrls.some(valid => valid)
  const areAllUrlsValid = () => validUrls.every(valid => valid)

  const fetchContent = async () => {
    setLoading(true)
    setAnswer('') // Clear previous answer
    const validUrls = urls.filter(url => validateUrl(url))
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/fetch-content`, {
        urls: validUrls
      })
      if (response.data?.content) {
        setContent(response.data.content)
        setShowSnackbar(true)
        setTimeout(() => setShowSnackbar(false), 3000)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setContent({})
      alert('Error fetching content: ' + (error.response?.data?.error || error.message))
    } finally {
      setLoading(false)
    }
  }

  const handleQuestion = async () => {
    if (Object.keys(content).length === 0) {
      alert('Please fetch content first')
      return
    }
    
    setQuestionLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ask-question`, {
        content: content,
        question: question.trim()
      })
      if (response.data?.answer) {
        setAnswer(response.data.answer)
        setShowAnswerSnackbar(true)
        setTimeout(() => setShowAnswerSnackbar(false), 3000)
        // Scroll to answer after a small delay to ensure rendering
        setTimeout(() => {
          answerRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Question error:', error)
      alert('Error getting answer: ' + (error.response?.data?.error || error.message))
    } finally {
      setQuestionLoading(false)
    }
  }

  return (
    <main className="container">
      <div className="header-container">
        <h1>Web Content Q&A Tool</h1>
        <button 
          className="user-info-button"
          onClick={() => setIsModalOpen(true)}
          aria-label="User Information"
        >
          <svg viewBox="0 0 24 24" className="user-icon" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h2>User Information</h2>
            <div className="user-info">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{mockUser.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{mockUser.email}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="url-section">
        <h2>Web Sources</h2>
        {urls.map((url, index) => (
          <div key={index} className="url-input-group">
            <input
              type="url"
              value={url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
              placeholder="Enter website URL"
              className={validUrls[index] ? 'valid-url' : 'invalid-url'}
            />
            {urls.length > 1 && (
              <button 
                onClick={() => deleteUrl(index)}
                className="delete-button"
                aria-label="Remove URL"
              >
                －
              </button>
            )}
          </div>
        ))}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button 
            onClick={addUrlField}
            disabled={!areAllUrlsValid()}
            style={{ flex: 1 }}
          >
            Add Source
          </button>
          <button 
            onClick={fetchContent} 
            disabled={loading || !isAnyUrlValid()}
            style={{ flex: 2 }}
          >
            {loading ? 'Processing...' : 'Analyze Content'}
          </button>
        </div>
      </div>

      <div className="question-section">
        <h2>Query Assistant</h2>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your query about the content"
        />
        <button 
          onClick={handleQuestion}
          disabled={questionLoading || Object.keys(content).length === 0 || !question.trim()}
          style={{ width: '100%', marginTop: '1rem' }}
        >
          {questionLoading ? 'Processing Query...' : 'Generate Response'}
        </button>
      </div>

      {answer && (
        <div className="answer-section" ref={answerRef}>
          <h2>Analysis Results</h2>
          <p dangerouslySetInnerHTML={{ __html: answer }}></p>
        </div>
      )}

      {showSnackbar && (
        <div className="snackbar">
          Content analysis completed successfully
        </div>
      )}

      {showAnswerSnackbar && (
        <div className="snackbar">
          Response generated successfully
        </div>
      )}
    </main>
  )
}

# QA Bot - Document Analysis Application
## Requirements Document for Freshers

---

## 📋 PROJECT OVERVIEW

Build a **Full-Stack AI-Powered Question & Answer Bot** that allows users to upload documents and ask questions about them. The application will use Large Language Models (LLMs) to analyze documents and provide intelligent, context-aware answers.

**Tech Stack:**
- **Backend:** Node.js + Express.js + TypeScript
- **Frontend:** HTML5 + Vanilla JavaScript
- **AI/ML:** LangChain (OpenAI/Anthropic/Groq APIs)
- **File Processing:** PDF, DOCX, CSV, TXT parsers
- **Build Tool:** TypeScript, tsx

---

## 🎯 PROJECT SCOPE & OBJECTIVES

### Learning Goals for Freshers:
1. Learn full-stack web development (Frontend + Backend)
2. Understand API design and REST endpoints
3. Implement file upload and processing
4. Integrate with external AI/LLM APIs
5. Work with TypeScript for type safety
6. Learn document parsing and text extraction
7. Build responsive UI with proper form handling
8. Implement error handling and validation

---

## 🏗️ SYSTEM ARCHITECTURE

### High-Level Flow:
```
User Browser
    ↓
HTML UI (index.html)
    ↓
REST API (Express Server)
    ↓
Document Loader (PDF/DOCX/CSV/TXT Parser)
    ↓
LLM Chain (LangChain)
    ↓
AI Model (OpenAI/Anthropic/Groq)
    ↓
Response Back to User
```

---

## 📋 FUNCTIONAL REQUIREMENTS

### 1. **Frontend - User Interface (index.html)**

#### 1.1 Document Upload Section
- **File Input:** Allow users to select multiple files
- **Supported Formats:** PDF, DOCX, CSV, TXT
- **File Size Limit:** Maximum 10MB per file
- **File Display:** Show list of uploaded files with option to remove them
- **Drag & Drop:** Support drag-and-drop file upload (bonus)

#### 1.2 Question Input Section
- **Text Area:** Input field for user's question
- **Placeholder Text:** "Ask a question about your document..."
- **Min Length:** Question must be at least 1 character

#### 1.3 Prompt Type Selection
- **Dropdown Menu:** Allow selection of prompt type
- **Options:**
  - "Default" - Standard answer
  - "Detailed" - Comprehensive analysis
  - "Concise" - Brief answer
  - "Technical" - Technical perspective
- **Default Selection:** "Default"

#### 1.4 Submit Button
- **Button State:** Enabled only when files are uploaded and question is provided
- **Loading State:** Show loading indicator while processing
- **Disabled State:** Disable during API call

#### 1.5 Results Display Area
- **Answer Display:** Show AI-generated answer
- **Model Info:** Display which model was used
- **Response Time:** Show processing duration
- **Error Messages:** Clear, user-friendly error messages
- **Copy Button:** Allow copying answer to clipboard (bonus)

#### 1.6 Styling Requirements
- **Color Scheme:** Professional gradient background, white content area
- **Responsive Design:** Mobile-friendly layout
- **Accessibility:** Proper labels, ARIA attributes, keyboard navigation

---

### 2. **Backend - Express Server (server.ts)**

#### 2.1 Server Setup
- **Port:** 3000 (configurable via environment)
- **Framework:** Express.js
- **JSON Limit:** 50MB for large documents
- **CORS:** Handle cross-origin requests if needed

#### 2.2 REST API Endpoints

##### 2.2.1 GET /
- **Description:** Serve the frontend HTML
- **Response:** HTML file from root directory
- **Status Code:** 200

##### 2.2.2 GET /health
- **Description:** Health check endpoint
- **Response Format:**
  ```json
  {
    "status": "healthy",
    "timestamp": "2024-01-15T10:30:00Z",
    "model": {
      "provider": "openai",
      "model": "gpt-4",
      "temperature": 0.1
    }
  }
  ```
- **Status Code:** 200

##### 2.2.3 POST /search/document
- **Description:** Submit question about provided document
- **Request Format:**
  ```json
  {
    "question": "What is the main topic?",
    "documentPath": "optional/path/to/document.pdf",
    "documentText": "or directly provided text",
    "promptType": "default|detailed|concise|technical"
  }
  ```
- **Validation:** Either documentPath or documentText must be provided
- **Response Format:**
  ```json
  {
    "output": "The answer to your question...",
    "model": "gpt-4",
    "provider": "openai",
    "promptType": "default"
  }
  ```
- **Status Code:** 200 (success), 400 (validation error), 500 (server error)

##### 2.2.4 POST /search/upload
- **Description:** Upload file and ask question about it
- **Request Type:** multipart/form-data
- **Parameters:**
  - `files`: Multiple file upload
  - `question`: User's question (string)
  - `promptType`: Optional prompt type
- **File Validation:**
  - Allowed extensions: .pdf, .docx, .txt, .csv
  - Maximum size: 10MB per file
  - Reject unsupported file types with clear error
- **Response Format:**
  ```json
  {
    "output": "Answer based on uploaded document",
    "model": "gpt-4",
    "provider": "openai",
    "promptType": "default",
    "filesProcessed": ["file1.pdf", "file2.docx"]
  }
  ```
- **Status Code:** 200 (success), 400 (validation), 413 (file too large)

#### 2.3 File Upload Handling
- **Storage Location:** ./uploads directory
- **Unique Naming:** Use timestamp + random suffix to avoid conflicts
- **Automatic Directory Creation:** Create uploads folder if not exists
- **Error Handling:** Graceful error messages for upload failures
- **Cleanup:** (Optional) Delete old uploaded files after processing

#### 2.4 Request Logging
- **Request ID:** Generate unique ID for each request
- **Log Format:** Include timestamp, request ID, question, document source
- **Error Logging:** Log all errors with full stack trace
- **Performance Logging:** Log processing duration

#### 2.5 Error Handling
- **Validation Errors:** 400 Bad Request with error message
- **File Errors:** 413 Payload Too Large, 415 Unsupported Media Type
- **Server Errors:** 500 Internal Server Error with error details
- **Graceful Degradation:** Provide helpful error messages

---

### 3. **Document Loaders (loaders.ts)**

#### 3.1 PDF Loader
- **Library:** @langchain/community/document_loaders/fs/pdf
- **Features:**
  - Extract text from all pages
  - Add page numbers to extracted text
  - Handle multi-page documents
  - Separator between pages

#### 3.2 DOCX Loader
- **Library:** @langchain/community/document_loaders/fs/docx
- **Features:**
  - Extract text from Word documents
  - Preserve paragraph structure
  - Handle formatted text
  - Filter empty content

#### 3.3 CSV Loader
- **Library:** @langchain/community/document_loaders/fs/csv
- **Features:**
  - Parse CSV rows as documents
  - Add row numbers
  - Handle headers
  - Separator between rows

#### 3.4 TXT Loader
- **Features:**
  - Direct file system read
  - UTF-8 encoding support
  - File size validation
  - Large file warnings (>1MB)

#### 3.5 Caching
- **Implementation:** Cache loaded modules to avoid repeated imports
- **Performance:** Improve response time for repeated file types

---

### 4. **LLM Model Integration (model.ts)**

#### 4.1 Model Provider Support

##### 4.1.1 OpenAI
- **Environment Variables:**
  - `OPENAI_API_KEY`: Required API key
  - `OPENAI_MODEL`: Model name (default: gpt-4)
  - `TEMPERATURE`: 0-2 (default: 0.1)
- **Class:** ChatOpenAI

##### 4.1.2 Anthropic (Claude)
- **Environment Variables:**
  - `ANTHROPIC_API_KEY` or `CLAUDE_API_KEY`: Required
  - `ANTHROPIC_MODEL` or `CLAUDE_MODEL`: Model name (default: claude-3-5-sonnet-20241022)
  - `TEMPERATURE`: 0-2 (default: 0.1)
  - `MAX_TOKENS`: Maximum tokens (default: 4096)
- **Class:** ChatAnthropic

##### 4.1.3 Groq
- **Environment Variables:**
  - `GROQ_API_KEY`: Required API key
  - `GROQ_MODEL`: Model name (default: mixtral-8x7b)
  - `TEMPERATURE`: 0-2 (default: 0.1)
- **Class:** ChatGroq

#### 4.2 Configuration
- **Provider Selection:** `MODEL_PROVIDER` environment variable
- **Temperature Setting:** Control response creativity (0=deterministic, 2=very creative)
- **Validation:** Validate temperature is between 0-2
- **Error Handling:** Clear errors for missing API keys

#### 4.3 Model Information
- **getModelInfo():** Return current model configuration
- **Display Info:** Show in health check endpoint

---

### 5. **QA Chain Implementation (chain.ts)**

#### 5.1 Chain Building
- **Prompt Template:** Use LangChain ChatPromptTemplate
- **System Messages:** Define system instructions
- **Human Messages:** Define user question format
- **Model Integration:** Connect model to chain
- **Output Parser:** Parse model response to string

#### 5.2 Prompt Templates

##### 5.2.1 Default Prompt
- Standard instruction-based answering
- Focus on document accuracy
- Cite specific sections
- Clear structure

##### 5.2.2 Detailed Prompt
- Comprehensive analysis requirement
- Extract all relevant information
- Provide context and background
- Connect information pieces
- Include limitations and caveats

##### 5.2.3 Concise Prompt
- Brief, to-the-point answers
- Minimal verbosity
- Direct responses
- Focus on key information

##### 5.2.4 Technical Prompt
- Technical perspective
- Deep technical understanding
- Industry terminology
- Technical accuracy

#### 5.3 Chain Optimization
- **Caching:** Cache compiled chains to avoid rebuilding
- **Reusability:** Share chains across requests
- **Memory Management:** Clear cache when needed

#### 5.4 Chain Execution
- **Input Format:** { document: string, question: string }
- **Output Format:** string (AI response)
- **Timeout:** Implement reasonable timeout for API calls

---

### 6. **Type Definitions (types.ts)**

#### 6.1 Request Validation Schema
- **InvokeSchema:** Validation for /search/document endpoint
- **FileUploadSchema:** Validation for /search/upload endpoint
- **Required Fields:** question, at least one document source
- **Optional Fields:** promptType

#### 6.2 Type Definitions
```typescript
type InvokeBody = {
  question: string;
  documentPath?: string;
  documentText?: string;
  promptType?: "default" | "detailed" | "concise" | "technical";
};

type FileUploadBody = {
  question: string;
  promptType?: "default" | "detailed" | "concise" | "technical";
};

type InvokeResult = {
  output: string;
  model: string;
  provider: string;
  promptType: string;
};
```

#### 6.3 Validation Library
- **Library:** Zod
- **Purpose:** Runtime type validation
- **Usage:** Validate all API requests before processing

---

## 📦 NON-FUNCTIONAL REQUIREMENTS

### 1. Performance
- **Response Time:** API response within 10 seconds
- **File Processing:** Support files up to 10MB
- **Concurrent Users:** Handle multiple simultaneous requests
- **Memory Efficiency:** Implement caching and cleanup

### 2. Security
- **File Validation:** Only allow specific file types
- **Size Limits:** Enforce file size restrictions
- **Input Validation:** Validate all user inputs
- **API Keys:** Store securely in environment variables (never in code)
- **CORS:** Implement if needed for cross-origin requests

### 3. Reliability
- **Error Handling:** Comprehensive error handling
- **Logging:** Detailed logging for debugging
- **Graceful Degradation:** Handle API failures gracefully
- **Request Tracking:** Use request IDs for tracing

### 4. Maintainability
- **Code Organization:** Separate concerns (models, loaders, chains)
- **Type Safety:** Use TypeScript throughout
- **Documentation:** Document functions and APIs
- **Code Comments:** Comment complex logic

### 5. Scalability
- **Modular Design:** Easy to add new features
- **Provider Flexibility:** Support multiple AI providers
- **Extensibility:** Support additional file types
- **Configuration:** Environment-based configuration

---

## 🛠️ TECHNICAL REQUIREMENTS

### 1. Backend Dependencies
```json
{
  "express": "^4.19.2",
  "multer": "^2.0.2",
  "dotenv": "^16.4.5",
  "langchain": "^0.3.0",
  "@langchain/core": "^0.3.0",
  "@langchain/openai": "^0.3.6",
  "@langchain/anthropic": "^0.3.32",
  "@langchain/groq": "^0.0.16",
  "@langchain/community": "^0.3.57",
  "pdf-parse": "^1.1.1",
  "mammoth": "^1.11.0",
  "zod": "^3.23.8"
}
```

### 2. Development Dependencies
```json
{
  "typescript": "^5.6.3",
  "tsx": "^4.16.2",
  "@types/node": "^22.18.12",
  "@types/express": "^4.17.21",
  "@types/multer": "^2.0.0"
}
```

### 3. Environment Configuration (.env)
```
# Model Provider Selection
MODEL_PROVIDER=openai  # or: anthropic, groq

# OpenAI Configuration
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4

# Anthropic/Claude Configuration
ANTHROPIC_API_KEY=your_api_key_here
CLAUDE_API_KEY=your_api_key_here
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022

# Groq Configuration
GROQ_API_KEY=your_api_key_here
GROQ_MODEL=mixtral-8x7b

# General Settings
TEMPERATURE=0.1
MAX_TOKENS=4096
PORT=3000
```

### 4. Build & Run Commands
```bash
# Development (Watch mode)
npm run dev

# Build TypeScript
npm run build

# Production
npm start

# Type checking
npm run typecheck
```

---

## 📊 DATA FLOW EXAMPLE

### Scenario: User uploads PDF and asks question

1. **User Interaction:**
   - User selects PDF file via HTML form
   - User types question: "What is the company's revenue?"
   - User selects "Detailed" prompt type
   - User clicks "Submit"

2. **Frontend:**
   - Validates: file selected, question provided
   - Creates FormData with file and question
   - Sends POST request to `/search/upload`
   - Shows loading spinner

3. **Backend Processing:**
   ```
   a) Receive request at /search/upload
   b) Validate request using FileUploadSchema
   c) Save uploaded file to ./uploads with unique name
   d) Determine file type (.pdf)
   e) Use PDFLoader to extract text
   f) Create ChatModel instance (e.g., OpenAI)
   g) Build QA chain with "detailed" prompt
   h) Execute chain with { document: extracted_text, question: user_question }
   i) LLM analyzes document and generates answer
   j) Return response with answer, model info
   ```

4. **Frontend Display:**
   - Hide loading spinner
   - Display answer in results section
   - Show which model was used
   - Show response time

5. **Error Scenario (if file too large):**
   - Backend rejects with 413 error
   - Frontend displays error message
   - User can retry with smaller file

---

## 🎓 LEARNING CHECKPOINTS FOR FRESHERS

### Phase 1: Foundation
- [ ] Set up project structure and dependencies
- [ ] Create Express server with basic routing
- [ ] Build HTML UI with form elements
- [ ] Connect frontend to backend with fetch API

### Phase 2: File Handling
- [ ] Implement multer file upload
- [ ] Add file validation (type, size)
- [ ] Implement document loaders (PDF, DOCX, CSV, TXT)
- [ ] Handle file parsing and text extraction

### Phase 3: AI Integration
- [ ] Set up LLM provider (OpenAI/Anthropic/Groq)
- [ ] Create model factory function
- [ ] Build LangChain QA chain
- [ ] Implement multiple prompt types

### Phase 4: API Integration
- [ ] Create request validation with Zod
- [ ] Implement /search/upload endpoint
- [ ] Add error handling and logging
- [ ] Test all endpoints

### Phase 5: Enhancement
- [ ] Improve UI/UX
- [ ] Add request logging
- [ ] Implement caching
- [ ] Add more features (copy button, file preview, etc.)

### Phase 6: Deployment
- [ ] Build and test production build
- [ ] Deploy to hosting platform
- [ ] Monitor and debug issues
- [ ] Optimize performance

---

## 🧪 TESTING SCENARIOS

### Manual Test Cases:

1. **Happy Path - Document Upload**
   - Upload PDF, ask question, verify answer

2. **File Validation**
   - Try uploading unsupported file type (expect error)
   - Upload file larger than 10MB (expect error)
   - Upload valid file (expect success)

3. **Question Validation**
   - Submit empty question (expect error)
   - Submit question without file (expect error)
   - Submit valid question with file (expect success)

4. **Prompt Type Variation**
   - Test each prompt type (default, detailed, concise, technical)
   - Verify different responses for same question

5. **API Errors**
   - Test with invalid API key (expect error)
   - Test with missing environment variables (expect error)
   - Test network timeout (expect timeout error)

6. **Large Documents**
   - Test with large PDF (multiple pages)
   - Test with large CSV (many rows)
   - Verify performance and memory usage

---

## 📝 BONUS FEATURES (Optional)

1. **Drag & Drop Upload**
   - Implement drag-and-drop file upload area

2. **Copy to Clipboard**
   - Add button to copy answer to clipboard

3. **History Tracking**
   - Store previous questions and answers
   - Display conversation history

4. **Multiple Files Processing**
   - Process multiple files in single request
   - Combine answers from multiple documents

5. **Response Streaming**
   - Stream LLM response in real-time
   - Show partial answers as they arrive

6. **Markdown Formatting**
   - Format LLM response with markdown
   - Support code blocks, lists, etc.

7. **Dark Mode**
   - Add dark mode toggle
   - Persist user preference

8. **Analytics**
   - Track most common questions
   - Monitor API usage and costs
   - Generate usage reports

---

## 📚 USEFUL RESOURCES

- **LangChain Documentation:** https://js.langchain.com/
- **Express.js Guide:** https://expressjs.com/
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/
- **Multer File Upload:** https://github.com/expressjs/multer
- **Zod Validation:** https://zod.dev/
- **OpenAI API:** https://platform.openai.com/docs/
- **Anthropic Claude:** https://docs.anthropic.com/
- **Groq API:** https://console.groq.com/

---

## 📞 SUPPORT & DEBUGGING

- **Check Environment Variables:** Verify `.env` file has correct API keys
- **Enable Logging:** Set DEBUG=* for verbose logging
- **Check File Paths:** Ensure upload directory exists
- **API Key Issues:** Verify API keys are valid and have permissions
- **Network Issues:** Check internet connection and API endpoint status
- **Memory Issues:** Monitor memory usage for large documents

---

**Good luck with your learning journey! This project covers critical full-stack development concepts.** 🚀

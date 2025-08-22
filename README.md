# Plandex-lite

A lightweight, simplified version of Plandex that orchestrates multiple AI agents to handle complex development tasks. Each agent specializes in a specific role, working together to break down requests, write code, review outputs, and provide architectural guidance.

## 🚀 Features

- **Multi-Agent Architecture**: Five specialized AI agents working in harmony
- **Plug & Play Setup**: Simple Ollama integration - just provide an endpoint
- **Role-Based Task Distribution**: Each agent focuses on what they do best
- **TypeScript Implementation**: Type-safe, modern JavaScript development
- **PDF Export**: Built-in markdown-to-PDF conversion capabilities
- **Lightweight & Fast**: Minimal overhead, maximum efficiency
- **Local AI Support**: Works with locally hosted models via Ollama

## 🤖 Agent Roles

### 🎯 Planner
> "You are a Planner. Break down user requests into clear, actionable steps."

Analyzes complex requests and creates structured, step-by-step execution plans.

### 💻 Coder
> "You are a Coder. Write clean, working code that solves the described tasks."

Implements solutions with clean, maintainable code following best practices.

### 📝 Summarizer
> "You are a Summarizer. Summarize long outputs into concise points."

Distills lengthy outputs into clear, actionable summaries and key insights.

### 🏗️ Architect
> "You are an Architect. Propose high-level design choices and trade-offs."

Provides system design recommendations, architectural patterns, and technical trade-offs.

### 🔍 Reviewer
> "You are a Reviewer. Check outputs for errors, improvements, and clarity."

Quality assurance specialist that validates outputs for correctness and suggests improvements.

## 📋 Prerequisites

- [Ollama](https://ollama.ai/) installed and running
- A compatible language model (tested with Qwen2.5:7b)
- Node.js 16+ and npm/yarn
- TypeScript (for development)

## ⚡ Quick Start

### 1. Install Ollama
```bash
# Visit https://ollama.ai/ for installation instructions
# Or use curl (Linux/macOS)
curl -fsSL https://ollama.ai/install.sh | sh
```

### 2. Pull a Model
```bash
# Pull Qwen2.5 (recommended)
ollama pull qwen2.5:7b

# Or try other models
ollama pull llama2
ollama pull codellama
```

### 3. Start Ollama Server
```bash
ollama serve
```

### 4. Configure Endpoint
Set your Ollama endpoint in the configuration:
```bash
# Default Ollama endpoint
export OLLAMA_ENDPOINT="http://localhost:11434"
```

### 5. Run Plandex-lite
```bash
git clone https://github.com/Magnus0969/Plandex-lite.git
cd Plandex-lite

# Install dependencies
npm install

# Build TypeScript
npm run build

# Run the application
npm start
# or
node plandex.js
```

## 🔧 Configuration

### Ollama Endpoint Setup

The system is designed to be **plug and play** with any Ollama endpoint. Update your `config_models.json`:

```json
{
  "ollama_endpoint": "http://localhost:11434",
  "model": "qwen2.5:7b",
  "timeout": 300,
  "max_tokens": 4096,
  "temperature": 0.7
}
```

### Supported Models

While tested primarily with **Qwen3:4b**, Plandex-lite works with various Ollama-compatible models:

- ✅ **Qwen3:4b** (Recommended)
- ✅ Llama 2/3
- ✅ Code Llama
- ✅ Mistral
- ✅ Gemma
- ✅ Any Ollama-compatible model

## 💡 Usage Examples

### Example 1: Web Application Development
```
Request: "Create a todo app with React and Node.js"

🎯 Planner: Breaks down into frontend/backend tasks
💻 Coder: Implements React components and Express API
🏗️ Architect: Suggests project structure and data flow
🔍 Reviewer: Validates code quality and suggests improvements
📝 Summarizer: Provides implementation summary and next steps
```

### Example 2: Code Refactoring
```
Request: "Refactor this legacy JavaScript code for better performance"

🎯 Planner: Identifies refactoring opportunities
🏗️ Architect: Proposes modern patterns and optimizations  
💻 Coder: Implements refactored code
🔍 Reviewer: Compares performance and validates improvements
📝 Summarizer: Highlights key changes and benefits
```

## 🛠️ Development

### Project Structure
```
plandex-lite/
├── config_models.json     # Model configuration settings
├── core.ts               # Core application logic
├── index.ts              # Main entry point
├── markdown-to-pdf.ts    # PDF generation utilities
├── package-lock.json     # Dependency lock file
├── package.json          # Project dependencies and scripts
├── plandex.js           # Main orchestrator
├── roles.ts             # Agent role definitions and prompts
├── tsconfig.json        # TypeScript configuration
└── types.ts             # TypeScript type definitions
```

### Adding New Agents
1. Define new role in `roles.ts` with a specific prompt
2. Update type definitions in `types.ts` 
3. Implement agent logic in `core.ts`
4. Update configuration in `config_models.json`
5. Rebuild with `npm run build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the original [Plandex](https://github.com/plandex-ai/plandex) project
- Built with [Ollama](https://ollama.ai/) for local AI model hosting
- Tested extensively with Qwen2.5 models

## 📞 Support

- 🐛 [Report Issues](https://github.com/Magnus0969/Plandex-lite/issues)
- 💡 [Feature Requests](https://github.com/Magnus0969/Plandex-lite/discussions)
- 📚 [Documentation](https://github.com/Magnus0969/Plandex-lite/wiki)

---

**Ready to orchestrate your development workflow?** 🚀

Just point Plandex-lite to your Ollama endpoint and watch the agents collaborate to tackle your most complex development challenges!

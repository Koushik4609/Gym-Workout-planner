import { useState, useRef, useEffect } from 'react';
import { chatWithCoachAI } from '../services/aiService';
import { Send, Bot, User, Sparkles, Mic, MicOff, Trash2 } from 'lucide-react';

const PROMPT_CATEGORIES = [
  { category: '🏋️ Workout', prompts: ['How many sets should I do?', 'Best split for building muscle?', 'What is progressive overload?'] },
  { category: '🥗 Nutrition', prompts: ['How much protein do I need?', 'Evidence-based supplements?', 'Healthy meal prep ideas'] },
  { category: '📈 Bulking', prompts: ['How do I lean bulk?', 'Calorie surplus guidelines?', 'Optimal rate of weight gain'] },
  { category: '🔥 Cutting', prompts: ['How to lose fat without losing muscle?', 'High protein fat loss diet?', 'Safe daily calorie deficit'] },
  { category: '🔄 Recovery', prompts: ['How to reduce muscle soreness?', 'Best stretches for flexibility?', 'How much sleep for recovery?'] }
];

export default function AICoach() {
  // Load message history from localStorage
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('fitforge-coach-chat');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        type: 'ai',
        text: "Hey! 💪 I'm your FitForge AI Coach. I can help you with:\n\n🏋️ **Workout Advice** — Sets, reps, splits, progressive overload\n📐 **Form Tips** — Squats, bench press, deadlifts\n🥗 **Nutrition** — Macros, meal planning, supplements\n📈 **Bulking & Cutting** — Muscle gain, fat loss cycles\n🔄 **Recovery** — Sleep, stretching, DOMS relief\n\nChoose a suggestion below or write/speak your question!"
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState(PROMPT_CATEGORIES[0].category);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('fitforge-coach-chat', JSON.stringify(messages));
  }, [messages]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  async function handleSend(text) {
    const userMessage = text || input.trim();
    if (!userMessage) return;

    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: userMessage
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      // Format messages for Groq API
      const apiMessages = newMessages.map(msg => ({
        role: msg.type === 'ai' ? 'assistant' : 'user',
        content: msg.text
      }));

      const aiResponse = await chatWithCoachAI(apiMessages);
      
      setIsTyping(false); // Hide the loading dots

      const aiMsgId = Date.now() + 1;
      setMessages(prev => [...prev, { id: aiMsgId, type: 'ai', text: '' }]);
      
      // Simulate a natural typing effect (3 characters per 10ms)
      for (let i = 0; i <= aiResponse.length; i += 3) {
        setMessages(prev => prev.map(msg => 
          msg.id === aiMsgId ? { ...msg, text: aiResponse.slice(0, i) } : msg
        ));
        await new Promise(r => setTimeout(r, 10));
      }
      
      // Ensure the final message text is exactly complete
      setMessages(prev => prev.map(msg => 
        msg.id === aiMsgId ? { ...msg, text: aiResponse } : msg
      ));
    } catch (error) {
      console.error("AI Coach Error:", error);
      const errorMsg = {
        id: Date.now() + 1,
        type: 'ai',
        text: `I'm having trouble connecting to my training database right now (API Error). Let's try again in a moment! \n\n**DEBUG ERROR**: ${error.message}`
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleClearHistory() {
    if (window.confirm('Clear all conversation history?')) {
      const reset = [
        {
          id: 1,
          type: 'ai',
          text: "Chat cleared. I'm ready to answer any of your fitness, workout, nutrition, or recovery questions! 💪"
        }
      ];
      setMessages(reset);
    }
  }

  // Voice Speech Recognition
  const recognitionRef = useRef(null);

  function handleVoiceInput() {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Web Speech API is not supported in this browser. Please try Chrome, Safari, or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let finalTranscriptAccumulated = input ? input + ' ' : '';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        finalTranscriptAccumulated += finalTranscript + ' ';
      }

      setInput(finalTranscriptAccumulated + interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech Recognition Error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }

  function formatMessage(text) {
    // Simple markdown-like formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>')
      .replace(/• /g, '&nbsp;&nbsp;• ');
  }

  // Get active prompts
  const activePrompts = PROMPT_CATEGORIES.find(c => c.category === activeCategory)?.prompts || [];

  return (
    <div className="animate-fadeIn page-transition">
      <div className="section-header" style={{ marginBottom: 'var(--space-4)' }}>
        <div>
          <h2>AI Coach</h2>
          <p>Your premium personal fitness advisor — ask or speak your questions!</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleClearHistory} title="Clear Chat History">
            <Trash2 size={14} /> Clear History
          </button>
          <span className="badge badge-primary">
            <Sparkles size={12} /> AI Coach Pro
          </span>
        </div>
      </div>

      <div className="card chat-container glass-premium" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Messages */}
        <div className="chat-messages" style={{ height: 350, overflowY: 'auto', padding: 'var(--space-5)' }}>
          {messages.map(msg => (
            <div key={msg.id} className={`chat-message ${msg.type}`} style={{ display: 'flex', gap: 12, marginBottom: 'var(--space-4)', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
              {msg.type === 'ai' && (
                <div className="chat-avatar ai" style={{ width: 32, height: 32, background: 'var(--gradient-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Bot size={16} />
                </div>
              )}
              <div 
                className="chat-bubble" 
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} 
                style={{ 
                  maxWidth: '75%', padding: '12px 16px', borderRadius: 'var(--radius-lg)', 
                  fontSize: 'var(--text-sm)'
                }}
              />
              {msg.type === 'user' && (
                <div className="chat-avatar user-avatar" style={{ width: 32, height: 32, background: 'var(--bg-tertiary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary-light)' }}>
                  <User size={16} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="chat-message ai" style={{ display: 'flex', gap: 12, marginBottom: 'var(--space-4)' }}>
              <div className="chat-avatar ai" style={{ width: 32, height: 32, background: 'var(--gradient-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Bot size={16} />
              </div>
              <div className="chat-bubble" style={{ padding: '12px 16px', borderRadius: 'var(--radius-lg)' }}>
                <div className="chat-typing" style={{ display: 'flex', gap: 4 }}>
                  <span className="loading-dots" style={{ width: 6, height: 6, background: 'var(--text-secondary)', borderRadius: '50%' }} />
                  <span className="loading-dots" style={{ width: 6, height: 6, background: 'var(--text-secondary)', borderRadius: '50%' }} />
                  <span className="loading-dots" style={{ width: 6, height: 6, background: 'var(--text-secondary)', borderRadius: '50%' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Category Tabs */}
        <div style={{ display: 'flex', gap: 6, padding: '8px 16px', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-primary)', overflowX: 'auto' }}>
          {PROMPT_CATEGORIES.map(c => (
            <button
              key={c.category}
              className={`tab ${activeCategory === c.category ? 'active' : ''}`}
              onClick={() => setActiveCategory(c.category)}
              style={{ fontSize: 11, padding: '4px 8px' }}
            >
              {c.category}
            </button>
          ))}
        </div>

        {/* Quick Suggestions based on category */}
        <div className="chat-suggestions" style={{ background: 'var(--bg-primary)', display: 'flex', gap: 8, padding: '0 16px 12px 16px', overflowX: 'auto' }}>
          {activePrompts.map((suggestion, i) => (
            <button
              key={i}
              className="chat-suggestion"
              onClick={() => handleSend(suggestion)}
              style={{ 
                background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', 
                color: 'var(--text-secondary)', padding: '6px 12px', borderRadius: 'var(--radius-md)',
                fontSize: 11, whiteSpace: 'nowrap', cursor: 'pointer'
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Chat Input Field with Mic */}
        <div className="chat-input-area" style={{ display: 'flex', gap: 12, padding: '16px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-primary)' }}>
          <button
            className={`btn ${isListening ? 'btn-danger timer-pulse' : 'btn-secondary'} btn-icon`}
            onClick={handleVoiceInput}
            title={isListening ? 'Listening...' : 'Use Voice Input'}
            style={{ borderRadius: '50%', width: 42, height: 42, flexShrink: 0 }}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
          
          <input
            className="input"
            placeholder={isListening ? 'Listening... speak now.' : 'Ask about bulking, cutting, DOMS, meal prep, form...'}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            style={{ borderRadius: 'var(--radius-md)' }}
          />
          
          <button
            className="btn btn-primary btn-icon"
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            style={{ borderRadius: '50%', width: 42, height: 42, flexShrink: 0 }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

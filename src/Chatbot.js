import React  from "react";
import { useState,useRef,useEffect } from "react";
import userlogo from "./images/icons8-person-50.png";
import botlogo from "./images/icons8-chatbot-100.png";

function Chatbot(){
    const [input, setInput] = useState('');
       const [messages, setMessages] = useState([{text:"Hi, I'm your Chatbot. How can I assist you?",type:'bot'}]);
     
      const messagesEndRef = useRef(null);
     
      const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      };
     
      useEffect(() => {
        scrollToBottom();
      }, [messages]);
     
      const handleInputChange = (e) => {
        setInput(e.target.value);
      };
     
      const handleSendMessage =() =>{
        if(input.trim() ==='') return;
    
        const userMessage={text:input, type:'user'};
        setMessages((prevMessages) => [...prevMessages,userMessage]);
        setInput('');
    
        setTimeout(()=> {
          const botResponse = getBotResponse(input.toLowerCase());
          const newMessages = [...messages,userMessage,{text:botResponse,type:'bot'}];
          setMessages(newMessages);
        },500);
      }
     
      const getBotResponse = (userInput) => {
        switch (userInput) {
          case 'hello':
            return 'Hi there!';
          case 'how are you':
            return 'I am just a bot, but thanks for asking!';
          // Add more cases for specific questions and answers
          default:
            return 'I didn\'t understand that. Please ask a different question.';
        }
      };
     
      return (
        <div className="chatbot-container">
          <div className="chatbot-box">
          <div className="chatbot-header"> React Chatbot </div>
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.type}`}>
                    {message.type === 'user' && (
                        <img className="logo-user" src={userlogo} alt="User logo"/>
                    )}
                    {message.type === 'bot' && (
                        <img className="logo-bot" src={botlogo} alt="Bot logo"/>
                    )}
                  {message.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chatbot-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={handleInputChange}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      );
}
export default Chatbot;
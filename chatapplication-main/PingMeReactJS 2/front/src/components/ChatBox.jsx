import React, { useEffect, useState } from 'react';
import { ChatBarThree, MessageBar } from './miscallaneous';
import getData from '../utils/getData';
import Messages from './Messages';
import { useContextLoading } from '../context/LoadContext';
import io from 'socket.io-client';

const ChatBox = ({ currentChat, user }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const { loading, setLoading } = useContextLoading();
  // Declare socket using useState
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Fetch chat messages using the 'getData' function
    getData('messages', {
      jwt: localStorage.getItem('jwt'),
      chatId: currentChat._id,
    })
      .then((chatMessages) => setChatMessages(chatMessages))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

    // Establish a socket connection
    const newSocket = io('http://localhost:8000');
    // Set socket using useState
    setSocket(newSocket);

    // Listen for the 'connect' event
    newSocket.on('connect', () => {
      console.log(`Connected with id: ${newSocket.id}`);
    });

    newSocket.on('message', (data) => {
      console.log('Received message:', data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [currentChat, setLoading]);

  const handleSendMessage = (mess) => {
    setChatMessages(mess);
    // Check if socket is defined before emitting
    if (socket) {
      socket.emit('send-message', mess);
    }
  };

  return (
    <>
      <ChatBarThree currentChat={currentChat} user={user} />
      <Messages chatMessages={chatMessages} currentChat={currentChat} user={user} />
      <MessageBar
        currentChat={currentChat}
        user={user}
        setChatMessages={handleSendMessage}
        chatMessages={chatMessages}
      />
    </>
  );
};

export default ChatBox;

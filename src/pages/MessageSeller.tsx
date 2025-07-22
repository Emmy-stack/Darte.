import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

interface MockMessage {
  id: string;
  content: string;
  timestamp: Date;
  isFromUser: boolean;
}

const MessageSeller: React.FC = () => {
  const { sellerId } = useParams<{ sellerId: string }>();
  const { user } = useApp();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MockMessage[]>([
    {
      id: '1',
      content: 'Hi! I\'m interested in your product.',
      timestamp: new Date(Date.now() - 60000),
      isFromUser: true
    },
    {
      id: '2',
      content: 'Hello! Thank you for your interest. How can I help you?',
      timestamp: new Date(Date.now() - 30000),
      isFromUser: false
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: MockMessage = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date(),
      isFromUser: true
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Simulate seller response
    setTimeout(() => {
      const response: MockMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Thank you for your message! I\'ll get back to you soon.',
        timestamp: new Date(),
        isFromUser: false
      };
      setMessages(prev => [...prev, response]);
    }, 1000);

    toast({
      title: "Message sent",
      description: "Your message has been sent to the seller.",
    });
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Please log in to message sellers.</p>
        <Link to="/login">
          <Button className="hero-button">Log In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Back Button */}
      <Link to="/">
        <Button variant="ghost">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </Link>

      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle>Message Seller</CardTitle>
          <p className="text-sm text-muted-foreground">Seller ID: {sellerId}</p>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-6">
          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto mb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isFromUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.isFromUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageSeller;
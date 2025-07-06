
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

const LandlordMessages = () => {
  const conversations = [
    {
      id: 1,
      tenant: "John Doe",
      property: "Sunset Apartments - Unit 1A",
      lastMessage: "Thank you for fixing the plumbing issue so quickly!",
      timestamp: "2 hours ago",
      unread: false,
      avatar: "JD"
    },
    {
      id: 2,
      tenant: "Jane Smith",
      property: "Garden View Flats - Unit 2B",
      lastMessage: "When can I expect the maintenance team for the door lock?",
      timestamp: "5 hours ago",
      unread: true,
      avatar: "JS"
    },
    {
      id: 3,
      tenant: "Mike Johnson",
      property: "Sunset Apartments - Unit 3C",
      lastMessage: "The AC repair was perfect. Everything is working well now.",
      timestamp: "1 day ago",
      unread: false,
      avatar: "MJ"
    }
  ];

  const selectedConversation = conversations[0];

  const messages = [
    {
      id: 1,
      sender: "tenant",
      message: "Hi, there's a leaking faucet in my kitchen. Could you please arrange for someone to fix it?",
      timestamp: "Yesterday 2:30 PM",
      senderName: "John Doe"
    },
    {
      id: 2,
      sender: "landlord",
      message: "Hi John, thanks for reporting this. I'll send our plumber over tomorrow morning around 10 AM. Will you be available?",
      timestamp: "Yesterday 3:15 PM",
      senderName: "You"
    },
    {
      id: 3,
      sender: "tenant",
      message: "Yes, that works perfectly. Thank you!",
      timestamp: "Yesterday 3:18 PM",
      senderName: "John Doe"
    },
    {
      id: 4,
      sender: "tenant",
      message: "Thank you for fixing the plumbing issue so quickly!",
      timestamp: "Today 2:00 PM",
      senderName: "John Doe"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Communicate with your tenants</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search conversations..." 
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id} 
                  className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${
                    conversation.id === selectedConversation.id 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-emerald-700">
                        {conversation.avatar}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-semibold text-sm truncate">{conversation.tenant}</p>
                        {conversation.unread && (
                          <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 truncate">{conversation.property}</p>
                      <p className="text-sm text-gray-700 truncate mt-1">{conversation.lastMessage}</p>
                      <p className="text-xs text-gray-500 mt-1">{conversation.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-emerald-700">
                  {selectedConversation.avatar}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">{selectedConversation.tenant}</h3>
                <p className="text-sm text-gray-600">{selectedConversation.property}</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'landlord' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'landlord' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'landlord' ? 'text-emerald-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Type your message..." 
                  className="flex-1"
                />
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandlordMessages;

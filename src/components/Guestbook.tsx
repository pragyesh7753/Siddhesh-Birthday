import { useState, useEffect } from 'react';
import { Send, MessageCircle, Trash2 } from 'lucide-react';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('birthday-guestbook');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now(),
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('birthday-guestbook', JSON.stringify(updatedEntries));

    setName('');
    setMessage('');

    setTimeout(() => setIsSubmitting(false), 500);
  };

  const handleDelete = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('birthday-guestbook', JSON.stringify(updatedEntries));
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <MessageCircle className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Birthday Guestbook
          </h2>
          <p className="text-gray-600">Leave your wishes for Siddhesh</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none"
                maxLength={50}
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your birthday wishes..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none resize-none"
                maxLength={500}
                required
              />
              <p className="text-xs text-gray-500 mt-1">{message.length}/500 characters</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Sending...' : 'Send Birthday Wish'}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No messages yet. Be the first to wish Siddhesh!</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{entry.name}</h3>
                    <p className="text-sm text-gray-500">{formatDate(entry.timestamp)}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-2 rounded-lg hover:bg-red-50"
                    aria-label="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-700 leading-relaxed">{entry.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

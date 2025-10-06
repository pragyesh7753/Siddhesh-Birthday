import { Share2, Twitter, Facebook, Mail, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = "Join me in wishing Siddhesh a very Happy Birthday! 🎉";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-400 hover:text-white',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-600 hover:text-white',
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent("Birthday Wishes for Siddhesh")}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`,
      color: 'hover:bg-gray-600 hover:text-white',
    },
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center mb-6">
          <Share2 className="w-10 h-10 text-green-500" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Share the Joy
        </h2>
        <p className="text-gray-600 mb-8">
          Spread the birthday cheer with friends and family
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-full shadow-md transition-all transform hover:scale-105 ${link.color}`}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-semibold">{link.name}</span>
            </a>
          ))}

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-full shadow-md transition-all transform hover:scale-105 hover:bg-purple-500 hover:text-white hover:border-purple-500"
          >
            <LinkIcon className="w-5 h-5" />
            <span className="font-semibold">
              {copied ? 'Copied!' : 'Copy Link'}
            </span>
          </button>
        </div>

        {copied && (
          <div className="mt-4 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg animate-fade-in">
            Link copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}

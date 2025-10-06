import { Heart } from 'lucide-react';
import BirthdayPersonImage from './BirthdayPersonImage';

export default function PersonalMessage() {
  return (
    <div className="py-16 px-4 bg-white/50">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex flex-col items-center justify-center mb-6">
          <BirthdayPersonImage 
            size="large" 
            src="/images/asli-coder.jpg"
            className="mb-4"
          />
          <Heart className="w-12 h-12 text-pink-500 fill-pink-500 animate-pulse" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          A Special Message for You
        </h2>

        <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-xl p-8 md:p-12 border border-pink-100">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
            Dear Siddhesh,
          </p>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
            On this special day, we celebrate not just another year, but the wonderful person you are.
            Your kindness, wisdom, and positive spirit touch everyone around you.
          </p>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
            May this year bring you countless moments of joy, success in all your endeavors,
            and the fulfillment of your dreams. You deserve all the happiness in the world!
          </p>

          <p className="text-lg md:text-xl leading-relaxed font-semibold text-pink-600">
            Here's to another amazing year ahead!
          </p>

          <div className="mt-8 flex justify-center gap-2">
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

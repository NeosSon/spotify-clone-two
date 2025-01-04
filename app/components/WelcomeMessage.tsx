// components/WelcomeMessage.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface WelcomeMessageProps {
  title: string;

  bio: string;

  ending: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  title,
  bio,
  ending,
}) => {
  return (
    <div className="flex justify-center items-center w-full mt-6">
      <Card className="w-full sm:w-96 bg-gradient-to-r from-[#1DB954] to-[#1DB954] bg-opacity-30 shadow-xl p-6 text-center text-white rounded-lg">
        <CardContent>
          <h3 className="text-2xl font-semibold mb-4">🎶 {title}</h3>
          <p className="mb-4 text-lg text-gray-200">{bio}</p>
          <button
            onClick={() =>
              (
                document.querySelector(
                  'input[type="search"]'
                ) as HTMLInputElement
              )?.focus()
            }
            className="px-6 py-3 bg-[#1DB954] text-white rounded-full font-bold hover:bg-green-600 transition duration-300"
          >
            {ending}
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeMessage;

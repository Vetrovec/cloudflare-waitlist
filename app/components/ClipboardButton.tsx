"use client";

import Image from "next/image";

interface ClipboardButtonProps {
  content: string;
}

export default function ClipboardButton(props: ClipboardButtonProps) {
  return (
    <div className="relative">
      <button
        className="peer flex items-center justify-center"
        onClick={() => {
          navigator.clipboard.writeText(props.content);
        }}
      >
        <Image width={16} height={20} src="/icons/copy.svg" alt="Copy" />
      </button>
      <div className="peer-focus:opacity-100 peer-focus:pointer-events-auto opacity-0 pointer-events-none absolute bottom-full left-1/2 transform -translate-x-2/4 px-4 py-1 mb-1 bg-gray-700 text-gray-50 text-xs rounded-md transition-opacity">
        Copied!
      </div>
    </div>
  );
}

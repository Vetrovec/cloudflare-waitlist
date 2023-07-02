"use client";

import Image from "next/image";

interface ClipboardButtonProps {
  content: string;
}

export default function ClipboardButton(props: ClipboardButtonProps) {
  return (
    <button
      className="flex items-center justify-center"
      onClick={() => {
        navigator.clipboard.writeText(props.content);
      }}
    >
      <Image width={16} height={20} src="/icons/copy.svg" alt="Copy" />
    </button>
  );
}

"use client";
import { useState } from "react";
import Image from "next/image";

interface CollapsibleContentProps {
  title: string;
  content: string;
}

export default function CollapsibleContent(props: CollapsibleContentProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div>
      <div className="h-[73px] bg-secondary flex justify-between items-center">
        <div className="text-white text-3xl">{props.title}</div>
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          <Image
            className={`transition-transform ${
              isCollapsed ? "rotate-180" : "rotate-0"
            }`}
            src="/svg/up-arrow.svg"
            alt="up arrow"
            width={61}
            height={61}
          />
        </button>
      </div>
      <div>{props.content}</div>
    </div>
  );
}

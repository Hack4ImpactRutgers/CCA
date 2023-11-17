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
        <div className="text-white text-2xl font-bold">{props.title}</div>
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
      <div
        // TODO: fix this transition.
        className={`duration-500 overflow-hidden transition-all ${
          isCollapsed ? "h-0" : "h-auto"
        }`}
      >
        {props.content}
      </div>
    </div>
  );
}

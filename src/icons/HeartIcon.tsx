import React from 'react';

export default function HeartIcon() {
  return (
    <svg 
      aria-hidden="true" 
      focusable="false" 
      className="octicon octicon-heart" 
      viewBox="0 0 16 16" 
      width="16" 
      height="16" 
      fill="currentColor" 
      style={{
        display: "inline-block",
        userSelect: "none",
        verticalAlign: "text-bottom",
        overflow: "visible"
      }}
    >
      <path d="m8 6.586-1.789-1.895c-.886-.938-2.312-.938-3.197 0C2.128 5.485 2 5.998 2 6.516c0 .518.128 1.031.324 1.258l5.242 5.568c.241.256.63.256.871 0l5.242-5.568c.196-.227.324-.74.324-1.258 0-.518-.128-1.031-.324-1.258-.885-.938-2.311-.938-3.197 0L8 6.586Z" />
    </svg>
  );
}
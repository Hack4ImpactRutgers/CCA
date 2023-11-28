"use client";

interface LoginButtonProps {
  text: string;
  onClick: () => void;
  active: boolean;
}

export default function LoginButton(props: LoginButtonProps) {
  const { text, onClick, active } = props;

  return (
    <button
      onClick={onClick}
      className={`transition-colors w-[120px] font-semibold hover:bg-secondary hover:text-white ${
        active && "text-secondary"
      }`}
    >
      <div
        className={`transition-transform h-2 bg-secondary mb-2 ${
          !active && "scale-0"
        }`}
      />
      {text}
    </button>
  );
}

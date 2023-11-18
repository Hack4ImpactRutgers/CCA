import { PropsWithChildren } from "react";

interface SectionTitleProps {
  text: string;
}

export default function SectionTitle(props: SectionTitleProps) {
  const { text } = props;
  return <p className="text-primary text-5xl font-bold">{text}</p>;
}

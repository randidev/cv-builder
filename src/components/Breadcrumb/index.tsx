import { Fragment } from "react";

interface BreadcrumbProps {
  items: {
    text: string;
    link: string;
  }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex gap-3 text-sm">
      {items.map((item, index) => (
        <Fragment key={item.link}>
          <a href={item.link}>{item.text}</a>
          {index < items.length - 1 && <span>{">"}</span>}
        </Fragment>
      ))}
    </div>
  );
}

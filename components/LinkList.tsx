import React from "react";

interface Link {
  description?: string;
  title: string;
  URL: string;
  provider?: "amazon" | "home depot";
}

interface LinkListProps {
  title: string;
  links: Link[];
}

const LinkList: React.FC<LinkListProps> = ({ links }) => {
  return (
    <div>
      {links.map((link) => (
        <div key={link.title}>{link.title}</div>
      ))}
    </div>
  );
};

export default LinkList;

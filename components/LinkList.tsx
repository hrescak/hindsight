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
        <a
          href={link.URL}
          key={link.title}
          className="flex flex-col flex-grow pt-2 pl-3 -ml-3 pr-3 -mr-3 hover:bg-gray-100 rounded"
        >
          <span className="flex font-semibold">{link.title}</span>
          <span className="flex text-gray-500 text-sm pb-2 border-gray-100 border-b">
            {link.description}
          </span>
        </a>
      ))}
    </div>
  );
};

export default LinkList;

import React from "react";

type HeaderProps = {
  title?: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="bg-[#004aad] text-white p-4 shadow-lg flex-shrink-0">
      <h1 className="text-xl font-bold tracking-tight">{title}</h1>
    </div>
  );
};

export default Header;

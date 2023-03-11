import React from "react";
import Head from "next/head";

interface propType {
  title: string;
}

const Header = ({ title }: propType) => {
  return (
    <Head>
      <title>Innorder - {title}</title>
    </Head>
  );
};

export default Header;

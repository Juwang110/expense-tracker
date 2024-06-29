import React from "react";
import { Footer } from "flowbite-react";

export function AppFooter() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="https://flowbite.com"
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            name="Flowbite"
          />
          <Footer.LinkGroup>
            <Footer.Link href="/About">About</Footer.Link>
            <Footer.Link href="/License">License</Footer.Link>
            <Footer.Link href="/Contact">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="Money" year={2024} />
      </div>
    </Footer>
  );
}

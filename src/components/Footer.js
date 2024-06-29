import React from "react";
import { Footer } from "flowbite-react";

export function AppFooter() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="#"
            src="https://cdn-icons-png.freepik.com/256/6204/6204408.png?uid=R151848132&ga=GA1.1.1507691374.1717099387&semt=ais_hybrid"
            alt="Money Logo"
            name="Money"
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

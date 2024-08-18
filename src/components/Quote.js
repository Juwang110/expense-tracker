import { Blockquote } from "flowbite-react";
import { Rating } from "flowbite-react";

// Simple quote component from Flowbite Blockquote
export function Quote() {
  return (
    <div className="py-10 px-6">
      <Blockquote className="font-bold">
        "This application is simple yet efficient! It has many easy to use
        features and calculators which grant powerful insight onto personal
        finances and expenditures. I love that it comes free of cost to the
        user"
      </Blockquote>
      <Rating className="py-3">
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
      </Rating>
    </div>
  );
}

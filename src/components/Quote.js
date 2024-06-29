import { Blockquote } from "flowbite-react";
import { Rating } from "flowbite-react";

export function Quote() {
  return (
    <div>
      <Blockquote>
        "Pharetra vel turpis nunc eget. Pharetra et ultrices neque ornare.
        Aliquet porttitor lacus luctus accumsan tortor posuere. Vel risus
        commodo viverra maecenas accumsan lacus. Lacus sed viverra tellus in hac
        habitasse platea dictumst vestibulum. "
      </Blockquote>
      <Rating>
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star filled={false} />
      </Rating>
    </div>
  );
}

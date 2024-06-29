import { Blockquote } from "flowbite-react";
import { Rating } from "flowbite-react";

export function Quote() {
  return (
    <div className="py-10 px-6">
      <Blockquote className="font-bold">
        "Pharetra vel turpis nunc eget. Pharetra et ultrices neque ornare.
        Aliquet porttitor lacus luctus accumsan tortor posuere. Vel risus
        commodo viverra maecenas accumsan lacus. Lacus sed viverra tellus in hac
        habitasse platea dictumst vestibulum. "
      </Blockquote>
      <Rating className="py-3">
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star filled={false} />
      </Rating>
    </div>
  );
}

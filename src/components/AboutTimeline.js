import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";

// Timeline component to show development process using Flowbite Timeline
export default function AboutTimeline() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 w-full">
      <div className="px-10">
        <h2 className="text-4xl text-left font-bold tracking-tight text-gray-950 dark:text-white py-5">
          Development Timeline
        </h2>
        <Timeline horizontal className="py-3">
          <Timeline.Item>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Time>June 2024</Timeline.Time>
              <Timeline.Title>
                First commit and development start
              </Timeline.Title>
              <Timeline.Body>
                Created the react app and started developing this budgeting
                website with the following features in mind: user profiles,
                wealth calculation, budget breakdown.
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Time>March 2022</Timeline.Time>
              <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
              <Timeline.Body>
                All of the pages and components are first designed in Figma and
                we keep a parity between the two versions even as we update the
                project.
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Time>April 2022</Timeline.Time>
              <Timeline.Title>
                E-Commerce UI code in Tailwind CSS
              </Timeline.Title>
              <Timeline.Body>
                Get started with dozens of web components and interactive
                elements built on top of Tailwind CSS.
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </div>
    </section>
  );
}

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
              <Timeline.Title>Development start</Timeline.Title>
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
              <Timeline.Time>August 2024</Timeline.Time>
              <Timeline.Title>Finalized initial build</Timeline.Title>
              <Timeline.Body>
                Finalized initial build of SpendTrack with a profile system, net
                worth calculator, savings rate comparison calculator with FRED
                API, budget goals system, and monthly expense insights
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Time>September 2024</Timeline.Time>
              <Timeline.Title>SpendTrack Deployment</Timeline.Title>
              <Timeline.Body>
                Deployed the initial build of SpendTrack to the web. Going on,
                there will be future updates to futher enhance this budgeting
                and expenditure insight experience!
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </div>
    </section>
  );
}

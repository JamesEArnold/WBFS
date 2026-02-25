import { GolfEventFlyer } from "@/components/ui/golf-event-flyer";

export default function GolfFundraiser3Page() {
  return (
    <div className="p-4 mx-auto">
      <div className="flex flex-col items-center justify-center">
        <GolfEventFlyer mode="save-the-date" />
      </div>

      <div className="max-w-2xl p-6 mx-auto my-8 text-center border-2 border-yellow-400 rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold">More Details Coming Soon!</h2>
        <p className="mb-4 text-gray-700">
          We are excited to announce our 2026 Golf Fundraiser. Stay tuned for
          registration details, pricing, and sponsorship opportunities.
        </p>
        <p className="text-gray-700">
          Questions? Reach out to us at{" "}
          <a
            href="mailto:weisburnforsheriff@gmail.com"
            className="font-semibold text-yellow-600 underline"
          >
            weisburnforsheriff@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}

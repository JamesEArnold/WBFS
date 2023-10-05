import Link from "next/link";

export const ButtonContribution = () => {
  return (
    // TODO: Add contribute logic.
    // Link to a page and let the donations flow
    <Link href="/donate" className="m-0">
      <button className="min-h-full p-4 font-semibold text-yellow-400 uppercase bg-black">
        Contribute
      </button>
    </Link>
  );
};

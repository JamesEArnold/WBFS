import Link from 'next/link';
/** "How-to guides" at the top of the admin's left-hand menu. */
export function HelpNavLink() {
  return (
    <Link href="/admin/help" className="help-navlink">
      <span aria-hidden>?</span> How-to guides
    </Link>
  );
}

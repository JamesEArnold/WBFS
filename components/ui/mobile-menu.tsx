
const hamburgerSvg = <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h16" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>;

export const MobileMenu = () => {
  return (
    <div className="flex flex-col justify-center">
      { hamburgerSvg }
    </div>
  )
};

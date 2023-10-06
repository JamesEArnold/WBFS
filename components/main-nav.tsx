'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import Link from "next/link"
import { ButtonContribution } from "./ui/button-contribution"
import { MobileMenu } from "./ui/mobile-menu"
import { useState } from "react"
import { useDetectClickOutside } from 'react-detect-click-outside';

export const MainNav = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const clickOutsideRef = useDetectClickOutside({ onTriggered: () => setIsMobileNavOpen(isMobileNavOpen ? false : false) });


  return (
    <>
    <div className="sticky z-10 flex justify-between min-w-full bg-yellow-400 md:min-w-full">
      <div className="min-w-full md:min-w-[1024px] md:mx-auto">
      <div className="flex justify-between min-w-full md:mx-auto md:px-3">
        <Image
          priority
          src="/logo.svg"
          alt="Weisburn For Sheriff"
          height={100}
          width={220} />
        <div className="hidden md:flex md:mr-16">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={`bg-black text-yellow-400 ${navigationMenuTriggerStyle()}`}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={`bg-black text-yellow-400 ${navigationMenuTriggerStyle()}`}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/news" legacyBehavior passHref>
                  <NavigationMenuLink className={`bg-black text-yellow-400 ${navigationMenuTriggerStyle()}`}>
                    News
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/volunteer" legacyBehavior passHref>
                  <NavigationMenuLink className={`bg-black text-yellow-400 ${navigationMenuTriggerStyle()}`}>
                    Volunteer
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex gap-2">
          <MobileMenu classNames="md:hidden" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} />
          <ButtonContribution />
        </div>
      </div>
      </div>
    </div>
      <>
          {isMobileNavOpen && 
          <div className="absolute w-full min-h-full backdrop-blur-md backdrop-opacity-30" ref={clickOutsideRef} >
            <ul className="flex flex-col p-4 mx-4 font-medium border-2 border-gray-100 rounded-b-lg md:p-0 bg-gray-50">
              <li>
                <Link href="/" 
                  className="block py-2 pl-3 pr-4 text-black bg-yellow-400 rounded hover:bg-yellow-400/30 active:bg-yellow-400/30 md:p-0"
                  aria-current="page"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <a href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-yellow-400/30 active:bg-yellow-400/30 md:p-0"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  About
                </a>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-yellow-400/30 active:bg-yellow-400/30 md:p-0"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  Contribute
                </Link>
              </li>
            </ul>
          </div>}
      </>
    </>
  )
}

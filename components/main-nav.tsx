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

export const MainNav = () => {
  return (
    <div className="flex min-w-full justify-between sticky md:min-w-full bg-yellow-400">
      <Image
        priority
        src="/logo.svg"
        alt="Weisburn For Sheriff"
        height={100}
        width={220}
      />
      <div className="hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/news" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                News
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/volunteer" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Volunteer
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> 
      </div>
      <div className="flex gap-2">
        <MobileMenu />
        <ButtonContribution />
      </div>
    </div>
  )
}

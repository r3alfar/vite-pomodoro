// import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { Settings } from "lucide-react"

// const mainNavItems = ['A', 'B', 'C'];

export default function DefaultNav() {
  return (
    // <div className="mr-4 hidden gap-2 md:flex">
    //   {mainNavItems.map((item, index) => (
    //     <Button key={index} variant="link">
    //       {item}
    //     </Button>
    //   ))}
    // </div>
    <div className="flex-row justify-center mb-8 md:flex hidden">
      <NavigationMenu>
        <p className="mr-12">[LOGO]</p>
        <NavigationMenuList className="gap-x-8">
          <NavigationMenuItem>

            <NavigationMenuLink>
              <a href="/" className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground py-2 px-2 hover:rounded-lg">
                Documentation
              </a>

            </NavigationMenuLink>

          </NavigationMenuItem>
          <NavigationMenuItem>

            <NavigationMenuLink>
              <a href="/" className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground py-2 px-2 hover:rounded-lg">
                Setting
              </a>

            </NavigationMenuLink>

          </NavigationMenuItem>
          <NavigationMenuItem>

            <NavigationMenuLink>
              <a href="/" className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground py-2 px-2 hover:rounded-lg">
                About
              </a>

            </NavigationMenuLink>

          </NavigationMenuItem>
        </NavigationMenuList>
        <div className="ml-12">
          <ModeToggle />
        </div>
        <div className="ml-2">
          <Button disabled size="icon">
            <Settings className="" />
          </Button>
        </div>
      </NavigationMenu>

    </div>
  );
}
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

function SimpleNavbar() {
  return (
    <div className="flex flex-row justify-center mb-8">
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
      </NavigationMenu>

    </div>
  )
}

export default SimpleNavbar
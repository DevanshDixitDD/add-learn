"use client";
import { useLogin } from "@/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useGetUserQuery } from "@/redux/features/user/userApiSlice";
import { useRouter } from "next/navigation";


const UserNav = () => {

  const { handleLogout } = useLogin();
  const { data: user, isLoading } = useGetUserQuery();
  const router = useRouter();

  if (isLoading) {
    return null;
  }

  return (<DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/avatars/01.png" alt="@shadcn" />
          <AvatarFallback>{user?.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>

      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user?.email || "user@exmaple.com"}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      {user && (
        <DropdownMenuItem
          onClick={() => router.push('/dashboard')}
          className="font-normal"
        >
          Dashboard
        </DropdownMenuItem>
      )}
      {user?.role === "admin" && (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push('/dashboard/teacher/courses')}
            className="font-normal"
          >
            Teacher&apos; Mode
          </DropdownMenuItem>
        </>
      )}
      {/* <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
            
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
            
    </DropdownMenuGroup> */}
      <DropdownMenuSeparator />
      {user ? (
        <DropdownMenuItem onClick={() => handleLogout()}>
          Log out
        </DropdownMenuItem>
      ) : (
        <>
          <DropdownMenuItem onClick={() => router.push("/sign-in")}>
            Sign-In
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/sign-up")}>
            Sign-Up
          </DropdownMenuItem>
        </>
      )}
    </DropdownMenuContent>
  </DropdownMenu>);
}

export default UserNav;
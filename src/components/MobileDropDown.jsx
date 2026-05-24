"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { Avatar, Dropdown } from "@heroui/react";

export function MobileDropDown({ user }) {

  const router = useRouter();
  const [open, setOpen] = useState(false);

  const closeDropdown = () => setOpen(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    closeDropdown();
    router.refresh();
    router.push("/");
  };

  const menuItems = [
    { href: "/", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/messages", label: "Message" },
    { href: "/create", label: "Post" },
    { href: "/notification", label: "Notification" },
    { href: "setting", label: "Settings" },
  ];

  return (
    <Dropdown placement="bottom-end" isOpen={open} onOpenChange={setOpen}>

      {/* Trigger Avatar */}
      <Dropdown.Trigger>
        <Avatar
          size="sm"
          className="h-9 w-9 cursor-pointer"
        >
          <Avatar.Image src={user?.image} alt={user?.name} />
          <Avatar.Fallback>
            {user?.name?.charAt(0)?.toUpperCase()}
          </Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>

      {/* Dropdown Panel */}
      <Dropdown.Popover
        className="
          w-72 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-2 mr-3 sm:mr-7 md:mr-15 lg:mr-20 shadow-lg"
      >

        {/* Profile Header */}
        <div className="px-3 py-3 border-b border-neutral-200 dark:border-neutral-800">

          <Link
            href="/profile"
            onClick={closeDropdown}
            className="flex items-center gap-3"
          >
            <Avatar size="md" className="h-10 w-10">
              <Avatar.Image src={user?.image} alt={user?.name} />
              <Avatar.Fallback>
                {user?.name?.charAt(0)?.toUpperCase()}
              </Avatar.Fallback>
            </Avatar>

            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {user?.email}
              </p>
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <div className="py-2">

          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeDropdown}
              className="block px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition">
              {item.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="my-2 h-px bg-neutral-200 dark:bg-neutral-800" />

          {/* Logout */}
          <button
            onClick={handleSignOut}
            className="
              w-full text-left
              px-3 py-2
              text-sm text-red-500
              rounded-lg
              hover:bg-red-50 dark:hover:bg-red-500/10
              transition
            "
          >
            Log out
          </button>

        </div>
      </Dropdown.Popover>
    </Dropdown>
  );
}
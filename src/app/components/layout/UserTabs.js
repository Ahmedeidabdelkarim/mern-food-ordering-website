"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
function UserTabs({ isAdmin }) {
  const path= usePathname();

  return (
    <div className='flex mx-auto gap-2 tabs justify-center flex-wrap'>
                <Link href="/profile" className={path === "/profile" ? 'text-primary active' : 'text-primary'}>Profile</Link>
                {isAdmin && (
                    <>
                        <Link href="/categories" className={path === "/categories" ? 'text-primary active ml-4' : 'text-primary ml-4'}>Categories</Link>
                        <Link href="/menu-items" className={path.includes("/menu-items") ? 'text-primary active ml-4' : 'text-primary ml-4'}>Menu Items</Link>
                        <Link href="/users" className={path.includes("/users") ? 'text-primary active ml-4' : 'text-primary ml-4'}>Users</Link>
                        <Link href="/orders" className={path === "/orders" ? 'text-primary active ml-4' : 'text-primary ml-4'}>Orders</Link>
                    </>
                )}
            </div>

  )
}

export default UserTabs
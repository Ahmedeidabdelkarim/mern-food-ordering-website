"use client";
import { useEffect, useState } from 'react';
import UserTabs from '../components/layout/UserTabs'
import useProfile from '../components/UseProfile';
import Link from 'next/link';
import Image from 'next/image';
import Right from '../components/icons/Right';

function MenuItemsPage() {
    const [menuItems, setMenuItems] = useState([]);
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            });
        })
    }, []);

    if (loading) {
        return <div className="text-center my-8 text-gray-500">Loading Items...</div>
    }
    if (!data || !data.admin) {
        return <div className="text-center my-8 text-gray-500">You do not have permission to view this page.</div>
    }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link
          className="button flex"
          href={'/menu-items/new'}>
          <span>Create new menu item</span>
          <Right />
        </Link>
      </div>
      <div className="mb-4">
        <h2 className="text-sm text-gray-500 my-4">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 && menuItems.map(item => (
            <Link
              key={item._id}
              href={'/menu-items/edit/'+item._id}
              className="bg-gray-200 rounded-lg p-4"
            >
              <div className="relative">
                <Image
                  className="rounded-md"
                  src={item.image} alt={''} width={200} height={200} />
              </div>
              <div className="text-center">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MenuItemsPage
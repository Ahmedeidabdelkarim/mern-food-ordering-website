"use client";
import UserTabs from '@/app/components/layout/UserTabs';
import UseProfile from '@/app/components/UseProfile'
import MenuItemForm from '@/app/components/layout/MenuItemForm';
import {redirect} from "next/navigation";
import { useState } from 'react';
import Link from 'next/link';
import Left from '@/app/components/icons/Left';
import toast from 'react-hot-toast';

function NewMenuItemPage() {
    const [redirectToItems, setRedirectToItems] = useState(false);
    const { loading, data } = UseProfile();

    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item',
            success: 'Saved',
            error: 'Error',
        });

        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect('/menu-items');
    }

    if (loading) {
        return <div className="text-center my-8 text-gray-500">Loading...</div>
    }
    if (!data || !data.admin) {
        return <div className="text-center my-8 text-gray-500">You do not have permission to view this page.</div>
    }
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={'/menu-items'} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  )
}

export default NewMenuItemPage

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const ProfileTab = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
    <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
    <form className="space-y-5">
      <div className="flex flex-col md:flex-row gap-6 mb-4">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-700 font-bold">A</div>
          <Button size="sm" className="mt-2 w-full" type="button">Change</Button>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <Input placeholder="Admin Name" defaultValue="Admin" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Email Address</label>
        <Input type="email" placeholder="you@example.com" defaultValue="admin@localena.com" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Bio</label>
        <textarea className="rounded-md border border-gray-200 px-3 py-2 text-base bg-background" rows={2} placeholder="Describe yourself..." defaultValue="" />
      </div>
      <div className="flex justify-end pt-4 gap-2">
        <Button variant="secondary" type="button">Cancel</Button>
        <Button type="submit" className="font-semibold">Save Changes</Button>
      </div>
    </form>
  </div>
);

const GeneralTab = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
    <h3 className="text-lg font-semibold mb-4">General Settings</h3>
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-gray-700">Language</label>
        <select className="border border-gray-200 px-3 py-2 rounded-md w-full mt-1 bg-background">
          <option>English</option>
          <option>Spanish</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Date Format</label>
        <select className="border border-gray-200 px-3 py-2 rounded-md w-full mt-1 bg-background">
          <option>MM/DD/YYYY</option>
          <option>DD/MM/YYYY</option>
        </select>
      </div>
      <div className="flex justify-end pt-4 gap-2">
        <Button variant="secondary" type="button">Cancel</Button>
        <Button type="submit" className="font-semibold">Save Changes</Button>
      </div>
    </div>
  </div>
);

const SecurityTab = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
    <h3 className="text-lg font-semibold mb-4">Security</h3>
    <form className="space-y-6 max-w-sm">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Current Password</label>
        <Input type="password" placeholder="Current password" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">New Password</label>
        <Input type="password" placeholder="New password" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
        <Input type="password" placeholder="Confirm new password" />
      </div>
      <div className="flex justify-end pt-2 gap-2">
        <Button variant="secondary" type="button">Cancel</Button>
        <Button type="submit" className="font-semibold">Update Password</Button>
      </div>
    </form>
  </div>
);

const NotificationTab = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
    <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-gray-700">Email Notifications</span>
        <Switch checked disabled />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-700">Push Notifications</span>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-700">Promotional Offers</span>
        <Switch />
      </div>
    </div>
  </div>
);

const SettingsDetailPage = () => {
  const [tab, setTab] = useState("profile");
  return (
    <div className="w-full mx-auto max-w-5xl py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
        <span className="text-gray-500">
          Manage your profile, preferences, and security settings.
        </span>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-7 w-full max-w-2xl">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile"><ProfileTab /></TabsContent>
        <TabsContent value="general"><GeneralTab /></TabsContent>
        <TabsContent value="security"><SecurityTab /></TabsContent>
        <TabsContent value="notifications"><NotificationTab /></TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsDetailPage;

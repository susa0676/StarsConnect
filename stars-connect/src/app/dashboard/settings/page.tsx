"use client";
import React, { useEffect, useState } from "react";
import {useRouter} from 'next/navigation'
import {
  User,
  Lock,
  Bell,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Key
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Type helpers                                                       */
/* ------------------------------------------------------------------ */
type TabType = "account" | "privacy" | "notifications" | "security";

/* ------------------------------------------------------------------ */
/*  Re‑usable memo‑ised primitives                                     */
/* ------------------------------------------------------------------ */

interface TabButtonProps {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  /** NOTE: make this the same type as React’s `setState`           */
  onClick: React.Dispatch<React.SetStateAction<TabType>>;
  isActive: boolean;
}
const TabButton = React.memo<TabButtonProps>(
  ({ id, label, icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-colors ${
        isActive
          ? "border-l-4 border-red-500 bg-red-50 text-red-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  )
);

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  description?: string;
}
const ToggleSwitch = React.memo<ToggleSwitchProps>(
  ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <h4 className="font-medium text-gray-900">{label}</h4>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 ${
          checked ? "bg-red-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )
);

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}
const InputField = React.memo<InputFieldProps>(
  ({ label, value, onChange, type = "text", icon, disabled }) => {
    return (type =="select")?
     (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <select
                  name={label}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={disabled}
                  className={`h-10  block w-full rounded-lg border border-gray-300 px-3 py-2 ${
                    icon ? "pl-10" : ""
                  } ${
                    disabled ? "bg-gray-50 text-gray-500" : "bg-white text-gray-900"
                  } placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm`}
                >
          <div className="flex flex-col space-y-2">
          <option value="" className="inline-flex items-center space-x-2">
                --Select gender--
              </option>
              <option value="Male" className="inline-flex items-center space-x-2">
                Male
              </option>
              <option value="Female" className="inline-flex items-center space-x-2">
                Female
              </option><option value="Others" className="inline-flex items-center space-x-2">
                Others
              </option>
          </div>
          </select>
        </div>
      ):
    (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`h-10  block w-full rounded-lg border border-gray-300 px-3 py-2 ${
            icon ? "pl-10" : ""
          } ${
            disabled ? "bg-gray-50 text-gray-500" : "bg-white text-gray-900"
          } placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm`}
        />
      </div>
    </div>
  )}
);

/* ------------------------------------------------------------------ */
/*  Main Settings component                                            */
/* ------------------------------------------------------------------ */

interface AccountData {
  photo:string
  name: string;
  email: string;
  phone: string;
  gender: string;
  location: string;
  dob: string;
  bio: string;
}
interface PrivacySettings {
  profileVisibility: "public" | "team" | "private";
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  allowDirectMessages: boolean;
  dataAnalytics: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
  loginNotifications: boolean;
  twoFactorAuth: boolean;
}
interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  weeklyDigest: boolean;
  projectUpdates: boolean;
  teamMentions: boolean;
  systemAlerts: boolean;
}

const SettingsMainContent = () => {
  /* ---------- state ---------- */
  const [activeTab, setActiveTab] = useState<TabType>("account");

  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [status ,setStatus] = useState("");
  /* ------- profile form data -------- */
  const [accountData, setAccountData] = useState<AccountData>({
    photo:'',
    name: "",
    email: "",
    phone: "",
    gender: "",
    location: "",
    dob: "",
    bio: ""
  });

  /* ------- privacy & notifications ----- */
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: "public",
    showEmail: true,
    showPhone: false,
    showLocation: true,
    allowDirectMessages: true,
    dataAnalytics: true,
    marketingEmails: false,
    securityAlerts: true,
    loginNotifications: true,
    twoFactorAuth: false
  });
  const router = useRouter();
  const expire = localStorage.getItem("expire");
  if(!expire || Date.now() > Number(expire)){
      localStorage.clear();
      router.push("/login");
  }
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      weeklyDigest: true,
      projectUpdates: true,
      teamMentions: true,
      systemAlerts: true
    });

  /* ---------- change‑password modal ---------- */
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [pwdForm, setPwdForm] = useState({
    current: "",
    newPwd: "",
    confirm: ""
  });
  const [file, setFile] = useState<File | null>(null);
  const id = localStorage.getItem('id');
  useEffect(() => {fetch("http://localhost:5000/dashboard/settings/account/"+id+"/").then(res => res.json()).then(data => setAccountData(data.user)).catch(err => console.error(err))},[])
  /* ---------- handlers ---------- */
  const handleAccountUpdate = async(field: keyof AccountData, value: string) =>{
    setIsEditing(true);
    setAccountData((p) => ({ ...p, [field]: value }));
  }

  const convertToCSV = (data:any[]) =>{
    console.log(data)
    const keys = Object.keys(data[0]);
    const rows = [keys.join(","),...data.map(r => 
      keys.map(k => {
        let val = r[k];
        if(val === null || val === undefined) return ''
        if(typeof val == 'string')
          return `"${val.replace(/"/g, '""')}"`;
        return val;
      }).join(",")
    )].join("\n")
    return new Blob([rows],{type:"text/csv"});
  }
  const convertToJSON = (data:any[]) => {
    const newdata = JSON.stringify(data,null,2);
    return new Blob([newdata],{type:"application/json"});
  }
  const convertToPDF = (data:any[]) => {
    const newdata = JSON.stringify(data,null,2);
    return new Blob([newdata],{type:"application/json"});
  }
  const handleDownload = async(type:string) => {
    const res = await fetch("http://localhost:5000/dashboard/profile/",{
      method:"POST",headers:{'content-type':'application/json'},body:JSON.stringify({id:id})
    })
    const data = await res.json();
    if(res.ok){
      const blob = type == "CSV"?convertToCSV(data):type == "JSON"?convertToJSON(data):convertToPDF(data);
      const link = document.createElement("a");
      link.setAttribute("href", URL.createObjectURL(blob));
      link.setAttribute("download",`userData${type.toLowerCase()}`)
      document.body.appendChild(link);
      
      link.click();
      document.removeChild(link)
    }
  }

  const togglePrivacy = (k: keyof PrivacySettings) =>
    setPrivacySettings((p) => ({ ...p, [k]: !p[k] }));

  const toggleNotification = (k: keyof NotificationSettings) =>
    setNotificationSettings((p) => ({ ...p, [k]: !p[k] }));

  const handleProfileVisibilityChange = (
    v: "public" | "team" | "private"
  ) => setPrivacySettings((p) => ({ ...p, profileVisibility: v }));

  const handleSave = async() => {
    const formData = new FormData();
    Object.entries(accountData).forEach(([k,v]) =>{
      if(v !== null && v !== '' && v !== undefined)
        formData.append(k,v);
    })
    if(file) formData.append('file',file)
    const res = await fetch("http://localhost:5000/dashboard/settings/account/"+id,{
        method:"POST",
        body:formData
    })
    const dat = await res.json();
    if(res.ok){      
      setAccountData(dat.user);
      localStorage.setItem('name',dat.user.name);
      localStorage.setItem('photo',dat.user.photo);
    }
    setStatus(dat.status);
    setShowSuccess(true);
    setIsEditing(false);
    setTimeout(() => setShowSuccess(false),10000)
  };

  const handlePasswordSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    /** TODO: real validation / API call */
    if(pwdForm.current == pwdForm.newPwd || pwdForm.newPwd !== pwdForm.confirm) setStatus("Set your current and new password correctly ")
    else{const res = await fetch("http://localhost:5000/dashboard/settings/chgpwd/"+id,{
        method:"POST",
        headers:{'content-type' : 'application/json'},
        body:JSON.stringify({current:pwdForm.current,newPwd:pwdForm.newPwd})
    })
    const msg = await res.json();
    if(res.ok){
      console.log("Password updated successfully");
    }
    setStatus(msg.status);
  }
    setPwdForm({ current: "", newPwd: "", confirm: "" });
    setShowSuccess(true);
    setShowPwdModal(false)
    setTimeout(() => setShowSuccess(false),10000)
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* ---------- header ---------- */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your profile, privacy and notifications.
          </p>
        </header>

        {/* success banner */}
        {showSuccess && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-800">
            {status}
          </div>
        )}

        <div className="grid grid-cols-12 gap-6">
          {/* ---------- Sidebar ---------- */}
          <aside className="col-span-3">
            <div className="space-y-2 rounded-xl bg-white p-4 shadow-sm">
              <TabButton
                id="account"
                label="Account Settings"
                icon={<User className="h-5 w-5" />}
                isActive={activeTab === "account"}
                onClick={setActiveTab}
              />
              <TabButton
                id="privacy"
                label="Privacy Settings"
                icon={<Lock className="h-5 w-5" />}
                isActive={activeTab === "privacy"}
                onClick={setActiveTab}
              />
              <TabButton
                id="notifications"
                label="Notifications"
                icon={<Bell className="h-5 w-5" />}
                isActive={activeTab === "notifications"}
                onClick={setActiveTab}
              />
              <TabButton
                id="security"
                label="Security"
                icon={<Shield className="h-5 w-5" />}
                isActive={activeTab === "security"}
                onClick={setActiveTab}
              />
            </div>
          </aside>

          {/* ---------- Main panel ---------- */}
          <section className="col-span-9 rounded-xl bg-white shadow-sm">
            {/* ---------------- ACCOUNT ---------------- */}
            {activeTab === "account" && (
              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Personal Profile</h2>
                    <p className="text-gray-600">
                      Manage your profile information.
                    </p>
                  </div>
                  
                </div>

                {/* avatar */}
                <div className="mb-8 border-b pb-8">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600">
                        {accountData.photo?<img alt={accountData.name}className ="flex h-24 w-24 items-center justify-center rounded-full "src ={accountData.photo}/>:<User className="h-12 w-12 text-white" />}
                      </div>
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 rounded-full border bg-white p-2 shadow hover:bg-gray-50">
                          <Camera className="h-4 w-4 text-gray-600" />
                        </button>
                      )}
                    </div>
                    
<div className="flex space-x-10">
  <input
    id="photoUpload"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      setFile(e.target.files?.[0] || null)
      setIsEditing(true);
    }}
  />
  <button onClick={() => document.getElementById("photoUpload")?.click()}
    className="font-medium text-red-600">
    Change Photo
  </button>
  <button className="text-gray-500 ">Remove Photo</button>
</div>
                    
                  </div>
                </div>

                {/* inputs */}
                <div className="grid grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    value={accountData.name}
                    onChange={(v) => handleAccountUpdate("name", v)}
                    icon={<User className="h-5 w-5 text-gray-400" />}
                    
                  />
                  <InputField
                    label="Email Address"
                    type="email"
                    value={accountData.email}
                    onChange={(v) => handleAccountUpdate("email", v)}
                    icon={<Mail className="h-5 w-5 text-gray-400" />}
                    
                  />
                  <InputField
                    label="Phone Number"
                    value={accountData.phone}
                    onChange={(v) => handleAccountUpdate("phone", v)}
                    icon={<Phone className="h-5 w-5 text-gray-400" />}
                    
                  />
                  <InputField
                    label="Gender"
                    type = "select"
                    value={accountData.gender}
                    onChange={(v) => handleAccountUpdate("gender", v)}
                    
                  />

                  <InputField
                    label="Location"
                    value={accountData.location}
                    onChange={(v) => handleAccountUpdate("location", v)}
                    icon={<MapPin className="h-5 w-5 text-gray-400" />}
                    
                  />
                  <InputField
                    label="Date of Birth"
                    type="date"
                    value={accountData.dob}
                    onChange={(v) => handleAccountUpdate("dob", v)}
                    icon={<Calendar className="h-5 w-5 text-gray-400" />}
                    
                  />
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-medium">Bio</label>
                  <textarea
                    rows={4}
                    value={accountData.bio}
                    onChange={(e) => handleAccountUpdate("bio", e.target.value)}
                    
                    className={`w-full rounded-lg border px-3 py-2 focus:border-red-500 focus:ring-red-500 ${
                      isEditing
                        ? "bg-white text-gray-900"
                        : "bg-gray-50 text-gray-500"
                    }`}
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <button
                    onClick={() => handleSave()} disabled ={!isEditing}
                    className={isEditing?"rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700":"rounded-lg bg-gray-300 px-4 py-2 text-white-400 hover "}
                  >
                    {isEditing ? "Save Changes" : "No changes"}
                  </button>
              </div>
            )}

            {/* ---------------- PRIVACY ---------------- */}
            {activeTab === "privacy" && (
              <div className="p-6">
                <h2 className="mb-1 text-xl font-semibold">Privacy Settings</h2>
                <p className="mb-8 text-gray-600">
                  Control who can see your information.
                </p>

                <div className="space-y-8">
                  {/* profile visibility */}
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Profile Visibility</h3>
                    {(["public", "team", "private"] as const).map((value) => (
                      <label
                        key={value}
                        className="flex cursor-pointer items-start space-x-3 py-2"
                      >
                        <input
                          type="radio"
                          name="profileVisibility"
                          checked={privacySettings.profileVisibility === value}
                          onChange={() => handleProfileVisibilityChange(value)}
                          className="mt-1 h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span>
                          <span className="font-medium capitalize">{value}</span>
                          <span className="block text-sm text-gray-500">
                            {value === "public"
                              ? "Anyone can view your profile"
                              : value === "team"
                              ? "Only your team members can view your profile"
                              : "Only you can view your profile"}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* contact info */}
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="mb-4 text-lg font-medium">
                      Contact Information
                    </h3>
                    <ToggleSwitch
                      checked={privacySettings.showEmail}
                      onChange={() => togglePrivacy("showEmail")}
                      label="Show Email Address"
                    />
                    <ToggleSwitch
                      checked={privacySettings.showPhone}
                      onChange={() => togglePrivacy("showPhone")}
                      label="Show Phone Number"
                    />
                    <ToggleSwitch
                      checked={privacySettings.showLocation}
                      onChange={() => togglePrivacy("showLocation")}
                      label="Show Location"
                    />
                  </div>

                  {/* communication */}
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="mb-4 text-lg font-medium">Communication</h3>
                    <ToggleSwitch
                      checked={privacySettings.allowDirectMessages}
                      onChange={() => togglePrivacy("allowDirectMessages")}
                      label="Allow Direct Messages"
                    />
                  </div>

                  {/* data & analytics */}
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="mb-4 text-lg font-medium">
                      Data & Analytics
                    </h3>
                    <ToggleSwitch
                      checked={privacySettings.dataAnalytics}
                      onChange={() => togglePrivacy("dataAnalytics")}
                      label="Usage Analytics"
                      description="Help improve our service by sharing anonymous usage data"
                    />
                    <ToggleSwitch
                      checked={privacySettings.marketingEmails}
                      onChange={() => togglePrivacy("marketingEmails")}
                      label="Marketing Communications"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- NOTIFICATIONS ---------------- */}
            {activeTab === "notifications" && (
              <div className="p-6">
                <h2 className="mb-1 text-xl font-semibold">
                  Notification Preferences
                </h2>
                <p className="mb-8 text-gray-600">
                  Choose how and when you want to be notified.
                </p>

                <div className="space-y-8">
                  {/* channels */}
                  <div>
                    <h3 className="mb-4 text-lg font-medium">
                      Notification Channels
                    </h3>
                    <ToggleSwitch
                      checked={notificationSettings.emailNotifications}
                      onChange={() => toggleNotification("emailNotifications")}
                      label="Email Notifications"
                    />
                    <ToggleSwitch
                      checked={notificationSettings.pushNotifications}
                      onChange={() => toggleNotification("pushNotifications")}
                      label="Push Notifications"
                    />
                    <ToggleSwitch
                      checked={notificationSettings.smsNotifications}
                      onChange={() => toggleNotification("smsNotifications")}
                      label="SMS Notifications"
                    />
                  </div>

                  {/* content */}
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="mb-4 text-lg font-medium">
                      Content Notifications
                    </h3>
                    <ToggleSwitch
                      checked={notificationSettings.projectUpdates}
                      onChange={() => toggleNotification("projectUpdates")}
                      label="Project Updates"
                    />
                    <ToggleSwitch
                      checked={notificationSettings.teamMentions}
                      onChange={() => toggleNotification("teamMentions")}
                      label="Team Mentions"
                    />
                    <ToggleSwitch
                      checked={notificationSettings.weeklyDigest}
                      onChange={() => toggleNotification("weeklyDigest")}
                      label="Weekly Digest"
                    />
                  </div>

                  {/* system */}
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="mb-4 text-lg font-medium">
                      System Notifications
                    </h3>
                    <ToggleSwitch
                      checked={notificationSettings.systemAlerts}
                      onChange={() => toggleNotification("systemAlerts")}
                      label="System Alerts"
                    />
                    <ToggleSwitch
                      checked={privacySettings.securityAlerts}
                      onChange={() => togglePrivacy("securityAlerts")}
                      label="Security Alerts"
                    />
                    <ToggleSwitch
                      checked={privacySettings.loginNotifications}
                      onChange={() => togglePrivacy("loginNotifications")}
                      label="Login Notifications"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- SECURITY ---------------- */}
            {activeTab === "security" && (
              <div className="p-6">
                <h2 className="mb-1 text-xl font-semibold">Security Settings</h2>
                <p className="mb-8 text-gray-600">
                  Manage your account security and authentication methods.
                </p>

                <div className="space-y-8">
                  {/* password */}
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Password</h3>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Change the Password</p>
                          
                        </div>
                        <button
                          onClick={() => setShowPwdModal(true)}
                          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 2FA */}
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="mb-4 text-lg font-medium">
                      Two‑Factor Authentication
                    </h3>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <ToggleSwitch
                        checked={privacySettings.twoFactorAuth}
                        onChange={() => togglePrivacy("twoFactorAuth")}
                        label="Enable Two‑Factor Authentication"
                        description="Add an extra layer of security to your account"
                      />
                      {privacySettings.twoFactorAuth && (
                        <p className="mt-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
                          Two‑factor authentication is enabled. You’ll need to
                          enter a code from your authenticator app when signing in.
                        </p>
                      )}
                    </div>
                  </div>
                  {/* ---------- Logged Sessions ---------- */}
<div className="border-t border-gray-200 pt-8">
  <h3 className="mb-4 text-lg font-medium">Logged Sessions</h3>
  <div className="space-y-4">
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
      <div>
        <p className="text-sm font-medium text-gray-800">Chrome on Windows</p>
        <p className="text-xs text-gray-500">IP: 192.168.1.10 • Last Active: 2 hrs ago</p>
      </div>
      <button className="text-sm text-red-600 hover:underline">Log out</button>
    </div>
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
      <div>
        <p className="text-sm font-medium text-gray-800">Safari on iPhone</p>
        <p className="text-xs text-gray-500">IP: 10.0.0.2 • Last Active: 5 mins ago</p>
      </div>
      <button className="text-sm text-red-600 hover:underline">Log out</button>
    </div>
  </div>
</div>

{/* ---------- Download Data ---------- */}
<div className="border-t border-gray-200 pt-8">
  <h3 className="mb-4 text-lg font-medium">Download Your Data</h3>
  <p className="text-sm text-gray-500 mb-4">
    You can request a download of your account data including profile, messages, and activity.
  </p>
  <button 
  onClick ={() => handleDownload("CSV")}
  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
    Request Data Download (CSV)
  </button>
  <button 
  onClick ={() => handleDownload("JSON")}
  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
    Request Data Download (JSON)
  </button><button 
  onClick ={() => handleDownload("PDF")}
  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
    Request Data Download (PDF)
  </button>
</div>

{/* ---------- Delete Account ---------- */}
<div className="border-t border-gray-200 pt-8">
  <h3 className="mb-4 text-lg font-medium text-red-600">Delete Account</h3>
  <p className="text-sm text-gray-500 mb-4">
    Deleting your account is permanent and cannot be undone.
  </p>
  <button
    className="rounded-lg border border-red-600 bg-white px-4 py-2 text-red-600 hover:bg-red-50"
    onClick={() => setShowDeleteModal(true)}
  >
    Delete My Account
  </button>
</div>

                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ------------ Change‑Password MODAL ------------ */}
      {showPwdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <Key className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-semibold">Change Password</h3>
            </div>

            <form className="space-y-4" onSubmit={handlePasswordSubmit}>
              <InputField
                label="Current Password"
                type="password"
                value={pwdForm.current}
                onChange={(v) => setPwdForm({ ...pwdForm, current: v })}
              />
              <InputField
                label="New Password"
                type="password"
                value={pwdForm.newPwd}
                onChange={(v) => setPwdForm({ ...pwdForm, newPwd: v })}
              />
              <InputField
                label="Confirm New Password"
                type="password"
                value={pwdForm.confirm}
                onChange={(v) => setPwdForm({ ...pwdForm, confirm: v })}
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPwdModal(false)}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ------------ DELETE ACCOUNT MODAL ------------ */}
{showDeleteModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-semibold text-red-600">Confirm Account Deletion</h3>
      <p className="text-sm text-gray-700 mb-6">
        Are you sure you want to delete your account? This action is permanent and cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setShowDeleteModal(false);
            alert("Account deleted (mock). Add backend call here.");
          }}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Confirm Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default SettingsMainContent;

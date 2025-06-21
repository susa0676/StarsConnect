"use client"
import React, { useState } from 'react';
import { User, Lock, Bell, Eye, EyeOff, Camera, Mail, Phone, MapPin, Calendar, Shield, Globe } from 'lucide-react';

interface AccountData {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  location: string;
  dateOfBirth: string;
  bio: string;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'team' | 'private';
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

interface TabButtonProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: (id: string) => void;
}

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  description?: string;
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const SettingsMainContent: React.FC = () => {
  // Account Settings State
  const [accountData, setAccountData] = useState<AccountData>({
    fullName: 'Aisha Sharma',
    email: 'aisha.sharma@starsconnect.com',
    phone: '+91 98765 43210',
    jobTitle: 'Senior Product Manager',
    department: 'Product Development',
    location: 'Mumbai, India',
    dateOfBirth: '1990-05-15',
    bio: 'Passionate product manager with 8+ years of experience in building user-centric digital products.'
  });

  // Privacy Settings State
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: 'public',
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

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyDigest: true,
    projectUpdates: true,
    teamMentions: true,
    systemAlerts: true
  });

  const [activeTab, setActiveTab] = useState('account');
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAccountUpdate = (field: keyof AccountData, value: string): void => {
    setAccountData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrivacyToggle = (setting: keyof PrivacySettings): void => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleProfileVisibilityChange = (value: 'public' | 'team' | 'private'): void => {
    setPrivacySettings(prev => ({
      ...prev,
      profileVisibility: value
    }));
  };

  const handleNotificationToggle = (setting: keyof NotificationSettings): void => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = (): void => {
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const TabButton: React.FC<TabButtonProps> = ({ id, label, icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left ${
        isActive 
          ? 'bg-red-50 text-red-600 border-l-4 border-red-500' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{label}</h4>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
          checked ? 'bg-red-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = 'text', icon, disabled = false }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`block w-full rounded-lg border border-gray-300 px-3 py-2 ${
            icon ? 'pl-10' : ''
          } ${
            disabled ? 'bg-gray-50 text-gray-500' : 'bg-white text-gray-900'
          } placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm`}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your profile information, privacy preferences, and notification settings.</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Settings updated successfully!</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <div className="col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">
              <TabButton
                id="account"
                label="Account Settings"
                icon={<User className="w-5 h-5" />}
                isActive={activeTab === 'account'}
                onClick={setActiveTab}
              />
              <TabButton
                id="privacy"
                label="Privacy Settings"
                icon={<Lock className="w-5 h-5" />}
                isActive={activeTab === 'privacy'}
                onClick={setActiveTab}
              />
              <TabButton
                id="notifications"
                label="Notifications"
                icon={<Bell className="w-5 h-5" />}
                isActive={activeTab === 'notifications'}
                onClick={setActiveTab}
              />
              <TabButton
                id="security"
                label="Security"
                icon={<Shield className="w-5 h-5" />}
                isActive={activeTab === 'security'}
                onClick={setActiveTab}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <div className="bg-white rounded-xl shadow-sm">
              
              {/* Account Settings Tab */}
              {activeTab === 'account' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Personal Profile</h2>
                      <p className="text-gray-600">Manage your profile information and visibility.</p>
                    </div>
                    <button
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                  </div>

                  {/* Profile Photo */}
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                          <User className="w-12 h-12 text-white" />
                        </div>
                        {isEditing && (
                          <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50">
                            <Camera className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                      </div>
                      {isEditing && (
                        <div className="space-y-2">
                          <button className="text-red-600 hover:text-red-700 font-medium">Change photo</button>
                          <button className="block text-gray-500 hover:text-gray-700">Remove photo</button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-2 gap-6">
                    <InputField
                      label="Full Name"
                      value={accountData.fullName}
                      onChange={(value) => handleAccountUpdate('fullName', value)}
                      icon={<User className="w-5 h-5 text-gray-400" />}
                      disabled={!isEditing}
                    />
                    <InputField
                      label="Email Address"
                      value={accountData.email}
                      onChange={(value) => handleAccountUpdate('email', value)}
                      type="email"
                      icon={<Mail className="w-5 h-5 text-gray-400" />}
                      disabled={!isEditing}
                    />
                    <InputField
                      label="Phone Number"
                      value={accountData.phone}
                      onChange={(value) => handleAccountUpdate('phone', value)}
                      icon={<Phone className="w-5 h-5 text-gray-400" />}
                      disabled={!isEditing}
                    />
                    <InputField
                      label="Job Title"
                      value={accountData.jobTitle}
                      onChange={(value) => handleAccountUpdate('jobTitle', value)}
                      disabled={!isEditing}
                    />
                    <InputField
                      label="Department"
                      value={accountData.department}
                      onChange={(value) => handleAccountUpdate('department', value)}
                      disabled={!isEditing}
                    />
                    <InputField
                      label="Location"
                      value={accountData.location}
                      onChange={(value) => handleAccountUpdate('location', value)}
                      icon={<MapPin className="w-5 h-5 text-gray-400" />}
                      disabled={!isEditing}
                    />
                    <InputField
                      label="Date of Birth"
                      value={accountData.dateOfBirth}
                      onChange={(value) => handleAccountUpdate('dateOfBirth', value)}
                      type="date"
                      icon={<Calendar className="w-5 h-5 text-gray-400" />}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={accountData.bio}
                      onChange={(e) => handleAccountUpdate('bio', e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                      className={`block w-full rounded-lg border border-gray-300 px-3 py-2 ${
                        !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white text-gray-900'
                      } placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm`}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              )}

              {/* Privacy Settings Tab */}
              {activeTab === 'privacy' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
                    <p className="text-gray-600">Control who can see your information and how your data is used.</p>
                  </div>

                  <div className="space-y-8">
                    {/* Profile Visibility */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Visibility</h3>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          {[
                            { value: 'public', label: 'Public', description: 'Anyone can view your profile' },
                            { value: 'team', label: 'Team Members Only', description: 'Only your team members can view your profile' },
                            { value: 'private', label: 'Private', description: 'Only you can view your profile' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name="profileVisibility"
                                value={option.value}
                                checked={privacySettings.profileVisibility === option.value}
                                onChange={(e) => handleProfileVisibilityChange(e.target.value as 'public' | 'team' | 'private')}
                                className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{option.label}</div>
                                <div className="text-sm text-gray-500">{option.description}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information Visibility</h3>
                      <div className="space-y-4">
                        <ToggleSwitch
                          checked={privacySettings.showEmail}
                          onChange={() => handlePrivacyToggle('showEmail')}
                          label="Show Email Address"
                          description="Allow others to see your email address on your profile"
                        />
                        <ToggleSwitch
                          checked={privacySettings.showPhone}
                          onChange={() => handlePrivacyToggle('showPhone')}
                          label="Show Phone Number"
                          description="Allow others to see your phone number on your profile"
                        />
                        <ToggleSwitch
                          checked={privacySettings.showLocation}
                          onChange={() => handlePrivacyToggle('showLocation')}
                          label="Show Location"
                          description="Allow others to see your location on your profile"
                        />
                      </div>
                    </div>

                    {/* Communication */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Communication</h3>
                      <div className="space-y-4">
                        <ToggleSwitch
                          checked={privacySettings.allowDirectMessages}
                          onChange={() => handlePrivacyToggle('allowDirectMessages')}
                          label="Allow Direct Messages"
                          description="Allow team members to send you direct messages"
                        />
                      </div>
                    </div>

                    {/* Data & Analytics */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Data & Analytics</h3>
                      <div className="space-y-4">
                        <ToggleSwitch
                          checked={privacySettings.dataAnalytics}
                          onChange={() => handlePrivacyToggle('dataAnalytics')}
                          label="Usage Analytics"
                          description="Help improve our service by sharing anonymous usage data"
                        />
                        <ToggleSwitch
                          checked={privacySettings.marketingEmails}
                          onChange={() => handlePrivacyToggle('marketingEmails')}
                          label="Marketing Communications"
                          description="Receive emails about new features and product updates"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                    <p className="text-gray-600">Choose how and when you want to be notified.</p>
                  </div>

                  <div className="space-y-8">
                    {/* Notification Channels */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Channels</h3>
                      <div className="space-y-4">
                        <ToggleSwitch
                          checked={notificationSettings.emailNotifications}
                          onChange={() => handleNotificationToggle('emailNotifications')}
                          label="Email Notifications"
                          description="Receive notifications via email"
                        />
                        <ToggleSwitch
                          checked={notificationSettings.pushNotifications}
                          onChange={() => handleNotificationToggle('pushNotifications')}
                          label="Push Notifications"
                          description="Receive push notifications in your browser"
                        />
                        <ToggleSwitch
                          checked={notificationSettings.smsNotifications}
                          onChange={() => handleNotificationToggle('smsNotifications')}
                          label="SMS Notifications"
                          description="Receive important notifications via text message"
                        />
                      </div>
                    </div>

                    {/* Content Notifications */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Content Notifications</h3>
                      <div className="space-y-4">
                        <ToggleSwitch
                          checked={notificationSettings.projectUpdates}
                          onChange={() => handleNotificationToggle('projectUpdates')}
                          label="Project Updates"
                          description="Get notified about project status changes and updates"
                        />
                        <ToggleSwitch
                          checked={notificationSettings.teamMentions}
                          onChange={() => handleNotificationToggle('teamMentions')}
                          label="Team Mentions"
                          description="Get notified when someone mentions you or your team"
                        />
                        <ToggleSwitch
                          checked={notificationSettings.weeklyDigest}
                          onChange={() => handleNotificationToggle('weeklyDigest')}
                          label="Weekly Digest"
                          description="Receive a weekly summary of your activity and updates"
                        />
                      </div>
                    </div>

                    {/* System Notifications */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">System Notifications</h3>
                      <div className="space-y-4">
                        <ToggleSwitch
                          checked={notificationSettings.systemAlerts}
                          onChange={() => handleNotificationToggle('systemAlerts')}
                          label="System Alerts"
                          description="Get notified about system maintenance and updates"
                        />
                        <ToggleSwitch
                          checked={privacySettings.securityAlerts}
                          onChange={() => handlePrivacyToggle('securityAlerts')}
                          label="Security Alerts"
                          description="Get notified about security-related events on your account"
                        />
                        <ToggleSwitch
                          checked={privacySettings.loginNotifications}
                          onChange={() => handlePrivacyToggle('loginNotifications')}
                          label="Login Notifications"
                          description="Get notified when someone logs into your account"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                    <p className="text-gray-600">Manage your account security and authentication methods.</p>
                  </div>

                  <div className="space-y-8">
                    {/* Password */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Password</p>
                            <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                          </div>
                          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                            Change Password
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <ToggleSwitch
                          checked={privacySettings.twoFactorAuth}
                          onChange={() => handlePrivacyToggle('twoFactorAuth')}
                          label="Enable Two-Factor Authentication"
                          description="Add an extra layer of security to your account"
                        />
                        {privacySettings.twoFactorAuth && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">
                              Two-factor authentication is enabled. You'll need to enter a code from your authenticator app when signing in.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Active Sessions */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Active Sessions</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">Current Session</p>
                              <p className="text-sm text-gray-500">Chrome on MacOS • Mumbai, India</p>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">Mobile Device</p>
                              <p className="text-sm text-gray-500">iPhone Safari • Last active 2 hours ago</p>
                            </div>
                            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                              Revoke
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Account Actions */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h3>
                      <div className="space-y-4">
                        <button className="w-full text-left bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">Download Your Data</p>
                              <p className="text-sm text-gray-500">Get a copy of all your account data</p>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                        <button className="w-full text-left bg-red-50 rounded-lg p-4 hover:bg-red-100 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-red-900">Delete Account</p>
                              <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                            </div>
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMainContent;
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Bell, 
  Droplets, 
  Thermometer, 
  Clock, 
  Download, 
  Palette, 
  Shield,
  Smartphone,
  Mail,
  Save,
  RefreshCw
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [userSettings, setUserSettings] = useState({
    name: "John Doe",
    email: "agrifriend24@gmail.com",
    phone: "+1 (555) 123-4567",
    timezone: "America/New_York"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    lowWaterAlert: true,
    highTemperatureAlert: true,
    pumpStartedAlert: true,
    soilDryAlert: true,
    scheduleReminders: true,
    weeklyReports: true
  });

  const [systemSettings, setSystemSettings] = useState({
    autoIrrigation: true,
    moistureThreshold: 30,
    temperatureThreshold: 35,
    irrigationDuration: 15,
    scheduleMode: "auto",
    waterPressure: "medium",
    language: "en",
    units: "metric"
  });

  const [themeSettings, setThemeSettings] = useState({
    theme: "light",
    animations: true,
    compactMode: false
  });

  const handleSave = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully updated",
    });
    
    setLoading(false);
  };

  const handleExport = () => {
    toast({
      title: "Data Export",
      description: "Your data export will be ready shortly and sent to your email",
    });
  };

  const handleReset = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to defaults",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-irrigation-light/20 to-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account, notifications, and system preferences
          </p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 glass-card">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              System
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Display
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Information
                </CardTitle>
                <CardDescription>
                  Update your personal information and account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userSettings.name}
                      onChange={(e) => setUserSettings(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userSettings.email}
                      onChange={(e) => setUserSettings(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={userSettings.phone}
                      onChange={(e) => setUserSettings(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={userSettings.timezone} onValueChange={(value) => setUserSettings(prev => ({ ...prev, timezone: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-muted-foreground">Update your password for enhanced security</p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Badge variant="outline">Not Enabled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about important events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Delivery Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive instant mobile alerts</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Alert Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'lowWaterAlert', label: 'Low Water Level', icon: Droplets },
                      { key: 'highTemperatureAlert', label: 'High Temperature', icon: Thermometer },
                      { key: 'pumpStartedAlert', label: 'Pump Started', icon: RefreshCw },
                      { key: 'soilDryAlert', label: 'Soil Too Dry', icon: Droplets },
                      { key: 'scheduleReminders', label: 'Schedule Reminders', icon: Clock },
                      { key: 'weeklyReports', label: 'Weekly Reports', icon: Download }
                    ].map(({ key, label, icon: Icon }) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{label}</span>
                        </div>
                        <Switch
                          checked={notificationSettings[key as keyof typeof notificationSettings] as boolean}
                          onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, [key]: checked }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  Irrigation System Configuration
                </CardTitle>
                <CardDescription>
                  Configure your irrigation system parameters and automation settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Automation</h3>
                    <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                      <div>
                        <p className="font-medium">Auto Irrigation</p>
                        <p className="text-sm text-muted-foreground">Enable automatic watering</p>
                      </div>
                      <Switch
                        checked={systemSettings.autoIrrigation}
                        onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, autoIrrigation: checked }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="moisture">Soil Moisture Threshold (%)</Label>
                      <Input
                        id="moisture"
                        type="number"
                        value={systemSettings.moistureThreshold}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, moistureThreshold: parseInt(e.target.value) }))}
                        min="0"
                        max="100"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperature Alert Threshold (°C)</Label>
                      <Input
                        id="temperature"
                        type="number"
                        value={systemSettings.temperatureThreshold}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, temperatureThreshold: parseInt(e.target.value) }))}
                        min="0"
                        max="60"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Operation Settings</h3>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Irrigation Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={systemSettings.irrigationDuration}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, irrigationDuration: parseInt(e.target.value) }))}
                        min="1"
                        max="120"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="schedule">Schedule Mode</Label>
                      <Select value={systemSettings.scheduleMode} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, scheduleMode: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Automatic</SelectItem>
                          <SelectItem value="manual">Manual Only</SelectItem>
                          <SelectItem value="scheduled">Time-based Schedule</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pressure">Water Pressure</Label>
                      <Select value={systemSettings.waterPressure} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, waterPressure: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={systemSettings.language} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="units">Units</Label>
                    <Select value={systemSettings.units} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, units: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">Metric (°C, L)</SelectItem>
                        <SelectItem value="imperial">Imperial (°F, Gal)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Display Preferences */}
          <TabsContent value="preferences">
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Display Preferences
                  </CardTitle>
                  <CardDescription>
                    Customize the appearance and behavior of your dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Theme</p>
                        <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                      </div>
                      <Select value={themeSettings.theme} onValueChange={(value) => setThemeSettings(prev => ({ ...prev, theme: value }))}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Animations</p>
                        <p className="text-sm text-muted-foreground">Enable smooth animations and transitions</p>
                      </div>
                      <Switch
                        checked={themeSettings.animations}
                        onCheckedChange={(checked) => setThemeSettings(prev => ({ ...prev, animations: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Compact Mode</p>
                        <p className="text-sm text-muted-foreground">Show more information in less space</p>
                      </div>
                      <Switch
                        checked={themeSettings.compactMode}
                        onCheckedChange={(checked) => setThemeSettings(prev => ({ ...prev, compactMode: checked }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Data Management
                  </CardTitle>
                  <CardDescription>
                    Export your data and manage storage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Export All Data</p>
                      <p className="text-sm text-muted-foreground">Download your complete irrigation history</p>
                    </div>
                    <Button variant="outline" onClick={handleExport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Reset All Settings</p>
                      <p className="text-sm text-muted-foreground">Restore default configuration</p>
                    </div>
                    <Button variant="destructive" onClick={handleReset}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end pt-6">
          <Button onClick={handleSave} disabled={loading} className="min-w-32">
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
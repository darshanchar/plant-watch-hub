import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, BellOff, Droplets, AlertTriangle, CheckCircle, Settings, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  timestamp: Date;
  read: boolean;
}

const Notifications = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { toast } = useToast();

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Low Water Level",
      message: "Tank water level is below 20%. Consider refilling soon.",
      type: "warning",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
    },
    {
      id: "2",
      title: "Irrigation Started",
      message: "Auto irrigation cycle started due to low soil moisture.",
      type: "info",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      read: false,
    },
    {
      id: "3",
      title: "Soil Too Dry",
      message: "Soil moisture dropped below 25%. Irrigation recommended.",
      type: "error",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: true,
    },
    {
      id: "4",
      title: "System Healthy",
      message: "All sensors are functioning normally. No issues detected.",
      type: "success",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
    },
    {
      id: "5",
      title: "Weekly Report",
      message: "Your weekly irrigation report is ready for download.",
      type: "info",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "All Notifications Read",
      description: "All notifications have been marked as read",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification Deleted",
      description: "The notification has been removed",
    });
  };

  const clearAll = () => {
    setNotifications([]);
    toast({
      title: "All Notifications Cleared",
      description: "All notifications have been removed",
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "error":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />;
      default:
        return <Droplets className="h-5 w-5 text-irrigation-blue" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-warning/20 text-warning border-warning/30";
      case "error":
        return "bg-destructive/20 text-destructive border-destructive/30";
      case "success":
        return "bg-success/20 text-success border-success/30";
      default:
        return "bg-irrigation-blue/20 text-irrigation-blue border-irrigation-blue/30";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-background p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {notificationsEnabled ? (
              <Bell className="h-8 w-8 text-irrigation-blue" />
            ) : (
              <BellOff className="h-8 w-8 text-muted-foreground" />
            )}
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Notifications
            </h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Enable Notifications</span>
            <Switch 
              checked={notificationsEnabled} 
              onCheckedChange={setNotificationsEnabled} 
            />
          </div>
          
          {notifications.length > 0 && (
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={markAllAsRead}
                  className="backdrop-blur-glass bg-white/50"
                >
                  Mark All Read
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearAll}
                className="backdrop-blur-glass bg-white/50 text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Notification Settings */}
      <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)]">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Notification Settings</CardTitle>
          <CardDescription>Configure which alerts you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Low Water Alerts", description: "Get notified when tank level is low", enabled: true },
              { label: "Soil Moisture Alerts", description: "Alerts when soil is too dry", enabled: true },
              { label: "Pump Status Updates", description: "Notifications when pump starts/stops", enabled: false },
              { label: "System Health Reports", description: "Weekly system status reports", enabled: true },
              { label: "Weather Warnings", description: "Severe weather condition alerts", enabled: false },
              { label: "Maintenance Reminders", description: "Regular maintenance schedule alerts", enabled: true },
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/10">
                <div className="flex-1">
                  <p className="text-sm font-medium">{setting.label}</p>
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                </div>
                <Switch defaultChecked={setting.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)]">
            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Notifications</h3>
              <p className="text-muted-foreground">
                You're all caught up! New notifications will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`backdrop-blur-glass border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)] transition-all duration-300 hover:shadow-lg cursor-pointer ${
                notification.read 
                  ? 'bg-white/15' 
                  : 'bg-white/25 border-l-4 border-l-irrigation-blue'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between space-x-4">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className={`text-sm font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getTypeColor(notification.type)}`}
                        >
                          {notification.type}
                        </Badge>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-irrigation-blue rounded-full" />
                        )}
                      </div>
                      <p className={`text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
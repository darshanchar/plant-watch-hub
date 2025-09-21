import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, TrendingUp, Droplets, Clock, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const { toast } = useToast();

  const weeklyData = [
    { day: "Mon", waterUsed: 45, duration: 120 },
    { day: "Tue", waterUsed: 52, duration: 135 },
    { day: "Wed", waterUsed: 38, duration: 95 },
    { day: "Thu", waterUsed: 61, duration: 150 },
    { day: "Fri", waterUsed: 47, duration: 118 },
    { day: "Sat", waterUsed: 55, duration: 142 },
    { day: "Sun", waterUsed: 42, duration: 108 },
  ];

  const usageBreakdown = [
    { name: "Morning", value: 35, color: "hsl(var(--irrigation-green))" },
    { name: "Afternoon", value: 45, color: "hsl(var(--irrigation-blue))" },
    { name: "Evening", value: 20, color: "hsl(var(--irrigation-pump))" },
  ];

  const exportReport = () => {
    toast({
      title: "Report Generated",
      description: "Irrigation report has been downloaded successfully",
    });
  };

  const totalWaterUsed = weeklyData.reduce((sum, day) => sum + day.waterUsed, 0);
  const avgDailyUsage = totalWaterUsed / weeklyData.length;
  const totalDuration = weeklyData.reduce((sum, day) => sum + day.duration, 0);

  return (
    <div className="min-h-screen bg-gradient-background p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Reports
          </h1>
          <p className="text-muted-foreground">Irrigation system usage analytics</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32 backdrop-blur-glass bg-white/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            onClick={exportReport}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)]">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Water Used</CardTitle>
            <Droplets className="h-4 w-4 text-irrigation-blue ml-auto" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWaterUsed}L</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)]">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Daily Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-irrigation-green ml-auto" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDailyUsage.toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">Per day</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)]">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Runtime</CardTitle>
            <Clock className="h-4 w-4 text-irrigation-pump ml-auto" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)]">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <BarChart3 className="h-4 w-4 text-irrigation-blue ml-auto" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <div className="flex items-center mt-1">
              <Badge variant="default" className="bg-success text-success-foreground">
                Excellent
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water Usage Chart */}
        <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Daily Water Usage</CardTitle>
            <CardDescription>Water consumption over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="day" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    }}
                    formatter={(value, name) => [
                      `${value}${name === 'waterUsed' ? 'L' : 'min'}`,
                      name === 'waterUsed' ? 'Water Used' : 'Duration'
                    ]}
                  />
                  <Bar 
                    dataKey="waterUsed" 
                    fill="hsl(var(--irrigation-blue))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Usage Breakdown */}
        <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Usage Breakdown</CardTitle>
            <CardDescription>Water usage distribution by time of day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={usageBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {usageBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="backdrop-blur-glass bg-white/25 border-white/18 shadow-[0_8px_32px_rgba(31,38,135,0.37)]">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          <CardDescription>Latest irrigation system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "2 hours ago", event: "Auto irrigation started", status: "success", duration: "45 min" },
              { time: "6 hours ago", event: "Low soil moisture detected", status: "warning", duration: "-" },
              { time: "8 hours ago", event: "Manual pump activation", status: "info", duration: "20 min" },
              { time: "12 hours ago", event: "Daily report generated", status: "info", duration: "-" },
              { time: "1 day ago", event: "Tank refilled", status: "success", duration: "-" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/10">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-success' :
                    activity.status === 'warning' ? 'bg-warning' : 'bg-irrigation-blue'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{activity.event}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                {activity.duration !== "-" && (
                  <Badge variant="outline">{activity.duration}</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
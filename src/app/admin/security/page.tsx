"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield,
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Users,
  Globe,
  Lock,
  Eye,
  RefreshCw,
  Download,
  Clock
} from 'lucide-react';

const Security = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordPolicy: true,
    ipWhitelist: false,
    sessionTimeout: 30,
    loginAttempts: 5,
    autoLockout: true
  });

  const [activityLogs] = useState([
    {
      id: 1,
      timestamp: '2024-01-20 14:32:15',
      user: 'admin@matraders.com',
      action: 'Login Success',
      ip: '192.168.1.100',
      location: 'Lahore, Pakistan',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2024-01-20 14:28:45',
      user: 'user@example.com',
      action: 'Failed Login Attempt',
      ip: '103.255.176.45',
      location: 'Karachi, Pakistan',
      status: 'warning'
    },
    {
      id: 3,
      timestamp: '2024-01-20 13:15:22',
      user: 'admin@matraders.com',
      action: 'Product Updated',
      ip: '192.168.1.100',
      location: 'Lahore, Pakistan',
      status: 'success'
    },
    {
      id: 4,
      timestamp: '2024-01-20 12:45:33',
      user: 'suspicious@email.com',
      action: 'Multiple Failed Attempts',
      ip: '185.220.101.182',
      location: 'Unknown',
      status: 'danger'
    },
    {
      id: 5,
      timestamp: '2024-01-20 11:30:18',
      user: 'manager@matraders.com',
      action: 'User Created',
      ip: '192.168.1.105',
      location: 'Lahore, Pakistan',
      status: 'success'
    }
  ]);

  const [securityAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Suspicious Login Activity',
      description: 'Multiple failed login attempts detected from IP 185.220.101.182',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'Security Scan Complete',
      description: 'Weekly security scan completed successfully. No vulnerabilities found.',
      timestamp: '1 day ago'
    },
    {
      id: 3,
      type: 'success',
      title: 'Backup Completed',
      description: 'Automatic database backup completed successfully.',
      timestamp: '2 days ago'
    }
  ]);

  const filteredLogs = activityLogs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ip.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'danger': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'danger': return <XCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'warning': return 'destructive';
      case 'info': return 'default';
      case 'success': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Security & Logs</h1>
          <p className="text-muted-foreground">Monitor security events and configure settings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Security Alerts</h2>
        {securityAlerts.map((alert) => (
          <Alert key={alert.id} variant={getAlertVariant(alert.type)}>
            <AlertTriangle className="h-4 w-4" />
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{alert.title}</h4>
                <AlertDescription className="mt-1">
                  {alert.description}
                </AlertDescription>
              </div>
              <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
            </div>
          </Alert>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Settings */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Configure security policies and restrictions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                <p className="text-xs text-muted-foreground">
                  Require 2FA for admin accounts
                </p>
              </div>
              <Switch
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) => 
                  setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Strong Password Policy</Label>
                <p className="text-xs text-muted-foreground">
                  Enforce complex passwords
                </p>
              </div>
              <Switch
                checked={securitySettings.passwordPolicy}
                onCheckedChange={(checked) => 
                  setSecuritySettings(prev => ({ ...prev, passwordPolicy: checked }))
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">IP Whitelist</Label>
                <p className="text-xs text-muted-foreground">
                  Restrict access by IP address
                </p>
              </div>
              <Switch
                checked={securitySettings.ipWhitelist}
                onCheckedChange={(checked) => 
                  setSecuritySettings(prev => ({ ...prev, ipWhitelist: checked }))
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Auto Lockout</Label>
                <p className="text-xs text-muted-foreground">
                  Lock accounts after failed attempts
                </p>
              </div>
              <Switch
                checked={securitySettings.autoLockout}
                onCheckedChange={(checked) => 
                  setSecuritySettings(prev => ({ ...prev, autoLockout: checked }))
                }
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout" className="text-sm font-medium">
                Session Timeout (minutes)
              </Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => 
                  setSecuritySettings(prev => ({ ...prev, sessionTimeout: Number(e.target.value) }))
                }
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="loginAttempts" className="text-sm font-medium">
                Max Login Attempts
              </Label>
              <Input
                id="loginAttempts"
                type="number"
                value={securitySettings.loginAttempts}
                onChange={(e) => 
                  setSecuritySettings(prev => ({ ...prev, loginAttempts: Number(e.target.value) }))
                }
              />
            </div>
            
            <Button className="w-full bg-gradient-solar text-primary-foreground shadow-solar">
              <Lock className="mr-2 h-4 w-4" />
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* Activity Logs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Activity Logs
            </CardTitle>
            <CardDescription>
              Recent security events and user activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Logs Table */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`${getStatusColor(log.status)}`}>
                      {getStatusIcon(log.status)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{log.action}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {log.user}
                        </span>
                        <span className="flex items-center">
                          <Globe className="h-3 w-3 mr-1" />
                          {log.ip}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {log.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      {log.location}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {filteredLogs.length === 0 && (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No logs found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Security Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Logins</p>
                <p className="text-2xl font-bold text-success">1,247</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed Attempts</p>
                <p className="text-2xl font-bold text-warning">23</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Blocked IPs</p>
                <p className="text-2xl font-bold text-destructive">5</p>
              </div>
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
                <p className="text-2xl font-bold text-primary">12</p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Security;
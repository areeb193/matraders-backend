"use client"

import React, { useState, useEffect } from 'react';
import  Link  from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  ArrowLeft,
  Truck,
  Shield,
  Clock,
  Loader2
} from 'lucide-react';
import { FaMobile, FaWhatsapp } from 'react-icons/fa';
import { useCart, CartItem } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { orderAPI } from '@/lib/api';

type OrderItem = { name: string; quantity: number; price: number };

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [installationService, setInstallationService] = useState(false);
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  // derive order from cart context
  const orderItems: OrderItem[] = cartItems.map((c: CartItem) => ({ name: c.name, quantity: c.quantity, price: c.price }));
  const subtotal = getCartTotal();
  const installationFee = installationService ? 15000 : 0;
  const delivery = 0;
  const total = subtotal + installationFee + delivery;

// whatsapp msg (text-only)
const sendOrderToWhatsApp = (extraText?: string) => {
  const adminNumber = "923017757484";
  // Basic validation
  if (!firstName || !lastName || !phone || !address || !city || !state) {
    alert("Please fill all contact and address fields before sending the order.");
    return;
  }

  let message = `Hello, I placed a new order:\n\n`;
  message += `Name: ${firstName} ${lastName}\n`;
  message += `Email: ${email}\n`;
  message += `Phone: ${phone}\n`;
  message += `Address: ${address}, ${city}, ${state}\n\n`;

  orderItems.forEach((item: OrderItem, index: number) => {
    message += `${index + 1}. ${item.name} x ${item.quantity} - Rs. ${item.price.toLocaleString()}\n`;
  });

  if (installationService) {
    message += `Installation Service: Rs. ${installationFee.toLocaleString()}\n`;
  }

  message += `Total: Rs. ${total.toLocaleString()}\n`;
  if (extraText) message += `\n${extraText}`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${adminNumber}?text=${encodedMessage}`, '_blank');
};

// upload to imgbb (returns public URL)
const uploadToImgbb = async (dataUrl: string): Promise<string> => {
  if (!dataUrl) throw new Error('No image');
  if (!imgbbKey) throw new Error('No imgbb API key configured');
  const base64 = dataUrl.split(',')[1];
  const form = new FormData();
  form.append('key', imgbbKey);
  form.append('image', base64);

  const res = await fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: form });
  const json = await res.json();
  if (!json || !json.success) {
    throw new Error(json?.error?.message || 'Upload failed');
  }
  return json.data?.url || json.data?.display_url;
};

// send image via whatsapp: try to upload to imgbb if key is present, otherwise fallback to data url in message (limited)
const sendImageToWhatsApp = async (dataUrl: string | null, caption?: string) => {
  const adminNumber = '923017757484';
  if (!dataUrl) {
    alert('No screenshot attached.');
    return;
  }

  // If we have an imgbb key, upload and send the public link
  if (imgbbKey) {
    try {
      const publicUrl = await uploadToImgbb(dataUrl);
      const extra = caption ? `${caption}\n` : '';
      const encoded = encodeURIComponent(`${extra}Payment screenshot: ${publicUrl}`);
      window.open(`https://wa.me/${adminNumber}?text=${encoded}`, '_blank');
      return;
    } catch (err: any) {
      console.error('imgbb upload failed', err);
      alert('Image upload failed: ' + (err?.message || 'Unknown error') + '. Falling back to including the image data in the message.');
      // fallthrough to fallback below
    }
  }

  // Fallback: include data URL in the message (may be blocked or truncated by WhatsApp)
  const extra = caption ? `${caption}\n` : '';
  const encoded = encodeURIComponent(`${extra}Screenshot (data URL included below): ${dataUrl}`);
  window.open(`https://wa.me/${adminNumber}?text=${encoded}`, '_blank');
};

//contact information
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('');
const [city, setCity] = useState('');
const [state, setState] = useState('');

// Pre-fill user info if logged in
useEffect(() => {
  if (user) {
    const nameParts = user.name.split(' ');
    setFirstName(nameParts[0] || '');
    setLastName(nameParts.slice(1).join(' ') || '');
    setEmail(user.email || '');
  }
}, [user]);

// bank transfer modal/upload state
const [showBankDetails, setShowBankDetails] = useState(false);
const [uploadedDataUrl, setUploadedDataUrl] = useState<string | null>(null);
const [bankPaidChecked, setBankPaidChecked] = useState(false);
const [imgbbKey, setImgbbKey] = useState<string>('');

// load showBankDetails when paymentMethod changes
useEffect(() => {
  setShowBankDetails(paymentMethod === 'bank');
}, [paymentMethod]);

// load saved imgbb key from localStorage (client-side)
useEffect(() => {
  try {
    const saved = localStorage.getItem('imgbbKey');
    if (saved) setImgbbKey(saved);
  } catch (e) {
    // ignore
  }
}, []);

// handle file upload -> data URL
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    const result = ev.target?.result;
    if (typeof result === 'string') {
      setUploadedDataUrl(result);
    }
  };
  reader.readAsDataURL(file);
};

// State for order submission
const [submitting, setSubmitting] = useState(false);

// place order: save to MongoDB via API
const placeOrder = async (sendWhatsApp = false) => {
  // basic validation
  if (!firstName || !lastName || !phone || !address || !city || !state) {
    alert('Please fill contact and address fields before placing order.');
    return;
  }

  if (cartItems.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  setSubmitting(true);

  try {
    // Create order in MongoDB
    const orderData = {
      customerName: `${firstName} ${lastName}`,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress: `${address}, ${city}, ${state}`,
      items: cartItems.map(item => ({
        product: String(item.id), // Ensure it's a string (MongoDB ObjectId)
        quantity: item.quantity,
        priceAtTimeOfOrder: item.price // API expects priceAtTimeOfOrder, not price
      })),
      totalAmount: total,
      status: 'pending' as const,
    };

    const savedOrder = await orderAPI.create(orderData);
    
    // optionally notify admin via whatsapp with order summary
    if (sendWhatsApp) {
      sendOrderToWhatsApp(`Order #${savedOrder._id} placed on website.`);
      if (uploadedDataUrl) sendImageToWhatsApp(uploadedDataUrl, `Screenshot for order #${savedOrder._id}`);
    }
    
    // clear cart
    clearCart();
    
    // Success message
    alert(`Order placed successfully! Order ID: ${savedOrder._id}\n\nAdmin will review and contact you soon.`);
    
    // Redirect to home or orders page
    window.location.href = '/';
  } catch (err) {
    console.error('Order creation failed:', err);
    alert(`Failed to place order: ${err instanceof Error ? err.message : 'Unknown error'}\n\nPlease try again.`);
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-12 mt-16 space-x-4">
          <Button asChild variant="ghost" className="mr-4">
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-heading font-bold mt-4 text-primary">Checkout</h1>
            <p className="text-muted-foreground">Complete your solar system purchase</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
<Input 
  id="firstName" 
  placeholder="John" 
  value={firstName} 
  onChange={(e) => setFirstName(e.target.value)} 
/>                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
<Input 
  id="lastName" 
  placeholder="Doe" 
  value={lastName} 
  onChange={(e) => setLastName(e.target.value)} 
/>                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email <span className="text-gray-400 text-sm">(Optional)</span>
</Label>
<Input 
  id="email" 
  type="email" 
  placeholder="john@example.com" 
  value={email} 
  onChange={(e) => setEmail(e.target.value)} 
/>                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
<Input 
  id="phone" 
  placeholder="03001234567" 
  value={phone} 
  onChange={(e) => setPhone(e.target.value)} 
/>                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
<Input 
  id="address" 
  placeholder="123 Main Street" 
  value={address} 
  onChange={(e) => setAddress(e.target.value)} 
/>                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
<Input 
  id="city" 
  placeholder="Lahore" 
  value={city} 
  onChange={(e) => setCity(e.target.value)} 
/>                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
<Input 
  id="state" 
  placeholder="Punjab" 
  value={state} 
  onChange={(e) => setState(e.target.value)} 
/>                  </div>
                  
                </div>
              </CardContent>
            </Card>


            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-muted-foreground">Pay when your order is delivered</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1">
                      <div className="font-medium">Bank Transfer</div>
                      <div className="text-sm text-muted-foreground">Direct payment to our bank account</div>
                    </Label>
                  </div>
                  {showBankDetails && (
                    <div className="p-4 mt-3 border rounded-lg bg-muted/30">
                      <p className="font-medium">Bank Account Details</p>
                      <div className="text-sm text-muted-foreground mt-1">Account Name: MA Traders</div>
                      <div className="text-sm text-muted-foreground">Account Number: 12345678901234</div>
                      <div className="text-sm text-muted-foreground">Bank: Example Bank</div>
                      
                    </div>
                  )}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className=" sticky top-10">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">Rs. {item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  {installationService && (
                    <div className="flex justify-between">
                      <span>Installation Service</span>
                      <span>Rs. {installationFee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="text-success">Free</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">Rs. {total.toLocaleString()}</span>
                </div>
                <Button 
  className="w-full bg-gradient-energy text-primary-foreground shadow-energy mb-2"
  onClick={() => sendOrderToWhatsApp()}
  disabled={submitting}
>
  <FaWhatsapp className="mr-2 h-4 w-4" />
  Send Order to WhatsApp
</Button>

<Button 
  className="w-full bg-gradient-energy text-primary-foreground shadow-energy" 
  onClick={() => placeOrder(false)}
  disabled={submitting}
>
  {submitting ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Placing Order...
    </>
  ) : (
    <>
      <CheckCircle className="mr-2 h-4 w-4" />
      Place Order On Website
    </>
  )}
</Button>


              </CardContent>
            </Card>

            

            {/* Security Badge */}
            <Card>
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-success mx-auto mb-2" />
                <p className="text-sm font-medium">Secure Checkout</p>
                <p className="text-xs text-muted-foreground">Your information is protected</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
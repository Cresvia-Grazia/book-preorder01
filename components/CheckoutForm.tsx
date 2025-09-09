import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CheckoutForm = ({ cart, total }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [fb, setFb] = useState("");
  const [pickup, setPickup] = useState("Feast sacred heart- Monday");

  const handleSubmit = async () => {
    const payload = {
      fullname,
      email,
      contact,
      fb,
      pickup,
      items: cart,
      total,
    };

    const res = await fetch("https://script.google.com/macros/s/AKfycbwOg4Vt1so9FS9BcizBKfRmZgQG1ydz4fjo3VgtYigq68SGg4uOyJfinagZKpuLDdaohw/exec", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    alert("Order placed! Your Order ID: " + data.orderId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} />
        <Input placeholder="Facebook Name" value={fb} onChange={(e) => setFb(e.target.value)} />

        <select value={pickup} onChange={(e) => setPickup(e.target.value)} className="border rounded p-2 w-full">
          <option>Feast sacred heart- Monday</option>
          <option>Feast it park -Saturday</option>
          <option>Feast golden prince -Saturday</option>
          <option>Feast ayala -Sunday</option>
        </select>

        <Button className="w-full mt-4" onClick={handleSubmit}>
          Confirm Order
        </Button>

        <p className="text-xs text-slate-500 mt-2">
          Disclaimer: Pick-up only option. For faster transaction, do payment first.  
          Payment: GCash / Paymaya — Account Name: Cherel — 09126456792
        </p>
      </CardContent>
    </Card>
  );
};

"use client"; // Mark this as a Client Component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState("");
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false); // Toggle for location
  const router = useRouter();

  // Fetch user's location using the Geolocation API
  useEffect(() => {
    if (isLocationEnabled && navigator.geolocation) {
      setIsFetchingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsFetchingLocation(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setError(
            "Unable to fetch your location. Please enable location access."
          );
          setIsFetchingLocation(false);
        }
      );
    }
  }, [isLocationEnabled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !email || !password || (!age && age > 0) || !sex) {
      setError("Name, email, and password are required.");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          age,
          sex,
          ...(isLocationEnabled &&
            location.latitude &&
            location.longitude && {
              location: {
                latitude: location.latitude,
                longitude: location.longitude,
              },
            }),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/dashboard"); // Redirect to the dashboard after successful registration
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred during registration");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                required
                value={age}
                onChange={(e) => setAge(e.target.valueAsNumber)}
              />
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem
                      value="Male"
                      onChange={(e) =>
                        setSex((e.target as HTMLSelectElement).value)
                      }
                    >
                      Male
                    </SelectItem>
                    <SelectItem
                      value="Female"
                      onChange={(e) =>
                        setSex((e.target as HTMLSelectElement).value)
                      }
                    >
                      Female
                    </SelectItem>
                    <SelectItem
                      value="Others"
                      onChange={(e) =>
                        setSex((e.target as HTMLSelectElement).value)
                      }
                    >
                      Others
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Location</Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enableLocation"
                  checked={isLocationEnabled}
                  onChange={(e) => setIsLocationEnabled(e.target.checked)}
                />
                <label htmlFor="enableLocation" className="text-sm">
                  Share my location (optional)
                </label>
              </div>
              {isFetchingLocation && (
                <p className="text-sm text-gray-500">
                  Fetching your location...
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isFetchingLocation}
            >
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

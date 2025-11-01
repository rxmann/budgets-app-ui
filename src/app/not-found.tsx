import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        {/* 404 Number */}
        <div>
          <h1 className="text-9xl font-bold text-foreground">404</h1>
        </div>

        {/* Message */}
        <div>
          <p className="text-xl text-muted-foreground">
            This page could not be found.
          </p>
        </div>

        {/* Button */}
        <div className="pt-4">
          <Link href="/">
            <Button className="cursor-pointer">Go back home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

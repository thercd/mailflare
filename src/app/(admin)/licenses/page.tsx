import { Check, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const INCLUDED_FEATURES = [
  "Account management and shared inboxes",
  "Custom branding",
  "Email forwarding",
  "Multi-host bookings",
  "All future self-hosted features exposed through the entitlement service",
];

export default function LicensesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-medium text-neutral-900">
          Self-hosted plan
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          This fork resolves license checks locally. No commercial key or
          external validation service is required.
        </p>
      </div>

      <Card className="rounded-3xl border-0 bg-white p-6">
        <CardHeader className="space-y-4 py-0">
          <div className="flex items-center justify-between gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-700">
              <CheckCircle2 className="h-6 w-6" />
            </span>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Active
            </Badge>
          </div>
          <div>
            <CardTitle>Self-hosted Unlimited</CardTitle>
            <CardDescription className="mt-2">
              Every feature is enabled while normal user roles and explicit
              permissions remain enforced.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-6">
          {INCLUDED_FEATURES.map((feature) => (
            <p
              key={feature}
              className="flex gap-2 text-sm text-neutral-600"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              {feature}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingPlans } from "@/lib/mock-data";

export default function PricingPage() {
  return (
    <div className="space-y-5">
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-muted-foreground">Pricing</p>
        <h1 className="text-xl font-semibold tracking-tight">
          Packages for every team
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card key={plan.id} className="relative overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
                {plan.id === "growth" ? (
                  <Badge variant="success">Popular</Badge>
                ) : null}
              </div>
              <p className="text-3xl font-semibold">
                {plan.price}
                <span className="text-base font-normal text-muted-foreground">
                  {plan.cadence}
                </span>
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <i className="lni lni-checkmark-circle text-primary" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={plan.id === "growth" ? "primary" : "outline"}>
                Choose plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

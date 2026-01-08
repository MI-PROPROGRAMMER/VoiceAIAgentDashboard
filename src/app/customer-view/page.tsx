import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { businessProfile } from "@/lib/mock-data";

export default function CustomerViewPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10">
        <header className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">Powered by Voice AI</p>
          <h1 className="text-3xl font-semibold tracking-tight">{businessProfile.name}</h1>
          <p className="text-sm text-muted-foreground">{businessProfile.type}</p>
        </header>

        <Card>
          <CardHeader className="pb-3 text-center">
            <CardTitle className="text-lg font-semibold">Visit or call us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-center text-sm text-muted-foreground">
            <div className="flex flex-wrap items-center justify-center gap-2 text-base font-semibold text-foreground">
              <i className="lni lni-phone" aria-hidden />
              {businessProfile.callNumber}
            </div>
            <p className="flex items-center justify-center gap-2">
              <i className="lni lni-map-marker" aria-hidden />
              {businessProfile.address}
            </p>
            <p className="flex items-center justify-center gap-2">
              <i className="lni lni-timer" aria-hidden />
              {businessProfile.hours.join(" • ")}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {businessProfile.services.map((service) => (
                <Badge key={service} variant="neutral">
                  {service}
                </Badge>
              ))}
            </div>
            <Button className="mt-2 w-full sm:w-auto" size="lg">
              Call now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

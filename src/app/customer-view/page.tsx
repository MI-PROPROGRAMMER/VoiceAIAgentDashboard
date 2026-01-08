import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { businessProfile } from "@/lib/mock-data";

export default function CustomerViewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12 sm:px-8 sm:py-16">
        {/* Header Section */}
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5">
            <i className="lni lni-mic text-sm text-blue" aria-hidden />
            <p className="text-xs font-medium text-muted-foreground">Powered by Voice AI</p>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {businessProfile.name}
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">{businessProfile.type}</p>
          </div>
        </header>

        {/* Main Card */}
        <Card className="border-border/70 shadow-lg">
          <CardHeader className="space-y-1 pb-6 text-center">
            <CardTitle className="text-2xl font-semibold">Visit or call us</CardTitle>
            <p className="text-sm text-muted-foreground">We're here to help you</p>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-8 sm:px-8">
            {/* Phone Number - Prominent */}
            <div className="flex flex-col items-center gap-3 rounded-xl bg-blue/5 border border-blue/10 p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue/10">
                <i className="lni lni-phone text-2xl text-blue" aria-hidden />
              </div>
              <a
                href={`tel:${businessProfile.callNumber.replace(/\s/g, "")}`}
                className="text-2xl font-bold text-blue hover:text-blue/80 transition-colors"
              >
                {businessProfile.callNumber}
              </a>
              <Button size="lg" className="mt-2 w-full sm:w-auto gap-2">
                <i className="lni lni-phone text-base" aria-hidden />
                Call now
              </Button>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 rounded-lg border border-border/50 bg-muted/30 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <i className="lni lni-map-marker text-xl text-foreground" aria-hidden />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-1">Address</p>
                <p className="text-base leading-relaxed text-foreground">
                  {businessProfile.address}
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4 rounded-lg border border-border/50 bg-muted/30 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <i className="lni lni-timer text-xl text-foreground" aria-hidden />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-3">Business Hours</p>
                <div className="space-y-2">
                  {businessProfile.hours.map((hour, idx) => (
                    <p key={idx} className="text-base leading-relaxed text-foreground">
                      {hour}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="rounded-lg border border-border/50 bg-muted/30 p-5">
              <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Our Services
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {businessProfile.services.map((service) => (
                  <Badge
                    key={service}
                    variant="default"
                    className="bg-blue/10 text-blue border-blue/20 px-4 py-2 text-sm font-medium"
                  >
                    <i className="lni lni-checkmark-circle mr-1.5" aria-hidden />
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Need assistance? Our AI assistant is available 24/7 to help you
          </p>
        </div>
      </div>
    </div>
  );
}

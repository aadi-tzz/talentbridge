import Link from "next/link"
import { MapPin, Clock } from "lucide-react"   // Removed DollarSign import
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface JobListingPreviewProps {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: string
  created_at: string
}

export default function JobListingPreview({
  id,
  title,
  company,
  location,
  salary,
  type,
  created_at
}: JobListingPreviewProps) {
  return (
    <Card
      className="overflow-hidden text-palette-black"
      style={{ backgroundColor: '#EEE6D6' }}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <p className="text-sm text-palette-mutedBrown">{company}</p>
          </div>
          <Badge>{type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="flex items-center text-sm text-palette-mutedBrown">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm text-palette-mutedBrown">
            <span className="mr-1 text-lg font-semibold">₹</span> {/* Rupee symbol instead of DollarSign icon */}
            <span>{salary}</span>
          </div>
          <div className="flex items-center text-sm text-palette-mutedBrown">
            <Clock className="mr-1 h-4 w-4" />
            <span>Posted {formatDistanceToNow(new Date(created_at))} ago</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/jobs/${id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full border-palette-black text-palette-black hover:bg-palette-mutedBrown hover:text-palette-gold"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

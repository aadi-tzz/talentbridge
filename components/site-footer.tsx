import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full bg-palette-charcoal text-palette-gold">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-palette-gold">Talent Bridge</h3>
            <p className="text-sm text-palette-mutedBrown">
              Connecting top talent with leading employers since 2020. Your trusted partner in career advancement and
              recruitment.
            </p>
          </div>
          <div className="space-y-4 mx-auto">
            <h3 className="text-lg font-bold text-center md:text-left text-palette-gold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-center md:text-left">
              <li>
                <Link href="/jobs" className="text-palette-mutedBrown hover:text-palette-gold transition-colors">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link href="/post-job" className="text-palette-mutedBrown hover:text-palette-gold transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-palette-mutedBrown hover:text-palette-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-palette-mutedBrown hover:text-palette-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-palette-gold">Contact Us</h3>
            <ul className="space-y-2 text-sm text-palette-mutedBrown">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-palette-gold" />
                <a href="mailto:talentbridge839@gmail.com" className="hover:text-palette-gold transition-colors">
                  talentbridge839@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-palette-gold" />
                <span>9359240954, 7351947652</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-palette-gold" />
                <span>New Shopping Complex, Shivalik Nagar, Haridwar, Uttarakhand - 249403</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-palette-slate pt-8 text-center text-sm text-palette-mutedBrown">
          <p>© {new Date().getFullYear()} Talent Bridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

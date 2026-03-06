import type { SiteContent } from "../../types";

export const enStoriesContent: Pick<SiteContent, "storiesTitle" | "storiesSubtitle" | "stories"> = {
storiesTitle: "Real Examples",
storiesSubtitle: "How we've helped businesses like yours",
stories: [
  {
    company: "Hydroponics Farm",
    industry: "Agriculture",
    before:
      "Checking pH, EC, and temperature manually 4x daily. Drove to the greenhouse at 6am and 10pm. One weekend away meant asking a neighbor who didn't really understand the system.",
    after:
      "Sensors feed into a dashboard. Alerts go to WhatsApp when something's off. Weekly AI summary of trends and recommendations.",
    quote:
      "Caught a pH drift at 2am that would have killed a lettuce crop. Now takes weekends off.",
    author: "Farm Owner",
    imageUrl:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop",
    metric: "Weekend freedom restored",
  },
  {
    company: "Holistic Wellness Practice",
    industry: "Health & Wellness",
    before:
      "Clients messaged at all hours asking about session types, prices, availability. Couldn't respond during sessions. Lost bookings to practitioners who replied faster.",
    after:
      "WhatsApp bot explains services, answers questions about Reiki vs. sound healing vs. breathwork, checks calendar, and books directly. Warm, not robotic.",
    quote:
      "40% more sessions booked. I respond to complex questions when centered, not mid-session.",
    author: "Wellness Practitioner",
    imageUrl:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop",
    metric: "+40% sessions booked",
  },
  {
    company: "Homeschool Family",
    industry: "Education",
    before:
      "Mom spent Sunday nights planning the week. Tracking progress across 3 kids in spreadsheets. No idea if they were actually retaining material.",
    after:
      "AI helps generate weekly plans based on each kid's pace. Progress tracked automatically. Gaps flagged before they become problems.",
    quote:
      "Sunday planning: 3 hours down to 45 minutes. Kids get more personalized attention, less admin stress.",
    author: "Homeschool Parent",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
    metric: "3 hours -> 45 minutes weekly",
  },
  {
    company: "Homestead & Small Farm",
    industry: "Agriculture",
    before:
      "Egg sales, vegetables, workshop signups all tracked differently. Some in a notebook. Some in WhatsApp. No idea what was actually profitable.",
    after:
      "Simple dashboard connects sales channels. Sees which products make money, which don't. Tracks repeat customers.",
    quote:
      "Discovered jam sales lost money after accounting for time. Raised prices, focused on what worked.",
    author: "Homesteader",
    imageUrl:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
    metric: "Real profitability visibility",
  },
  {
    company: "Self-Sustainable Community",
    industry: "Community Management",
    before:
      "30 families, shared resources, zero central system. Tool library tracked in a notebook. Work shifts coordinated via group chat chaos. Food forest harvests went to whoever showed up first. Disputes over fairness.",
    after:
      "Simple member portal. AI helps schedule work rotations fairly, tracks tool borrowing, announces what's ready to harvest and suggests equitable distribution. Sends gentle reminders, not nagging.",
    quote:
      "Less admin drama, more community. Decisions based on data, not whoever talks loudest.",
    author: "Community Coordinator",
    imageUrl:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop",
    metric: "30 families coordinated",
  },
  {
    company: "Impact Startup",
    industry: "Tech Startup",
    before:
      "Founder doing everything. Customer questions, investor updates, content, ops. No system. Things fell through cracks constantly.",
    after:
      "Leads auto-captured and scored. FAQ handled by chatbot. Weekly metrics report generated automatically. Founder focuses on product and fundraising.",
    quote:
      "Stopped losing leads. Investors started commenting on how organized the updates were.",
    author: "Startup Founder",
    imageUrl:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop",
    metric: "Zero leads lost",
  },
  {
    company: "Aquaponics Operation",
    industry: "Agriculture",
    before:
      "Fish feeding, water quality, plant health all monitored separately. Data in three different apps. Correlating problems took hours of detective work.",
    after:
      "Unified dashboard. AI flags when fish behavior + water temp + plant growth suggest a problem brewing.",
    quote:
      "Predicted a filter issue 3 days before it would have crashed the system. One dashboard instead of three apps.",
    author: "Aquaponics Farmer",
    imageUrl:
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop",
    metric: "3 apps -> 1 dashboard",
  },
  {
    company: "Alternative Therapy Center",
    industry: "Health & Wellness",
    before:
      "4 practitioners, 4 separate calendars, clients confused about who does what. Receptionist spent half her day just routing inquiries.",
    after:
      "Single booking system with AI that asks what the client needs and matches them to the right practitioner. Handles scheduling conflicts automatically.",
    quote:
      "Receptionist now does client follow-up instead of calendar tetris. Booking errors dropped to near zero.",
    author: "Center Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    metric: "Near-zero booking errors",
  },
  {
    company: "Language School",
    industry: "Education",
    before:
      "Admin spent 2+ hours daily answering the same questions. Prices, schedules, levels, payment methods. Over and over.",
    after:
      "Chatbot handles 80% of inquiries. Knows courses, checks availability, sends enrollment links, answers in Spanish or English.",
    quote:
      "Admin focuses on student experience. Enrollment up because responses happen instantly, not next business day.",
    author: "School Administrator",
    imageUrl:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop",
    metric: "80% inquiries automated",
  },
  {
    company: "Regenerative Agriculture Consultant",
    industry: "Consulting",
    before:
      "Client farm data scattered across emails, PDFs, and voice notes. Preparing a soil health report meant hunting through months of messages.",
    after:
      "Clients submit data through a simple form. AI organizes it, flags anomalies, drafts the initial report structure.",
    quote: "Report prep time cut in half. More time in the field, less time in email.",
    author: "Agriculture Consultant",
    imageUrl:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop",
    metric: "50% less report prep time",
  },
  {
    company: "Permaculture Project",
    industry: "Agriculture",
    before:
      "5-year food forest plan existed mostly in the founder's head. Volunteers showed up not knowing what to do. Plant guilds, water flows, seasonal tasks scattered across notebooks, PDFs, and half-remembered conversations. Knowledge walked out the door when key people left.",
    after:
      "Central system tracks what's planted where, what needs doing this month, and why. Volunteers get clear tasks matched to their skills. AI helps answer 'what should go next to the apple guild?' based on the site's own data.",
    quote:
      "New volunteers productive on day one. Institutional knowledge stays even when people move on.",
    author: "Project Founder",
    imageUrl:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop",
    metric: "Institutional knowledge preserved",
  },
],
};

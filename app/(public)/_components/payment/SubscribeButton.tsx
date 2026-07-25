 
"use client"

import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { subscribePremium } from "../../_actions/subscribePemium";

export function SubscribeButton() {
    const [state, action, pending] = useActionState(subscribePremium, null);

    useEffect(() => {
        if (!state) return;

        if (!state.success) {
            toast.error(state.message || "Failed to start checkout");
        }
    }, [state]);

    return (
        <form action={action}>
            <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Redirecting..." : "Subscribe Now"}
            </Button>
        </form>
    )
}


// [
//   {
//     "title": "Bangladesh Launches New Digital Services Platform",
//     "slug": "bangladesh-launches-new-digital-services-platform",
//     "content": "The Government of Bangladesh has introduced a new digital services platform to improve public access to essential government services. The platform aims to reduce paperwork, improve transparency, and provide faster online services for citizens.",
//     "excerpt": "Bangladesh launches a new digital platform to simplify public services.",
//     "thumbnail": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
//     "category": "Technology",
//     "status": "PUBLISHED",
//     "isPremium": false
//   },
//   {
//     "title": "AI is Transforming the Future of Web Development",
//     "slug": "ai-transforming-web-development",
//     "content": "Artificial Intelligence is changing how developers build modern applications. From code generation to automated testing, AI tools are helping teams deliver software faster while improving productivity.",
//     "excerpt": "AI continues to reshape modern web development.",
//     "thumbnail": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
//     "category": "Technology",
//     "status": "PUBLISHED",
//     "isPremium": true
//   },
//   {
//     "title": "National Cricket Team Wins Thrilling ODI Series",
//     "slug": "national-cricket-team-wins-odi-series",
//     "content": "Bangladesh secured a memorable ODI series victory after a dramatic final match. The captain praised the team's determination and highlighted the contribution of young players.",
//     "excerpt": "Bangladesh wins the ODI series in a thrilling finale.",
//     "thumbnail": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
//     "category": "Sports",
//     "status": "PUBLISHED",
//     "isPremium": false
//   },
//   {
//     "title": "Global Markets Show Signs of Recovery",
//     "slug": "global-markets-show-signs-of-recovery",
//     "content": "International stock markets posted gains as investors responded positively to improving economic indicators and easing inflation concerns across major economies.",
//     "excerpt": "Global markets recover amid positive economic outlook.",
//     "thumbnail": "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
//     "category": "Business",
//     "status": "PUBLISHED",
//     "isPremium": false
//   },
//   {
//     "title": "Scientists Discover New Renewable Energy Breakthrough",
//     "slug": "renewable-energy-breakthrough",
//     "content": "Researchers have developed a new technology that significantly improves the efficiency of renewable energy storage, paving the way for cleaner and more reliable power systems.",
//     "excerpt": "A major breakthrough could accelerate renewable energy adoption.",
//     "thumbnail": "https://images.unsplash.com/photo-1509391366360-2e959784a276",
//     "category": "Science",
//     "status": "PUBLISHED",
//     "isPremium": true
//   },
//   {
//     "title": "University Students Participate in National Innovation Contest",
//     "slug": "national-innovation-contest",
//     "content": "Students from universities across the country showcased innovative technology projects focusing on healthcare, agriculture, and education during the annual innovation competition.",
//     "excerpt": "Young innovators present creative solutions at national contest.",
//     "thumbnail": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
//     "category": "Education",
//     "status": "PUBLISHED",
//     "isPremium": false
//   },
//   {
//     "title": "Heavy Rainfall Expected Across Several Regions",
//     "slug": "heavy-rainfall-forecast",
//     "content": "The Meteorological Department has forecast heavy rainfall in several districts over the next three days and advised residents in low-lying areas to remain cautious.",
//     "excerpt": "Weather office issues heavy rainfall warning.",
//     "thumbnail": "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
//     "category": "Weather",
//     "status": "PUBLISHED",
//     "isPremium": false
//   },
//   {
//     "title": "Startup Ecosystem Continues to Grow in Bangladesh",
//     "slug": "bangladesh-startup-growth",
//     "content": "The startup ecosystem is expanding rapidly with increased investment, government support, and a growing number of young entrepreneurs building innovative digital products.",
//     "excerpt": "Bangladesh's startup ecosystem gains momentum.",
//     "thumbnail": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
//     "category": "Business",
//     "status": "DRAFT",
//     "isPremium": false
//   }
// ]
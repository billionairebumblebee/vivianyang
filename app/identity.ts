export const founderDescription = "UC Berkeley mechanical engineering student, founder of Cloak and Interaction Club, and creator behind Vivian Builds.";

export const founderLinks = [
  { icon: "website", label: "Vivian Yang’s portfolio", href: "https://vivianyang.vercel.app/" },
  { icon: "linkedin", label: "Vivian Yang on LinkedIn", href: "https://www.linkedin.com/in/vivianbuilds/" },
  { icon: "instagram", label: "Instagram · @vivianbuilds", href: "https://www.instagram.com/vivianbuilds/" },
  { icon: "tiktok", label: "TikTok · @vivianbuilds", href: "https://www.tiktok.com/@vivianbuilds" },
  { icon: "youtube", label: "YouTube · @vivianbuilds", href: "https://www.youtube.com/@vivianbuilds" },
  { icon: "substack", label: "Substack · Vivian Builds", href: "https://open.substack.com/pub/vivianbuilds" },
  { icon: "x", label: "X · @vivianbuilds", href: "https://x.com/vivianbuilds" },
  { icon: "pinterest", label: "Pinterest · @vivianbuilds", href: "https://www.pinterest.com/vivianbuilds/" },
  { icon: "facebook", label: "Facebook · Vivian Builds", href: "https://www.facebook.com/profile.php?id=61567055964831" },
  { icon: "github", label: "GitHub · billionairebumblebee", href: "https://github.com/billionairebumblebee" },
  { icon: "calendly", label: "Book a meeting · Calendly", href: "https://calendly.com/vivian_yang-berkeley" },
] as const;

export const profileSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://vivianyang.vercel.app/#profile",
      url: "https://vivianyang.vercel.app/",
      name: "Vivian Yang — Personal Portfolio",
      mainEntity: { "@id": "https://vivianyang.vercel.app/#person" },
    },
    {
      "@type": "Person",
      "@id": "https://vivianyang.vercel.app/#person",
      name: "Vivian Yang",
      alternateName: "Vivian Builds",
      url: "https://vivianyang.vercel.app/",
      description: founderDescription,
      sameAs: founderLinks.filter(link => link.icon !== "website" && link.icon !== "calendly").map(link => link.href),
    },
  ],
};

"use client";

import { useState, useEffect, useMemo, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, ChevronRight, ChevronLeft, X, Search,
  Filter, Grid, List, ChevronDown, ArrowRight
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useCachedGalleryEvents } from "@/hooks/useCachedSupabase";
import { useCachedImage } from "@/hooks/useCachedImage";

const CachedImg = forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>((props, ref) => {
  const { src: cachedSrc, loading, error } = useCachedImage(props.src);
  const displaySrc = loading ? undefined : (error ? props.src : (cachedSrc || props.src));
  return <img ref={ref} {...props} src={displaySrc as string} />;
});
CachedImg.displayName = 'CachedImg';

const MotionCachedImg = motion(CachedImg);

type Event = {
  id: string;
  tag: string;
  dateObj: Date;
  title: string;
  desc: string;
  fullDescription: string;
  img: string;
  images: string[];
  department: string;
  category: string;
};

const allEvents: Event[] = [
  // ── 2025–2026 ──
  {
    id: "2526-01", tag: "AUG 2025", dateObj: new Date("2025-08-06"),
    title: "Friendship Day",
    desc: "A celebration of friendship, unity, and memories shared across the campus with games and t-shirt signing.",
    fullDescription: "The Cultural Forum hosted the Friendship Day celebration on 6th August 2025, kicking off the event with an energetic jamming session. Students actively took part in engaging activities, games, and T-shirt signing, creating a lively atmosphere. The event fostered meaningful interactions and helped build stronger connections among freshers, seniors, and faculty members.",
    img: "/2025 - 2026/Friendship Day (1).jpg",
    images: ["/2025 - 2026/Friendship Day (1).jpg", "/2025 - 2026/Friendship Day (2).jpg", "/2025 - 2026/Friendship Day (3).jpg"],
    department: "Cultural Forum", category: "Cultural"
  },
  {
    id: "2526-02", tag: "SEP 2025", dateObj: new Date("2025-09-04"),
    title: "Teacher's Day",
    desc: "A heartfelt tribute to the guidance, inspiration, and unwavering support of our beloved faculty.",
    fullDescription: "Teachers' Day was celebrated on 4th of September 2025 with great enthusiasm to honor the vital role teachers play in shaping students' lives. The well-organized program included speeches, cultural performances, and interactive activities. The celebration was filled with respect and appreciation, making it a memorable occasion for teachers, students, and the Cultural Forum.",
    img: "/2025 - 2026/Teachers Day (1).jpg",
    images: ["/2025 - 2026/Teachers Day (1).jpg", "/2025 - 2026/Teachers Day (2).jpg", "/2025 - 2026/Teachers Day (3).jpg", "/2025 - 2026/Teachers Day (4).jpg"],
    department: "Cultural Forum", category: "Cultural"
  },
  {
    id: "2526-03", tag: "OCT 2025", dateObj: new Date("2025-10-02"),
    title: "Social Cause Event – Spectrum x Leo Club",
    desc: "MCC joins hands with Leo Club to create meaningful social impact for specially abled children.",
    fullDescription: "In collaboration with the Leo Club, Spectrum's core members visited a school for specially abled children to share creativity and joy. From making greeting cards to drawing together and spending meaningful time, the day was about connection, compassion, and creating smiles beyond campus.",
    img: "/2025 - 2026/Social Cause Event (1).jpg",
    images: ["/2025 - 2026/Social Cause Event (1).jpg", "/2025 - 2026/Social Cause Event (2).jpg", "/2025 - 2026/Social Cause Event (3).jpg", "/2025 - 2026/Social Cause Event (4).jpg"],
    department: "Students' Council", category: "Social Initiative"
  },
  {
    id: "2526-04", tag: "OCT 2025", dateObj: new Date("2025-10-25"),
    title: "हे Subharambh",
    desc: "A vibrant Garba evening on the college turf with the special appearance of Abhijeet Khandkekar.",
    fullDescription: "Organised by the Students' Council in collaboration with Spectrum, हे Subharambh transformed the decorated college turf into a vibrant Garba evening, graced by the special appearance of Abhijeet Khandkekar. Music, tradition, and collective celebration brought the campus together in a night full of rhythm and festive spirit.",
    img: "/2025 - 2026/हे Subharambh (1).jpg",
    images: ["/2025 - 2026/हे Subharambh (1).jpg", "/2025 - 2026/हे Subharambh (2).jpg", "/2025 - 2026/हे Subharambh (3).jpg", "/2025 - 2026/हे Subharambh (4).jpg"],
    department: "Students' Council", category: "Cultural"
  },
  {
    id: "2526-05", tag: "NOV 2025", dateObj: new Date("2025-11-14"),
    title: "Pre-Theme Reveal Events",
    desc: "Campus Fit Clash, Fusion on Hands, and Mic Drop Mania — building anticipation for the grand reveal.",
    fullDescription: "The excitement built up with our dynamic pre-theme reveal events — Campus Fit Clash testing fitness and stamina, Fusion on Hands celebrating hand and palm artistry, and Mic Drop Mania delivering laughter through stand-up comedy. Each event added a new layer of anticipation to the grand reveal.",
    img: "/2025 - 2026/Pre-Theme Reveal Events (1).jpg",
    images: ["/2025 - 2026/Pre-Theme Reveal Events (1).jpg", "/2025 - 2026/Pre-Theme Reveal Events (2).jpg", "/2025 - 2026/Pre-Theme Reveal Events (3).jpg", "/2025 - 2026/Pre-Theme Reveal Events (4).jpg"],
    department: "Cultural Forum", category: "Competition"
  },
  {
    id: "2526-06", tag: "DEC 2025", dateObj: new Date("2025-12-10"),
    title: "Theme Reveal – Reevan 2025",
    desc: "The grand unveiling of 'Reevan – The End is the Beginning' with Ayesha Khan and a spectacular flashmob.",
    fullDescription: "Reevan 2025 unfolded in grandeur as we welcomed superstar Ayesha Khan for her movie promotions and the much-awaited theme reveal. With a flashmob by the Dance Department, the banner drop unveiling 'Reevan \u2013 The End is the Beginning,' and a powerful dhol-tasha performance by the core team, the afternoon marked a bold new chapter for Spectrum.",
    img: "/2025 - 2026/Theme Reveal – Reevan 2025 (1).jpg",
    images: ["/2025 - 2026/Theme Reveal – Reevan 2025 (1).jpg", "/2025 - 2026/Theme Reveal – Reevan 2025 (2).jpg", "/2025 - 2026/Theme Reveal – Reevan 2025 (3).jpg", "/2025 - 2026/Theme Reveal – Reevan 2025 (4).jpg"],
    department: "Cultural Forum", category: "Cultural"
  },
  {
    id: "2526-07", tag: "JAN 2026", dateObj: new Date("2026-01-26"),
    title: "Induction Ceremony 2025",
    desc: "Electrifying flashmob, badge distribution, and inspiring speeches marking new leadership journeys.",
    fullDescription: "Induction Ceremony 2025 began with the first electrifying flashmob of the year by the Dance Department, setting the tone for a memorable evening. From badge distribution to inspiring speeches by the newly appointed heads and a confident fashion walk by each heads, the event marked the beginning of new leadership journeys.",
    img: "/2025 - 2026/Induction Ceremony 2025 (1).jpg",
    images: ["/2025 - 2026/Induction Ceremony 2025 (1).jpg", "/2025 - 2026/Induction Ceremony 2025 (2).jpg", "/2025 - 2026/Induction Ceremony 2025 (3).jpg"],
    department: "Students' Council", category: "Academic"
  },
  {
    id: "2526-08", tag: "MAR 2026", dateObj: new Date("2026-03-08"),
    title: "Spectrum Day 1",
    desc: "Natarang, Neon Cricket, Mr & Ms Spectrum, Otaku Carnival and more in a power-packed opening day.",
    fullDescription: "Spectrum Main Day 1 kicked off with unmatched energy, featuring a diverse lineup including Natarang, Neon Cricket, How I Met Your Murderer, Board Bash, Mr & Ms Spectrum, Otaku Carnival, Reevan – The Elemental Trials, Corporate Conspiracy, Typing Ninja, Valorant, and BGMI. The day blended creativity, competition, strategy, and gaming into a power-packed start to the fest.",
    img: "/2025 - 2026/Spectrum Day 1 (1).jfif",
    images: ["/2025 - 2026/Spectrum Day 1 (1).jfif", "/2025 - 2026/Spectrum Day 1 (2).jfif", "/2025 - 2026/Spectrum Day 1 (3).jfif", "/2025 - 2026/Spectrum Day 1 (4).jfif"],
    department: "Cultural Forum", category: "Fest"
  },
  {
    id: "2526-09", tag: "MAR 2026", dateObj: new Date("2026-03-09"),
    title: "Spectrum Day 2",
    desc: "Kurukshetra, Bollyverse, Sursargam and high-intensity esports clashes keeping the campus buzzing.",
    fullDescription: "Spectrum Day 2 elevated the excitement with Kurukshetra, Bollyverse, Checkmate, Sursargam, Valorant, Skribbl.io, and BGMI. From musical brilliance and strategic battles to high-intensity esports clashes, the campus buzzed with talent and competitive spirit.",
    img: "/2025 - 2026/Spectrum Day 2 (1).jfif",
    images: ["/2025 - 2026/Spectrum Day 2 (1).jfif", "/2025 - 2026/Spectrum Day 2 (2).jfif", "/2025 - 2026/Spectrum Day 2 (3).jfif", "/2025 - 2026/Spectrum Day 2 (4).jfif"],
    department: "Cultural Forum", category: "Fest"
  },
  {
    id: "2526-10", tag: "MAR 2026", dateObj: new Date("2026-03-10"),
    title: "Spectrum Day 3",
    desc: "Poetic Arena, Sunao Dil Se, Rangmanch and intense competitions advancing to final rounds.",
    fullDescription: "Spectrum Day 3 intensified the competition with Kurukshetra and Mr & Ms Spectrum advancing into Rounds 2 & 3, alongside BGMI showdowns. Events like Poetic Arena, Sunao Dil Se, Untitled, and Rangmanch added depth with powerful performances, expression, and storytelling.",
    img: "/2025 - 2026/Spectrum Day 3 (1).jpeg",
    images: ["/2025 - 2026/Spectrum Day 3 (1).jpeg", "/2025 - 2026/Spectrum Day 3 (2).jpeg", "/2025 - 2026/Spectrum Day 3 (3).jpeg", "/2025 - 2026/Spectrum Day 3 (4).jpeg"],
    department: "Cultural Forum", category: "Fest"
  },
  {
    id: "2526-11", tag: "MAR 2026", dateObj: new Date("2026-03-11"),
    title: "Spectrum Day 4 – Grand Finale",
    desc: "Taste Roulette, Escape Room and an electrifying DJ Night closing the curtains on Spectrum 2026.",
    fullDescription: "The final day featured engaging events like Taste Roulette, Rangmanch, Trade Raiders, and Escape Room, keeping the thrill alive till the very end. The celebration concluded with an electrifying DJ Night, uniting everyone on the dance floor for a memorable grand finale.",
    img: "/2025 - 2026/Spectrum Day 4 (1).jpeg",
    images: ["/2025 - 2026/Spectrum Day 4 (1).jpeg", "/2025 - 2026/Spectrum Day 4 (2).jpeg", "/2025 - 2026/Spectrum Day 4 (3).jpeg", "/2025 - 2026/Spectrum Day 4 (4).jpeg"],
    department: "Cultural Forum", category: "Fest"
  },

  // ── 2024–2025 ──
  {
    id: "2425-01", tag: "AUG 2024", dateObj: new Date("2024-08-12"),
    title: "Friendship Day",
    desc: "A celebration of friendship, unity, and memories shared across the campus.",
    fullDescription: "The Friendship Day celebration (12 August 2024) was organized by the Cultural Forum and began with a jamming session. Students participated in fun activities, t-shirt signing, and games, encouraging interaction and strengthening bonds among freshers, seniors, and faculty.",
    img: "/2024 - 2025/Friendship Day (1).jpg",
    images: ["/2024 - 2025/Friendship Day (1).jpg", "/2024 - 2025/Friendship Day (2).jpg", "/2024 - 2025/Friendship Day (3).jpg"],
    department: "Cultural Forum", category: "Cultural"
  },
  {
    id: "2425-02", tag: "SEP 2024", dateObj: new Date("2024-09-05"),
    title: "Teacher's Day",
    desc: "A tribute to the guidance, inspiration, and support of our beloved faculty.",
    fullDescription: "On September 5, 2024, the Cultural Forum celebrated Teachers' Day with great reverence and fervour. A heartfelt thank you to the committed teachers who have impacted the lives of so many students was expressed throughout the ceremony.",
    img: "/2024 - 2025/Teachers Day (1).jpg",
    images: ["/2024 - 2025/Teachers Day (1).jpg", "/2024 - 2025/Teachers Day (2).jpg", "/2024 - 2025/Teachers Day (3).jpg", "/2024 - 2025/Teachers Day (4).jpg"],
    department: "Cultural Forum", category: "Cultural"
  },
  {
    id: "2425-03", tag: "SEP 2024", dateObj: new Date("2024-09-10"),
    title: "Induction Meet",
    desc: "The formal inauguration of the cultural year 2024–25 with badge conferring.",
    fullDescription: "The Induction Meet marked the formal inauguration of the cultural year 2024–25. Badges were conferred upon departmental heads, symbolizing their responsibilities, and the event was enriched by inspiring addresses from Hon. Principal Dr. Sonali Pednekar Madam and Cultural Convener Mrs. Pooja Patil.",
    img: "/2024 - 2025/Induction Meet (1).webp",
    images: ["/2024 - 2025/Induction Meet (1).webp", "/2024 - 2025/Induction Meet  (2).webp", "/2024 - 2025/Induction Meet (3).webp", "/2024 - 2025/Induction Meet (4).webp"],
    department: "Students' Council", category: "Academic"
  },
  {
    id: "2425-04", tag: "SEP 2024", dateObj: new Date("2024-09-15"),
    title: "Kalakshetram",
    desc: "Expressing Indian culture and underwater beauty through art.",
    fullDescription: "The Kalakshetram event, organized by the Cultural Forum, featured the themes Vibrance of India and Mysteries Beneath the Waves, encouraging participants to express Indian culture and the beauty of the underwater world through art within a three-hour duration.",
    img: "/2024 - 2025/Kalakshetram (1).jpg",
    images: ["/2024 - 2025/Kalakshetram (1).jpg", "/2024 - 2025/Kalakshetram(2).jpg", "/2024 - 2025/Kalakshetram (3).jpg"],
    department: "Cultural Forum", category: "Competition"
  },
  {
    id: "2425-05", tag: "SEP 2024", dateObj: new Date("2024-09-19"),
    title: "Mehfil-e-Mehendi",
    desc: "Showcasing creativity through a bridal Mehendi theme.",
    fullDescription: "The Mehfil-e-Mehendi event, organized by the Cultural Forum, was held on 19 September 2024 at Mulund College of Commerce. Centered on a bridal Mehendi theme, the event provided participants an opportunity to showcase their creativity within a one-hour duration.",
    img: "/2024 - 2025/Mehfil-e-Mehendi (1).jpg",
    images: ["/2024 - 2025/Mehfil-e-Mehendi (1).jpg", "/2024 - 2025/Mehfil-e-Mehendi (2).jpg", "/2024 - 2025/Mehfil-e-Mehendi (3).jpg"],
    department: "Cultural Forum", category: "Cultural"
  },
  {
    id: "2425-06", tag: "SEP 2024", dateObj: new Date("2024-09-20"),
    title: "Rangotsav",
    desc: "A colorful display of Sanskarbharti and Poster Rangoli artistry.",
    fullDescription: "The Rangotsav event, organized by the Cultural Forum, was held on 20 September 2024 at Mulund College of Commerce. Featuring the themes Sanskarbharti Rangoli and Poster Rangoli, the event provided participants an opportunity to showcase their creativity.",
    img: "/2024 - 2025/Rangotsav (1).jpg",
    images: ["/2024 - 2025/Rangotsav (1).jpg", "/2024 - 2025/Rangotsav (2).jpg", "/2024 - 2025/Rangotsav (3).jpg", "/2024 - 2025/Rangotsav (4).jpg"],
    department: "Cultural Forum", category: "Competition"
  },
  {
    id: "2425-07", tag: "DEC 2024", dateObj: new Date("2024-12-03"),
    title: "TechnoHunt",
    desc: "A competitive tech challenge testing coding, problem-solving, and logic.",
    fullDescription: "TechnoHunt, held on 3rd December, featured 13 duo teams competing in three exciting rounds that tested coding, problem-solving, and logical thinking skills. From debugging and clue hunting to treasure challenges and the final Spectrum Shield round, the event was filled with energy and teamwork.",
    img: "/2024 - 2025/Pre Events-TechnoHunt (1).jpg",
    images: ["/2024 - 2025/Pre Events-TechnoHunt (1).jpg", "/2024 - 2025/Pre Events-TechnoHunt (2).jpg", "/2024 - 2025/Pre Events-TechnoHunt (3).jpg"],
    department: "Students' Council", category: "Competition"
  },
  {
    id: "2425-08", tag: "DEC 2024", dateObj: new Date("2024-12-04"),
    title: "Kick-Off Football Tournament",
    desc: "A high-energy football tournament featuring 24 competitive teams.",
    fullDescription: "The Kick-Off Football Tournament began on 4th December with 24 teams competing in two pools, creating a high-energy and competitive atmosphere. Over three thrilling days, players showcased excellent teamwork, strategy, and sportsmanship.",
    img: "/2024 - 2025/Pre Events-Kick-Off (1).jpg",
    images: ["/2024 - 2025/Pre Events-Kick-Off (1).jpg", "/2024 - 2025/Pre Events-Kick-Off (2).jpg", "/2024 - 2025/Pre Events-Kick-Off (3).jpg", "/2024 - 2025/Pre Events-Kick-Off (4).jpg"],
    department: "Sports and Gymkhana", category: "Sports"
  },
  {
    id: "2425-09", tag: "DEC 2024", dateObj: new Date("2024-12-07"),
    title: "Departmental Wars",
    desc: "Departments compete in challenges of strength, agility, and teamwork.",
    fullDescription: "The 'Departmental Wars,' organized by the Cultural Forum, was held at Mulund College of Commerce from 7th to 9th December 2024, featuring 9 teams competing across four exciting rounds. Participants showcased strength, agility, intelligence, and teamwork.",
    img: "/2024 - 2025/Pre Events- Departmental Wars (1).jpg",
    images: ["/2024 - 2025/Pre Events- Departmental Wars (1).jpg", "/2024 - 2025/Pre Events- Departmental Wars (2).jpg", "/2024 - 2025/Pre Events- Departmental Wars (3).jpg", "/2024 - 2025/Pre Events- Departmental Wars (4).jpg"],
    department: "Cultural Forum", category: "Competition"
  },
  {
    id: "2425-10", tag: "DEC 2024", dateObj: new Date("2024-12-07"),
    title: "Stall Wars",
    desc: "Vibrant stalls showcasing entrepreneurial ideas, crafts, and food.",
    fullDescription: "Stall Wars, held on 7th and 9th December at the MCC Campus near the Turf, brought vibrant energy with 18 creative stalls showcasing food, crafts, and entrepreneurial ideas. Students displayed excellent teamwork and business skills.",
    img: "/2024 - 2025/Pre Events-Stall Wars (1).jpg",
    images: ["/2024 - 2025/Pre Events-Stall Wars (1).jpg", "/2024 - 2025/Pre Events-Stall Wars (2).jpg", "/2024 - 2025/Pre Events-Stall Wars (3).jpg", "/2024 - 2025/Pre Events-Stall Wars (4).jpg"],
    department: "Entrepreneurship Development Cell", category: "Competition"
  },
  {
    id: "2425-11", tag: "DEC 2024", dateObj: new Date("2024-12-12"),
    title: "IPL Auction",
    desc: "An action-packed bidding war to build the ultimate cricket squad.",
    fullDescription: "The action-packed IPL Auction event featured 10 teams bidding competitively to secure players, with the first team to complete a squad of 11 emerging as the winner.",
    img: "/2024 - 2025/Pre Events-IPL Auction (1).jpg",
    images: ["/2024 - 2025/Pre Events-IPL Auction (1).jpg", "/2024 - 2025/Pre Events-IPL Auction (2).jpg", "/2024 - 2025/Pre Events-IPL Auction (3).jpg"],
    department: "Sports and Gymkhana", category: "Competition"
  },
  {
    id: "2425-12", tag: "DEC 2024", dateObj: new Date("2024-12-15"),
    title: "Runbhoomi",
    desc: "An intense three-day knockout cricket tournament.",
    fullDescription: "Runbhoomi 2025, held at MCC, was a thrilling three-day knockout cricket tournament featuring 36 teams competing with high energy and sportsmanship.",
    img: "/2024 - 2025/Pre Events-Runbhoomi (1).jpg",
    images: ["/2024 - 2025/Pre Events-Runbhoomi (1).jpg", "/2024 - 2025/Pre Events-Runbhoomi (2).jpg", "/2024 - 2025/Pre Events-Runbhoomi (3).jpg", "/2024 - 2025/Pre Events-Runbhoomi (4).jpg"],
    department: "Sports and Gymkhana", category: "Sports"
  },
  {
    id: "2425-13", tag: "DEC 2024", dateObj: new Date("2024-12-18"),
    title: "Spectrum Day 1",
    desc: "The energetic opening day of our annual cultural festival.",
    fullDescription: "Spectrum, the Annual Inter-Collegiate Cultural Festival of Mulund College of Commerce, was organized to celebrate talent, creativity, and student participation. Day 1 of the festival, held on 18 December 2024, included exciting events like Natrang, Neon Cricket, How I Met Your Murderer?, Checkmate, Real Cricket, Animecon, Modern Feud, Arthashastra, and Bullet Echo.",
    img: "/2024 - 2025/Spectrum Day 1 (1).jpg",
    images: ["/2024 - 2025/Spectrum Day 1 (1).jpg", "/2024 - 2025/Spectrum Day 1 (2).jpg", "/2024 - 2025/Spectrum Day 1 (3).jpg", "/2024 - 2025/Spectrum Day 1 (4).jpg"],
    department: "Cultural Forum", category: "Fest"
  },
  {
    id: "2425-14", tag: "DEC 2024", dateObj: new Date("2024-12-19"),
    title: "Spectrum Day 2",
    desc: "A day filled with vibrant competitions and creative showcases.",
    fullDescription: "Day 2 (19 December 2024) of Spectrum featured Kurukshetra, Road to Valor, Trinity Mythos, Bollyverse, Board Brawl, Taal Tarang, Mr. & Ms. Spectrum, and Keysprint.",
    img: "/2024 - 2025/Spectrum Day 2 (1).jpg",
    images: ["/2024 - 2025/Spectrum Day 2 (1).jpg", "/2024 - 2025/Spectrum Day 2 (2).jpg", "/2024 - 2025/Spectrum Day 2 (3).jpg", "/2024 - 2025/Spectrum Day 2 (4).jpg"],
    department: "Cultural Forum", category: "Fest"
  },
  {
    id: "2425-15", tag: "DEC 2024", dateObj: new Date("2024-12-20"),
    title: "Spectrum Day 3",
    desc: "Participants display creativity, strategy, and teamwork across diverse events.",
    fullDescription: "Day 3 (20 December 2024) of Spectrum was filled with excitement and enthusiastic participation as students competed in Kurukshetra, Thrills at the Table, BGMI, Rangmanch, and Taste Twisters.",
    img: "/2024 - 2025/Spectrum Day 3 (1).jpg",
    images: ["/2024 - 2025/Spectrum Day 3 (1).jpg", "/2024 - 2025/Spectrum Day 3 (2).jpg", "/2024 - 2025/Spectrum Day 3 (3).jpg", "/2024 - 2025/Spectrum Day 3 (4).jpg"],
    department: "Cultural Forum", category: "Fest"
  },
  {
    id: "2425-16", tag: "DEC 2024", dateObj: new Date("2024-12-21"),
    title: "Spectrum Day 4",
    desc: "The grand finale concluding Spectrum with intellectually stimulating events.",
    fullDescription: "Day 4 (21 December 2024) of Spectrum marked a memorable conclusion to the festival with Poetic Bliss, Verdict Victors, Corporate Climb, Trinity Mythos, and Mr. & Ms. Spectrum.",
    img: "/2024 - 2025/Spectrum Day 4 (1).jpg",
    images: ["/2024 - 2025/Spectrum Day 4 (1).jpg", "/2024 - 2025/Spectrum Day 4 (2).jpg", "/2024 - 2025/Spectrum Day 4 (3).jpg", "/2024 - 2025/Spectrum Day 4 (4).jpg"],
    department: "Cultural Forum", category: "Fest"
  },

  // ── 2023–2024 ──
  {
    id: "2324-01", tag: "AUG 2023", dateObj: new Date("2023-08-09"),
    title: "Friendship Day",
    desc: "A happy and spirited day celebrating friendship.",
    fullDescription: "The Culture Forum arranged the Friendship Day Celebration, which took place on August 9, 2023. It was a happy and spirited day. A percentage of the participation fees received were given to the non-profit group \"Prangan\".",
    img: "/2023-2024/Friendship Day.jpg",
    images: ["/2023-2024/Friendship Day.jpg"],
    department: "Cultural Forum", category: "Cultural"
  },
  {
    id: "2324-02", tag: "SEP 2023", dateObj: new Date("2023-09-13"),
    title: "Induction Meet",
    desc: "Uniting department heads for official introductions.",
    fullDescription: "The Cultural Forum conducted the induction ceremony on 13 September 2023, uniting department heads for official introductions and batch allocation.",
    img: "/2023-2024/Induction Meet.jpeg",
    images: ["/2023-2024/Induction Meet.jpeg"],
    department: "Students' Council", category: "Academic"
  },
  {
    id: "2324-03", tag: "NOV 2023", dateObj: new Date("2023-11-06"),
    title: "Celebrity Promotion – Spectrum",
    desc: "Welcoming PearlVPuri to Spectrum 2023-24.",
    fullDescription: "We welcomed PearlVPuri to Spectrum 2023-24 on November 6, 2023, for a Celebrity Promotion Event.",
    img: "/2023-2024/Celebrity Promotion Event of Spectrum.jpg",
    images: ["/2023-2024/Celebrity Promotion Event of Spectrum.jpg"],
    department: "Cultural Forum", category: "Cultural"
  },
  {
    id: "2324-04", tag: "NOV 2023", dateObj: new Date("2023-11-25"),
    title: "Theme Reveal – Utopia",
    desc: "Unveiling the theme 'Utopia' with enthusiasm and pride.",
    fullDescription: "Unveiled the theme \"Utopia\" with awe-striking enthusiasm and pride on November 25, 2023.",
    img: "/2023-2024/Theme Reveal (1).jpg",
    images: ["/2023-2024/Theme Reveal (1).jpg", "/2023-2024/Theme Reveal(2).jpg"],
    department: "Cultural Forum", category: "Cultural"
  },
  {
    id: "2324-05", tag: "NOV 2023", dateObj: new Date("2023-11-30"),
    title: "Pre Events – Spectrum 2023",
    desc: "Ran-Bhoomi, Techno-Hunt, IPL Auction, Departmental Wars, Kick-Off, and Stall Bazaar.",
    fullDescription: "The Cultural Forum organized the pre-events of SPECTRUM from 30th November to 5th December, featuring a series of engaging and competitive activities including Ran-Bhoomi, Techno-Hunt, IPL Auction, Departmental Wars, Kick-Off, and Stall Bazaar.",
    img: "/2023-2024/Pre Event(1).jpg",
    images: ["/2023-2024/Pre Event(1).jpg", "/2023-2024/Pre Event (2).jpg", "/2023-2024/Pre Event (3).jpg"],
    department: "Cultural Forum", category: "Competition"
  },
  {
    id: "2324-06", tag: "DEC 2023", dateObj: new Date("2023-12-18"),
    title: "Spectrum Day 1",
    desc: "The opening day of the Annual Inter-Collegiate Cultural Festival.",
    fullDescription: "Spectrum is the Annual Inter-Collegiate Cultural Festival of Mulund College of Commerce. On Day 1 (18 December 2023), events included Suit Up, Ishq-E-Cinema, Brandvertising, Neon Event, Stumble Guys, How I Met Your Murderer?, Chess Wizard, Kaal-Chakra, Keyboard Ninja, Mr. & Ms. Spectrum, Rap Cypher, and Talk by Trial.",
    img: "/2023-2024/Spectrum Day 1 (1).jpeg",
    images: ["/2023-2024/Spectrum Day 1 (1).jpeg", "/2023-2024/Spectrum Day 1 (2).jpeg", "/2023-2024/Spectrum Day 1 (3).jpeg", "/2023-2024/Spectrum Day 1 (4).jpeg"],
    department: "Cultural Forum", category: "Fest"
  },
  {
    id: "2324-07", tag: "DEC 2023", dateObj: new Date("2023-12-19"),
    title: "Spectrum Day 2",
    desc: "A wide range of competitive, fun, and creative events.",
    fullDescription: "On Day 2 of Spectrum, events included Kurukshetra, Talk by Trial, Kaal Chakra, Suit Up, Ishq-E-Cinema, Carrom, Animecon, Thrills of Table, and Ground Zero.",
    img: "/2023-2024/Spectrum Day 2 (1).jpg",
    images: ["/2023-2024/Spectrum Day 2 (1).jpg", "/2023-2024/Spectrum Day 2 (2).jpg", "/2023-2024/Spectrum Day 2 (3).jpg", "/2023-2024/Spectrum Day 2 (4).jpg"],
    department: "Cultural Forum", category: "Fest"
  },
  {
    id: "2324-08", tag: "DEC 2023", dateObj: new Date("2023-12-20"),
    title: "Spectrum Day 3",
    desc: "Energetic continuation of the cultural festival with various events.",
    fullDescription: "Day 3 (20 December 2023) witnessed events such as Tug Titans, Mr. & Ms. Spectrum, Arthashastra, Kurukshetra, Thrills of Table, BGMI, NatyaRas, Lens Legends, and COC.",
    img: "/2023-2024/Spectrum Day 3 (1).jpg",
    images: ["/2023-2024/Spectrum Day 3 (1).jpg", "/2023-2024/Spectrum Day 3 (2).jpeg", "/2023-2024/Spectrum Day 3 (3).jpeg", "/2023-2024/Spectrum Day 3 (4).jpeg"],
    department: "Cultural Forum", category: "Fest"
  },
  {
    id: "2324-09", tag: "DEC 2023", dateObj: new Date("2023-12-21"),
    title: "Spectrum Day 4",
    desc: "The grand conclusion celebrating creativity and cultural spirit.",
    fullDescription: "Day 4 (21 December 2023) of Spectrum concluded the Annual Inter-Collegiate Cultural Festival with Poetic Bliss, Modern Feud, Arthashastra, Suro Ki Mehfil, Valorant, and Burp.",
    img: "/2023-2024/Spectrum Day 4 (1).jpg",
    images: ["/2023-2024/Spectrum Day 4 (1).jpg", "/2023-2024/Spectrum Day 4 (2).jpeg", "/2023-2024/Spectrum Day 4 (3).jpeg", "/2023-2024/Spectrum Day 4 (4).jpeg"],
    department: "Cultural Forum", category: "Fest"
  },
  {
    id: "2324-10", tag: "FEB 2024", dateObj: new Date("2024-02-18"),
    title: "Inspira 2024", desc: "The premier management festival by the B.M.S department.",
    fullDescription: "Inspira is the premier management festival organized by the B.M.S department, focusing on business acumen, leadership challenges, and corporate simulations.",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"],
    department: "Inspira", category: "Fest"
  },
  {
    id: "2324-11", tag: "FEB 2024", dateObj: new Date("2024-02-15"),
    title: "Hack-A-Thon 2024", desc: "An annual 24-hour coding marathon.",
    fullDescription: "Tech enthusiasts gather to solve real-world problems using innovative software solutions in this high-pressure coding marathon.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"],
    department: "Hack-A-Thon", category: "Fest"
  },
  {
    id: "2324-12", tag: "FEB 2024", dateObj: new Date("2024-02-10"),
    title: "Emporio 2024", desc: "The flagship commerce and economics festival.",
    fullDescription: "Emporio features intellectually stimulating competitions related to finance and trade, organized by the B.Com department.",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80"],
    department: "Emporio", category: "Fest"
  },
  {
    id: "2324-13", tag: "FEB 2024", dateObj: new Date("2024-02-05"),
    title: "Quantomania 2024", desc: "Focusing on quantitative finance, mathematics, and statistics.",
    fullDescription: "A specialized event bringing out the best analytical minds through mathematics and statistics.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"],
    department: "Quantomania", category: "Fest"
  },
  {
    id: "2324-14", tag: "FEB 2024", dateObj: new Date("2024-02-01"),
    title: "Manthan 2024", desc: "A unique socio-cultural event.",
    fullDescription: "Manthan encourages debate, discussion, and awareness on pressing social issues.",
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80"],
    department: "Manthan", category: "Fest"
  },
];

const ALL_DEPARTMENTS = [
  "Students' Council", "National Service Scheme", "Cultural Forum",
  "Sports and Gymkhana", "Natyakarmi (Theatre Group)", "Marathi Vangmay Mandal",
  "Aaroh (Music Club)", "Nature Club", "Women Development Cell",
  "Entrepreneurship Development Cell", "Students' Research",
  "Spectrum", "Inspira", "Hack-A-Thon", "Emporio", "Quantomania", "Manthan",
  "Hindi", "Mathematics", "Marathi", "Commerce", "French", "Viksit Bharat Buildathon", "Tarang"
];

const ALL_YEARS = ["2025-2026", "2024-2025", "2023-2024"];

const ALL_CATEGORIES = [
  "Seminar", "Workshop", "Competition", "Fest",
  "Cultural", "Sports", "Social Initiative", "Academic", "Celebration"
];

const categoryColors: Record<string, string> = {
  "Academic": "bg-blue-100 text-blue-700",
  "Cultural": "bg-pink-100 text-pink-700",
  "Sports": "bg-orange-100 text-orange-700",
  "Social Initiative": "bg-green-100 text-green-700",
  "Seminar": "bg-purple-100 text-purple-700",
  "Workshop": "bg-purple-100 text-purple-700",
  "Competition": "bg-indigo-100 text-indigo-700",
  "Fest": "bg-red-100 text-red-700",
  "Celebration": "bg-yellow-100 text-yellow-700",
};

const techEvents = [
  { name: "Spectrum", title: "Spectrum 2024", date: "22 Feb 2024", category: "Competition", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80" },
  { name: "Inspira", title: "Inspira 2024", date: "18 Feb 2024", category: "Competition", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80" },
  { name: "Hack-A-Thon", title: "Hack-A-Thon 2024", date: "15 Feb 2024", category: "Competition", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80" },
  { name: "Emporio", title: "Emporio 2024", date: "10 Feb 2024", category: "Competition", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80" },
  { name: "Quantomania", title: "Quantomania 2024", date: "5 Feb 2024", category: "Competition", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
  { name: "Manthan", title: "Manthan 2024", date: "1 Feb 2024", category: "Competition", img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&q=80" },
];

const ITEMS_PER_PAGE = 8;

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Latest");
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liveEvents, setLiveEvents] = useState<Event[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { data: cachedGallery = [], isLoading: galleryLoading } = useCachedGalleryEvents();

  // Fetch live events from Supabase (gallery-published)
  useEffect(() => {
    const fetchLiveEvents = async () => {
      // 1. Use cached Degree College events
      const degreeData = cachedGallery.filter((e: any) => e.publish_gallery);

      // 2. Fetch Junior College events
      const { data: jrData, error: jrError } = await supabase
        .from('jr_college_events')
        .select('id, title, description, category, department, images, event_date')
        .eq('show_in_students_corner', true)
        .order('event_date', { ascending: false });

      let mapped: Event[] = [];

      if (degreeData) {
        mapped = [...mapped, ...degreeData.map((e: any) => ({
          id: `live-deg-${e.id}`,
          tag: e.published_at
            ? new Date(e.published_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }).toUpperCase()
            : 'LIVE',
          dateObj: new Date(e.calendar_date || e.published_at || Date.now()),
          title: e.title,
          desc: e.description || '',
          fullDescription: e.description || '',
          img: e.images?.[0] || '',
          images: e.images || [],
          department: e.department || 'General',
          category: e.category || 'Events & Activities',
          academicYear: '2025-2026',
        }))];
      }

      if (!jrError && jrData) {
        mapped = [...mapped, ...jrData.map((e: any) => ({
          id: `live-jr-${e.id}`,
          tag: e.event_date
            ? new Date(e.event_date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }).toUpperCase()
            : 'LIVE',
          dateObj: new Date(e.event_date || Date.now()),
          title: e.title,
          desc: e.description || '',
          fullDescription: e.description || '',
          img: e.images?.[0] || '',
          images: e.images || [],
          department: e.department || 'General',
          category: e.category || 'Events & Activities',
          academicYear: '2025-2026',
        }))];
      }
      
      // Sort all fetched events by date
      mapped.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());
      setLiveEvents(mapped);
    };
    if (!galleryLoading) {
      fetchLiveEvents();
    }
  }, [cachedGallery, galleryLoading]);

  const filteredEvents = useMemo(() => {
    // Deduplicate: live DB events take priority; skip hardcoded if title already in live set
    const liveTitles = new Set(liveEvents.map(e => e.title.toLowerCase().trim()));
    const staticEvents = allEvents
      .filter(e => !liveTitles.has(e.title.toLowerCase().trim()))
      .map(e => {
        const p = e.id.split('-')[0];
        const year = p === "2526" ? "2025-2026" : p === "2425" ? "2024-2025" : "2023-2024";
        return { ...e, academicYear: year };
      });
    const combined = [...liveEvents, ...staticEvents];
    let filtered = combined;
    if (searchQuery) {
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedDepts.length > 0) {
      filtered = filtered.filter(e =>
        selectedDepts.includes(e.department) ||
        selectedDepts.some(dept => e.title.includes(dept))
      );
    }
    if (selectedCats.length > 0) filtered = filtered.filter(e => selectedCats.includes(e.category));
    if (selectedYears.length > 0) filtered = filtered.filter(e => selectedYears.includes((e as any).academicYear));
    if (sortOption === "Latest") filtered.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());
    else if (sortOption === "Oldest") filtered.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
    return filtered;
  }, [searchQuery, selectedDepts, selectedCats, selectedYears, sortOption, liveEvents]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE) || 1;
  const currentEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedDepts, selectedCats, selectedYears, sortOption]);

  const handleDeptToggle = (dept: string) => {
    setSelectedDepts(prev => prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]);
  };
  const handleCatToggle = (cat: string) => {
    setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };
  const handleYearToggle = (year: string) => {
    setSelectedYears(prev => prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]);
  };
  const resetFilters = () => {
    setSelectedDepts([]); setSelectedCats([]); setSelectedYears([]); setSearchQuery(""); setSortOption("Latest"); setCurrentPage(1);
  };
  const openModal = (event: Event) => { setSelectedEvent(event); setCurrentImageIndex(0); };

  useEffect(() => {
    if (!selectedEvent || selectedEvent.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedEvent]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dept = params.get('department');
    if (dept) {
      setSelectedDepts([dept]);
    }
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, []);

  const renderFilters = () => (
    <>
      {/* Years */}
      <div className="mb-5">
        <h3 className="text-xs font-bold text-gray-800 mb-2 uppercase tracking-wider">Academic Year</h3>
        <div className="border border-gray-200 rounded-xl mb-2.5 flex items-center px-3 py-2 bg-gray-50 text-sm text-gray-500 justify-between">
          <span className="text-xs">All Years</span><ChevronDown size={14} />
        </div>
        <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={selectedYears.length === 0} onChange={() => setSelectedYears([])}
              className="w-3.5 h-3.5 rounded border-gray-300 text-[#123B6D]" />
            <span className="text-xs text-gray-700 font-semibold">All Years</span>
          </label>
          {ALL_YEARS.map(year => (
            <label key={year} className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={selectedYears.includes(year)} onChange={() => handleYearToggle(year)}
                className="w-3.5 h-3.5 rounded border-gray-300 text-[#123B6D]" />
              <span className="text-xs text-gray-600 truncate">{year}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Department */}
      <div className="mb-5">
        <h3 className="text-xs font-bold text-gray-800 mb-2 uppercase tracking-wider">Department / Club</h3>
        <div className="border border-gray-200 rounded-xl mb-2.5 flex items-center px-3 py-2 bg-gray-50 text-sm text-gray-500 justify-between">
          <span className="text-xs">All Departments</span><ChevronDown size={14} />
        </div>
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={selectedDepts.length === 0} onChange={() => setSelectedDepts([])}
              className="w-3.5 h-3.5 rounded border-gray-300 text-[#123B6D]" />
            <span className="text-xs text-gray-700 font-semibold">All Departments</span>
          </label>
          {ALL_DEPARTMENTS.map(dept => (
            <label key={dept} className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={selectedDepts.includes(dept)} onChange={() => handleDeptToggle(dept)}
                className="w-3.5 h-3.5 rounded border-gray-300 text-[#123B6D]" />
              <span className="text-xs text-gray-600 truncate" title={dept}>{dept}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-5">
        <h3 className="text-xs font-bold text-gray-800 mb-2 uppercase tracking-wider">Category</h3>
        <div className="border border-gray-200 rounded-xl mb-2.5 flex items-center px-3 py-2 bg-gray-50 text-sm text-gray-500 justify-between">
          <span className="text-xs">All Categories</span><ChevronDown size={14} />
        </div>
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={selectedCats.length === 0} onChange={() => setSelectedCats([])}
              className="w-3.5 h-3.5 rounded border-gray-300 text-[#123B6D]" />
            <span className="text-xs text-gray-700 font-semibold">All Categories</span>
          </label>
          {ALL_CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={selectedCats.includes(cat)} onChange={() => handleCatToggle(cat)}
                className="w-3.5 h-3.5 rounded border-gray-300 text-[#123B6D]" />
              <span className="text-xs text-gray-600">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-3 border-t border-gray-100 mt-auto">
        <button onClick={() => setIsMobileFilterOpen(false)} className="w-full bg-[#0D1B3E] hover:bg-[#123B6D] text-white rounded-xl py-2.5 text-xs font-bold flex justify-center items-center gap-1.5 transition-colors lg:hidden">
          Apply Filters <Filter size={14} />
        </button>
        <button onClick={() => { resetFilters(); setIsMobileFilterOpen(false); }} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-2.5 text-xs font-bold flex justify-center items-center gap-1.5 transition-colors lg:hidden">
          ↺ Reset Filters
        </button>
        
        {/* Desktop buttons */}
        <button onClick={() => setIsMobileFilterOpen(false)} className="hidden lg:flex w-full bg-[#0D1B3E] hover:bg-[#123B6D] text-white rounded-xl py-2.5 text-xs font-bold justify-center items-center gap-1.5 transition-colors">
          Apply Filters <Filter size={14} />
        </button>
        <button onClick={resetFilters} className="hidden lg:flex w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-2.5 text-xs font-bold justify-center items-center gap-1.5 transition-colors">
          ↺ Reset Filters
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">

      {/* ── HERO ── */}
      <div className="relative bg-[#0D1B3E] overflow-hidden">
        <div className="absolute top-10 left-10 opacity-20 flex gap-2">
          {Array.from({ length: 4 }).map((_, r) => (
            <div key={r} className="flex flex-col gap-2">
              {Array.from({ length: 5 }).map((_, c) => (
                <div key={c} className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
              ))}
            </div>
          ))}
        </div>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-14 md:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-white">
              <div className="inline-block border border-yellow-500/50 rounded-full px-4 py-1.5 text-xs font-bold text-yellow-500 tracking-widest uppercase mb-5 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                Events Gallery
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
                Events <span className="text-yellow-500">Gallery</span>
              </h1>
              <p className="text-blue-100/80 text-base md:text-lg max-w-md leading-relaxed">
                Explore glimpses of vibrant events, competitions, celebrations and initiatives organized by various departments and student bodies.
              </p>
            </div>
            {/* Collage */}
            <div className="w-full lg:w-1/2 flex justify-center relative h-[260px] md:h-[360px]">
              <div className="absolute top-0 right-[35%] w-[45%] h-[40%] rounded-2xl overflow-hidden border-2 border-[#0D1B3E] shadow-xl z-20">
                <CachedImg src="/2024 - 2025/Rangotsav (1).jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-[10%] right-0 w-[40%] h-[45%] rounded-2xl overflow-hidden border-2 border-[#0D1B3E] shadow-xl z-10">
                <CachedImg src="/2024 - 2025/Induction Meet (1).webp" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-[40%] w-[50%] h-[55%] rounded-2xl overflow-hidden border-2 border-[#0D1B3E] shadow-xl z-30">
                <CachedImg src="/2024 - 2025/Spectrum Day 1 (1).jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-[5%] right-0 w-[42%] h-[40%] rounded-2xl overflow-hidden border-2 border-[#0D1B3E] shadow-xl z-20">
                <CachedImg src="/2024 - 2025/Kalakshetram (1).jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-[22%] left-[-5%] md:left-[5%] w-16 h-16 border-2 border-yellow-500 rounded-2xl flex items-center justify-center z-40 transform -rotate-6">
                <Calendar className="text-yellow-500 w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-8">

        {/* SIDEBAR */}
        <div className="w-full lg:w-[260px] shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hidden lg:flex flex-col sticky top-24 max-h-[85vh] overflow-y-auto no-scrollbar">
            <h2 className="text-lg font-black text-[#0D1B3E] mb-5 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Filter size={18} /> Filters
            </h2>
            {renderFilters()}
          </div>
        </div>

        {/* GALLERY */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6 bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100">
            <div className="relative w-full sm:w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text" placeholder="Search events..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#123B6D]"
              />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Sort by :</span>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-sm font-semibold text-gray-700 focus:outline-none">
                  <option value="Latest">Latest</option>
                  <option value="Oldest">Oldest</option>
                </select>
              </div>
              <div className="flex gap-2">
                {/* Mobile Filter Button */}
                <button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-1.5 bg-gray-50 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Filter size={16} />
                  <span className="hidden sm:inline">Filters</span>
                </button>

                {/* View Mode Toggle */}
                <div className="flex gap-1 border border-gray-200 rounded-xl p-1 bg-gray-50">
                  <button onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-[#0D1B3E] text-white" : "text-gray-400"}`}>
                    <Grid size={16} />
                  </button>
                  <button onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-[#0D1B3E] text-white" : "text-gray-400"}`}>
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          {currentEvents.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100">
              <Search className="w-14 h-14 text-gray-200 mb-3" />
              <h3 className="text-lg font-bold text-gray-800">No events found</h3>
              <p className="text-gray-500 mt-1.5 text-sm">Try adjusting your filters or search query.</p>
              <button onClick={resetFilters} className="mt-4 text-[#123B6D] font-semibold hover:underline text-sm">Clear all filters</button>
            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
              {currentEvents.map(event => (
                <div
                  key={event.id}
                  onClick={() => openModal(event)}
                  className={`group/card flex flex-col rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ${viewMode === "list" ? "sm:flex-row" : ""}`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "sm:w-1/3 h-56 sm:h-auto shrink-0" : "h-56"}`}>
                    <CachedImg
                      src={event.img} alt={event.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {/* Tag badge at bottom-left */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white px-3.5 py-1.5 rounded-full text-xs font-bold text-[#123B6D] tracking-wide shadow-sm">
                        {event.tag}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-5 flex flex-col flex-1 ${viewMode === "list" ? "justify-center" : ""}`}>
                    <h4 className="font-bold text-[#1E293B] group-hover/card:text-[#123B6D] transition-colors mb-2 text-lg leading-tight">
                      {event.title}
                    </h4>
                    {event.dateObj && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] mb-2">
                        <Calendar size={13} className="text-[#123B6D]" />
                        {event.dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    )}
                    <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3 flex-1 mb-4">{event.desc}</p>
                    <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-[#123B6D] group-hover/card:gap-2 transition-all">
                      View Details <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10 mb-4">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    currentPage === i + 1 ? "bg-[#0D1B3E] text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}>
                  {i + 1}
                </button>
              ))}
              {totalPages > 7 && <span className="text-gray-400 font-bold">...</span>}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── TECH & INNOVATION EVENTS ── */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pb-20">
        <h2 className="text-2xl font-black text-[#0D1B3E] mb-6">Tech & Innovation Events</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {techEvents.map((te, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="h-32 bg-black relative overflow-hidden flex items-center justify-center">
                <CachedImg src={te.img} alt={te.name} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500" />
                <h3 className="relative z-10 text-white font-black text-base tracking-widest uppercase drop-shadow-lg text-center px-1">{te.name}</h3>
              </div>
              <div className="p-3">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mb-0.5">{te.name}</div>
                <h4 className="font-bold text-sm text-gray-900 mb-1.5 truncate">{te.title}</h4>
                <div className="flex items-center justify-end">
                  <div className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${categoryColors[te.category] || "bg-gray-100 text-gray-600"}`}>{te.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl lg:max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
              <button onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors md:text-gray-500 md:bg-gray-100 md:hover:bg-gray-200">
                <X size={20} />
              </button>
              <div className="w-full md:w-1/2 lg:w-[55%] relative bg-gray-900 min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <MotionCachedImg key={currentImageIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                    src={selectedEvent.images[currentImageIndex]} alt={selectedEvent.title}
                    className="absolute inset-0 w-full h-full object-contain bg-black/50" />
                </AnimatePresence>
                {selectedEvent.images.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center"><ChevronLeft size={18} /></button>
                    <button onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center"><ChevronRight size={18} /></button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {selectedEvent.images.map((_, idx) => (
                        <button key={idx} onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="w-full md:w-1/2 lg:w-[45%] p-6 md:p-10 lg:p-12 flex flex-col justify-center overflow-y-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full border border-gray-200 text-xs font-semibold text-gray-700">{selectedEvent.department}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${categoryColors[selectedEvent.category] || "bg-gray-100 text-gray-600"}`}>{selectedEvent.category}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-[#0D1B3E] mb-4">{selectedEvent.title}</h2>
                <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm mb-6 pb-6 border-b border-gray-100">
                  <Calendar size={18} className="text-[#123B6D]" />{selectedEvent.tag}
                </div>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed">{selectedEvent.fullDescription}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MOBILE FILTERS SLIDE-OVER ── */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-[280px] sm:w-[320px] bg-white z-[70] shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h2 className="text-lg font-black text-[#0D1B3E] flex items-center gap-2">
                  <Filter size={18} /> Filters
                </h2>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-5 flex-1 overflow-y-auto flex flex-col no-scrollbar">
                {renderFilters()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

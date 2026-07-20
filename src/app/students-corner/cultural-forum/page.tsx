"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronRight, Building2, Users, Star, Grid3x3, X, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const academicYears = ["2025-2026", "2024-2025", "2023-2024", "2022-2023", "2021-2022"];

type Event = {
  id: number;
  name: string;
  shortName: string;
  day: string;
  month: string;
  year: string;
  description: string;
  fullDescription?: string;
  images: string[];
};

const eventsByYear: Record<string, Event[]> = {
  "2025-2026": [
    { 
      id: 1, name: "Friendship Day", shortName: "Friendship Day", day: "06", month: "Aug 2025", year: "2025", 
      description: "A celebration of friendship, unity, and memories shared across the campus.", 
      fullDescription: "The Cultural Forum hosted the Friendship Day celebration on 6th August 2025, kicking off the event with an energetic jamming session. Students actively took part in engaging activities, games, and T-shirt signing, creating a lively atmosphere. The event fostered meaningful interactions and helped build stronger connections among freshers, seniors, and faculty members.",
      images: ["/2025 - 2026/Friendship Day (1).jpg", "/2025 - 2026/Friendship Day (2).jpg", "/2025 - 2026/Friendship Day (3).jpg"] 
    },
    { 
      id: 2, name: "Teacher's Day", shortName: "Teacher's Day", day: "04", month: "Sep 2025", year: "2025", 
      description: "A tribute to the guidance, inspiration, and support of our beloved faculty.", 
      fullDescription: "Teachers’ Day was celebrated on 4th of September 2025 with great enthusiasm to honor the vital role teachers play in shaping students’ lives. The well-organized program included speeches, cultural performances, and interactive activities. The celebration was filled with respect and appreciation, making it a memorable occasion for teachers, students, and the Cultural Forum.",
      images: ["/2025 - 2026/Teachers Day (1).jpg", "/2025 - 2026/Teachers Day (2).jpg", "/2025 - 2026/Teachers Day (3).jpg", "/2025 - 2026/Teachers Day (4).jpg"] 
    },
    { 
      id: 3, name: "Social Cause Event – Spectrum x Leo Club", shortName: "Social Cause Event", day: "02", month: "Oct 2025", year: "2025", 
      description: "MCC joins hands with Leo Club to create meaningful social impact.", 
      fullDescription: "In collaboration with the Leo Club, Spectrum’s core members visited a school for specially abled children to share creativity and joy. From making greeting cards to drawing together and spending meaningful time, the day was about connection, compassion, and creating smiles beyond campus.",
      images: ["/2025 - 2026/Social Cause Event (1).jpg", "/2025 - 2026/Social Cause Event (2).jpg", "/2025 - 2026/Social Cause Event (3).jpg", "/2025 - 2026/Social Cause Event (4).jpg"] 
    },
    { 
      id: 4, name: "हे Subharambh", shortName: "Subharambh", day: "25", month: "Oct 2025", year: "2025", 
      description: "The auspicious inauguration ceremony marking the start of our cultural journey.", 
      fullDescription: "Organised by the Students’ Council in collaboration with Spectrum, हे Subharambh transformed the decorated college turf into a vibrant Garba evening, graced by the special appearance of Abhijeet Khandkekar. Music, tradition, and collective celebration brought the campus together in a night full of rhythm and festive spirit.",
      images: ["/2025 - 2026/हे Subharambh (1).jpg", "/2025 - 2026/हे Subharambh (2).jpg", "/2025 - 2026/हे Subharambh (3).jpg", "/2025 - 2026/हे Subharambh (4).jpg"] 
    },
    { 
      id: 5, name: "Pre-Theme Reveal Events", shortName: "Pre-Theme Reveal", day: "14", month: "Nov 2025", year: "2025", 
      description: "Teaser events and mystery activities leading up to the grand theme reveal.", 
      fullDescription: "The excitement built up with our dynamic pre-theme reveal events — Campus Fit Clash testing fitness and stamina, Fusion on Hands celebrating hand and palm artistry, and Mic Drop Mania delivering laughter through stand-up comedy. Each event added a new layer of anticipation to the grand reveal.",
      images: ["/2025 - 2026/Pre-Theme Reveal Events (1).jpg", "/2025 - 2026/Pre-Theme Reveal Events (2).jpg", "/2025 - 2026/Pre-Theme Reveal Events (3).jpg", "/2025 - 2026/Pre-Theme Reveal Events (4).jpg"] 
    },
    { 
      id: 6, name: "Theme Reveal – Reevan 2025", shortName: "Theme Reveal", day: "10", month: "Dec 2025", year: "2025", 
      description: "The grand unveiling of Spectrum 2025's theme in a spectacular showcase.", 
      fullDescription: "Reevan 2025 unfolded in grandeur as we welcomed superstar Ayesha Khan for her movie promotions and the much-awaited theme reveal. With a flashmob by the Dance Department, the banner drop unveiling “Reevan – The End is the Beginning,” and a powerful dhol-tasha performance by the core team, the afternoon marked a bold new chapter for Spectrum.",
      images: ["/2025 - 2026/Theme Reveal – Reevan 2025 (1).jpg", "/2025 - 2026/Theme Reveal – Reevan 2025 (2).jpg", "/2025 - 2026/Theme Reveal – Reevan 2025 (3).jpg", "/2025 - 2026/Theme Reveal – Reevan 2025 (4).jpg"] 
    },
    { 
      id: 7, name: "Induction Ceremony 2025", shortName: "Induction Ceremony", day: "26", month: "Jan 2026", year: "2026", 
      description: "Welcoming the newest members of the MCC family with pride and promise.", 
      fullDescription: "Induction Ceremony 2025 began with the first electrifying flashmob of the year by the Dance Department, setting the tone for a memorable evening. From badge distribution to inspiring speeches by the newly appointed heads and a confident fashion walk by each heads , the event marked the beginning of new leadership journeys.",
      images: ["/2025 - 2026/Induction Ceremony 2025 (1).jpg", "/2025 - 2026/Induction Ceremony 2025 (2).jpg", "/2025 - 2026/Induction Ceremony 2025 (3).jpg"] 
    },
    { 
      id: 8, name: "Spectrum Day 1", shortName: "Spectrum Day 1", day: "08", month: "Mar 2026", year: "2026", 
      description: "The grand opener to Spectrum – a cultural extravaganza of talent and creativity.", 
      fullDescription: "Spectrum Main Day 1 kicked off with unmatched energy, featuring a diverse lineup including Natarang, Neon Cricket, How I Met Your Murderer, Board Bash, Mr & Ms Spectrum, Otaku Carnival, Reevan – The Elemental Trials, Corporate Conspiracy, Typing Ninja, Valorant, and BGMI. The day blended creativity, competition, strategy, and gaming into a power-packed start to the fest.",
      images: ["/2025 - 2026/Spectrum Day 1 (1).jfif", "/2025 - 2026/Spectrum Day 1 (2).jfif", "/2025 - 2026/Spectrum Day 1 (3).jfif", "/2025 - 2026/Spectrum Day 1 (4).jfif"] 
    },
    { 
      id: 9, name: "Spectrum Day 2", shortName: "Spectrum Day 2", day: "09", month: "Mar 2026", year: "2026", 
      description: "Day 2 brings electrifying performances, dance battles, and creative arts.", 
      fullDescription: "Spectrum Day 2 elevated the excitement with Kurukshetra, Bollyverse, Checkmate, Sursargam, Valorant, Skribbl.io, and BGMI. From musical brilliance and strategic battles to high-intensity esports clashes, the campus buzzed with talent and competitive spirit.",
      images: ["/2025 - 2026/Spectrum Day 2 (1).jfif", "/2025 - 2026/Spectrum Day 2 (2).jfif", "/2025 - 2026/Spectrum Day 2 (3).jfif", "/2025 - 2026/Spectrum Day 2 (4).jfif"] 
    },
    { 
      id: 10, name: "Spectrum Day 3", shortName: "Spectrum Day 3", day: "10", month: "Mar 2026", year: "2026", 
      description: "Inter-collegiate competitions and celebrity appearances take center stage.", 
      fullDescription: "Spectrum Day 3 intensified the competition with Kurukshetra and Mr & Ms Spectrum advancing into Rounds 2 & 3, alongside BGMI showdowns. Events like Poetic Arena, Sunao Dil Se, Untitled, and Rangmanch added depth with powerful performances, expression, and storytelling.",
      images: ["/2025 - 2026/Spectrum Day 3 (1).jpeg", "/2025 - 2026/Spectrum Day 3 (2).jpeg", "/2025 - 2026/Spectrum Day 3 (3).jpeg", "/2025 - 2026/Spectrum Day 3 (4).jpeg"] 
    },
    { 
      id: 11, name: "Spectrum Day 4", shortName: "Spectrum Day 4", day: "11", month: "Mar 2026", year: "2026", 
      description: "The grand finale – closing ceremony, prizes, and memories for a lifetime.", 
      fullDescription: "The final day featured engaging events like Taste Roulette, Rangmanch, Trade Raiders, and Escape Room, keeping the thrill alive till the very end. The celebration concluded with an electrifying DJ Night, uniting everyone on the dance floor for a memorable grand finale.",
      images: ["/2025 - 2026/Spectrum Day 4 (1).jpeg", "/2025 - 2026/Spectrum Day 4 (2).jpeg", "/2025 - 2026/Spectrum Day 4 (3).jpeg", "/2025 - 2026/Spectrum Day 4 (4).jpeg"] 
    },
  ],
  "2024-2025": [
    {
      id: 1, name: "Friendship Day", shortName: "Friendship Day", day: "12", month: "Aug 2024", year: "2024",
      description: "A celebration of friendship, unity, and memories shared across the campus.",
      fullDescription: "The Friendship Day celebration (12 August 2024) was organized by the Cultural Forum and began with a jamming session. Students participated in fun activities, t-shirt signing, and games, encouraging interaction and strengthening bonds among freshers, seniors, and faculty.",
      images: ["/2024 - 2025/Friendship Day (1).jpg", "/2024 - 2025/Friendship Day (2).jpg", "/2024 - 2025/Friendship Day (3).jpg"]
    },
    {
      id: 2, name: "Teacher's Day", shortName: "Teacher's Day", day: "05", month: "Sep 2024", year: "2024",
      description: "A tribute to the guidance, inspiration, and support of our beloved faculty.",
      fullDescription: "On September 5, 2024, the Cultural Forum celebrated Teachers' Day with great reverence and fervour. A heartfelt thank you to the committed teachers who have impacted the lives of so many students was expressed throughout the ceremony.",
      images: ["/2024 - 2025/Teachers Day (1).jpg", "/2024 - 2025/Teachers Day (2).jpg", "/2024 - 2025/Teachers Day (3).jpg", "/2024 - 2025/Teachers Day (4).jpg"]
    },
    {
      id: 3, name: "Induction Meet", shortName: "Induction Meet", day: "10", month: "Sep 2024", year: "2024",
      description: "The formal inauguration of the cultural year 2024–25 with badge conferring.",
      fullDescription: "The Induction Meet marked the formal inauguration of the cultural year 2024–25. Badges were conferred upon departmental heads, symbolizing their responsibilities, and the event was enriched by inspiring addresses from Hon. Principal Dr. Sonali Pednekar Madam and Cultural Convener Mrs. Pooja Patil, setting a positive and enthusiastic tone for the year ahead.",
      images: ["/2024 - 2025/Induction Meet (1).webp", "/2024 - 2025/Induction Meet  (2).webp", "/2024 - 2025/Induction Meet (3).webp", "/2024 - 2025/Induction Meet (4).webp"]
    },
    {
      id: 4, name: "Kalakshetram", shortName: "Kalakshetram", day: "15", month: "Sep 2024", year: "2024",
      description: "Expressing Indian culture and underwater beauty through art.",
      fullDescription: "The Kalakshetram event, organized by the Cultural Forum, featured the themes Vibrance of India and Mysteries Beneath the Waves, encouraging participants to express Indian culture and the beauty of the underwater world through art within a three-hour duration.",
      images: ["/2024 - 2025/Kalakshetram (1).jpg", "/2024 - 2025/Kalakshetram(2).jpg", "/2024 - 2025/Kalakshetram (3).jpg"]
    },
    {
      id: 5, name: "Mehfil-e-Mehendi", shortName: "Mehfil-e-Mehendi", day: "19", month: "Sep 2024", year: "2024",
      description: "Showcasing creativity through a bridal Mehendi theme.",
      fullDescription: "The Mehfil-e-Mehendi event, organized by the Cultural Forum, was held on 19 September 2024 at Mulund College of Commerce. Centered on a bridal Mehendi theme, the event provided participants an opportunity to showcase their creativity within a one-hour duration, with winners being duly recognized for their artistic excellence.",
      images: ["/2024 - 2025/Mehfil-e-Mehendi (1).jpg", "/2024 - 2025/Mehfil-e-Mehendi (2).jpg", "/2024 - 2025/Mehfil-e-Mehendi (3).jpg"]
    },
    {
      id: 6, name: "Rangotsav", shortName: "Rangotsav", day: "20", month: "Sep 2024", year: "2024",
      description: "A colorful display of Sanskarbharti and Poster Rangoli artistry.",
      fullDescription: "The Rangotsav event, organized by the Cultural Forum, was held on 20 September 2024 at Mulund College of Commerce. Featuring the themes Sanskarbharti Rangoli and Poster Rangoli, the event provided participants an opportunity to showcase their creativity, with winners being awarded for their artistic excellence.",
      images: ["/2024 - 2025/Rangotsav (1).jpg", "/2024 - 2025/Rangotsav (2).jpg", "/2024 - 2025/Rangotsav (3).jpg", "/2024 - 2025/Rangotsav (4).jpg"]
    },
    {
      id: 7, name: "Pre Events - TechnoHunt", shortName: "TechnoHunt", day: "03", month: "Dec 2024", year: "2024",
      description: "A competitive tech challenge testing coding, problem-solving, and logic.",
      fullDescription: "TechnoHunt, held on 3rd December, featured 13 duo teams competing in three exciting rounds that tested coding, problem-solving, and logical thinking skills. From debugging and clue hunting to treasure challenges and the final Spectrum Shield round, the event was filled with energy and teamwork. It concluded with an intense finale, making it a thrilling and memorable experience for all participants.",
      images: ["/2024 - 2025/Pre Events-TechnoHunt (1).jpg", "/2024 - 2025/Pre Events-TechnoHunt (2).jpg", "/2024 - 2025/Pre Events-TechnoHunt (3).jpg"]
    },
    {
      id: 8, name: "Pre Events - Kick-Off", shortName: "Kick-Off", day: "04", month: "Dec 2024", year: "2024",
      description: "A high-energy football tournament featuring 24 competitive teams.",
      fullDescription: "The Kick-Off Football Tournament began on 4th December with 24 teams competing in two pools, creating a high-energy and competitive atmosphere. Over three thrilling days, players showcased excellent teamwork, strategy, and sportsmanship. The event concluded with an exciting finale, making it a memorable and grand success.",
      images: ["/2024 - 2025/Pre Events-Kick-Off (1).jpg", "/2024 - 2025/Pre Events-Kick-Off (2).jpg", "/2024 - 2025/Pre Events-Kick-Off (3).jpg", "/2024 - 2025/Pre Events-Kick-Off (4).jpg"]
    },
    {
      id: 9, name: "Pre Events - Departmental Wars", shortName: "Departmental Wars", day: "07", month: "Dec 2024", year: "2024",
      description: "Departments compete in challenges of strength, agility, and teamwork.",
      fullDescription: "The “Departmental Wars,” organized by the Cultural Forum, was held at Mulund College of Commerce from 7th to 9th December 2024, featuring 9 teams competing across four exciting rounds. Participants showcased strength, agility, intelligence, and teamwork through challenges like “Dog and the Bone,” “Tug of War,” and the final “Lock and Key” round. The event fostered strong team spirit and enthusiasm, making it a memorable and dynamic competition for all involved.",
      images: ["/2024 - 2025/Pre Events- Departmental Wars (1).jpg", "/2024 - 2025/Pre Events- Departmental Wars (2).jpg", "/2024 - 2025/Pre Events- Departmental Wars (3).jpg", "/2024 - 2025/Pre Events- Departmental Wars (4).jpg"]
    },
    {
      id: 10, name: "Pre Events - Stall Wars", shortName: "Stall Wars", day: "07", month: "Dec 2024", year: "2024",
      description: "Vibrant stalls showcasing entrepreneurial ideas, crafts, and food.",
      fullDescription: "Stall Wars, held on 7th and 9th December at the MCC Campus near the Turf, brought vibrant energy with 18 creative stalls showcasing food, crafts, and entrepreneurial ideas. Students displayed excellent teamwork and business skills while competing to attract maximum visitors. The event highlighted innovation and enthusiasm, with Rikta Pan and Siddhi Parkar emerging as winners for their popular boba drinks.",
      images: ["/2024 - 2025/Pre Events-Stall Wars (1).jpg", "/2024 - 2025/Pre Events-Stall Wars (2).jpg", "/2024 - 2025/Pre Events-Stall Wars (3).jpg", "/2024 - 2025/Pre Events-Stall Wars (4).jpg"]
    },
    {
      id: 11, name: "Pre Events - IPL Auction", shortName: "IPL Auction", day: "12", month: "Dec 2024", year: "2024",
      description: "An action-packed bidding war to build the ultimate cricket squad.",
      fullDescription: "The action-packed IPL Auction event featured 10 teams bidding competitively to secure players, with the first team to complete a squad of 11 emerging as the winner. While teams began with aggressive bidding, they gradually shifted to a more analytical and cautious approach. All teams actively strategized, but Delhi Capitals stood out with their well-planned and calculated bids, ultimately winning the event.",
      images: ["/2024 - 2025/Pre Events-IPL Auction (1).jpg", "/2024 - 2025/Pre Events-IPL Auction (2).jpg", "/2024 - 2025/Pre Events-IPL Auction (3).jpg"]
    },
    {
      id: 12, name: "Pre Events - Runbhoomi", shortName: "Runbhoomi", day: "15", month: "Dec 2024", year: "2024",
      description: "An intense three-day knockout cricket tournament.",
      fullDescription: "Runbhoomi 2025, held at MCC, was a thrilling three-day knockout cricket tournament featuring 36 teams competing with high energy and sportsmanship. Teams battled through intense matches to secure semi-final spots, leading to a nail-biting Grand Finale. The event showcased teamwork, strategy, and passion, making it an unforgettable cricketing experience.",
      images: ["/2024 - 2025/Pre Events-Runbhoomi (1).jpg", "/2024 - 2025/Pre Events-Runbhoomi (2).jpg", "/2024 - 2025/Pre Events-Runbhoomi (3).jpg", "/2024 - 2025/Pre Events-Runbhoomi (4).jpg"]
    },
    {
      id: 13, name: "Spectrum Day 1", shortName: "Spectrum Day 1", day: "18", month: "Dec 2024", year: "2024",
      description: "The energetic opening day of our annual cultural festival.",
      fullDescription: "Spectrum, the Annual Inter-Collegiate Cultural Festival of Mulund College of Commerce, was organized to celebrate talent, creativity, and student participation. Day 1 of the festival, held on 18 December 2024, included exciting events like Natrang, Neon Cricket, How I Met Your Murderer? Checkmate, Real Cricket, Animecon, Modern Feud, Arthashastra, and Bullet Echo, creating an energetic and enthusiastic atmosphere among participants.",
      images: ["/2024 - 2025/Spectrum Day 1 (1).jpg", "/2024 - 2025/Spectrum Day 1 (2).jpg", "/2024 - 2025/Spectrum Day 1 (3).jpg", "/2024 - 2025/Spectrum Day 1 (4).jpg"]
    },
    {
      id: 14, name: "Spectrum Day 2", shortName: "Spectrum Day 2", day: "19", month: "Dec 2024", year: "2024",
      description: "A day filled with vibrant competitions and creative showcases.",
      fullDescription: "Day 2 (19 December 2024) of Spectrum, featured a variety of vibrant and competitive events that encouraged creativity, teamwork, and enthusiasm among students. Events such as Kurukshetra, Road to Valor, Trinity Mythos, Bollyverse, Board Brawl, Taal Tarang, Mr. & Ms. Spectrum, and Keysprint gave participants an opportunity to showcase their skills, confidence, and sportsmanship in an energetic festival atmosphere.",
      images: ["/2024 - 2025/Spectrum Day 2 (1).jpg", "/2024 - 2025/Spectrum Day 2 (2).jpg", "/2024 - 2025/Spectrum Day 2 (3).jpg", "/2024 - 2025/Spectrum Day 2 (4).jpg"]
    },
    {
      id: 15, name: "Spectrum Day 3", shortName: "Spectrum Day 3", day: "20", month: "Dec 2024", year: "2024",
      description: "Participants display creativity, strategy, and teamwork across diverse events.",
      fullDescription: "Day 3 (20 December 2024) of Spectrum was filled with excitement and enthusiastic participation as students competed in a variety of engaging events. Competitions such as Kurukshetra, Thrills at the Table, BGMI, Rangmanch, and Taste Twisters created a lively atmosphere, giving participants an opportunity to display their creativity, strategy, teamwork, and competitive spirit throughout the day.",
      images: ["/2024 - 2025/Spectrum Day 3 (1).jpg", "/2024 - 2025/Spectrum Day 3 (2).jpg", "/2024 - 2025/Spectrum Day 3 (3).jpg", "/2024 - 2025/Spectrum Day 3 (4).jpg"]
    },
    {
      id: 16, name: "Spectrum Day 4", shortName: "Spectrum Day 4", day: "21", month: "Dec 2024", year: "2024",
      description: "The grand finale concluding Spectrum with intellectually stimulating events.",
      fullDescription: "Day 4 (21 December 2024) of Spectrum marked a memorable conclusion to the festival with a series of engaging and competitive events. Activities such as Poetic Bliss, Verdict Victors, Corporate Climb, Trinity Mythos, and Mr. & Ms. Spectrum brought together creativity, confidence, intellect, and enthusiasm, making the final day vibrant and enjoyable for all participants.",
      images: ["/2024 - 2025/Spectrum Day 4 (1).jpg", "/2024 - 2025/Spectrum Day 4 (2).jpg", "/2024 - 2025/Spectrum Day 4 (3).jpg", "/2024 - 2025/Spectrum Day 4 (4).jpg"]
    }
  ],
  "2023-2024": [
    {
      id: 1, name: "Friendship Day", shortName: "Friendship Day", day: "09", month: "Aug 2023", year: "2023",
      description: "A happy and spirited day celebrating friendship.",
      fullDescription: "The Culture Forum arranged the Friendship Day Celebration, which took place on August 9, 2023. It was a happy and spirited day. A percentage of the participation fees received were given to the non-profit group \"Prangan\".",
      images: ["/2023-2024/Friendship Day.jpg"]
    },
    {
      id: 2, name: "Induction Meet", shortName: "Induction Meet", day: "13", month: "Sep 2023", year: "2023",
      description: "Uniting department heads for official introductions.",
      fullDescription: "The Cultural Forum conducted the induction ceremony on 13 September 2023, uniting department heads for official introductions and batch allocation.",
      images: ["/2023-2024/Induction Meet.jpeg"]
    },
    {
      id: 3, name: "Celebrity Promotion Event", shortName: "Celebrity Promotion", day: "06", month: "Nov 2023", year: "2023",
      description: "Welcoming PearlVPuri to Spectrum 2023-24.",
      fullDescription: "We welcomed PearlVPuri to Spectrum 2023-24 on November 6, 2023, for a Celebrity Promotion Event.",
      images: ["/2023-2024/Celebrity Promotion Event of Spectrum.jpg"]
    },
    {
      id: 4, name: "Theme Reveal", shortName: "Theme Reveal", day: "25", month: "Nov 2023", year: "2023",
      description: "Unveiling the theme \"Utopia\" with enthusiasm and pride.",
      fullDescription: "Unveiled the theme \"Utopia\" with awe-striking enthusiasm and pride on November 25, 2023.",
      images: ["/2023-2024/Theme Reveal (1).jpg", "/2023-2024/Theme Reveal(2).jpg"]
    },
    {
      id: 5, name: "Pre Events", shortName: "Pre Events", day: "30", month: "Nov 2023", year: "2023",
      description: "A series of engaging activities leading up to Spectrum.",
      fullDescription: "The Cultural Forum organized the pre-events of SPECTRUM from 30th November to 5th December, featuring a series of engaging and competitive activities. Events such as Ran-Bhoomi, Techno-Hunt, IPL Auction, Departmental Wars, Kick-Off, and Stall Bazaar encouraged active student participation, teamwork, and creativity across the college.",
      images: ["/2023-2024/Pre Event(1).jpg", "/2023-2024/Pre Event (2).jpg", "/2023-2024/Pre Event (3).jpg"]
    },
    {
      id: 6, name: "Spectrum Day 1", shortName: "Spectrum Day 1", day: "18", month: "Dec 2023", year: "2023",
      description: "The opening day of the Annual Inter-Collegiate Cultural Festival.",
      fullDescription: "Spectrum is the Annual Inter-Collegiate Cultural Festival of Mulund College of Commerce, organized by the Cultural Forum to celebrate talent, creativity, and student spirit. On Day 1 (18 December 2023), events included Suit Up, Ishq-E-Cinema, Brandvertising, Neon Event, Stumble Guys, How I Met Your Murderer?, Chess Wizard, Kaal-Chakra, Keyboard Ninja, Mr. & Ms. Spectrum, Rap Cypher, and Talk by Trial.",
      images: ["/2023-2024/Spectrum Day 1 (1).jpeg", "/2023-2024/Spectrum Day 1 (2).jpeg", "/2023-2024/Spectrum Day 1 (3).jpeg", "/2023-2024/Spectrum Day 1 (4).jpeg"]
    },
    {
      id: 7, name: "Spectrum Day 2", shortName: "Spectrum Day 2", day: "19", month: "Dec 2023", year: "2023",
      description: "A wide range of competitive, fun, and creative events.",
      fullDescription: "On Day 2 of Spectrum, the Annual Inter-Collegiate Cultural Festival, a wide range of competitive, fun, and creative events were organized. The events included Kurukshetra, Talk by Trial, Kaal Chakra, Suit Up, Ishq-E-Cinema, Carrom, Animecon, Thrills of Table, and Ground Zero, offering students exciting opportunities to showcase their talent, strategy, and enthusiasm beyond academics.",
      images: ["/2023-2024/Spectrum Day 2 (1).jpg", "/2023-2024/Spectrum Day 2 (2).jpg", "/2023-2024/Spectrum Day 2 (3).jpg", "/2023-2024/Spectrum Day 2 (4).jpg"]
    },
    {
      id: 8, name: "Spectrum Day 3", shortName: "Spectrum Day 3", day: "20", month: "Dec 2023", year: "2023",
      description: "Energetic continuation of the cultural festival with various events.",
      fullDescription: "Day 3 (20 December 2023) of Spectrum witnessed an energetic continuation of the Annual Inter-Collegiate Cultural Festival, with events such as Tug Titans, Mr. & Ms. Spectrum, Arthashastra, Kurukshetra, Thrills of Table, BGMI, NatyaRas, Lens Legends, and COC, keeping the enthusiasm and competitive spirit alive among participants.",
      images: ["/2023-2024/Spectrum Day 3 (1).jpg", "/2023-2024/Spectrum Day 3 (2).jpeg", "/2023-2024/Spectrum Day 3 (3).jpeg", "/2023-2024/Spectrum Day 3 (4).jpeg"]
    },
    {
      id: 9, name: "Spectrum Day 4", shortName: "Spectrum Day 4", day: "21", month: "Dec 2023", year: "2023",
      description: "The grand conclusion celebrating creativity and cultural spirit.",
      fullDescription: "Day 4 (21 December 2023) of Spectrum concluded the Annual Inter-Collegiate Cultural Festival on a high note with engaging events such as Poetic Bliss, Modern Feud, Arthashastra, Suro Ki Mehfil, Valorant, and Burp, celebrating creativity, competition, and cultural spirit.",
      images: ["/2023-2024/Spectrum Day 4 (1).jpg", "/2023-2024/Spectrum Day 4 (2).jpeg", "/2023-2024/Spectrum Day 4 (3).jpeg", "/2023-2024/Spectrum Day 4 (4).jpeg"]
    }
  ],
  "2022-2023": [
    { id: 1, name: "Friendship Day", shortName: "Friendship Day", day: "04", month: "Aug 2022", year: "2022", description: "A celebration of friendship, unity, and memories shared across the campus.", images: ["https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop"] },
    { id: 2, name: "Teacher's Day", shortName: "Teacher's Day", day: "05", month: "Sep 2022", year: "2022", description: "A tribute to the guidance, inspiration, and support of our beloved faculty.", images: ["https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop"] },
    { id: 3, name: "Spectrum Day 1", shortName: "Spectrum Day 1", day: "20", month: "Mar 2023", year: "2023", description: "The grand opener to Spectrum – a cultural extravaganza.", images: ["https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop"] },
    { id: 4, name: "Spectrum Day 2", shortName: "Spectrum Day 2", day: "21", month: "Mar 2023", year: "2023", description: "Day 2 brings electrifying performances and creative arts.", images: ["https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop"] },
    { id: 5, name: "Spectrum Day 3", shortName: "Spectrum Day 3", day: "22", month: "Mar 2023", year: "2023", description: "Inter-collegiate competitions take center stage.", images: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"] },
    { id: 6, name: "Spectrum Day 4", shortName: "Spectrum Day 4", day: "23", month: "Mar 2023", year: "2023", description: "The grand finale – closing ceremony and prizes.", images: ["https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop"] },
  ],
  "2021-2022": [
    { id: 1, name: "Friendship Day", shortName: "Friendship Day", day: "15", month: "Aug 2021", year: "2021", description: "A celebration of friendship, unity, and memories shared across the campus.", images: ["https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop"] },
    { id: 2, name: "Teacher's Day", shortName: "Teacher's Day", day: "05", month: "Sep 2021", year: "2021", description: "A tribute to the guidance, inspiration, and support of our beloved faculty.", images: ["https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop"] },
    { id: 3, name: "Social Cause Event", shortName: "Social Cause Event", day: "02", month: "Oct 2021", year: "2021", description: "MCC joins hands with NGOs to create meaningful impact.", images: ["https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop"] },
    { id: 4, name: "Diwali Celebration", shortName: "Diwali Celebration", day: "25", month: "Oct 2021", year: "2021", description: "Spreading joy, lights, and positivity with the MCC family.", images: ["https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=800&auto=format&fit=crop"] },
    { id: 5, name: "Photography Competition", shortName: "Photography Competition", day: "14", month: "Nov 2021", year: "2021", description: "Capturing moments, perspectives, and stories through the lens.", images: ["https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"] },
    { id: 6, name: "Talent Reveal – 2022", shortName: "Talent Reveal", day: "10", month: "Dec 2021", year: "2021", description: "A platform for students to showcase their extraordinary talents.", images: ["https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop"] },
    { id: 7, name: "Republic Day Celebration", shortName: "Republic Day", day: "26", month: "Jan 2022", year: "2022", description: "Honoring the spirit of our nation with pride and unity.", images: ["https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop"] },
    { id: 8, name: "Spectrum Day 1", shortName: "Spectrum Day 1", day: "08", month: "Mar 2022", year: "2022", description: "The grand opener to Spectrum – a cultural extravaganza.", images: ["https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop"] },
  ],
};

const VISIBLE_INITIAL = 8;

export default function CulturalCommitteePage() {
  const [activeYear, setActiveYear] = useState("2025-2026");
  const [showAll, setShowAll] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const events = eventsByYear[activeYear] || [];
  const visibleEvents = showAll ? events : events.slice(0, VISIBLE_INITIAL);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setCurrentImageIndex(0);
  };

  useEffect(() => {
    if (!selectedEvent || selectedEvent.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedEvent]);

  const nextImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
    }
  };

  const prevImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ===== HERO SECTION ===== */}
      <div className="relative h-[520px] md:h-[580px] overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop"
          alt="MCC Campus"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B3E]/90 via-[#0D1B3E]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3E]/60 via-transparent to-transparent"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-8">

            {/* Left Text Block */}
            <div className="flex-1 text-white max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-6">
                <Building2 size={13} className="text-blue-300" />
                MCC Cultural Committee
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-2">
                Where Culture
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-1">
                Comes Alive
              </h1>
              {/* Yellow accent line */}
              <div className="w-16 h-1.5 bg-yellow-400 rounded-full mt-3 mb-6"></div>

              <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-md mb-8">
                Celebrating creativity, talent, and the vibrant spirit of MCC Autonomous through unforgettable cultural events and initiatives.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Users, value: "11+", label: "Annual Events" },
                  { icon: Star, value: "5", label: "Student Groups" },
                  { icon: Building2, value: "1000+", label: "Students Engaged" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
                    <stat.icon size={20} className="text-blue-300 shrink-0" />
                    <div>
                      <div className="text-white font-black text-lg leading-none">{stat.value}</div>
                      <div className="text-white/60 text-[10px] font-medium leading-tight mt-0.5">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Academic Year Selector Card */}
            <div className="hidden md:block shrink-0">
              <div className="bg-white rounded-3xl shadow-2xl p-6 min-w-[200px]">
                <p className="text-[#123B6D] text-xs font-bold uppercase tracking-widest mb-4">Academic Year</p>
                <div className="flex flex-col gap-2">
                  {academicYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => { setActiveYear(year); setShowAll(false); }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                        activeYear === year
                          ? "bg-[#123B6D] text-white shadow-md"
                          : "text-[#4A5568] border border-gray-200 hover:border-[#123B6D] hover:text-[#123B6D]"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ===== MOBILE YEAR SELECTOR ===== */}
      <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-20 shadow-sm">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {academicYears.map((year) => (
            <button
              key={year}
              onClick={() => { setActiveYear(year); setShowAll(false); }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeYear === year ? "bg-[#123B6D] text-white shadow" : "bg-gray-100 text-gray-500"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* ===== CULTURAL ACTIVITIES SECTION ===== */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#123B6D] text-sm font-semibold mb-2">
              <Building2 size={16} className="text-[#123B6D]" />
              {activeYear} Academic Year
            </div>
            {/* Blue underline accent under heading */}
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E]">Cultural Activities</h2>
              <div className="w-16 h-1 bg-[#123B6D] rounded-full mt-2"></div>
            </div>
            <p className="text-gray-500 text-sm mt-3">Explore the vibrant legacy of events that defined our cultural year.</p>
          </div>
          <button className="self-start md:self-auto flex items-center gap-2 border border-[#E2E8F0] hover:border-[#123B6D] text-[#123B6D] px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
            <Calendar size={16} /> View Calendar
          </button>
        </div>

        {/* ===== EVENT CARDS GRID ===== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {visibleEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.35 }}
                className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                {/* Image with date badge */}
                <div className="relative h-44 overflow-hidden cursor-pointer" onClick={() => openModal(event)}>
                  <img
                    src={event.images[0]}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  {/* Date badge — top left */}
                  <div className="absolute top-3 left-3 bg-white rounded-xl px-3 py-2 shadow-md text-center min-w-[60px]">
                    <div className="text-[#123B6D] text-2xl font-black leading-none">{event.day}</div>
                    <div className="text-gray-400 text-[9px] font-semibold uppercase tracking-wide mt-0.5">{event.month}</div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-4">
                  <h3 className="text-[#0D1B3E] font-black text-sm leading-snug mb-1.5 group-hover:text-[#123B6D] transition-colors cursor-pointer" onClick={() => openModal(event)}>
                    {event.shortName}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <button
                      onClick={() => openModal(event)}
                      className="text-[#123B6D] text-xs font-bold hover:underline flex items-center gap-1 group/link"
                    >
                      View Details <ChevronRight size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={() => openModal(event)}
                      className="w-7 h-7 rounded-full border border-gray-200 hover:border-[#123B6D] hover:bg-[#123B6D] flex items-center justify-center group/btn transition-all">
                      <ChevronRight size={13} className="text-gray-400 group-hover/btn:text-white transition-colors" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ===== VIEW ALL BUTTON ===== */}
        {events.length > VISIBLE_INITIAL && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 border border-gray-200 hover:border-[#123B6D] hover:text-[#123B6D] text-gray-600 px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Grid3x3 size={16} />
              {showAll ? "Show Less" : "View All Activities"}
            </button>
          </div>
        )}

      </div>

      {/* ===== EVENT MODAL ===== */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors md:text-gray-500 md:bg-gray-100 md:hover:bg-gray-200"
              >
                <X size={20} />
              </button>

              {/* Carousel Section */}
              <div className="w-full md:w-1/2 relative bg-gray-900 min-h-[250px] sm:min-h-[300px] md:min-h-full flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    src={selectedEvent.images[currentImageIndex]}
                    alt={`${selectedEvent.name} - ${currentImageIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-contain bg-black/50"
                  />
                </AnimatePresence>
                
                {/* Carousel Controls */}
                {selectedEvent.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {selectedEvent.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Text Content Section */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
                <div className="inline-flex items-center gap-1.5 text-[#123B6D] text-xs font-bold mb-3 bg-[#EBF3FF] px-3 py-1 rounded-full w-fit">
                  <Calendar size={14} />
                  {selectedEvent.day} {selectedEvent.month}
                </div>
                
                <h2 className="text-2xl md:text-3xl font-black text-[#0D1B3E] mb-4">
                  {selectedEvent.name}
                </h2>
                
                <div className="w-12 h-1 bg-yellow-400 rounded-full mb-6"></div>
                
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {selectedEvent.fullDescription || selectedEvent.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

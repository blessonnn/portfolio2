"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TargetCursor from "./core/TargetCursor";

gsap.registerPlugin(ScrollTrigger);

const HOBBIES = [
  {
    id: "photography",
    title: "Photography",
    color: "#FFFFFF",
    images: Array.from({ length: 63 }, (_, i) => `/images/photography/${i + 1}.jpg`),
  },
  {
    id: "graphic-designing",
    title: "Graphic Designing",
    color: "#F4FF38",
    images: Array.from({ length: 21 }, (_, i) => `/images/graphic-designing/${i + 1}.jpg`),
  },
  {
    id: "drawing",
    title: "Drawing",
    color: "#FF6B6B",
    images: Array.from({ length: 1 }, (_, i) => `/images/drawing/${i + 1}.jpg`),
  },
  {
    id: "sound-designing",
    title: "Sound Designing",
    color: "#4D9FFF",
    images: Array.from({ length: 1 }, (_, i) => `/images/sound-designing/${i + 1}.jpg`),
  },
  {
    id: "musical-instruments",
    title: "Musical Instruments",
    color: "#B366FF",
    images: [
      "/images/musical-instruments/me-guitar.png",
      "/images/musical-instruments/me-keyboard.png",
      "/images/musical-instruments/me-ukulele.png",
    ],
  },
  {
    id: "playlist",
    title: "My Playlist",
    color: "#f1f5f9",
    images: [],
  },
];

const PLAYLIST_DATA = {
  "Christian Songs": [
    {
      "title": "Krushinmel",
      "artist": "Ashin Mathews",
      "cover": "https://i.ytimg.com/vi/3LZZvhMLz0M/hqdefault.jpg"
    },
    {
      "title": "En sankadangal sakalavum",
      "artist": "Stephen Devassy--HOLY HYMNS",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/7b/8f/4f/7b8f4ff3-6b8b-8522-cefe-a70c181dfc18/artwork.jpg/400x400bb.jpg"
    },
    {
      "title": "Thaan Vaazhkayaal",
      "artist": "Potters Vessel",
      "cover": "https://i.ytimg.com/vi/ZQhnrrv8Jmc/hqdefault.jpg"
    },
    {
      "title": "EN PREMA GEETHAMAM",
      "artist": "Steven Philip",
      "cover": "https://i.ytimg.com/vi/uovXp5H1m4U/hqdefault.jpg"
    },
    {
      "title": "Parisudhan Mahonnatha Devan",
      "artist": "Rex Media House©®",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/cc/4f/9c/cc4f9c08-13b4-7c34-a0ea-ebec58ac4a8d/859749079866_cover.jpg/400x400bb.jpg"
    },
    {
      "title": "Ente Yeshuve",
      "artist": "Rex Media House©®",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/f5/40/92/f54092cf-174e-7bd0-1f26-8fa13fae0a13/859774574374_cover.jpg/400x400bb.jpg"
    },
    {
      "title": "Rakshitaavine Kaanka Paapi",
      "artist": "Rex Media House©®",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/8e/9d/9b/8e9d9b55-25a1-0c7e-afdd-728b0f20a0e0/859749087465_cover.jpg/400x400bb.jpg"
    },
    {
      "title": "10,000 Reasons (Live)",
      "artist": "Matt Redman",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9d/a0/ea/9da0ea2e-9af3-d193-8ecc-98956ce475a6/14UMGIM13056.rgb.jpg/400x400bb.jpg"
    },
    {
      "title": "How Great Is Our God",
      "artist": "Chris Tomlin",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/05/46/f8/0546f839-a23d-c5fa-f3b9-25a063b0022a/13UABIM29803.rgb.jpg/400x400bb.jpg"
    },
    {
      "title": "Agnus Dei",
      "artist": "Passion & Kristian Stanfill",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/e4/3e/c0/e43ec0dc-cfd3-e52c-be45-b87f07cc8827/24UMGIM06462.rgb.jpg/400x400bb.jpg"
    },
    {
      "title": "Ninnoden Daivame",
      "artist": "Rex Media House",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/34/57/fd/3457fd10-4f24-a784-fd1f-d8978f1a9392/859702518159_cover.jpg/400x400bb.jpg"
    },
    {
      "title": "Onnumillaymayil ft. Stephen Devassy",
      "artist": "Potters Vessel",
      "cover": "https://i.ytimg.com/vi/sx0VjSLHlHQ/hqdefault.jpg"
    },
    {
      "title": "What a friend we have in Jesus",
      "artist": "EpicYouthWatsonville",
      "cover": "https://i.ytimg.com/vi/8SCorW9r_Is/hqdefault.jpg"
    },
    {
      "title": "Shobhayulloru Nadu..",
      "artist": "Blessy Ann Jojy",
      "cover": "https://i.ytimg.com/vi/Y1dC60r9yLw/hqdefault.jpg"
    },
    {
      "title": "Ulagamellam",
      "artist": "Krishnaraj",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/c6/34/d5/c634d588-394f-5adc-5c93-8f6090fb54bf/Cover.jpg/400x400bb.jpg"
    }
  ],
  "Movie Songs": [
    {
      "title": "Darmiyaan",
      "artist": "Shafqat Amanat Ali | Clinton Cerejo",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music18/v4/dc/53/46/dc534631-17ba-6932-250f-84dd558fc78e/8902894698481_cover.jpg/400x400bb.jpg"
    },
    {
      "title": "Ee mazha megham",
      "artist": "Remya Nambeesan",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3d/8e/b3/3d8eb325-4b50-5156-7003-076242dedc13/cover.jpg/400x400bb.jpg"
    },
    {
      "title": "Sneham cherum Neram",
      "artist": "Rinu Razak & Hesham Abdul Wahab",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3d/8e/b3/3d8eb325-4b50-5156-7003-076242dedc13/cover.jpg/400x400bb.jpg"
    },
    {
      "title": "Maula mere maula",
      "artist": "Roop Kumar Rathod",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0b/fa/58/0bfa58d1-a5b0-a1a9-502b-710d23fb7a18/191773226787.jpg/400x400bb.jpg"
    },
    {
      "title": "Mizhiyil ninnum",
      "artist": "Rex Vijayan, Shahabaz Aman",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/b9/54/1d/b9541dd4-b9a8-2a71-fa00-23e8b7d15c4b/600137587148.jpg/400x400bb.jpg"
    },
    {
      "title": "tere pass mein",
      "artist": "A.R. Rahman, Irshad Kamil",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c5/e3/a8/c5e3a8e2-f166-23b8-2159-ee04b8511897/8902894362733_cover.jpg/400x400bb.jpg"
    },
    {
      "title": "Pehla nasha",
      "artist": "Udit Narayan & Sadhana Sargam",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/96/c9/3a/96c93aa7-1872-8297-493a-2fc72d540af0/191773221072.jpg/400x400bb.jpg"
    },
    {
      "title": "Suthi Suthi Vandheega",
      "artist": "Star Hits",
      "cover": "https://i.ytimg.com/vi/Gzp8GsgB8D0/hqdefault.jpg"
    },
    {
      "title": "Azhalinte Azhangalil M",
      "artist": "Nikhil Mathew",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/07/6c/35/076c355b-9596-afbd-df24-38934f70e1f8/888831263739.jpg/400x400bb.jpg"
    },
    {
      "title": "Surili Akhiyon Wale",
      "artist": "Rahat Fateh Ali Khan & Suzanne D'Mello",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/87/57/16/87571644-99ef-c590-1b2b-ce8deef765d5/196871079297.jpg/400x400bb.jpg"
    },
    {
      "title": "Piku Theme (Slide Guitar)",
      "artist": "Amritanshu Dutta",
      "cover": "https://i.ytimg.com/vi/7WhaY6pV4jg/hqdefault.jpg"
    },
    {
      "title": "Malargaley",
      "artist": "Hariharan, KS Chitra",
      "cover": "https://i.ytimg.com/vi/1598dNdNq04/hqdefault.jpg"
    },
    {
      "title": "Rasathi",
      "artist": "A.R. Rahman & Shahul Hameed",
      "cover": "https://i.ytimg.com/vi/qM-TJg4cHHU/hqdefault.jpg"
    },
    {
      "title": "Shararanthal Thiri Thanu",
      "artist": "Chris Wayne & K.J. Yesudas",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/03/32/85/03328584-1285-4844-7d8a-1278df0f16d2/198391511998.jpg/400x400bb.jpg"
    },
    {
      "title": "Kaathil Thenmazhayayi",
      "artist": "Ishaan Dev",
      "cover": "https://i.ytimg.com/vi/FwE3ifix71c/hqdefault.jpg"
    },
    {
      "title": "Aanandhame",
      "artist": "Anne Amie",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/b5/26/67/b52667a4-45ef-211c-6c5a-6ec807d3d263/cover.jpg/400x400bb.jpg"
    },
    {
      "title": "The metro proposal",
      "artist": "Sai Abhyankkar",
      "cover": "https://i.ytimg.com/vi/gtTjNSeNwDg/hqdefault.jpg"
    },
    {
      "title": "Channa Ve",
      "artist": "Akhil Sachdeva & Mansheel Gujral",
      "cover": "https://i.ytimg.com/vi/se9DDAwwGQY/hqdefault.jpg"
    },
    {
      "title": "Nenjukkule",
      "artist": "A.R. Rahman, Shakthisree Gopalan",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/40/94/2e/40942ea9-62d8-7c4b-7e1e-0d2c7f382fd3/886443785922.jpg/400x400bb.jpg"
    },
    {
      "title": "Yenga Pona Raasa",
      "artist": "A.R. Rahman & Shakthisree Gopalan",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/d5/fc/32/d5fc32b1-82c6-39bb-4e20-6b93d8c21ec5/886443977525.jpg/400x400bb.jpg"
    },
    {
      "title": "Raavu Mayave",
      "artist": "Rinu Razak & Shaan Rahman",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music49/v4/72/8c/eb/728ceb4e-f7e8-f3fb-3b2d-264d41687f9d/cover.jpg/400x400bb.jpg"
    },
    {
      "title": "Mounam Chorum Neram",
      "artist": "Rinu Razak",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3d/8e/b3/3d8eb325-4b50-5156-7003-076242dedc13/cover.jpg/400x400bb.jpg"
    },
    {
      "title": "Mehrama",
      "artist": "Pritam & Antara Mitra",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/65/3a/63/653a634d-0193-c0f2-5d20-f3a3940ff21e/886448303862.jpg/400x400bb.jpg"
    },
    {
      "title": "Nila Kaaigiradhu",
      "artist": "Harini • Indira",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f4/83/55/f4835593-e898-1b3e-6a51-c5a373f4a44c/8905750043203.jpg/400x400bb.jpg"
    },
    {
      "title": "Netru Aval Irundhaal",
      "artist": "A.R. Rahman, Chinmayi",
      "cover": "https://i.ytimg.com/vi/OXBAO344nro/hqdefault.jpg"
    },
    {
      "title": "Maduraikku Pogathadi",
      "artist": "AR Rahman",
      "cover": "https://i.ytimg.com/vi/S_gkPs2svE0/hqdefault.jpg"
    }
  ],
  "English Songs": [
    {
      "title": "Elysium",
      "artist": "Gavin Greenaway",
      "cover": "https://i.ytimg.com/vi/TaDajIe05bw/hqdefault.jpg"
    },
    {
      "title": "The Wheat",
      "artist": "Gavin Greenaway",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/22/2a/1d/222a1d18-6d21-fec2-3ef0-ce0f7988ed65/06UMGIM05485.rgb.jpg/400x400bb.jpg"
    },
    {
      "title": "What I Am",
      "artist": "ZAYN",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4a/8c/bb/4a8cbb7c-24be-a078-3f46-413448016f00/24UMGIM24554.rgb.jpg/400x400bb.jpg"
    },
    {
      "title": "hope to see you again",
      "artist": "Antent",
      "cover": "https://i.ytimg.com/vi/r9k74AGYZoU/hqdefault.jpg"
    },
    {
      "title": "love nwantiti [Remix]",
      "artist": "CKay",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/47/75/a4/4775a4de-e5bd-e553-7dec-5a3911718276/795152501603.jpg/400x400bb.jpg"
    },
    {
      "title": "I Thought I Saw Your Face Today",
      "artist": "She & Him",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/64/9c/75/649c75a3-0a3b-3c21-53ea-096036de40a0/56995.jpg/400x400bb.jpg"
    },
    {
      "title": "Dusk Till Dawn",
      "artist": "ZAYN",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/9d/25/4c/9d254c6f-1af8-c3e2-ff1a-f30ca2dbe45b/886446731896.jpg/400x400bb.jpg"
    },
    {
      "title": "I Have A Dream",
      "artist": "ABBA",
      "cover": "https://i.ytimg.com/vi/ER_3h03omdE/hqdefault.jpg"
    },
    {
      "title": "Rose",
      "artist": "James Horner",
      "cover": "https://i.ytimg.com/vi/iUH0dEe1jvA/hqdefault.jpg"
    },
    {
      "title": "The One",
      "artist": "The Chainsmokers",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/a0/f1/89/a0f1896b-fe64-cf1c-cf08-23a429b27c47/Groovy_Bites_-_U_Dance_DJ_Session_1.jpg/400x400bb.jpg"
    },
    {
      "title": "death bed",
      "artist": "Powfu & beabadoobee",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/8b/a9/36/8ba936f3-2d8b-1012-89cc-92f75eb76961/886448289180.jpg/400x400bb.jpg"
    },
    {
      "title": "Novocaine 2",
      "artist": "Cloke & Shiloh Dynasty",
      "cover": "https://i.ytimg.com/vi/jYFz6b2Kgx4/hqdefault.jpg"
    },
    {
      "title": "Falling",
      "artist": "Trevor Daniel",
      "cover": "https://i.ytimg.com/vi/L7mfjvdnPno/hqdefault.jpg"
    },
    {
      "title": "comethru",
      "artist": "Jeremy Zucker",
      "cover": "https://i.ytimg.com/vi/jO2viLEW-1A/hqdefault.jpg"
    },
    {
      "title": "Mia & Sebastian's Theme",
      "artist": "Leiki Ueda",
      "cover": "https://i.ytimg.com/vi/GTAkRwdrUV8/hqdefault.jpg"
    },
    {
      "title": "Peaches",
      "artist": "Justin Bieber",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e0/92/da/e092da2d-9f6d-11dc-7843-2021e95a2b61/21UMGIM17518.rgb.jpg/400x400bb.jpg"
    },
    {
      "title": "Those Eyes",
      "artist": "New West",
      "cover": "https://i.ytimg.com/vi/t1dvrcqlQgI/hqdefault.jpg"
    },
    {
      "title": "hotline (edit)",
      "artist": "Billie Eilish",
      "cover": "https://i.ytimg.com/vi/VpEITQDQRec/hqdefault.jpg"
    },
    {
      "title": "Distorted Records",
      "artist": "A$AP Rocky",
      "cover": "https://i.ytimg.com/vi/wfWDmYDT9fo/hqdefault.jpg"
    },
    {
      "title": "Blue Over You",
      "artist": "Mason Ramsey",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ba/6c/12/ba6c1209-aef5-d2ab-4a85-b64f3e26f1b4/075679653772.jpg/400x400bb.jpg"
    },
    {
      "title": "Beggin'",
      "artist": "Måneskin",
      "cover": "https://i.ytimg.com/vi/W2MpGCL8-9o/hqdefault.jpg"
    },
    {
      "title": "Sprinter",
      "artist": "Dave & Central Cee",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/35/be/8b/35be8ba3-14c7-b9fc-6b29-7ba48296a086/4a14b8ff-03eb-4b85-ae06-021a3bd2e18d.jpg/400x400bb.jpg"
    },
    {
      "title": "You Deserve It All",
      "artist": "John Legend",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/2a/94/df/2a94dfe8-9676-cc73-c168-2bac0831479e/21UM1IM38159.rgb.jpg/400x400bb.jpg"
    },
    {
      "title": "DAISIES",
      "artist": "Justin Bieber",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f9/09/36/f9093663-c05f-7f95-0a60-4e95d52fbb22/25UMGIM93915.rgb.jpg/400x400bb.jpg"
    }
  ],
  "Classical": [
    {
      "title": "Symphony No. 40 In G Minor",
      "artist": "Wolfgang Amadeus Mozart",
      "cover": "https://i.ytimg.com/vi/JTc1mDieQI8/hqdefault.jpg"
    },
    {
      "title": "Gymnopédie No. 1",
      "artist": "Erik Satie",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d9/6f/d5/d96fd59f-22a4-9c42-7ce4-1d0aafa841d2/752470763120_cover.jpg/400x400bb.jpg"
    },
    {
      "title": "Für Elise",
      "artist": "Beethoven",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/65/cb/e2/65cbe295-d928-967d-cb49-f92ea7f23c2c/s05.zzneiwwn.tif/400x400bb.jpg"
    },
    {
      "title": "Canon in D",
      "artist": "Brooklyn Duo",
      "cover": "https://i.ytimg.com/vi/Ptk_1Dc2iPY/hqdefault.jpg"
    },
    {
      "title": "Moonlight Sonata - 3rd Movement",
      "artist": "Rousseau",
      "cover": ""
    },
    {
      "title": "Moonlight Sonata",
      "artist": "Ludwig Van Beethoven",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/b0/1e/21/b01e21ce-13ab-535f-0d96-4c52235cf21c/8720923871205.png/400x400bb.jpg"
    },
    {
      "title": "Summer - The Four Seasons",
      "artist": "Rousseau",
      "cover": ""
    },
    {
      "title": "Passacaglia",
      "artist": "Pianovus",
      "cover": ""
    }
  ]
};

const StepperProgress = ({ active }: { active: boolean }) => {
  return (
    <div className="relative flex items-center justify-between w-24 md:w-32 h-6 pointer-events-none select-none">
      {/* Background Line */}
      <div 
        className={`absolute left-0 right-0 h-[2px] z-0 transition-colors duration-300 ${
          active ? "bg-black/20" : "bg-white/20"
        }`} 
      />
      
      {/* Animated Progress Line */}
      <div 
        className={`absolute left-0 h-[2px] bg-black z-0 origin-left transition-all duration-1000 ease-out ${
          active ? "w-[66%]" : "w-0"
        }`}
        style={{ transitionDelay: active ? "100ms" : "0ms" }}
      />
      
      {/* 4 Dots */}
      <div className="absolute inset-0 flex justify-between items-center z-10">
        {/* Dot 1 */}
        <div 
          className={`w-3 h-3 rounded-full border transition-all duration-300 ${
            active ? "bg-black border-black" : "bg-transparent border-white/40"
          }`}
          style={{ transitionDelay: active ? "100ms" : "0ms" }}
        />
        {/* Dot 2 */}
        <div 
          className={`w-3 h-3 rounded-full border transition-all duration-300 ${
            active ? "bg-black border-black" : "bg-transparent border-white/40"
          }`}
          style={{ transitionDelay: active ? "400ms" : "0ms" }}
        />
        {/* Dot 3 */}
        <div 
          className={`w-3 h-3 rounded-full border transition-all duration-300 ${
            active ? "bg-black border-black" : "bg-transparent border-white/40"
          }`}
          style={{ transitionDelay: active ? "700ms" : "0ms" }}
        />
        {/* Dot 4 */}
        <div 
          className={`w-3 h-3 rounded-full border transition-all duration-300 ${
            active ? "bg-transparent border-black" : "bg-transparent border-white/40"
          }`}
        />
      </div>
    </div>
  );
};

const HobbiesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [activeHobby, setActiveHobby] = useState<string | null>(null);
  const [inProgressId, setInProgressId] = useState<string | null>(null);
  const [clickedRowRect, setClickedRowRect] = useState<DOMRect | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const gridOverlayRef = useRef<HTMLDivElement>(null);
  const gridContentRef = useRef<HTMLDivElement>(null);
  const hasOpenedHobby = useRef(false);

  const handleHobbyClick = (id: string, e: React.MouseEvent) => {
    if (["drawing", "sound-designing"].includes(id)) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setInProgressId(id);
      timeoutRef.current = setTimeout(() => {
        setInProgressId(null);
      }, 2500);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setClickedRowRect(rect);
      setActiveHobby(id);
      hasOpenedHobby.current = true;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    // Handle lenis if it's attached globally
    const lenis = (window as any).lenisInstance;
    
    if (activeHobby !== null) {
      document.body.style.overflow = "hidden";
      document.body.classList.add('hobbies-active');
      if (lenis && typeof lenis.stop === 'function') lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis && typeof lenis.start === 'function') lenis.start();
    }

    return () => {
      document.body.style.overflow = "";
      if (lenis && typeof lenis.start === 'function') lenis.start();
    };
  }, [activeHobby]);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        toggleClass: { targets: "body", className: "hobbies-active" }
      });

      // Create the main timeline for the scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=800", // Shorter scrolling space so it feels less 'stuck'
          pin: true,
          scrub: 1,
        },
      });

      // 1. Animate text entering from the right
      tl.fromTo(
        textRef.current,
        { x: "100vw" },
        {
          x: "0%", // Move to center
          duration: 2,
          ease: "power2.out",
        }
      );

      // 2. Fade out and blur the huge text
      tl.to(
        textRef.current,
        {
          opacity: 0,
          filter: "blur(20px)",
          duration: 1,
          ease: "power1.inOut",
        }
      );

      // 3. Fade in the list/content container
      tl.to(
        contentRef.current,
        {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.1,
          ease: "power2.out",
        },
        "-=0.5" // Overlap slightly with the text fade out
      );

      // 4. Stagger slide-in the list items from the right
      const listItems = containerRef.current?.querySelectorAll(".hobby-list-item") || [];
      tl.fromTo(
        listItems,
        { x: "50%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );

    },
    { scope: containerRef }
  );

  useGSAP(() => {
    if (activeHobby) {
      // Set initial state for batching
      gsap.set(".hobby-image-item img", { scale: 0.9, transformOrigin: "center center" });

      ScrollTrigger.batch(".hobby-image-item", {
        scroller: "#hobby-scroll-container",
        start: "top bottom-=40",
        onEnter: (batch) => {
          const imgs = batch.map(el => el.querySelector("img")).filter(Boolean);
          gsap.to(imgs, {
            scale: 1,
            duration: 1.2,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true
          });
        },
        onLeaveBack: (batch) => {
          const imgs = batch.map(el => el.querySelector("img")).filter(Boolean);
          gsap.to(imgs, {
            scale: 0.9,
            duration: 0.4,
            ease: "power2.in",
            overwrite: true
          });
        }
      });
    }
  }, { dependencies: [activeHobby] });

  const handleCloseGrid = () => {
    if (!gridOverlayRef.current || !gridContentRef.current) {
      setActiveHobby(null);
      setClickedRowRect(null);
      return;
    }

    gsap.timeline()
      .to(gridContentRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.25,
        ease: "power2.in"
      })
      .to(gridOverlayRef.current, {
        y: "-100%",
        duration: 0.45,
        ease: "power3.inOut"
      }, "-=0.1")
      .to("#navbar-container", {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.25")
      .add(() => {
        setActiveHobby(null);
        setClickedRowRect(null);
        gsap.set(gridOverlayRef.current, { y: "0%" });
      });
  };

  useEffect(() => {
    if (activeHobby === null && hasOpenedHobby.current) {
      const listItems = containerRef.current?.querySelectorAll(".hobby-list-item");
      if (listItems && listItems.length > 0) {
        gsap.fromTo(listItems,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out", overwrite: "auto" }
        );
      }
    }
  }, [activeHobby]);

  useGSAP(() => {
    if (activeHobby && clickedRowRect && gridOverlayRef.current && gridContentRef.current) {
      gsap.killTweensOf([gridOverlayRef.current, gridContentRef.current, "#navbar-container"]);

      gsap.set(gridOverlayRef.current, {
        top: clickedRowRect.top,
        height: clickedRowRect.height,
        opacity: 1
      });
      gsap.set(gridContentRef.current, {
        opacity: 0,
        y: 30
      });

      gsap.timeline()
        .to("#navbar-container", {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.3,
          ease: "power2.out"
        }, 0)
        .to(gridOverlayRef.current, {
          top: 0,
          height: "100vh",
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            ScrollTrigger.refresh();
          }
        }, 0)
        .to(gridContentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.2");
    }
  }, { dependencies: [activeHobby, clickedRowRect] });

  return (
    <section
      ref={containerRef}
      id="hobbies"
      className="relative w-full h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col items-center justify-center"
    >
      <TargetCursor 
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={false}
        parallaxOn={true}
        cursorColor="#3874ff"
        cursorColorOnTarget="#3874ff"
      />
      {/* Huge scrolling text */}
      <h2
        ref={textRef}
        className="absolute text-[15vw] leading-none font-bold tracking-tighter whitespace-nowrap will-change-transform z-0"
      >
        HOBBIES
      </h2>

      {/* Content Wrapper (List or Grid) */}
      <div
        ref={contentRef}
        className="absolute inset-0 w-full h-full flex flex-col opacity-0 pointer-events-none z-10 pt-24 px-0 pb-12 overflow-hidden"
      >
        {activeHobby === null && (
          /* List View */
          <div className="flex-1 w-full overflow-y-auto no-scrollbar">
            <div className="flex flex-col justify-center min-h-full">
            {HOBBIES.map((hobby) => {
              const isInProgress = inProgressId === hobby.id;

              return (
                <div
                  key={hobby.id}
                  onClick={(e) => handleHobbyClick(hobby.id, e)
    }
                  className="hobby-list-item cursor-target group relative border-b border-white/20 py-3 md:py-4 cursor-pointer overflow-hidden transition-colors"
                >
                  {/* Random color hover background */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: hobby.color }}
                  />

                  {/* Text Content */}
                  <div className="relative z-10 flex items-center justify-between px-6 md:px-12">
                    <div className="relative h-10 md:h-12 flex items-center w-full overflow-hidden">
                      {/* Original Title */}
                      <h3 className={`absolute left-0 text-3xl md:text-5xl font-medium text-white group-hover:text-black transition-all duration-500 transform ${isInProgress ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                        {hobby.title}
                      </h3>
                      {/* "In Progress" Message */}
                      <h3 className={`absolute left-0 text-3xl md:text-5xl font-medium text-white group-hover:text-black transition-all duration-500 transform ${isInProgress ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                        In Progress
                      </h3>
                    </div>
                    <div className="relative w-24 md:w-32 h-6 flex items-center justify-end">
                      {/* Default Arrow */}
                      <span className={`absolute right-0 text-3xl opacity-0 group-hover:opacity-100 group-hover:text-black transition-all duration-300 -translate-x-4 group-hover:translate-x-0 ${isInProgress ? 'opacity-0 scale-0 pointer-events-none' : ''}`}>
                        &rarr;
                      </span>

                      {/* Stepper Progress Bar */}
                      {["drawing", "sound-designing"].includes(hobby.id) && (
                        <div className={`absolute right-0 transition-all duration-500 transform ${isInProgress ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 translate-x-4 pointer-events-none'}`}>
                          <StepperProgress active={isInProgress} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        )}
      </div>

      {/* Grid View (Fixed Overlay rendered via Portal) */}
      {activeHobby !== null && typeof window !== "undefined" && createPortal(
        <div 
          ref={gridOverlayRef}
          className="fixed left-0 right-0 z-[200] text-black flex flex-col overflow-hidden"
          style={{ 
            backgroundColor: HOBBIES.find((h) => h.id === activeHobby)?.color || "#ffffff",
            top: clickedRowRect ? `${clickedRowRect.top}px` : "0px",
            height: clickedRowRect ? `${clickedRowRect.height}px` : "100vh",
            opacity: clickedRowRect ? 0 : 1
          }}
        >
          <div ref={gridContentRef} className="w-full h-full flex flex-col overflow-hidden relative">
            {/* Header / Back Button */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-12 pt-8 pb-4 flex items-center justify-between z-10 shrink-0">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCloseGrid(); }}
                className="px-6 py-2 bg-black text-white text-xl md:text-2xl font-medium rounded-full hover:bg-black/80 transition-colors flex items-center gap-2 cursor-pointer cursor-target shadow-2xl"
              >
                &larr; Back
              </button>
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-black">
                {HOBBIES.find((h) => h.id === activeHobby)?.title}
              </h3>
            </div>

            {/* Scrollable Grid Container */}
            <div 
              id="hobby-scroll-container"
              className="flex-1 w-full overflow-y-auto no-scrollbar pb-32"
              data-lenis-prevent="true"
            >
              <div className="max-w-7xl mx-auto w-full px-4 md:px-12">
                {activeHobby === "musical-instruments" ? (
                  <div className="flex flex-col gap-12 md:gap-16 max-w-4xl mx-auto w-full">
                    {HOBBIES.find((h) => h.id === activeHobby)?.images.map((src, i) => (
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={i}
                        className="hobby-image-item cursor-target relative w-full overflow-hidden transition-all duration-300 block shadow-md hover:shadow-2xl hover:-translate-y-1"
                      >
                        <img
                          src={src}
                          alt={`Hobby img ${i}`}
                          className="w-full h-auto object-contain"
                          loading="lazy"
                        />
                      </a>
                    ))}
                  </div>
                ) : activeHobby === "playlist" ? (
                  <div className="w-full pb-20">
                    {Object.entries(PLAYLIST_DATA).map(([category, songs], cIdx) => (
                      <div key={cIdx} className="mb-16">
                        <h4 className="text-xl md:text-2xl font-bold mb-6 text-black/80 uppercase tracking-widest border-b border-black/10 pb-2">{category}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                          {songs.map((song, sIdx) => {
                            const searchQuery = encodeURIComponent(`${song.title} ${song.artist}`);
                            const ytMusicLink = `https://music.youtube.com/search?q=${searchQuery}`;
                            
                            const hue1 = (song.title.length * 12) % 360;
                            const hue2 = (song.artist.length * 20) % 360;
                            const bgGradient = `linear-gradient(135deg, hsl(${hue1}, 70%, 60%), hsl(${hue2}, 70%, 30%))`;

                            return (
                              <a
                                key={sIdx}
                                href={ytMusicLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group cursor-target relative flex flex-col gap-2 transition-all duration-300"
                              >
                                <div className="relative aspect-square w-full rounded-md shadow-md bg-zinc-900 group-hover:shadow-2xl transition-all duration-500 flex items-center justify-center overflow-visible">
                                  
                                  <div 
                                    className="absolute inset-0 rounded-md z-20 transition-transform duration-500 ease-out group-hover:-translate-x-2 group-hover:-rotate-2 group-hover:scale-95 overflow-hidden"
                                    style={!song.cover ? { background: bgGradient } : { backgroundColor: '#111' }}
                                  >
                                    {song.cover && (
                                      <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                                    )}
                                    <div className="absolute bottom-2 left-2 z-30 opacity-70 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 rounded-full p-1 backdrop-blur-sm">
                                      <svg viewBox="0 0 24 24" fill="#FF0000" className="w-5 h-5 drop-shadow-md">
                                        <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M9.5,16.5v-9l7,4.5L9.5,16.5z"/>
                                      </svg>
                                    </div>
                                  </div>

                                </div>

                                <div className="mt-1 flex flex-col">
                                  <span className="text-black font-bold text-sm md:text-base leading-tight truncate group-hover:text-[#3874ff] transition-colors">{song.title}</span>
                                  <span className="text-black/60 text-xs md:text-sm truncate">{song.artist}</span>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="group grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 w-full">
                    {HOBBIES.find((h) => h.id === activeHobby)?.images.map((src, i) => (
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={i}
                        className="hobby-image-item cursor-target relative aspect-[3/4] bg-gray-100 overflow-hidden rounded-none transition-all duration-300 block shadow-sm hover:shadow-xl hover:-translate-y-1"
                      >
                        <img
                          src={src}
                          alt={`Hobby img ${i}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Gaussian Linear Gradient Blur Overlay (50% Opacity) */}
            <div
              className="absolute bottom-0 left-0 w-full pointer-events-none z-20"
              style={{
                height: "15vh",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                maskImage: "linear-gradient(to top, black 0%, black 20%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to top, black 0%, black 20%, transparent 100%)",
                opacity: 0.5
              }}
            />

            {/* Bottom Black Linear Gradient Overlay (50% Opacity) */}
            <div
              className="absolute bottom-0 left-0 w-full pointer-events-none z-30 bg-gradient-to-t from-black to-transparent"
              style={{
                height: "15vh",
                opacity: 0.5
              }}
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default HobbiesSection;

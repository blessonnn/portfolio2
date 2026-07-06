"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

// Gather all covers just in case we need them (e.g. for a default fallback), but currently unused for mosaic
const ALL_COVERS = Object.values(PLAYLIST_DATA)
  .flat()
  .map(s => s.cover)
  .filter(Boolean);

export default function PlaylistView() {
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null);
  const [gradientMap, setGradientMap] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!hoveredAlbum || gradientMap[hoveredAlbum]) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = hoveredAlbum;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = 3;
      canvas.height = 3;
      ctx.drawImage(img, 0, 0, 3, 3);
      
      const tl = ctx.getImageData(0, 0, 1, 1).data;
      const tr = ctx.getImageData(2, 0, 1, 1).data;
      const bl = ctx.getImageData(0, 2, 1, 1).data;
      const br = ctx.getImageData(2, 2, 1, 1).data;
      const center = ctx.getImageData(1, 1, 1, 1).data;
      
      const c1 = `rgb(${tl[0]},${tl[1]},${tl[2]})`;
      const c2 = `rgb(${tr[0]},${tr[1]},${tr[2]})`;
      const c3 = `rgb(${bl[0]},${bl[1]},${bl[2]})`;
      const c4 = `rgb(${br[0]},${br[1]},${br[2]})`;
      const cc = `rgb(${center[0]},${center[1]},${center[2]})`;
      
      const gradient = `
        radial-gradient(circle at top left, ${c1}, transparent 70%),
        radial-gradient(circle at top right, ${c2}, transparent 70%),
        radial-gradient(circle at bottom left, ${c3}, transparent 70%),
        radial-gradient(circle at bottom right, ${c4}, transparent 70%),
        radial-gradient(circle at center, ${cc}, transparent 80%)
      `;
      
      setGradientMap(prev => ({ ...prev, [hoveredAlbum]: gradient }));
    };
  }, [hoveredAlbum, gradientMap]);

  return (
    <>
      {/* --- FIXED BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a] pointer-events-none transition-colors duration-1000">
        
        {/* Dynamic Extracted Gradient Blur Aura */}
        <AnimatePresence>
          {hoveredAlbum && gradientMap[hoveredAlbum] && (
            <motion.div
              key={hoveredAlbum}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 z-10"
              style={{
                background: gradientMap[hoveredAlbum],
                filter: 'blur(60px) saturate(1.5)',
                transform: 'scale(1.2)'
              }}
            />
          )}
        </AnimatePresence>
        
        {/* Soft vignette to ensure text readability */}
        <div className="absolute inset-0 z-30 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        <div className="absolute inset-0 z-30 bg-black/10" />
      </div>

      {/* --- PLAYLIST CONTENT --- */}
      <div className="relative w-full pb-20 z-10 text-white">
        {Object.entries(PLAYLIST_DATA).map(([category, songs], cIdx) => (
          <div key={cIdx} className="mb-16">
            <h4 className="text-xl md:text-2xl font-bold mb-6 text-white/90 uppercase tracking-widest border-b border-white/20 pb-2">
              {category}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {songs.map((song, sIdx) => {
                const searchQuery = encodeURIComponent(`${song.title} ${song.artist}`);
                const ytMusicLink = `https://music.youtube.com/search?q=${searchQuery}`;
                
                const hue1 = (song.title.length * 12) % 360;
                const hue2 = (song.artist.length * 20) % 360;
                const bgGradient = `linear-gradient(135deg, hsl(${hue1}, 70%, 40%), hsl(${hue2}, 70%, 20%))`;

                return (
                  <a
                    key={sIdx}
                    href={ytMusicLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => song.cover && setHoveredAlbum(song.cover)}
                    onMouseLeave={() => setHoveredAlbum(null)}
                    className="group cursor-target relative flex flex-col gap-2 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative aspect-square w-full rounded-xl shadow-lg bg-zinc-900/50 group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 flex items-center justify-center overflow-hidden border border-white/5 group-hover:border-white/20">
                      
                      <div 
                        className="absolute inset-0 z-20 transition-transform duration-700 ease-out group-hover:scale-110"
                        style={!song.cover ? { background: bgGradient } : { backgroundColor: '#111' }}
                      >
                        {song.cover && (
                          <img src={song.cover} alt={song.title} className="w-full h-full object-cover" loading="lazy" />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute bottom-3 left-3 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white drop-shadow-md">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                    </div>

                    <div className="mt-2 flex flex-col px-1">
                      <span className="text-white/90 font-bold text-sm md:text-base leading-tight truncate group-hover:text-white transition-colors drop-shadow-md">
                        {song.title}
                      </span>
                      <span className="text-white/60 text-xs md:text-sm truncate drop-shadow-md">
                        {song.artist}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

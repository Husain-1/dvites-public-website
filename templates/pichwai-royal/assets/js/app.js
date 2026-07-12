/* Dvites — Pichwai Royal wedding invitation */
const WEDDING_CONFIG = {
  bride: "Tanya",
  groom: "Rohan",
  date: "2026-12-12",
  displayDate: "12 December 2026",
  venue: "The Oberoi Udaivilas",
  city: "Udaipur",
  hashtag: "#TanyaWedsRohan",

  brideFather: "Mr. Rajesh Sharma",
  brideMother: "Mrs. Kavita Sharma",
  groomFather: "Mr. Sanjay Kapoor",
  groomMother: "Mrs. Neeta Kapoor",

  story:
    "A monsoon evening in Udaipur, a marigold archway, and a girl laughing in the rain — that was all it took.",

  whatsappNumber: "91XXXXXXXXXX",

  events: [
    {
      title: "Mehendi",
      date: "10 December 2026",
      time: "4:00 PM",
      venue: "The Garden Courtyard"
    },
    {
      title: "Sangeet",
      date: "11 December 2026",
      time: "7:00 PM",
      venue: "The Royal Ballroom"
    },
    {
      title: "Wedding",
      date: "12 December 2026",
      time: "6:00 PM",
      venue: "The Oberoi Udaivilas"
    }
  ],

  gallery: [
    "./assets/images/demo-1.webp",
    "./assets/images/demo-2.webp",
    "./assets/images/demo-3.webp",
    "./assets/images/demo-4.webp"
  ]
};

function displayToIso(display) {
  if (!display) return "";
  var parsed = Date.parse(String(display).replace(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/, "$2 $1, $3"));
  if (isNaN(parsed)) return "";
  return new Date(parsed).toISOString().slice(0, 10);
}

function eventIdFromTitle(title) {
  var key = String(title || "").toLowerCase();
  if (key.indexOf("mehendi") !== -1) return "mehendi";
  if (key.indexOf("sangeet") !== -1) return "sangeet";
  if (key.indexOf("haldi") !== -1) return "haldi";
  if (key.indexOf("reception") !== -1) return "reception";
  if (key.indexOf("wedding") !== -1 || key.indexOf("shaadi") !== -1) return "shaadi";
  return key.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "custom";
}

function buildGoogleCalendarUrl() {
  var start = (WEDDING_CONFIG.date || "").replace(/-/g, "");
  if (!start) return "#";
  var endDate = new Date(WEDDING_CONFIG.date + "T12:00:00");
  endDate.setDate(endDate.getDate() + 1);
  var end = endDate.toISOString().slice(0, 10).replace(/-/g, "");
  var text = encodeURIComponent(WEDDING_CONFIG.bride + " weds " + WEDDING_CONFIG.groom);
  var location = encodeURIComponent([WEDDING_CONFIG.venue, WEDDING_CONFIG.city].filter(Boolean).join(", "));
  return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + text + "&dates=" + start + "/" + end + "&location=" + location;
}

function buildAppleCalendarData() {
  var start = (WEDDING_CONFIG.date || "").replace(/-/g, "");
  if (!start) return "";
  var endDate = new Date(WEDDING_CONFIG.date + "T12:00:00");
  endDate.setDate(endDate.getDate() + 1);
  var end = endDate.toISOString().slice(0, 10).replace(/-/g, "");
  var lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dvites//Wedding//EN",
    "BEGIN:VEVENT",
    "DTSTART;VALUE=DATE:" + start,
    "DTEND;VALUE=DATE:" + end,
    "SUMMARY:" + WEDDING_CONFIG.bride + " weds " + WEDDING_CONFIG.groom,
    "LOCATION:" + [WEDDING_CONFIG.venue, WEDDING_CONFIG.city].filter(Boolean).join(", "),
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ];
  return lines.join("\r\n");
}

function buildWeddingRuntimeConfig() {
  var venueLine = [WEDDING_CONFIG.venue, WEDDING_CONFIG.city].filter(Boolean).join(", ");
  return {
    couple: {
      bride: WEDDING_CONFIG.bride,
      groom: WEDDING_CONFIG.groom,
      date: WEDDING_CONFIG.date,
      venue: venueLine,
      whatsapp: WEDDING_CONFIG.whatsappNumber,
      hashtag: WEDDING_CONFIG.hashtag
    },
    invite: {
      blessing: "With the blessings of the divine",
      brideFather: WEDDING_CONFIG.brideFather,
      brideMother: WEDDING_CONFIG.brideMother,
      groomFather: WEDDING_CONFIG.groomFather,
      groomMother: WEDDING_CONFIG.groomMother,
      showGrandparents: false
    },
    events: WEDDING_CONFIG.events.map(function (event) {
      return {
        id: eventIdFromTitle(event.title),
        name: event.title,
        date: displayToIso(event.date) || WEDDING_CONFIG.date,
        time: event.time || "",
        venue: event.venue || "",
        desc: event.note || ""
      };
    }),
    story: {
      show: true,
      storyMode: "story",
      storyText: WEDDING_CONFIG.story,
      customHashtag: WEDDING_CONFIG.hashtag,
      tags: []
    },
    gallery: {
      show: true,
      layout: String((WEDDING_CONFIG.gallery || []).length || 4),
      photos: WEDDING_CONFIG.gallery || []
    },
    thingsToKnow: [
      { id: "dress-code", label: "Dress Code", value: "Festive Indian elegance. Sarees, lehengas and sherwanis are warmly encouraged." },
      { id: "venue", label: "Venue", value: venueLine + ". All celebrations take place within the palace grounds.", mapsLink: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(venueLine) },
      { id: "stay-options", label: "Stay Options", value: "A curated block of rooms has been reserved. Please book by 1st November 2026." },
      { id: "hashtag", label: "Wedding Hashtag", value: "Share your favourite moments with " + WEDDING_CONFIG.hashtag + "." }
    ],
    rsvp: {
      mode: "whatsapp",
      heading: "Will you join us?",
      subtext: "We've saved a seat for you — at our table, in our hearts, and under the royal sky. Come celebrate with us as we begin this new chapter together.",
      btnText: "Yes, I'll be there"
    },
    music: {
      enabled: true,
      src: "./assets/audio/music.mp3",
      name: "Background music"
    },
    calendarUrls: {
      google: buildGoogleCalendarUrl(),
      apple: "data:text/calendar;charset=utf8," + encodeURIComponent(buildAppleCalendarData())
    }
  };
}

window.__WEDDING_CONFIG__ = buildWeddingRuntimeConfig();

function applyDvitesPostOverrides() {
  document.title = WEDDING_CONFIG.bride + " & " + WEDDING_CONFIG.groom + "'s Wedding | Dvites";

  var inviteNames = document.getElementById("inviteNames");
  if (inviteNames) {
    var brideParents = [WEDDING_CONFIG.brideFather, WEDDING_CONFIG.brideMother].filter(Boolean).join(" & ");
    var groomParents = [WEDDING_CONFIG.groomFather, WEDDING_CONFIG.groomMother].filter(Boolean).join(" & ");
    inviteNames.innerHTML =
      '<span class="invite-person"><span class="invite-name">' + WEDDING_CONFIG.bride + '</span><span class="invite-parent">(D/O ' + brideParents + ")</span></span>" +
      '<span class="invite-amp" aria-hidden="true">&amp;</span>' +
      '<span class="invite-person"><span class="invite-name">' + WEDDING_CONFIG.groom + '</span><span class="invite-parent">(S/O ' + groomParents + ")</span></span>";
  }

  var rsvpBtn = document.getElementById("rsvpBtn");
  if (rsvpBtn) {
    if (/X/i.test(String(WEDDING_CONFIG.whatsappNumber || ""))) {
      rsvpBtn.href = "#";
    } else {
      var digits = String(WEDDING_CONFIG.whatsappNumber || "").replace(/\D/g, "");
      if (digits) {
        var msg = "Hello, I am confirming my attendance for " + WEDDING_CONFIG.bride + " and " + WEDDING_CONFIG.groom + "'s wedding on " + WEDDING_CONFIG.displayDate + ".";
        rsvpBtn.href = "https://wa.me/" + digits + "?text=" + encodeURIComponent(msg);
      }
    }
  }

  var icalBtn = document.getElementById("rsvpIcalBtn");
  if (icalBtn) {
    var blob = new Blob([buildAppleCalendarData()], { type: "text/calendar;charset=utf-8" });
    icalBtn.href = URL.createObjectURL(blob);
    icalBtn.setAttribute("download", (WEDDING_CONFIG.bride + "-" + WEDDING_CONFIG.groom + "-wedding.ics").toLowerCase().replace(/\s+/g, "-"));
  }

  var gcalBtn = document.getElementById("rsvpGcalBtn");
  if (gcalBtn) gcalBtn.href = buildGoogleCalendarUrl();
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(applyDvitesPostOverrides, 0);
});


(function(){"use strict";var E=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var N="./assets/images/events/";var J={mehendi:"mehendi.webp",haldi:"haldi.webp",sangeet:"sangeet.webp",shaadi:"shaadi.webp",pheras:"pheras.webp",reception:"reception.webp",baraat:"baraat.webp",sagan:"sagan.webp",cocktail:"cocktail.webp",engagement:"engagement.webp",tilak:"tilak.webp",vidaai:"bidai.webp",bidai:"bidai.webp"};function P(t,e){var a=J[t];if(a)return N+a;return N+"custom_"+((e||0)%3+1)+".webp"}var T="https://www.google.com/maps/search/?api=1&query=The+Oberoi+Udaivilas+Udaipur+Rajasthan";var R=[{id:"mehendi",name:"Mehendi",date:"11 Dec 2026",time:"4:00 PM",venue:"Lotus Courtyard",note:"Greens & florals encouraged",map:T},{id:"haldi",name:"Haldi",date:"12 Dec 2026",time:"10:00 AM",venue:"Poolside Courtyard",note:"Yellow / ivory tones",map:T},{id:"sangeet",name:"Sangeet",date:"12 Dec 2026",time:"7:30 PM",venue:"Royal Ballroom",note:"An evening of music and performances",map:T},{id:"shaadi",name:"Shaadi",date:"13 Dec 2026",time:"9:30 AM",venue:"Lake Mandap",note:"Traditional Indian attire",map:T},{id:"reception",name:"Reception",date:"13 Dec 2026",time:"7:30 PM",venue:"Palace Lawns",note:"Candlelit dinner and celebration",map:T},{id:"vidaai",name:"Vidaai",date:"14 Dec 2026",time:"9:00 AM",venue:"Main Courtyard",note:"A quiet farewell with blessings",map:T}];var ne="./assets/images/ttk/";var xe={"dress-code":"dress_code.webp",dresscode:"dress_code.webp","venue":"venue.webp","stay-options":"stay.webp",stay:"stay.webp",hotel:"stay.webp","hashtag":"hashtag.webp","transport":"transport.webp",transportation:"transport.webp","gift-registry":"gift_registry.webp",gifts:"gift_registry.webp",registry:"gift_registry.webp","kids-welcome":"kids_welocme.webp",kids:"kids_welocme.webp","photography":"photography.webp",photos:"photography.webp","whatsapp-group":"whatsapp.webp",whatsapp:"whatsapp.webp","parking":"parking.webp","food":"food.webp",catering:"food.webp",meals:"food.webp","weather":"weather.webp"};function L(t){var e=t&&xe[t];return e?ne+e:null}var x=[{type:"dress-code",enabled:true,title:"Dress Code",description:"Festive Indian elegance. Sarees, lehengas and sherwanis are warmly encouraged.",icon:L("dress-code"),linkLabel:null,linkUrl:null,custom:false},{type:"venue",enabled:true,title:"Venue",description:"The Oberoi Udaivilas, Udaipur. All celebrations take place within the palace grounds.",icon:L("venue"),linkLabel:"Open in Maps",linkUrl:T,custom:false},{type:"stay-options",enabled:true,title:"Stay Options",description:"A curated block of rooms has been reserved. Please book by 1st November 2026.",icon:L("stay-options"),linkLabel:null,linkUrl:null,custom:false},{type:"hashtag",enabled:true,title:"Wedding Hashtag",description:"Share your favourite moments with #TanyaWedsRohan.",icon:L("hashtag"),linkLabel:null,linkUrl:null,custom:false},{type:"transport",enabled:false,title:"Transport",description:"Complimentary shuttle service between the airport and the palace.",icon:L("transport"),linkLabel:null,linkUrl:null,custom:false},{type:"gift-registry",enabled:false,title:"Gift Registry",description:"Your presence is the greatest gift. A registry link is available for those who wish.",icon:L("gift-registry"),linkLabel:"View Registry",linkUrl:"#",custom:false},{type:"kids-welcome",enabled:false,title:"Kids Welcome",description:"Children are warmly welcome. A dedicated kids\u2019 zone will be available at all events.",icon:L("kids-welcome"),linkLabel:null,linkUrl:null,custom:false},{type:"photography",enabled:false,title:"Photography",description:"A professional photographer will be present. Capture moments freely.",icon:L("photography"),linkLabel:null,linkUrl:null,custom:false},{type:"whatsapp-group",enabled:false,title:"WhatsApp Group",description:"Join our wedding group for live updates and celebration news.",icon:L("whatsapp-group"),linkLabel:"Join Group",linkUrl:"#",custom:false}];var Oe="./assets/images/gallery/gallery_outerframe.webp";var Y=["./assets/images/demo-1.webp","./assets/images/demo-2.webp","./assets/images/demo-3.webp","./assets/images/demo-4.webp"];var U=[{src:Y[0],caption:"Together",wide:true},{src:Y[1],caption:"Getting ready",wide:false},{src:Y[2],caption:"The ceremony",wide:false},{src:Y[3],caption:"Celebrations",wide:false}];(function t(){var e=window.__WEDDING_CONFIG__;if(!e)return;function a(r){if(!r)return"";var v=r.split("-");var f=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return parseInt(v[2],10)+" "+(f[parseInt(v[1],10)-1]||"")+" "+v[0]}if(e.events&&e.events.length){var o=e.events.map(function(r,v){return{id:r.id,name:r.name,icon:P(r.id,v),date:a(r.date),time:r.time||"",venue:r.venue||"",note:r.desc||"",map:r.mapsLink||""}});R.splice(0,R.length);o.forEach(function(r){R.push(r)})}if(e.thingsToKnow&&e.thingsToKnow.length){var n={dresscode:"dress-code",hotel:"stay-options",gifts:"gift-registry",kids:"kids-welcome",whatsapp:"whatsapp-group",photos:"photography"};x.forEach(function(r){r.enabled=false});e.thingsToKnow.forEach(function(r){var v=n[r.id]||r.id;var f=r.id&&r.id.indexOf("ctk_")!==0?x.find(function(p){return p.type===v}):null;if(f){f.title=r.label||f.title;f.description=r.value||f.description;f.enabled=true;f.linkLabel=null;f.linkUrl=null;if(r.iconKey)f.icon=ne+r.iconKey;if(r.mapsLink){f.linkLabel="Open in Maps";f.linkUrl=r.mapsLink}}else if(r.label){x.push({type:r.id||"custom-"+x.length,enabled:true,title:r.label,description:r.value||"",icon:r.iconKey?ne+r.iconKey:L(v)||L(r.id),linkLabel:null,linkUrl:null,custom:true})}})}if(e.gallery){if(!e.gallery.show||e.gallery.layout==="skip"){U.splice(0)}else{var s=(e.gallery.photos||[]).filter(Boolean);if(s.length){var c=e.couple&&e.couple.bride||"";var u=e.couple&&e.couple.groom||"";var i=c&&u?c+" & "+u:"Our memories";var d=parseInt(e.gallery.layout,10)||s.length;var o=s.slice(0,d).map(function(v,f){return{src:v,caption:i,wide:f===0}});U.splice(0,U.length);o.forEach(function(v){U.push(v)})}}}if(e.showThingsToKnow===false){x.forEach(function(r){r.enabled=false});var l=document.getElementById("things");if(l)l.style.display="none"}})();var B=document.getElementById("intro");var w=document.getElementById("introVideo");var O=document.getElementById("introAudio");var ge=document.getElementById("introHint");var _=document.getElementById("screenBloom");var V=document.getElementById("page");var he=document.getElementById("heroVideo");var ae=document.getElementById("heroContent");var ie=false,M=false,j=null;function re(t){document.body.classList.toggle("intro-active",t)}if(E){De()}else{let t=function(){if(ie)return;oe=true;se()};re(true);try{w.load()}catch(e){}w.addEventListener("error",function(){if(!M)le(600)});var oe=false;B.addEventListener("touchstart",t,{passive:true});B.addEventListener("pointerdown",t,{passive:true});B.addEventListener("click",function(){if(oe){oe=false;return}se()});B.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();se()}})}function se(){if(ie)return;ie=true;w.muted=true;w.playsInline=true;var t;try{t=w.play()}catch(e){t=null}if(O){try{O.currentTime=0;O.play()}catch(e){}}j=setTimeout(G,9e3);if(ge)ge.classList.add("is-gone");de();if(t&&t.then){t.then(z).catch(function(){setTimeout(function(){var e;try{e=w.play()}catch(a){e=null}if(e&&e.then){e.then(z).catch(function(){le(400)})}else{z()}},60)})}else if(t===null){le(400)}else{z()}}function z(){w.addEventListener("ended",G,{once:true});function t(){var a=w.duration;if(a&&isFinite(a)&&a>0)setTimeout(G,a*1e3+400)}if(w.readyState>=1)t();else w.addEventListener("loadedmetadata",t,{once:true});var e=null;w.addEventListener("waiting",function(){if(M)return;e=setTimeout(function(){if(!M)G()},5e3)});w.addEventListener("playing",function(){if(e){clearTimeout(e);e=null}})}function le(t){if(!M)setTimeout(G,t)}function G(){if(M)return;M=true;if(j){clearTimeout(j);j=null}try{w.pause()}catch(t){}try{if(O){O.pause();O.currentTime=0}}catch(t){}if(_)_.classList.add("is-blooming");setTimeout(function(){B.classList.add("is-fading");B.addEventListener("transitionend",function(){B.classList.add("is-gone")},{once:true});re(false);window.scrollTo(0,0);V.removeAttribute("aria-hidden");V.classList.add("is-visible");try{he.play()}catch(t){}},700);setTimeout(function(){ae.classList.add("is-visible");Ie()},1e3);setTimeout(function(){if(_){_.classList.remove("is-blooming");_.classList.add("is-retreating")}},1500);setTimeout(function(){if(_)_.classList.add("is-gone")},3600);ye()}function De(){M=true;if(B)B.classList.add("is-gone");re(false);if(V){V.removeAttribute("aria-hidden");V.classList.add("is-visible")}if(ae)ae.classList.add("is-visible");try{he.play()}catch(t){}document.querySelectorAll(".reveal-item").forEach(function(t){t.classList.add("is-in")});document.addEventListener("click",de,{once:true});document.addEventListener("touchstart",de,{once:true,passive:true})}function ye(){var t=document.querySelectorAll(".reveal-item");if(!("IntersectionObserver"in window)){t.forEach(function(a){a.classList.add("is-in")});return}var e=new IntersectionObserver(function(a){a.forEach(function(o){o.target.classList.toggle("is-in",o.isIntersecting)})},{threshold:.18});t.forEach(function(a){e.observe(a)})}function be(t,e){e=e||"date-ord";return String(t).replace(/\b(\d{1,2})\b/,function(a,o){var n=parseInt(o,10),s=n%100,c=n%10,u="th";if(s<11||s>13){if(c===1)u="st";else if(c===2)u="nd";else if(c===3)u="rd"}return o+'<sup class="'+e+'">'+u+"</sup>"})}function Ne(){var t=document.getElementById("eventsList");if(!t)return;t.innerHTML="";var e='<svg width="10" height="12" viewBox="0 0 11 14" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-1px"><path d="M5.5 0C2.46 0 0 2.46 0 5.5c0 4.12 5.5 8.5 5.5 8.5S11 9.62 11 5.5C11 2.46 8.54 0 5.5 0Z" fill="currentColor" opacity=".7"/><circle cx="5.5" cy="5.5" r="2" fill="#faf4e8"/></svg>';R.forEach(function(n,s){var c=n.icon||P(n.id,s);var u=n.note?'<p class="event-note">'+n.note+"</p>":"";var i=n.date?'<span class="event-date">'+be(n.date,"event-ord")+"</span>":"";var d=n.time?'<span class="event-time">'+n.time+"</span>":"";var l=i||d?'<p class="event-datetime">'+i+d+"</p>":"";var r=n.map?'<a class="event-map" href="'+n.map+'" target="_blank" rel="noreferrer">'+e+" Open in Maps</a>":"";var v=s%2===0?"left":"right";var f=v==="left"?"Event_Card_left.webp":"Event_Card_right.webp";var p=document.createElement("article");p.className="event-card event-card--"+v;p.setAttribute("role","listitem");p.setAttribute("aria-label",s+1+" of "+R.length+": "+n.name);p.innerHTML='<div class="event-card-inner"><div class="event-card-panel"><img class="event-card-frame" src="./assets/images/events/'+f+'" alt="" aria-hidden="true" decoding="async" draggable="false"><div class="event-card-body"><img class="event-illustration" src="'+c+'" alt="'+n.name+'" decoding="async" draggable="false"><h3 class="event-name">'+n.name+'</h3><div class="event-rule" aria-hidden="true"></div>'+l+(n.venue?'<p class="event-venue">'+n.venue+"</p>":"")+u+r+"</div></div></div>";t.appendChild(p)});var a=t.querySelectorAll(".event-card");if(E||!("IntersectionObserver"in window)){a.forEach(function(n){n.classList.add("is-open")});return}var o=new IntersectionObserver(function(n){n.forEach(function(s){s.target.classList.toggle("is-open",s.isIntersecting)})},{threshold:.28,rootMargin:"0px 0px -8% 0px"});a.forEach(function(n){o.observe(n)})}function Pe(){var t=document.getElementById("ttkGrid");if(!t)return;var e=x.filter(function(s){return s.enabled});if(!e.length){var a=document.getElementById("things");if(a)a.style.display="none";return}t.innerHTML="";var o=e.length;if(o===1)t.classList.add("ttk-grid--single");var n="IntersectionObserver"in window?new IntersectionObserver(function(s){s.forEach(function(c){if(c.isIntersecting){c.target.classList.add("is-in");n.unobserve(c.target)}})},{threshold:.1,rootMargin:"0px 0px -5% 0px"}):null;e.forEach(function(s,c){var u=o>1&&o%2!==0&&c===o-1;var i=document.createElement("li");i.className="ttk-card"+(u?" ttk-card--last-odd":"");i.setAttribute("role","listitem");if(!E)i.style.transitionDelay=c*80+"ms";var d=s.icon?'<img class="ttk-card-img" src="'+s.icon+`" alt="" decoding="async" loading="lazy" draggable="false" onerror="this.remove();this.parentNode.classList.add('ttk-card-icon--blank')">`:"";var l="ttk-card-icon"+(s.icon?"":" ttk-card-icon--blank");var r='<svg width="10" height="12" viewBox="0 0 11 14" fill="none" aria-hidden="true" style="display:inline-block;vertical-align:-1px;margin-right:4px"><path d="M5.5 0C2.46 0 0 2.46 0 5.5c0 4.12 5.5 8.5 5.5 8.5S11 9.62 11 5.5C11 2.46 8.54 0 5.5 0Z" fill="currentColor" opacity=".72"/><circle cx="5.5" cy="5.5" r="2" fill="#faf4e8"/></svg>';var v=s.linkLabel&&s.linkUrl?'<a class="ttk-card-link" href="'+s.linkUrl+'" target="_blank" rel="noreferrer">'+(/map/i.test(s.linkLabel)?r:"")+s.linkLabel+"</a>":"";i.innerHTML='<div class="ttk-card-shine" aria-hidden="true"></div><div class="ttk-card-inner"><div class="ttk-card-icon-wrap" aria-hidden="true"><span class="ttk-card-icon-ring"></span><span class="ttk-card-icon-ring ttk-card-icon-ring--outer"></span><div class="'+l+'">'+d+'</div></div><p class="ttk-card-label">'+s.title+'</p><span class="ttk-card-rule" aria-hidden="true"></span><p class="ttk-card-body">'+s.description+"</p>"+v+"</div>";if(!E){i.addEventListener("mousemove",function(f){if(!i.classList.contains("is-in"))return;var p=i.getBoundingClientRect();var I=(f.clientX-(p.left+p.width*.5))/(p.width*.5);var W=(f.clientY-(p.top+p.height*.5))/(p.height*.5);i.style.transform="translateY(-6px) perspective(700px) rotateX("+(-W*4).toFixed(2)+"deg) rotateY("+(I*4).toFixed(2)+"deg)"});i.addEventListener("mouseleave",function(){i.style.transform=""})}t.appendChild(i);if(n)n.observe(i);else i.classList.add("is-in")})}var H=[],F=0;function Re(){var t=document.getElementById("galleryFeatured");var e=document.getElementById("galleryFeaturedPhoto");var a=document.getElementById("galleryDots");var o=document.getElementById("galleryThumbs");if(!t||!e)return;var n=U.filter(function(l){return l.src&&l.src.trim()!==""});if(!n.length){var s=document.getElementById("gallery");if(s)s.style.display="none";return}H=n;a.innerHTML="";o.innerHTML="";var c=0;function u(l,r){l=(l+n.length)%n.length;c=l;var v=function(){e.src=n[l].src;e.alt=n[l].caption||"";t.classList.remove("is-fading")};if(r){v()}else{t.classList.add("is-fading");setTimeout(v,200)}a.querySelectorAll(".gallery-dot").forEach(function(f,p){f.classList.toggle("is-active",p===l)});o.querySelectorAll(".gallery-thumb").forEach(function(f,p){var I=p===l;f.classList.toggle("is-active",I);if(I&&!r)f.scrollIntoView({inline:"center",block:"nearest"})})}n.forEach(function(l,r){var v=document.createElement("button");v.className="gallery-dot"+(r===0?" is-active":"");v.setAttribute("role","tab");v.setAttribute("aria-label","Photo "+(r+1));v.addEventListener("click",function(){u(r)});a.appendChild(v);var f=document.createElement("div");f.className="gallery-thumb"+(r===0?" is-active":"");f.setAttribute("role","listitem");f.setAttribute("aria-label","Show photo "+(r+1));f.innerHTML='<img class="gallery-thumb-photo" src="'+l.src+'" alt="" decoding="async" loading="lazy"><img class="gallery-thumb-art" src="'+Oe+'" alt="" aria-hidden="true" decoding="async">';f.addEventListener("click",function(){u(r)});o.appendChild(f)});u(0,true);var i=document.getElementById("galleryPrev");var d=document.getElementById("galleryNext");t.classList.toggle("single",n.length<2);if(i)i.addEventListener("click",function(l){l.stopPropagation();u(c-1)});if(d)d.addEventListener("click",function(l){l.stopPropagation();u(c+1)});t.addEventListener("click",function(){Ee(c)});t.addEventListener("keydown",function(l){if(l.key==="Enter"||l.key===" "){l.preventDefault();Ee(c)}});Ue()}function Ee(t){var e=document.getElementById("galleryLightbox");if(!e)return;F=t;e.hidden=false;e.classList.toggle("single",H.length===1);document.body.style.overflow="hidden";we(F)}function ce(){var t=document.getElementById("galleryLightbox");if(!t)return;t.hidden=true;document.body.style.overflow=""}function we(t){var e=H[t];if(!e)return;var a=document.getElementById("galleryLbImg");var o=document.getElementById("galleryLbCaption");a.style.opacity="0";a.style.transform="scale(.95)";a.src=e.src;a.alt=e.caption||"";if(o)o.textContent=e.caption||"";a.onload=function(){a.style.transition="opacity .3s ease, transform .4s var(--ease)";a.style.opacity="1";a.style.transform="scale(1)"}}function Z(t){F=(F+t+H.length)%H.length;we(F)}function Ue(){var t=document.getElementById("galleryLightbox");if(!t||t.dataset.wired)return;t.dataset.wired="1";document.getElementById("galleryLbClose").addEventListener("click",ce);document.getElementById("galleryLbPrev").addEventListener("click",function(){Z(-1)});document.getElementById("galleryLbNext").addEventListener("click",function(){Z(1)});t.addEventListener("click",function(e){if(e.target===t)ce()});document.addEventListener("keydown",function(e){if(t.hidden)return;if(e.key==="Escape")ce();else if(e.key==="ArrowLeft")Z(-1);else if(e.key==="ArrowRight")Z(1)})}var Le={title:"Aarav & Meera\u2019s Wedding",start:"20261213T040000Z",end:"20261213T070000Z",location:"The Oberoi Udaivilas, Udaipur, Rajasthan, India",description:"Join us for the wedding of Aarav & Meera."};function Ve(t){var e=new URLSearchParams({action:"TEMPLATE",text:t.title,dates:t.start+"/"+t.end,location:t.location,details:t.description});return"https://calendar.google.com/calendar/render?"+e.toString()}function Ge(t){var e=new Date().toISOString().replace(/[-:.]/g,"").slice(0,15)+"Z";return["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Dvites//Wedding//EN","BEGIN:VEVENT","DTSTART:"+t.start,"DTEND:"+t.end,"DTSTAMP:"+e,"SUMMARY:"+t.title,"LOCATION:"+t.location,"DESCRIPTION:"+t.description,"STATUS:CONFIRMED","END:VEVENT","END:VCALENDAR"].join("\r\n")}function He(){var t=window.__WEDDING_CONFIG__;if(t&&t.calendarUrls)return;var e=document.getElementById("rsvpGcalBtn");var a=document.getElementById("rsvpIcalBtn");if(e)e.href=Ve(Le);if(a){var o=new Blob([Ge(Le)],{type:"text/calendar"});a.href=URL.createObjectURL(o)}}function Fe(){He();var t=document.getElementById("rsvp");if(!t)return;if("IntersectionObserver"in window){var e=new IntersectionObserver(function(o){o.forEach(function(n){if(n.isIntersecting){t.classList.add("rsvp-alive");e.unobserve(t)}})},{threshold:.12});e.observe(t)}else{t.classList.add("rsvp-alive")}var a=document.getElementById("rsvpFireworks");if(a&&!E)We(a)}function We(t){var e=t.getContext("2d");var a,o,n=0,s=false,c=0;var u=[],i=[];var d=["#d8a957","#f5d9a0","#c4748c","#fdf6e6","#8fb4e0","#c4985a"];function l(y,k){return y+Math.random()*(k-y)}function r(){return o/700}function v(){a=t.width=t.offsetWidth;o=t.height=t.offsetHeight}function f(){var y=r();u.push({x:l(a*.16,a*.84),y:l(o*.56,o*.64),vx:l(-.4,.4)*y,vy:l(-9,-7)*y,targetY:l(o*.08,o*.4),color:d[Math.random()*d.length|0]})}function p(y,k,C){var g=Math.round(l(46,74)),A=r();for(var m=0;m<g;m++){var q=Math.PI*2*m/g+l(-.08,.08);var D=l(1.4,5.2)*A;i.push({x:y,y:k,vx:Math.cos(q)*D,vy:Math.sin(q)*D,life:1,decay:l(.009,.016),size:l(1.2,2.6),color:C})}}function I(y){if(!s)return;var k=r();e.globalCompositeOperation="destination-out";e.fillStyle="rgba(0,0,0,0.24)";e.fillRect(0,0,a,o);e.globalCompositeOperation="lighter";if(y-c>l(620,1150)){f();c=y}for(var C=u.length-1;C>=0;C--){var g=u[C];g.x+=g.vx;g.y+=g.vy;g.vy+=.12*k;e.globalAlpha=1;e.beginPath();e.arc(g.x,g.y,2.2,0,6.2832);e.fillStyle=g.color;e.fill();if(g.vy>=0||g.y<=g.targetY){p(g.x,g.y,g.color);u.splice(C,1)}}for(var A=i.length-1;A>=0;A--){var m=i[A];m.x+=m.vx;m.y+=m.vy;m.vy+=.045*k;m.vx*=.985;m.vy*=.985;m.life-=m.decay;if(m.life<=0){i.splice(A,1);continue}e.globalAlpha=Math.max(0,m.life);e.beginPath();e.arc(m.x,m.y,m.size,0,6.2832);e.fillStyle=m.color;e.fill()}e.globalAlpha=1;n=requestAnimationFrame(I)}v();window.addEventListener("resize",v,{passive:true});var W=new IntersectionObserver(function(y){y.forEach(function(k){if(k.isIntersecting){if(!s){s=true;c=0;n=requestAnimationFrame(I)}}else{s=false;cancelAnimationFrame(n);n=0}})},{threshold:.04});W.observe(t.closest(".rsvp-section"))}function qe(){var t=document.getElementById("couple");if(!t)return;var e=[];var a=t.querySelector(".couple-eyebrow");var o=t.querySelector(".couple-title");if(a){a.classList.add("cpl-alive");e.push(a)}if(o){o.classList.add("cpl-alive");e.push(o)}var n=document.getElementById("coupleStory");if(n){var s=(n.textContent||"").replace(/\s+/g," ").trim();if(s){var c=s.match(/[^.!?]+[.!?]*/g)||[s];n.textContent="";c.forEach(function(i){i=i.trim();if(!i)return;var d=document.createElement("span");d.className="couple-story-line cpl-alive";d.textContent=i;n.appendChild(d);e.push(d)})}}if(!e.length)return;e.forEach(function(i,d){i.dataset.stagger=String(d*180)});if(!("IntersectionObserver"in window)){e.forEach(function(i){i.classList.add("is-in")});return}var u=new IntersectionObserver(function(i){i.forEach(function(d){var l=d.target;if(d.isIntersecting){var r=parseInt(l.dataset.stagger||"0",10);l._aliveT=setTimeout(function(){l.classList.add("is-in")},r)}else{clearTimeout(l._aliveT);l.classList.remove("is-in")}})},{threshold:.5,rootMargin:"0px 0px -60px 0px"});e.forEach(function(i){u.observe(i)})}function Ke(){var t=window.__WEDDING_CONFIG__;if(!t)return;var e=t.couple||{},a=t.invite||{},o=t.music||{};var n=t.story||{},s=t.gallery||{},c=t.rsvp||{};var u=["January","February","March","April","May","June","July","August","September","October","November","December"];var i=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function d(b){if(!b)return"";var h=b.split("-");return parseInt(h[2],10)+" "+(u[parseInt(h[1],10)-1]||"")+" "+h[0]}function l(b){if(!b)return"";var h=b.split("-");return parseInt(h[2],10)+" "+(i[parseInt(h[1],10)-1]||"")+" "+h[0]}function r(b,h){var S=document.getElementById(b);if(S&&h)S.textContent=h}function v(b,h){var S=document.getElementById(b);if(S&&h)S.innerHTML=be(h)}if(e.bride&&e.groom)document.title=e.bride+" & "+e.groom+" \xB7 ShaadiPath";r("heroBride",e.bride);r("heroGroom",e.groom);if(e.bride&&e.groom){var f=document.getElementById("inviteNames");if(f){let b=function(h,S,tt){var nt=S?'<span class="invite-parent">('+tt+" "+S+")</span>":"";return'<span class="invite-person"><span class="invite-name">'+h+"</span>"+nt+"</span>"};var p=e.nameOrder==="groom_first";var I=a.parentsOrder==="groom_first";var W=p?e._originalBride||e.groom:e.bride;var y=p?e._originalGroom||e.bride:e.groom;var k=(I?[a.groomFather,a.groomMother]:[a.brideFather,a.brideMother]).filter(Boolean).join(" & ");var C=(I?[a.brideFather,a.brideMother]:[a.groomFather,a.groomMother]).filter(Boolean).join(" & ");var g=b(W,k,"D/O");var A=b(y,C,"S/O");var m='<span class="invite-amp" aria-hidden="true">&amp;</span>';f.innerHTML=p?A+m+g:g+m+A}}if(e.date){v("heroDate",l(e.date));v("inviteDate",d(e.date))}r("heroVenue",e.venue);r("inviteVenue",e.venue);r("ftBride",e.bride);r("ftGroom",e.groom);if(e.date)v("ftDate",d(e.date));if(a.blessing){var q=document.querySelector(".invite-overline");if(q)q.textContent=a.blessing.split("\n")[0]}var D=document.getElementById("inviteGrandparents");if(D&&a.showGrandparents){var ue=[a.brideGF,a.brideGM].filter(Boolean).join(" & ");var fe=[a.groomGF,a.groomGM].filter(Boolean).join(" & ");if(ue||fe){D.innerHTML=(ue?"<p>"+ue+"</p>":"")+(fe?"<p>"+fe+"</p>":"");D.hidden=false}}if(n.show===false){var Te=document.getElementById("couple");if(Te)Te.style.display="none"}var ze=n.storyMode||"tags";var X=document.getElementById("coupleStory");var ve=document.getElementById("coupleTags");if(ze==="story"){if(X&&n.storyText)X.textContent=n.storyText}else if(n.tags&&n.tags.length){if(X)X.textContent="";if(ve){ve.setAttribute("aria-hidden","false");n.tags.forEach(function(b){var h=document.createElement("span");h.className="couple-tag-chip";h.textContent=b;ve.appendChild(h)})}}var pe=document.getElementById("coupleHashtag");if(pe){var K=(n.customHashtag||e.hashtag||"").trim();if(K){if(K.charAt(0)!=="#")K="#"+K;pe.textContent=K;pe.removeAttribute("hidden")}}if(!s.show||s.layout==="skip"){var Be=document.getElementById("gallery");if(Be)Be.style.display="none"}r("rsvpHeadline",c.heading);r("rsvpBody",c.subtext);var $=document.getElementById("rsvpBtn");var Ae=document.getElementById("rsvpBtnText");var Q=document.getElementById("rsvpHelper");if($){if(c.mode==="form"&&c.form_url){$.href=c.form_url;$.setAttribute("target","_blank");if(Q)Q.textContent="You'll be redirected to our RSVP form."}else{var ee=(e.whatsapp||"").replace(/\D/g,"");if(ee){var Ze=ee.indexOf("91")===0?ee:"91"+ee;var Xe=encodeURIComponent("Hi "+(e.bride||"")+" & "+(e.groom||"")+"! I'll be there to celebrate with you!");$.href="https://wa.me/"+Ze+"?text="+Xe}if(Q)Q.textContent="You'll be redirected to WhatsApp to confirm your attendance."}var Me=c.mode==="form"?c.button_text||c.btnText:c.btnText;if(Ae&&Me)Ae.textContent=Me}if(t.calendarUrls){var Ce=document.getElementById("rsvpGcalBtn");var te=document.getElementById("rsvpIcalBtn");if(Ce)Ce.href=t.calendarUrls.google;if(te){var $e=((e.bride||"bride")+"-"+(e.groom||"groom")+"-wedding.ics").toLowerCase().replace(/\s+/g,"-");var Se=(e.date||"").replace(/-/g,"");if(Se){var me=new Date(e.date);me.setDate(me.getDate()+1);var Qe=me.toISOString().slice(0,10).replace(/-/g,"");var et=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Dvites//Wedding//EN","BEGIN:VEVENT","DTSTART;VALUE=DATE:"+Se,"DTEND;VALUE=DATE:"+Qe,"SUMMARY:"+((e.bride||"Bride")+" weds "+(e.groom||"Groom")),"LOCATION:"+(e.venue||""),"STATUS:CONFIRMED","END:VEVENT","END:VCALENDAR"].join("\r\n");te.href=URL.createObjectURL(new Blob([et],{type:"text/calendar;charset=utf-8"}))}else{te.href=t.calendarUrls.apple}te.setAttribute("download",$e)}}var _e=document.getElementById("bgMusic");if(_e&&o.enabled&&o.src)_e.src=o.src}function de(){var t=document.getElementById("bgMusic");if(!t||!t.getAttribute("src"))return;try{t.volume=0;var e=t.play();var a=0,o=.6;var n=setInterval(function(){a++;t.volume=Math.min(o,a/30*o);if(t.volume>=o)clearInterval(n)},100);if(e&&e.catch)e.catch(function(){})}catch(s){}}function Ie(){var t=document.getElementById("fabCluster");if(t)t.classList.add("is-ready")}function Je(){var t=document.getElementById("fabCluster");var e=document.getElementById("musicToggle");var a=document.getElementById("navToggle");var o=document.getElementById("navPanel");var n=document.getElementById("bgMusic");if(!t)return;function s(){if(!e||!n)return;var u=!n.paused;e.classList.toggle("is-muted",!u);e.setAttribute("aria-pressed",String(u));e.setAttribute("aria-label",u?"Pause music":"Play music")}if(e&&n){let u=function(){if(n&&!n.paused){c=true;n.pause()}},i=function(){if(n&&c&&n.paused){c=false;var d=n.play();if(d&&d.catch)d.catch(function(){})}};e.addEventListener("click",function(){if(n.paused){n.muted=false;if(!n.volume)n.volume=.6;var d=n.play();if(d&&d.catch)d.catch(function(){})}else{n.pause()}s()});["play","pause","ended"].forEach(function(d){n.addEventListener(d,s)});s();var c=false;document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")u();else i()});window.addEventListener("pagehide",u);window.addEventListener("pageshow",i)}if(a&&o){let u=function(){t.classList.remove("nav-open");a.setAttribute("aria-expanded","false");o.setAttribute("aria-hidden","true")};a.addEventListener("click",function(i){i.stopPropagation();var d=t.classList.toggle("nav-open");a.setAttribute("aria-expanded",String(d));o.setAttribute("aria-hidden",String(!d))});o.querySelectorAll(".nav-link").forEach(function(i){i.addEventListener("click",u)});document.addEventListener("click",function(i){if(t.classList.contains("nav-open")&&!t.contains(i.target))u()});document.addEventListener("keydown",function(i){if(i.key==="Escape"&&t.classList.contains("nav-open"))u()})}}function Ye(){var t=document.getElementById("heroVideo");var e=document.getElementById("hero");if(!t||!e)return;function a(){try{var n=t.play();if(n&&n.catch)n.catch(function(){})}catch(s){}}if(!("IntersectionObserver"in window)){a();return}var o=new IntersectionObserver(function(n){n.forEach(function(s){if(s.isIntersecting)a();else{try{t.pause()}catch(c){}}})},{threshold:.15});o.observe(e)}function je(){var t=window.__WEDDING_CONFIG__||{};var e=t.couple&&t.couple.date||"2026-12-12";var a=new Date(e+"T11:00:00");if(isNaN(a.getTime()))a=new Date(e);var o={d:document.getElementById("cdDays"),h:document.getElementById("cdHours"),m:document.getElementById("cdMins"),s:document.getElementById("cdSecs")};if(!o.d)return;var n={};function s(i){i=i<0?0:i|0;return i<10?"0"+i:""+i}function c(i,d,l){if(!i)return;var r=s(l);if(i.textContent===r)return;i.textContent=r;if(n[d]!==void 0&&!E){i.classList.remove("is-tick");void i.offsetWidth;i.classList.add("is-tick")}n[d]=r}function u(){var i=Math.max(0,a.getTime()-Date.now());var d=Math.floor(i/1e3);c(o.d,"d",Math.floor(d/86400));c(o.h,"h",Math.floor(d%86400/3600));c(o.m,"m",Math.floor(d%3600/60));c(o.s,"s",d%60)}u();setInterval(u,1e3)}function ke(){Ke();Ne();Re();Pe();Fe();qe();Je();Ye();je();if(M){ye();Ie()}}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ke);else ke()})();
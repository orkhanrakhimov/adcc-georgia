// ADCC Georgia – site script
// Renders the pages from data.json (edited through /admin), with built-in defaults as a fallback.
(function () {
  'use strict';

  var KA = {
 "nav.event": "ღონისძიება",
 "nav.weighin": "აწონვა",
 "nav.tickets": "ბილეთები",
 "nav.shop": "მაღაზია",
 "nav.rules": "წესები",
 "nav.previous": "წინა ღონისძიებები",
 "nav.contact": "კონტაქტი",
 "nav.register": "რეგისტრაცია",
 "cd.days": "დღე",
 "cd.hours": "საათი",
 "cd.minutes": "წუთი",
 "cd.seconds": "წამი",
 "ev.h": "ღონისძიების <span>დეტალები</span>",
 "ev.sub": "ყველაფერი, რაც დღის შესახებ უნდა იცოდეთ.",
 "ev.how": "როგორ მივიღოთ მონაწილეობა",
 "ev.s1": "გახსენით ღონისძიების გვერდი Smoothcomp-ზე",
 "ev.s2": "შექმენით ანგარიში ან შედით სისტემაში",
 "ev.s3": "აირჩიეთ დივიზია და დაასრულეთ რეგისტრაცია",
 "ev.s4": "ღონისძიებამდე გაეცანით ADCC-ის წესებს",
 "past.h": "წინა <span>ღონისძიებები</span>",
 "past.sub": "ფოტოები, შედეგები და მნიშვნელოვანი მომენტები ADCC Georgia-ს წინა ღონისძიებებიდან.",
 "ct.h": "<span>დაგვიკავშირდით</span>",
 "ct.sub": "გაქვთ შეკითხვები რეგისტრაციის ან ღონისძიების შესახებ? მოგვწერეთ.",
 "ft.r": "Submission grappling · თბილისი",
 "title.rules": "წესები და რეგულაციები – ADCC Georgia",
 "rl.h1": "წესები და <em>რეგულაციები</em>",
 "rl.p": "მოკლე გზამკვლევი სპორტსმენებისა და მწვრთნელებისთვის: როგორ ირიცხება ქულები, რა არის აკრძალული და რა დროითი ლიმიტებია თითოეულ დივიზიაში. სრული ოფიციალური ტექსტისთვის იხილეთ <a href=\"https://adcombat.com/adcc-rules-regulations/\" target=\"_blank\" rel=\"noopener\">ADCC-ის წესები და რეგულაციები</a>.",
 "back": "← მთავარ გვერდზე დაბრუნება",
 "title.weighin": "აწონვა – ADCC Georgia",
 "wi.h1": "აწონვის <em>განრიგი</em>",
 "wi.loc": "ადგილმდებარეობა",
 "wi.sm": "თქვენი დივიზიისა და ღონისძიების სხვა დეტალებისთვის იხილეთ ღონისძიების გვერდი Smoothcomp-ზე.",
 "title.tickets": "ბილეთები – ADCC Georgia",
 "tk.h1": "ღონისძიების <em>ბილეთები</em>",
 "tk.q": "გაქვთ კითხვები ბილეთებზე? მოგვწერეთ.",
 "title.shop": "მერჩი და აღჭურვილობა – ADCC Georgia",
 "shop.h1": "მერჩი და <em>აღჭურვილობა</em>",
 "shop.q": "გაქვთ შეკითხვები მერჩსა ან ზომებზე? მოგვწერეთ."
};              // static page text: key -> Georgian
  var UI = {
 "hero.eb": [
  "Next event",
  "უახლოესი ღონისძიება"
 ],
 "hero.eb.today": [
  "Happening today",
  "დღეს იმართება"
 ],
 "hero.eb.over": [
  "Event finished",
  "ღონისძიება დასრულდა"
 ],
 "cd.today": [
  "The event is happening today!",
  "ღონისძიება დღეს იმართება!"
 ],
 "cd.over": [
  "The event is over. Thank you all!",
  "ღონისძიება დასრულდა. გმადლობთ ყველას!"
 ],
 "hero.register": [
  "Register on Smoothcomp",
  "რეგისტრაცია Smoothcomp-ზე"
 ],
 "hero.rules": [
  "Rules & regulations",
  "წესები და რეგულაციები"
 ],
 "hero.results": [
  "Photos & results",
  "ფოტოები და შედეგები"
 ],
 "hero.follow": [
  "Follow us",
  "გამოგვიწერეთ"
 ],
 "ev.date": [
  "Date",
  "თარიღი"
 ],
 "ev.start": [
  "Start",
  "დაწყება"
 ],
 "ev.venue": [
  "Venue",
  "ადგილი"
 ],
 "ev.rules": [
  "Rules",
  "წესები"
 ],
 "ev.entry": [
  "Entry",
  "მონაწილეობა"
 ],
 "ev.map": [
  "View on map →",
  "რუკაზე ნახვა →"
 ],
 "ev.rules.v": [
  "ADCC rules",
  "ADCC-ის წესები"
 ],
 "ev.rules.exp": [
  "Rules explained →",
  "წესები განმარტებით →"
 ],
 "ev.rules.off": [
  "Official ADCC rules →",
  "ADCC-ის ოფიციალური წესები →"
 ],
 "ev.cta": [
  "Register / full info",
  "რეგისტრაცია / სრული ინფორმაცია"
 ],
 "lk.weigh.t": [
  "Weigh-in schedule",
  "აწონვის განრიგი"
 ],
 "lk.tick.t": [
  "Tickets",
  "ბილეთები"
 ],
 "lk.go": [
  "See details →",
  "დეტალები →"
 ],
 "cur": [
  "GEL",
  "ლარი"
 ],
 "free": [
  "Free",
  "უფასო"
 ],
 "past.p": [
  "Our last event was {name}. Photos are on our Facebook page, and the official results are on the ADCC website.",
  "ჩვენი ბოლო ღონისძიება იყო {name}. ფოტოები იხილეთ ჩვენს Facebook გვერდზე, ხოლო ოფიციალური შედეგები — ADCC-ის ვებგვერდზე."
 ],
 "past.fb": [
  "See photos on Facebook",
  "ფოტოები Facebook-ზე"
 ],
 "past.res": [
  "Results: {name}",
  "შედეგები: {name}"
 ],
 "ct.email": [
  "Email",
  "ელფოსტა"
 ],
 "ct.follow": [
  "Follow us",
  "გამოგვიწერეთ"
 ],
 "wa.choose": [
  "Chat on WhatsApp with:",
  "მოგვწერეთ WhatsApp-ზე:"
 ],
 "wi.p": [
  "Weigh-in times and location.",
  "აწონვის დრო და ადგილი."
 ],
 "wi.note": [
  "The event itself starts at {time} on {date}.",
  "თავად ღონისძიება {date} {time} საათზე იწყება."
 ],
 "wi.btn": [
  "Open event on Smoothcomp",
  "ღონისძიება Smoothcomp-ზე"
 ],
 "georgia": [
  "Georgia",
  "საქართველო"
 ],
 "tk.p": [
  "Ticket options for {date}, {venue}, {addr}.",
  "ბილეთების ტიპები: {date}, {venue}, {addr}."
 ],
 "tk.wa": [
  "Message us on WhatsApp",
  "მოგვწერეთ WhatsApp-ზე"
 ],
 "over.note": [
  "This event has finished. Follow us on social media for the next one.",
  "ეს ღონისძიება დასრულდა. შემდეგი ღონისძიების შესახებ იხილეთ ჩვენს სოციალურ ქსელებში."
 ],
 "lk.shop.t": [
  "Merch & gear",
  "მერჩი და აღჭურვილობა"
 ],
 "lk.soon": [
  "Coming soon →",
  "მალე →"
 ],
 "shop.soon": [
  "Coming soon",
  "მალე"
 ],
 "shop.sold": [
  "Sold out",
  "გაყიდულია"
 ],
 "shop.order": [
  "Order on WhatsApp",
  "შეკვეთა WhatsApp-ზე"
 ],
 "shop.banner": [
  "Our first collection is on the way. Follow us on Instagram to be the first to know.",
  "ჩვენი პირველი კოლექცია მალე გამოჩნდება. გამოგვიწერეთ Instagram-ზე, რომ პირველებმა გაიგოთ."
 ],
 "shop.ig": [
  "Follow on Instagram",
  "გამოგვიწერეთ Instagram-ზე"
 ],
 "shop.msg": [
  "Hi! I'd like to order: {name}",
  "გამარჯობა! მინდა შევუკვეთო: {name}"
 ],
 "shop.msg.size": [
  ", size {size}",
  ", ზომა {size}"
 ],
 "shop.pick": [
  "Choose a size",
  "აირჩიეთ ზომა"
 ],
 "shop.q": [
  "Questions about merch or sizes? Message us.",
  "გაქვთ შეკითხვები მერჩსა ან ზომებზე? მოგვწერეთ."
 ]
};              // dynamic text: key -> [English, Georgian]
  var DEFAULTS = {
 "event": {
  "name": "ADCC Georgia Nationals Open 2026",
  "highlight": "Nationals Open",
  "date": "2026-10-25",
  "time": "10:00",
  "venue": "Gymnastic Venue",
  "address": {
   "en": "Bob Walsh St., Dighomi, Tbilisi",
   "ka": "ბობ უოლშის ქ., დიღომი, თბილისი"
  },
  "mapUrl": "https://share.google/y7GhtUI64T7QmOd2G",
  "registerUrl": "https://smoothcomp.com/en/event/33419",
  "rulesUrl": "https://adcombat.com/adcc-rules-regulations/",
  "entry": {
   "en": "Entry fees, divisions, weight classes and the registration deadline are all on the Smoothcomp event page.",
   "ka": "მონაწილეობის საფასური, დივიზიები, წონითი კატეგორიები და რეგისტრაციის ბოლო ვადა მითითებულია Smoothcomp-ის გვერდზე."
  }
 },
 "weighin": {
  "days": [
   {
    "date": "2026-10-24",
    "from": "10:00",
    "to": "13:00",
    "label": {
     "en": "Day before the event",
     "ka": "ღონისძიების წინა დღე"
    }
   },
   {
    "date": "2026-10-25",
    "from": "07:00",
    "to": "08:00",
    "label": {
     "en": "Event day",
     "ka": "ღონისძიების დღე"
    }
   }
  ]
 },
 "tickets": {
  "items": [
   {
    "name": {
     "en": "Spectator",
     "ka": "მაყურებელი"
    },
    "price": "10",
    "desc": {
     "en": "Watching only.",
     "ka": "მხოლოდ საყურებლად."
    },
    "featured": false
   },
   {
    "name": {
     "en": "VIP",
     "ka": "VIP"
    },
    "price": "30",
    "desc": {
     "en": "Includes access to the warm-up area and the right to corner a fighter.",
     "ka": "მოიცავს გახურების ზონაში შესვლას და მებრძოლის კუთხეში ყოფნის უფლებას."
    },
    "featured": true
   },
   {
    "name": {
     "en": "Coaches",
     "ka": "მწვრთნელები"
    },
    "price": "",
    "desc": {
     "en": "Up to 2 coaches.",
     "ka": "მაქსიმუმ 2 მწვრთნელი."
    },
    "featured": false
   }
  ],
  "door": {
   "en": "Tickets can be bought at the door.",
   "ka": "ბილეთები იყიდება შესასვლელთან."
  }
 },
 "contact": {
  "email": "adccgeorgia@gmail.com",
  "whatsapp": [
   {
    "label": "WhatsApp",
    "number": "+995 595 60 66 70"
   },
   {
    "label": "WhatsApp 2",
    "number": "+995 591 12 13 01"
   }
  ],
  "instagram": "adccgeorgia",
  "facebook": "adccgeorgia",
  "location": {
   "en": "Tbilisi, Georgia",
   "ka": "თბილისი, საქართველო"
  }
 },
 "shop": {
  "intro": {
   "en": "Official ADCC Georgia merch and training gear.",
   "ka": "ADCC Georgia-ს ოფიციალური მერჩი და სავარჯიშო აღჭურვილობა."
  },
  "note": {
   "en": "Orders are taken on WhatsApp. We confirm size, price and pickup with you in the chat.",
   "ka": "შეკვეთა მიიღება WhatsApp-ზე. ზომას, ფასსა და მიღების წესს ჩატში დაგიზუსტებთ."
  },
  "categories": [
   {
    "name": {
     "en": "Merch",
     "ka": "მერჩი"
    },
    "desc": {
     "en": "Hoodies, T-shirts, sweaters and caps.",
     "ka": "ჰუდები, მაისურები, სვიტრები და კეპები."
    },
    "items": [],
    "coming": [
     {
      "name": {
       "en": "Hoodies",
       "ka": "ჰუდები"
      },
      "icon": "hoodie"
     },
     {
      "name": {
       "en": "T-shirts",
       "ka": "მაისურები"
      },
      "icon": "tshirt"
     },
     {
      "name": {
       "en": "Sweaters",
       "ka": "სვიტრები"
      },
      "icon": "sweater"
     },
     {
      "name": {
       "en": "Caps",
       "ka": "კეპები"
      },
      "icon": "cap"
     }
    ]
   },
   {
    "name": {
     "en": "Gear",
     "ka": "აღჭურვილობა"
    },
    "desc": {
     "en": "Rash guards and shorts for training and competition.",
     "ka": "რეშგარდები და შორტები ვარჯიშისა და შეჯიბრისთვის."
    },
    "items": [],
    "coming": [
     {
      "name": {
       "en": "Rash guards",
       "ka": "რეშგარდები"
      },
      "icon": "rashguard"
     },
     {
      "name": {
       "en": "Shorts",
       "ka": "შორტები"
      },
      "icon": "shorts"
     }
    ]
   }
  ]
 },
 "previous": {
  "name": "ADCC Georgia Open 2025",
  "resultsUrl": "https://adcombat.com/adcc-events/adcc-georgia-open-2025/"
 },
 "gallery": []
};  // fallback content (same as data.json)

  var KEY = 'adcc-lang';
  var lang = 'en';
  var DATA = null;
  var curPhase = null;
  var page = document.body.getAttribute('data-page') || '';

  // ---------------------------------------------------------------- helpers
  function ls() { try { return window.localStorage; } catch (e) { return null; } }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function isObj(x) { return x && typeof x === 'object' && !Array.isArray(x); }
  function merge(def, src) {
    if (!isObj(def) || !isObj(src)) return (src === undefined || src === null) ? def : src;
    var out = {}, k;
    for (k in def) out[k] = merge(def[k], src[k]);
    for (k in src) if (!(k in def)) out[k] = src[k];
    return out;
  }
  function ui(k, vars) {
    var v = UI[k];
    var s = !v ? k : ((lang === 'ka' && v[1]) ? v[1] : v[0]);
    if (vars) for (var n in vars) s = s.split('{' + n + '}').join(vars[n]);
    return s;
  }
  function tx(o) {
    if (o === null || o === undefined) return '';
    if (typeof o === 'string') return o;
    return (lang === 'ka' && o.ka) ? o.ka : (o.en || '');
  }
  function url(u) { u = String(u || '').trim(); return /^https?:\/\//i.test(u) ? u : ''; }
  function digits(s) { return String(s || '').replace(/\D/g, ''); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function h(tag, attrs, kids) {
    var el = document.createElement(tag), k;
    if (attrs) for (k in attrs) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') el.className = v; else el.setAttribute(k, v);
    }
    (kids || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return el;
  }
  function clear(el) { while (el && el.firstChild) el.removeChild(el.firstChild); }
  function ext(href, cls, kids) { return h('a', { href: href, class: cls, target: '_blank', rel: 'noopener' }, kids); }

  var ICONS = {
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7.5L12 13l8.5-5.5"/>',
    phone: '<path d="M5 4h3.5l1.7 4.3-2.1 1.3a11 11 0 0 0 5.3 5.3l1.3-2.1L19 14.5V18a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    camera: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17.2" cy="6.8" r=".6"/>',
    people: '<path d="M14 21v-8h2.8l.5-3.2H14V8.2c0-1 .5-1.7 1.8-1.7h1.6V3.6c-.4-.1-1.4-.2-2.4-.2-2.6 0-4.1 1.5-4.1 4.2v2.2H8v3.2h2.9v8z"/>',
    pin: '<path d="M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/>',
    ticket: '<path d="M3 9a2 2 0 0 0 0 6v3h18v-3a2 2 0 0 1 0-6V6H3z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
    tshirt: '<path d="M8.5 3.5L3 6.5l2 4 2-1V20h10V9.5l2 1 2-4-5.5-3a3.5 3.5 0 0 1-7 0z"/>',
    sweater: '<path d="M9 3.5L3.5 6 3 18.5l3.5.5V10l.5 10h10l.5-10v9l3.5-.5L20.5 6 15 3.5a3 3 0 0 1-6 0z"/><path d="M7 17h10"/>',
    hoodie: '<path d="M9 4L3.5 6.5 3 18.5l3.5.5V10l.5 10h10l.5-10v9l3.5-.5-.5-12L15 4"/><path d="M9 4c0-1.5 1.3-2.5 3-2.5S15 2.5 15 4c0 2.5-1.3 4.5-3 4.5S9 6.5 9 4z"/><path d="M9.5 15.5h5"/>',
    rashguard: '<path d="M9 3.5L3.5 6 3 18.5l3.5.5V10l.5 10h10l.5-10v9l3.5-.5L20.5 6 15 3.5a3 3 0 0 1-6 0z"/><path d="M7 9.5l.5 4M17 9.5l-.5 4"/>',
    cap: '<path d="M4 15a8 8 0 0 1 16 0z"/><path d="M20 15c1.8.2 2.5.8 2.5 1.8 0 .5-.4.7-1 .7H8.5"/><path d="M12 7v8"/>',
    shorts: '<path d="M5 4h14l1.5 15H14l-2-8-2 8H3.5z"/><path d="M5.5 8h13"/>'
  };
  function icon(name) {
    var s = h('span', { class: 'ico', 'aria-hidden': 'true' });
    s.innerHTML = '<svg viewBox="0 0 24 24">' + (ICONS[name] || ICONS.tshirt) + '</svg>';
    return s;
  }
  var WA_BUBBLE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/></svg>';

  // ------------------------------------------------------------------ dates
  var WD = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ka: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი']
  };
  var MO = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ka: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი']
  };
  var MO_ON_KA = ['იანვარს', 'თებერვალს', 'მარტს', 'აპრილს', 'მაისს', 'ივნისს', 'ივლისს', 'აგვისტოს', 'სექტემბერს', 'ოქტომბერს', 'ნოემბერს', 'დეკემბერს'];
  var MO_SHORT = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    ka: ['იან.', 'თებ.', 'მარ.', 'აპრ.', 'მაი.', 'ივნ.', 'ივლ.', 'აგვ.', 'სექ.', 'ოქტ.', 'ნოე.', 'დეკ.']
  };
  function parts(d) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d || '');
    if (!m) return null;
    var y = +m[1], mo = +m[2], da = +m[3];
    if (mo < 1 || mo > 12 || da < 1 || da > 31) return null;
    return { y: y, m: mo, d: da, wd: new Date(Date.UTC(y, mo - 1, da)).getUTCDay() };
  }
  function dateLong(d) {
    var p = parts(d); if (!p) return '';
    return WD[lang][p.wd] + ', ' + p.d + ' ' + MO[lang][p.m - 1] + (lang === 'ka' ? ', ' : ' ') + p.y;
  }
  function dateShort(d) { var p = parts(d); return p ? p.d + ' ' + MO_SHORT[lang][p.m - 1] : ''; }
  function dateOn(d) {
    var p = parts(d); if (!p) return '';
    return p.d + ' ' + (lang === 'ka' ? MO_ON_KA[p.m - 1] : MO.en[p.m - 1]);
  }
  function normTime(t) {
    var m = /^(\d{1,2}):(\d{2})$/.exec(String(t || '').trim());
    return m ? pad(+m[1]) + ':' + m[2] : '';
  }

  // Event phase, always judged in Tbilisi time (UTC+4)
  function phase(ev, now) {
    var tm = normTime(ev.time) || '10:00';
    if (!parts(ev.date)) return { name: 'before', start: now + 864e5 };
    var dayStart = Date.parse(ev.date + 'T00:00:00+04:00');
    var start = Date.parse(ev.date + 'T' + tm + ':00+04:00');
    var dayEnd = dayStart + 864e5;
    var name = now >= dayEnd ? 'over' : now >= start ? 'live' : now >= dayStart ? 'today' : 'before';
    return { name: name, start: start };
  }

  // ---------------------------------------------------------------- language
  function capture(el) {
    if (el._en === undefined) el._en = el.hasAttribute('data-i18n-html') ? el.innerHTML : el.textContent;
  }
  function applyStatic() {
    $$('[data-i18n],[data-i18n-html]').forEach(function (el) {
      var isHtml = el.hasAttribute('data-i18n-html');
      var key = el.getAttribute(isHtml ? 'data-i18n-html' : 'data-i18n');
      capture(el);
      var txt = (lang === 'ka' && KA[key] !== undefined) ? KA[key] : el._en;
      if (isHtml) el.innerHTML = txt; else el.textContent = txt;
    });
    document.documentElement.lang = lang;
    var tk = 'title.' + (page === 'weigh-in' ? 'weighin' : page);
    document.title = (lang === 'ka' && KA[tk]) ? KA[tk] : origTitle;
    $$('[data-lang-btn]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang-btn') === lang ? 'true' : 'false');
    });
  }
  var origTitle = document.title;
  var KA_RE = /[Ⴀ-ჿ]/;
  function markKa() {
    $$('.ka-text').forEach(function (e) { e.classList.remove('ka-text'); });
    if (lang !== 'ka') return;
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) {
      var p = n.parentElement;
      if (p && p.tagName !== 'SCRIPT' && KA_RE.test(n.nodeValue)) p.classList.add('ka-text');
    }
  }
  function setLang(l) {
    lang = (l === 'ka') ? 'ka' : 'en';
    var s = ls(); if (s) { try { s.setItem(KEY, lang); } catch (e) {} }
    applyStatic();
    renderAll();
  }

  window.ADCC = { defaults: DEFAULTS, merge: merge, setLang: setLang };
  if (page === 'admin') return;

  // ----------------------------------------------------------------- renderers
  function setText(sel, text) { var el = $(sel); if (el) el.textContent = text; }

  function renderChrome(ph) {
    var ev = DATA.event, reg = url(ev.registerUrl);
    $$('.js-register').forEach(function (a) {
      if (reg) a.setAttribute('href', reg);
      a.hidden = (ph.name === 'over' || !reg);
    });
    var eb = $('#page-eyebrow'); if (eb) eb.textContent = ev.name;
    renderWhatsApp();
  }

  function waList() {
    return (DATA.contact.whatsapp || []).filter(function (w) { return digits(w.number).length >= 8; });
  }
  function waHref(n) { return 'https://wa.me/' + digits(n); }
  function renderWhatsApp() {
    var box = $('#wa-wrap'); if (!box) return;
    clear(box);
    var list = waList(); if (!list.length) return;
    if (list.length === 1) {
      var a = ext(waHref(list[0].number), 'wa', []);
      a.setAttribute('aria-label', 'WhatsApp');
      a.innerHTML = WA_BUBBLE + '<span>WhatsApp</span>';
      box.appendChild(a); return;
    }
    var btn = h('button', { type: 'button', class: 'wa', 'aria-expanded': 'false', 'aria-haspopup': 'true' });
    btn.innerHTML = WA_BUBBLE + '<span>WhatsApp</span>';
    var menu = h('div', { class: 'wa-menu', hidden: 'hidden' }, [h('p', null, [ui('wa.choose')])]);
    list.forEach(function (w) {
      menu.appendChild(ext(waHref(w.number), 'wa-item', [h('b', null, [w.label || 'WhatsApp']), h('small', null, [w.number])]));
    });
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.hidden;
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    box.appendChild(menu); box.appendChild(btn);
  }
  document.addEventListener('click', function (e) {
    var box = $('#wa-wrap'); if (!box) return;
    var menu = $('.wa-menu', box), btn = $('button.wa', box);
    if (menu && !menu.hidden && !box.contains(e.target)) { menu.hidden = true; if (btn) btn.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var menu = $('#wa-wrap .wa-menu'); if (menu) menu.hidden = true;
  });

  function overNote(ph) {
    var n = $('#over-note'); if (!n) return;
    n.hidden = ph.name !== 'over';
    n.textContent = ui('over.note');
  }

  function row(dl, label, content) {
    dl.appendChild(h('dt', null, [label]));
    dl.appendChild(h('dd', null, Array.isArray(content) ? content : [content]));
  }
  function venueLine(ev) { return ev.venue + ', ' + tx(ev.address); }
  function priceText(t) {
    var p = String(t.price === undefined || t.price === null ? '' : t.price).trim();
    return p ? p + ' ' + ui('cur') : ui('free');
  }

  function renderIndex(ph) {
    var ev = DATA.event, c = DATA.contact, pv = DATA.previous;

    // hero
    setText('#hero-eyebrow', ph.name === 'over' ? ui('hero.eb.over') : ph.name === 'before' ? ui('hero.eb') : ui('hero.eb.today'));
    var t = $('#hero-title'); clear(t);
    var name = ev.name || '', hl = ev.highlight || '', i = hl ? name.indexOf(hl) : -1;
    if (i >= 0) { t.appendChild(document.createTextNode(name.slice(0, i))); t.appendChild(h('em', null, [hl])); t.appendChild(document.createTextNode(name.slice(i + hl.length))); }
    else t.appendChild(document.createTextNode(name));
    setText('#hero-when', dateLong(ev.date) + ' · ' + (normTime(ev.time) || ev.time));
    setText('#hero-where', venueLine(ev));

    var count = $('#count'), msg = $('#count-msg');
    count.style.display = (ph.name === 'before' || ph.name === 'today') ? '' : 'none';
    msg.style.display = (ph.name === 'live' || ph.name === 'over') ? 'block' : 'none';
    msg.textContent = ph.name === 'over' ? ui('cd.over') : ui('cd.today');

    var act = $('#hero-actions'); clear(act);
    var reg = url(ev.registerUrl);
    if (ph.name === 'over') {
      act.appendChild(h('a', { class: 'btn', href: '#past' }, [ui('hero.results')]));
      act.appendChild(h('a', { class: 'btn ghost', href: '#contact' }, [ui('hero.follow')]));
    } else {
      if (reg) act.appendChild(ext(reg, 'btn', [ui('hero.register')]));
      act.appendChild(h('a', { class: 'btn ghost', href: 'rules' }, [ui('hero.rules')]));
    }

    // event details card
    var card = $('#ev-card'); clear(card);
    card.appendChild(h('span', { class: 'tag' }, [ev.name]));
    var dl = h('dl');
    row(dl, ui('ev.date'), dateLong(ev.date));
    row(dl, ui('ev.start'), normTime(ev.time) || ev.time);
    var vk = [ev.venue, h('br'), tx(ev.address)];
    if (url(ev.mapUrl)) { vk.push(h('br')); vk.push(ext(url(ev.mapUrl), null, [ui('ev.map')])); }
    row(dl, ui('ev.venue'), vk);
    var rk = [ui('ev.rules.v'), h('br'), h('a', { href: 'rules' }, [ui('ev.rules.exp')])];
    if (url(ev.rulesUrl)) { rk.push(h('br')); rk.push(ext(url(ev.rulesUrl), null, [ui('ev.rules.off')])); }
    row(dl, ui('ev.rules'), rk);
    row(dl, ui('ev.entry'), tx(ev.entry));
    card.appendChild(dl);
    if (ph.name !== 'over' && reg) card.appendChild(h('div', { class: 'actions' }, [ext(reg, 'btn', [ui('ev.cta')])]));

    // weigh-in + tickets summary cards
    var lc = $('#linkcards'); clear(lc);
    var days = (DATA.weighin.days || []);
    if (days.length) {
      lc.appendChild(h('a', { class: 'card linkcard', href: 'weigh-in' }, [
        h('h3', null, [ui('lk.weigh.t')]),
        h('p', null, [days.map(function (d) { return dateShort(d.date) + ' ' + d.from + '–' + d.to; }).join(' · ')]),
        h('span', { class: 'go' }, [ui('lk.go')])
      ]));
    }
    var items = (DATA.tickets.items || []);
    if (items.length) {
      lc.appendChild(h('a', { class: 'card linkcard', href: 'tickets' }, [
        h('h3', null, [ui('lk.tick.t')]),
        h('p', null, [items.map(function (it) { return tx(it.name) + ' ' + priceText(it); }).join(' · ')]),
        h('span', { class: 'go' }, [ui('lk.go')])
      ]));
    }

    var shopCats = (DATA.shop && DATA.shop.categories) || [], shopN = 0;
    shopCats.forEach(function (cat) { shopN += (cat.items || []).length; });
    if (shopCats.length) {
      lc.appendChild(h('a', { class: 'card linkcard', href: 'shop' }, [
        h('h3', null, [ui('lk.shop.t')]),
        h('p', null, [shopCats.map(function (cat) { return tx(cat.desc); }).filter(Boolean).join(' ')]),
        h('span', { class: 'go' }, [shopN ? ui('lk.go') : ui('lk.soon')])
      ]));
    }

    // previous events
    var g = $('#gallery'); clear(g);
    (DATA.gallery || []).forEach(function (p) {
      var src = String(p && p.src || '');
      if (!/^(photos\/[\w.\-]+|https:\/\/[^\s"'<>]+)$/.test(src)) return;
      var img = h('img', { src: src, alt: 'ADCC Georgia', loading: 'lazy' });
      var shot = h('div', { class: 'shot' }, [img]);
      img.addEventListener('error', function () { if (shot.parentNode) shot.parentNode.removeChild(shot); g.style.display = g.children.length ? '' : 'none'; });
      g.appendChild(shot);
    });
    g.style.display = g.children.length ? '' : 'none';
    var pp = $('#past-p'); clear(pp);
    if (pv.name) pp.appendChild(document.createTextNode(ui('past.p', { name: pv.name })));
    var pa = $('#past-actions'); clear(pa);
    var fb = String(c.facebook || '').trim();
    if (fb) pa.appendChild(ext('https://www.facebook.com/' + encodeURIComponent(fb), 'btn ghost', [ui('past.fb')]));
    if (url(pv.resultsUrl)) pa.appendChild(ext(url(pv.resultsUrl), 'btn ghost', [ui('past.res', { name: pv.name || '' })]));

    // contact tiles
    var tiles = $('#contact-tiles'); clear(tiles);
    function tile(ic, title, sub, href, newTab, wide) {
      var a = h('a', { class: 'tile' + (wide ? ' wide' : ''), href: href, target: newTab ? '_blank' : null, rel: newTab ? 'noopener' : null }, [icon(ic), h('span', { class: 'tt' }, [h('b', null, [title]), h('small', null, [sub])])]);
      tiles.appendChild(a);
    }
    if (String(c.email || '').trim()) tile('mail', ui('ct.email'), c.email, 'mailto:' + c.email.trim(), false, true);
    waList().forEach(function (w) { tile('phone', w.label || 'WhatsApp', w.number, waHref(w.number), true); });
    var ig = String(c.instagram || '').trim().replace(/^@/, '');
    if (ig) tile('camera', 'Instagram', '@' + ig, 'https://www.instagram.com/' + encodeURIComponent(ig), true);
    if (fb) tile('people', 'Facebook', ui('ct.follow'), 'https://www.facebook.com/' + encodeURIComponent(fb), true);
    var loc = $('#contact-loc'); clear(loc);
    if (tx(c.location)) { loc.appendChild(icon('pin')); loc.appendChild(h('span', null, [tx(c.location)])); }
  }

  function renderWeighin(ph) {
    var ev = DATA.event;
    setText('#wi-intro', ui('wi.p'));
    var box = $('#wi-cards'); clear(box);
    (DATA.weighin.days || []).forEach(function (d) {
      box.appendChild(h('div', { class: 'card sched' }, [
        tx(d.label) ? h('span', { class: 'tag' }, [tx(d.label)]) : null,
        h('h3', null, [dateLong(d.date)]),
        h('div', { class: 'time' }, [d.from + ' – ' + d.to])
      ]));
    });
    setText('#wi-addr', ev.venue + ', ' + tx(ev.address) + ', ' + ui('georgia'));
    var m = $('#wi-map'); clear(m);
    if (url(ev.mapUrl)) m.appendChild(ext(url(ev.mapUrl), null, [ui('ev.map')]));
    setText('#wi-note', ui('wi.note', { time: normTime(ev.time) || ev.time, date: dateOn(ev.date) }));
    var a = $('#wi-actions'); clear(a);
    if (ph.name !== 'over' && url(ev.registerUrl)) a.appendChild(ext(url(ev.registerUrl), 'btn', [ui('wi.btn')]));
    overNote(ph);
  }

  function renderTickets(ph) {
    var ev = DATA.event, tk = DATA.tickets;
    setText('#tk-intro', ui('tk.p', { date: dateLong(ev.date), venue: ev.venue, addr: tx(ev.address) }));
    var box = $('#tk-cards'); clear(box);
    (tk.items || []).forEach(function (it) {
      var p = String(it.price === undefined || it.price === null ? '' : it.price).trim();
      var amt = h('div', { class: 'amt' }, p ? [h('b', null, [p]), h('small', null, [ui('cur')])] : [h('b', null, [ui('free')])]);
      box.appendChild(h('div', { class: 'card ticket' + (it.featured ? ' vip' : '') }, [
        h('span', { class: 'tag' }, [tx(it.name)]), amt, h('p', null, [tx(it.desc)])
      ]));
    });
    var door = $('#tk-door'); clear(door);
    if (tx(tk.door)) { door.appendChild(icon('ticket')); door.appendChild(h('span', null, [tx(tk.door)])); door.hidden = false; } else door.hidden = true;
    var a = $('#tk-actions'); clear(a);
    var w = waList()[0];
    if (w) a.appendChild(ext(waHref(w.number), 'btn', [ui('tk.wa')]));
    overNote(ph);
  }

  function renderShop() {
    var sh = DATA.shop || {}, cats = sh.categories || [];
    setText('#shop-intro', tx(sh.intro));
    setText('#shop-note', tx(sh.note));
    var wa = waList()[0], ig = String((DATA.contact || {}).instagram || '').trim().replace(/^@/, '');
    var total = 0;
    cats.forEach(function (c) { total += (c.items || []).length; });

    var ban = $('#shop-banner'); clear(ban);
    var acts = $('#shop-actions'); clear(acts);
    if (ig) acts.appendChild(ext('https://www.instagram.com/' + encodeURIComponent(ig), 'btn ghost', [ui('shop.ig')]));
    if (wa) acts.appendChild(ext(waHref(wa.number), 'btn', [ui('tk.wa')]));
    if (!total) {
      ban.hidden = false;
      ban.appendChild(h('p', null, [ui('shop.banner')]));
    } else ban.hidden = true;

    var box = $('#shop-cats'); clear(box);
    cats.forEach(function (cat) {
      var items = (cat.items || []).filter(function (it) { return tx(it.name); });
      var coming = (cat.coming || []).filter(function (it) { return tx(it.name); });
      if (!tx(cat.name) || (!items.length && !coming.length)) return;
      var grid = h('div', { class: 'prod-grid' });
      if (items.length) items.forEach(function (it) { grid.appendChild(productCard(it, wa)); });
      else coming.forEach(function (it) {
        grid.appendChild(h('div', { class: 'prod ghost' }, [
          h('div', { class: 'ph' }, [icon(it.icon)]),
          h('div', { class: 'pb' }, [h('h3', null, [tx(it.name)]), h('span', { class: 'badge' }, [ui('shop.soon')])])
        ]));
      });
      box.appendChild(h('div', { class: 'cat' }, [
        h('h2', { class: 'cat-h' }, [tx(cat.name)]),
        tx(cat.desc) ? h('p', { class: 'cat-d' }, [tx(cat.desc)]) : null,
        grid
      ]));
    });
  }

  function productCard(it, wa) {
    var status = (it.status === 'soldout' || it.status === 'soon') ? it.status : 'available';
    var ph = h('div', { class: 'ph' }, [icon(it.icon)]);
    var src = String(it.photo || '');
    if (/^(photos\/[\w.\-]+|https:\/\/[^\s"'<>]+)$/.test(src)) {
      var img = h('img', { src: src, alt: tx(it.name), loading: 'lazy' });
      img.addEventListener('error', function () { if (img.parentNode) img.parentNode.removeChild(img); });
      ph.appendChild(img);
    }
    if (status !== 'available') ph.appendChild(h('span', { class: 'badge' }, [status === 'soon' ? ui('shop.soon') : ui('shop.sold')]));
    var body = h('div', { class: 'pb' }, [h('h3', null, [tx(it.name)])]);
    var p = String(it.price === undefined || it.price === null ? '' : it.price).trim();
    if (p) body.appendChild(h('div', { class: 'pr' }, [p + ' ', h('small', null, [ui('cur')])]));
    if (tx(it.desc)) body.appendChild(h('p', { class: 'pd' }, [tx(it.desc)]));

    var size = '', order = null;
    function href() {
      var t = ui('shop.msg', { name: tx(it.name) }) + (size ? ui('shop.msg.size', { size: size }) : '');
      return waHref(wa.number) + '?text=' + encodeURIComponent(t);
    }
    var sizes = String(it.sizes || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean);
    if (sizes.length && status === 'available') {
      var row = h('div', { class: 'sizes', role: 'group', 'aria-label': ui('shop.pick') });
      sizes.forEach(function (sz) {
        var b = h('button', { type: 'button', class: 'sz', 'aria-pressed': 'false' }, [sz]);
        b.addEventListener('click', function () {
          size = (size === sz) ? '' : sz;
          $$('.sz', row).forEach(function (x) { x.setAttribute('aria-pressed', x.textContent === size ? 'true' : 'false'); });
          if (order) order.setAttribute('href', href());
        });
        row.appendChild(b);
      });
      body.appendChild(row);
    } else if (sizes.length) {
      body.appendChild(h('p', { class: 'pd' }, [sizes.join(' · ')]));
    }
    if (wa && status === 'available') {
      order = ext(href(), 'btn sm', [ui('shop.order')]);
      body.appendChild(order);
    }
    return h('div', { class: 'prod' + (status === 'soldout' ? ' sold' : '') }, [ph, body]);
  }

  function renderAll() {
    if (!DATA) return;
    var ph = phase(DATA.event, Date.now());
    curPhase = ph.name;
    renderChrome(ph);
    if (page === 'index') renderIndex(ph);
    if (page === 'weigh-in') renderWeighin(ph);
    if (page === 'tickets') renderTickets(ph);
    if (page === 'shop') renderShop();
    tickCountdown(true);
    markKa();
    document.body.classList.remove('loading');
  }

  function tickCountdown(force) {
    if (!DATA || page !== 'index') return;
    var ph = phase(DATA.event, Date.now());
    if (!force && ph.name !== curPhase) { renderAll(); return; }
    if (ph.name !== 'before' && ph.name !== 'today') return;
    var sec = Math.max(0, Math.floor((ph.start - Date.now()) / 1000));
    setText('#cd-d', Math.floor(sec / 86400));
    setText('#cd-h', pad(Math.floor(sec % 86400 / 3600)));
    setText('#cd-m', pad(Math.floor(sec % 3600 / 60)));
    setText('#cd-s', pad(sec % 60));
  }

  // -------------------------------------------------------------------- start
  var q = (/[?&]lang=(ka|en)/.exec(location.search) || [])[1];
  var saved = ls() && ls().getItem(KEY);
  lang = (q || saved) === 'ka' ? 'ka' : 'en';
  DATA = merge(DEFAULTS, {});
  applyStatic();

  $$('[data-lang-btn]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(this.getAttribute('data-lang-btn')); });
  });
  var burger = $('.burger'), menu = $('#menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); });
    });
  }

  var ticking = false;
  function start(data) {
    DATA = merge(DEFAULTS, data || {});
    renderAll();
    if (!ticking) { ticking = true; setInterval(function () { tickCountdown(false); }, 1000); }
  }
  var timer = setTimeout(function () { start(null); }, 2500);   // never leave the page blank
  try {
    fetch('data.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { clearTimeout(timer); start(d); },
            function () { clearTimeout(timer); start(null); });
  } catch (e) { clearTimeout(timer); start(null); }
})();

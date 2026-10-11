import type { FaqItem } from '../../types';

/** English text of a vendor category (src/vendors.ts); the French slug is the key. */
export interface EnCategoryText {
  /** Plural label for menus, e.g. "Photographers". */
  name: string;
  /** Page heading and search-result title, e.g. "Wedding photographers in the Var". */
  title: string;
  /** Professional addressed by the listing form, e.g. "wedding photographer". */
  pro: string;
  menuDesc: string;
  /** Meta description, about 150 characters. */
  description: string;
  intro: string;
  /** When to book, e.g. "12 to 18 months ahead". */
  bookAhead: string;
  imageAlt: string;
  /** Markdown subset (see src/lib/richtext.tsx). */
  body: string;
  faq: FaqItem[];
}

export const enCategories: Record<string, EnCategoryText> = {
  photographes: {
    name: 'Photographers',
    title: 'Wedding photographers in the Var',
    pro: 'wedding photographer',
    menuDesc: 'Photographing your wedding day',
    description:
      'How to choose your wedding photographer in the Var: styles, southern light, questions to ask and the contract. Our advice and our partner studio.',
    intro:
      'Photographs are what remain of your wedding. In the Var, the light is a real asset, provided you know how to tame it. Here is how to choose the photographer who will tell the story of your day.',
    bookAhead: '12 to 18 months ahead',
    imageAlt: 'Bride wearing a veil outdoors',
    body: `
## Choosing a style

Documentary reportage, a fine-art approach, posed portraits: every photographer has their own way of telling the story of a wedding. Ask to see galleries of complete weddings, not just a selection of their best shots. It is the only way to judge how consistent they are across a whole day, from getting ready to the dancing.

## Taming the southern light

In high summer, the midday light is harsh and casts strong shadows on faces. The most beautiful images are often taken late in the day: schedule your couple portraits for the hour before sunset. A photographer who knows the region will also know where to place the ceremony so you are not backlit. Our article on [the best season](/en/journal/best-season-wedding-var) gives month-by-month pointers.

## Knowing the venue

A photographer who already knows your venue will know where to take the portraits and how to make the most of the wet-weather room if it rains. If not, plan a visit together, or send them photos of the venue taken at the time of the ceremony. To find your venue, browse [our directory](/en#lieux).

## Questions to ask

- How many hours of coverage are included, and what is the rate for an extra hour?
- How many photos will be delivered, in what format and how soon?
- Is a second photographer included or available as an option?
- Are travel costs included?
- What happens if you are unable to make it on the day?
- What rights to use the photos does the contract provide?

## Preparing for the day

Give the photographer the timeline for the day, the list of group shots you want and the name of someone who will help round up the guests. Plan a meal and a seat for them at dinner. And if you also have a videographer, arrange for the two of them to talk before the wedding: see our [videographers](/en/vendors/videographers) page.
`,
    faq: [
      {
        q: 'When should we book our wedding photographer?',
        a: 'Twelve to eighteen months ahead for a high-season Saturday: the most sought-after photographers are booked early, often straight after the venue.',
      },
      {
        q: 'How many hours of coverage do we need?',
        a: 'To cover getting ready, the ceremony, the drinks reception and the start of the evening, allow a full day. A shorter package can focus on the ceremony and the drinks reception.',
      },
      {
        q: 'What time should we do our couple portraits in the Var?',
        a: 'In the hour before sunset, when the light is soft and golden.',
      },
    ],
  },
  videastes: {
    name: 'Videographers',
    title: 'Wedding videographers in the Var',
    pro: 'wedding videographer',
    menuDesc: 'Your wedding film and teaser',
    description:
      'Choosing your wedding videographer in the Var: film, teaser, sound recording, drone footage and delivery. The questions to ask before you book.',
    intro:
      'A wedding film captures what photos cannot show: the voices, the speeches, the laughter, the music of the evening. Here is how to choose the videographer who will make it.',
    bookAhead: '9 to 12 months ahead',
    imageAlt: 'Newly-wed couple in soft, low light',
    body: `
## Teaser, short film or full film

Most videographers offer a teaser lasting a few minutes and a longer film, sometimes along with the full ceremony and speeches. Ask to see at least one complete film, not just trailers: it is the best way to judge the editing and the pacing.

## Sound, often overlooked

The vows, speeches and readings are what give a wedding film its value. Ask how the videographer records sound during an outdoor ceremony: lapel microphones, a recorder linked to the sound system, an ambient microphone. Coordinate this with the DJ or the musicians.

## Aerial footage

Drone shots show off the estates and landscapes of the Var. Check that the pilot is trained and insured, that they comply with the regulations, which ban or restrict flights in certain areas, particularly near airports and military sites, and that the venue agrees.

## Photographer and videographer: making them work together

The photographer and the videographer share the same key moments. If they are used to working together, they will get in each other's way less. If not, arrange a conversation before the wedding so they can agree on their positions during the ceremony. See also our [photographers](/en/vendors/photographers) page.

## Questions to ask

- How long will you be with us, and what does the delivery include: teaser, film, full ceremony?
- How long does delivery take?
- Is the music used in the film licensed?
- Is the raw footage kept, and for how long?
`,
    faq: [
      {
        q: 'When should we book our wedding videographer?',
        a: 'Nine to twelve months ahead, ideally after the venue and the photographer, so you can check that they are able to work together.',
      },
      {
        q: 'Do we need both a photographer and a videographer?',
        a: 'They are two different crafts. If your budget allows, they complement each other: photos for the album, film for the voices and the atmosphere.',
      },
      {
        q: 'Can we film our wedding with a drone in the Var?',
        a: 'Yes, if the pilot complies with the regulations and the venue allows it. Flights are banned or restricted in certain areas, particularly near airports and military sites.',
      },
    ],
  },
  'wedding-planners': {
    name: 'Wedding planners',
    title: 'Wedding planners in the Var',
    pro: 'wedding planner',
    menuDesc: 'Planning and coordination',
    description:
      'Wedding planners in the Var: full planning, partial planning or on-the-day coordination. How to choose the right package and what to ask.',
    intro:
      'A wedding planner saves you precious time, especially if you are planning a wedding in the Var from far away. You still need to choose the right package, though.',
    bookAhead: '12 to 18 months ahead',
    imageAlt: 'Planning a wedding with a notebook and a laptop',
    body: `
## Three levels of support

- **Full planning**: the wedding planner guides you from the venue search to the big day, selects the vendors and keeps track of the budget.
- **Partial planning**: you already have the venue and a few vendors; the planner fills the gaps and coordinates the rest.
- **On-the-day coordination**: the planner takes over your arrangements a few weeks beforehand and runs the day so that you can enjoy it.

## Why it helps in the Var

Many couples who marry in the Var do not live there. A local wedding planner knows the venues, the vendors, the real distances between estates and hotels, and the constraints of the region: heat, wind, summer traffic, fire-prevention rules. They can visit venues on your behalf and present you with a shortlist that suits you.

## How they are paid

Depending on the professional, they charge either a flat fee or a percentage of the wedding budget. Ask for a detailed quote, and check whether they receive commissions from the vendors they recommend.

## Questions to ask

- How many weddings do you organise each year, and how many on the same weekend?
- Will you be there in person on the day, and until what time?
- Which venues and vendors in the Var do you usually work with?
- How do you keep track of the budget, and how often do we check in?

To shortlist venues together, use [our directory](/en#lieux) and our [complete guide](/en/journal/plan-wedding-var-guide).
`,
    faq: [
      {
        q: 'What is the difference between a wedding planner and an on-the-day coordinator?',
        a: 'A wedding planner organises all or part of the wedding over several months. A coordinator takes over your arrangements a few weeks before the date and runs the day itself.',
      },
      {
        q: 'When should we book a wedding planner?',
        a: 'As early as possible for full planning, ideally before choosing the venue: twelve to eighteen months ahead.',
      },
      {
        q: 'Is a wedding planner useful if we live far from the Var?',
        a: 'That is often when they are most useful: they visit venues, meet vendors and sort out the details on the ground for you.',
      },
    ],
  },
  traiteurs: {
    name: 'Caterers',
    title: 'Wedding caterers in the Var',
    pro: 'caterer',
    menuDesc: 'Drinks reception, dinner and service',
    description:
      'Choosing your wedding caterer in the Var: in-house or free choice, what the quote covers, tastings, summer heat and corkage. Our advice.',
    intro:
      'The meal is one of the moments your guests will remember, and often the biggest single cost of the reception. Here is how to choose your wedding caterer in the Var.',
    bookAhead: '12 months ahead',
    imageAlt: "Caterer's buffet laid out for a reception",
    body: `
## Required, approved or free choice

Before anything else, ask your venue about its policy: some estates require you to use their own caterer, others offer a list of approved caterers, and others leave the choice entirely to you. This changes everything, so check it before you sign with the venue.

## What a quote includes

A caterer's quote generally covers the drinks reception, dinner, dessert and service. Check what is and is not included:

- the serving staff and the number of waiters;
- crockery, glassware and table linen;
- drinks, or the corkage fee if you bring your own wines;
- meals for the vendors;
- the brunch the day after;
- overtime beyond the agreed hours.

Our article on [wedding venue prices](/en/journal/wedding-venue-prices-var) details the other costs to plan for.

## Heat, a southern constraint

In summer, the heat calls for particular care with the cold chain, especially for an outdoor drinks reception. Ask the caterer how they manage it: cooking on site, a refrigerated vehicle, cold dishes served at the last minute. Favour seasonal menus with local produce, too.

## The tasting

Most caterers offer a tasting before or after you sign. It is the moment to approve the dishes, the quantities, any special diets and the wine pairings.

## Large weddings

Serving several hundred hot plates at the same time takes a large kitchen team and a suitable kitchen. For more than 200 guests, read our article on [large weddings in the Var](/en/journal/large-wedding-venues-var).
`,
    faq: [
      {
        q: 'Can our venue make us use a particular caterer?',
        a: 'Yes, some venues require you to use their own caterer or one from a closed list. Check this before booking the venue.',
      },
      {
        q: 'How many waiters does a wedding need?',
        a: 'It depends on the number of guests and the style of service. For a plated dinner, ask the caterer how many waiters they plan for: it is the key to smooth service.',
      },
      {
        q: 'What is corkage?',
        a: 'A charge for each bottle the couple brings in. Ask about it before signing if you plan to supply your own wines or champagne.',
      },
    ],
  },
  'musique-dj': {
    name: 'Music and DJs',
    title: 'Wedding DJs and musicians in the Var',
    pro: 'DJ or musician',
    menuDesc: 'Ceremony, drinks reception and party',
    description:
      'DJ, live band or ceremony musicians: how to choose the music for your wedding in the Var, and the sound restrictions to check.',
    intro:
      'Music accompanies every moment of the wedding: the walk down the aisle, the drinks reception, dinner and the dancing. Here is how to choose the right performers.',
    bookAhead: '9 to 12 months ahead',
    imageAlt: 'Evening party with dancing under the lights',
    body: `
## DJ, band or both

A DJ covers every style and adapts to the crowd; a live band creates a more festive atmosphere but often costs more. Many couples combine musicians for the ceremony and the drinks reception, such as a string quartet, a guitarist or a saxophonist, with a DJ for the evening.

## Venue restrictions

Venues often set rules for amplified music, whether they are tucked away among the vines or close to neighbours:

- a cut-off time for music, or for outdoor music;
- a sound limiter, which cuts the power above a certain volume;
- a limited electricity supply.

Pass these rules on to your DJ as soon as you book.

## Sound for the ceremony

Outdoors, voices do not carry well: plan microphones for the officiant and anyone speaking. Check whether the DJ or the musicians provide the sound system for the ceremony. Our guide to [the symbolic ceremony](/en/journal/symbolic-wedding-ceremony-provence) explains how it unfolds.

## Questions to ask

- How many hours are included, and what is the rate for an extra hour?
- Is the equipment included: sound system, lighting, microphones?
- How will you put the playlist together with us?
- Have you played at this venue before?
- How long does setting up take, and what time do you arrive?
`,
    faq: [
      {
        q: 'How late can the music go on at a wedding?',
        a: 'It depends on the venue and the local municipality. Many estates set a cut-off time and require a sound limiter: ask before booking.',
      },
      {
        q: 'Do we need musicians for a symbolic ceremony?',
        a: 'It is not essential, but live musicians make the entrance and the exit of the ceremony more moving. A DJ can also play a playlist.',
      },
      {
        q: 'When should we book our wedding DJ?',
        a: 'Nine to twelve months ahead for a high-season Saturday.',
      },
    ],
  },
  fleuristes: {
    name: 'Florists',
    title: 'Wedding florists in the Var',
    pro: 'florist',
    menuDesc: 'Bouquet, arch and centrepieces',
    description:
      'Wedding florists in the Var: bouquet, ceremony arch, centrepieces, seasonal flowers and the summer heat. Our advice for choosing well.',
    intro:
      'Bouquet, buttonholes, ceremony arch, centrepieces: flowers set the tone for the decor. In Provence, olive, lavender and seasonal blooms sit naturally against old stone.',
    bookAhead: '6 to 9 months ahead',
    imageAlt: 'Bridal bouquet of roses',
    body: `
## Seasonal flowers

Seasonal flowers are more beautiful, fresher and often cheaper. Ask your florist what will be in season on your wedding date, and start from there rather than from a photo you found online.

## Heat, the enemy of flowers

In high summer in the Var, flowers wilt quickly outdoors. A florist who knows the region will favour plants that stand up better to the heat, such as olive, eucalyptus or ornamental grasses, and will put the arrangements in place at the last minute.

## Giving flowers a second life

To make your budget go further, have the arrangements reused: the ceremony arch can decorate the top table, and the bridesmaids' bouquets can dress the buffet. Ask your florist, who will organise the move during the drinks reception.

## Questions to ask

- Are setting up and clearing away included?
- Who collects the equipment, such as vases and structures, after the wedding?
- Which flowers will be in season on our date?
- Can you visit the venue before the wedding?

For the decor as a whole, see also our [decor and hire](/en/vendors/decor-hire) page.
`,
    faq: [
      {
        q: 'When should we book our wedding florist?',
        a: 'Six to nine months ahead, once the venue and the style of decor are settled.',
      },
      {
        q: 'Which flowers cope with the heat at a summer wedding?',
        a: 'Foliage such as olive and eucalyptus, ornamental grasses and dried flowers hold up better than delicate blooms. Ask your florist for advice.',
      },
      {
        q: 'Can we reuse the ceremony flowers at the reception?',
        a: 'Yes, it is a good way to save money: the arch and the ceremony arrangements can be moved to the reception area.',
      },
    ],
  },
  decoration: {
    name: 'Decor and hire',
    title: 'Wedding decor and hire in the Var',
    pro: 'decorator or equipment hire company',
    menuDesc: 'Furniture, tableware, marquees',
    description:
      'Decorators and hire of furniture, tableware, marquees and lighting for a wedding in the Var: what you will need, depending on your venue.',
    intro:
      'Depending on your venue, you may need very little equipment or a great deal. Decorators and hire companies help you turn an estate into a place to celebrate, from the furniture to the lighting.',
    bookAhead: '6 to 9 months ahead',
    imageAlt: 'Reception room decorated with string lights',
    body: `
## Start from what the venue provides

Some venues come with tables, chairs and tableware; others are hired empty. List what is included before contacting a hire company: it is one of the items that makes the budget vary the most, as our article on [wedding venue prices](/en/journal/wedding-venue-prices-var) explains.

## What is most often hired

- tables, chairs and lounge furniture for the drinks reception;
- crockery, glassware, cutlery and table linen;
- marquees and shade sails, for the sun as well as for plan B;
- lighting: string lights, lanterns, spotlights;
- a dance floor and a stage.

## Decorator or hire only

A decorator designs the look, supplies the equipment, sets it up and takes it down. Hiring alone is cheaper, but the setting up then falls to you or your family and friends, often the day before the wedding.

## Wind and fire risk

In the Var, the wind can pick up late in the day: weigh down light items and firmly secure shade sails and marquees. For ambient lighting, choose LED candles: naked flames are tightly regulated in summer because of the fire risk.

For flowers, see our [florists](/en/vendors/florists) page.
`,
    faq: [
      {
        q: 'Do we need to hire a marquee for an outdoor wedding?',
        a: "If the venue's wet-weather room cannot seat all your guests, a marquee is the best insurance against rain and wind.",
      },
      {
        q: 'Can we use candles at a summer wedding in the Var?',
        a: "Naked flames are tightly regulated when the fire risk is high. LED candles are a safe alternative; ask about the venue's own rules too.",
      },
      {
        q: 'When should we book equipment hire?',
        a: 'Six to nine months ahead for the high season, especially for marquees and large quantities of furniture.',
      },
    ],
  },
  'coiffure-maquillage': {
    name: 'Hair and make-up',
    title: 'Wedding hair and make-up in the Var',
    pro: 'hairdresser or make-up artist',
    menuDesc: 'Looking your best on the day',
    description:
      'Wedding hair and make-up in the Var: the trial, lasting through the heat, travel to where you get ready. How to choose the right professionals.',
    intro:
      'Hair and make-up have to last all day, from the ceremony to the dancing, despite the southern heat. Here is how to choose the right professionals.',
    bookAhead: '6 to 9 months ahead',
    imageAlt: 'Bride having her make-up done',
    body: `
## The trial: essential

Plan a full trial, hair and make-up, a few weeks before the wedding. Bring photos of your outfit, your accessories and hairstyles you like. It is also the moment to check that you get on well.

## Lasting through the heat

In summer, the heat and sun put make-up to the test. A professional used to weddings in the south will use long-wear, water-resistant products and leave you what you need for touch-ups during the evening.

## Coming to you

Most professionals travel to wherever you are getting ready. Check the travel costs, the arrival time and how long they need if you would also like your bridesmaids or family to have their hair and make-up done. Set aside a bright room for them to work in.

## Questions to ask

- Is the trial included in the price?
- How many people can you get ready on the morning of the wedding?
- Will you stay for a touch-up before the ceremony or the evening?
- Do you work alone or with a team?
`,
    faq: [
      {
        q: 'When should I have my hair and make-up trial?',
        a: 'Usually one to three months before the wedding, once your outfit and accessories are chosen.',
      },
      {
        q: 'How do I make my make-up last in summer?',
        a: 'With long-wear products, good skin preparation and what you need for touch-ups. Your make-up artist will advise you according to your skin.',
      },
      {
        q: 'Do we need to book hair and make-up early?',
        a: 'Yes, for high-season Saturdays: six to nine months ahead.',
      },
    ],
  },
  'robes-costumes': {
    name: 'Dresses and suits',
    title: 'Wedding dresses and suits in the Var',
    pro: 'dress or suit designer',
    menuDesc: 'Wedding outfits and alterations',
    description:
      "Wedding dress and groom's suit: ordering times, alterations and fabrics suited to the heat of the Var. The timeline and our advice.",
    intro:
      'Your outfit is often the most personal choice of the wedding, and one of those that needs the most forward planning. Here is the timeline, and the points not to forget, for a wedding in the Var.',
    bookAhead: '8 to 12 months ahead',
    imageAlt: 'Bride in her gown holding her bouquet beside the groom in a suit',
    body: `
## Allow plenty of time

Between ordering, making and alterations, a wedding dress often takes several months. Start trying on dresses eight to twelve months ahead, earlier for a made-to-measure design. Made-to-measure suits also take several weeks to make.

## Fabrics suited to the heat

For a midsummer wedding, choose light, breathable fabrics: linen, chiffon, crêpe, silk. A suit in linen or lightweight wool will be far more comfortable than a heavy fabric at an outdoor ceremony.

## Think about the venue

A long train among the vines or on gravel, stiletto heels on the lawn: think about the ground at your venue. Bring a second, more comfortable pair of shoes for the evening.

## Alterations

Allow two to three fittings for alterations, the last a few weeks before the wedding. Bring the shoes and underwear you will be wearing on the day.

For hair and make-up, see our [hair and make-up](/en/vendors/hair-makeup) page.
`,
    faq: [
      {
        q: 'When should I buy my wedding dress?',
        a: 'Eight to twelve months before the wedding, earlier for a made-to-measure design, to allow time for making and alterations.',
      },
      {
        q: 'Which fabric suits a summer wedding in the Var?',
        a: 'Light, breathable fabrics such as linen, chiffon, crêpe or silk, for the dress as well as for the suit.',
      },
      {
        q: 'How many alteration fittings should we plan?',
        a: 'Usually two to three, the last a few weeks before the date.',
      },
    ],
  },
  patissiers: {
    name: 'Cakes and pastry chefs',
    title: 'Wedding cakes and pastry chefs in the Var',
    pro: 'pastry chef',
    menuDesc: 'Croquembouche and wedding cake',
    description:
      'Croquembouche, wedding cake or dessert table: choosing your wedding pastry chef in the Var and coping with the summer heat.',
    intro:
      'A traditional croquembouche, a tiered wedding cake or a dessert table: the cake is one of the high points of the evening. In the Var, it also has to stand up to the heat.',
    bookAhead: '3 to 6 months ahead',
    imageAlt: 'Wedding cake decorated with flowers',
    body: `
## Croquembouche, wedding cake or dessert table

- **The croquembouche** (pièce montée): the French tradition, a tower of caramelised choux buns that is easy to share.
- **The wedding cake**: a decorated tiered cake, often spectacular.
- **The dessert table**: a selection of pastries to share, always popular with guests.

Ask your caterer what they offer, too: some include dessert in their package.

## Heat and transport

Buttercream, whipped cream and chocolate do not cope well with heat. In summer, ask the pastry chef for recipes suited to the heat, delivery at the last minute and a cool place to store the cake at the venue. Transporting it along the winding roads of the hinterland also takes experience.

## The tasting

As with the caterer, a tasting lets you choose the flavours. Schedule it once the dinner menu is set, so that the meal is well balanced.

## Cake-cutting fee

Some venues or caterers charge a cake-cutting fee when the cake comes from another supplier. Check before you order. See also our [caterers](/en/vendors/caterers) page.
`,
    faq: [
      {
        q: 'When should we order our wedding cake?',
        a: 'Three to six months before the wedding, earlier for a much sought-after pastry chef in the high season.',
      },
      {
        q: 'Which cake suits a summer wedding?',
        a: 'Choose recipes that cope with the heat, and arrange cool storage at the venue and last-minute delivery.',
      },
      {
        q: 'Can the caterer provide the cake?',
        a: "Often, yes. Compare their offer with a pastry chef's, and check whether a cake-cutting fee applies to a cake from elsewhere.",
      },
    ],
  },
  officiants: {
    name: 'Ceremony officiants',
    title: 'Officiants for symbolic ceremonies in the Var',
    pro: 'ceremony officiant',
    menuDesc: 'A symbolic ceremony made for you',
    description:
      'Symbolic ceremony officiants in the Var: their role, the running order, how to choose one and when to book for a ceremony tailored to you.',
    intro:
      'The officiant writes and leads your symbolic ceremony, and makes it a personal moment that reflects who you are, among the olive trees or facing the sea.',
    bookAhead: '6 to 12 months ahead',
    imageAlt: 'Flower-decked ceremony arch facing the hills',
    body: `
## The officiant's role

The officiant meets the couple, gathers their story, writes the ceremony and coordinates the contributions from family and friends. On the day, they lead the ceremony and set its pace. A symbolic ceremony has no legal standing: the legal marriage remains the civil ceremony held at the town hall (mairie).

## Professional or friend

A friend or relative who is comfortable speaking in public can officiate, and it is often very moving. A professional officiant brings a method, a carefully crafted text and the experience of many ceremonies. Our guide to [the symbolic ceremony in Provence](/en/journal/symbolic-wedding-ceremony-provence) explains how it unfolds.

## Choosing the spot together

The officiant can help you choose where to hold the ceremony at the venue: its orientation to the sun, the acoustics, where the guests will sit. Many venues in the Var have a dedicated space, such as an open-air garden theatre or an olive grove.

## Questions to ask

- How many preparation meetings are included?
- Can we read the text before the wedding?
- Do you provide the sound system for the ceremony?
- How long does the ceremony last?
`,
    faq: [
      {
        q: 'Can a symbolic ceremony officiant marry us legally?',
        a: 'No. Only the civil ceremony, held at the town hall, is legally binding. The symbolic ceremony is just that: symbolic.',
      },
      {
        q: 'How long does a symbolic ceremony last?',
        a: 'Generally between 30 and 45 minutes.',
      },
      {
        q: 'When should we book our officiant?',
        a: 'Six to twelve months ahead, to leave time for the preparation meetings.',
      },
    ],
  },
  transport: {
    name: 'Transport and cars',
    title: 'Wedding transport and cars in the Var',
    pro: 'vehicle hire or transport company',
    menuDesc: "The couple's car and guest shuttles",
    description:
      "The couple's car and guest shuttles: organising transport for a wedding in the Var, between estates, hotels and railway stations.",
    intro:
      'In the Var, wedding venues are often a long way from hotels and stations. Transport deserves proper planning, for the couple and the guests alike.',
    bookAhead: '3 to 6 months ahead',
    imageAlt: 'Newly-weds walking along a country road',
    body: `
## The couple's car

Vintage car, convertible, chauffeur-driven vehicle: the wedding car takes you between the town hall, the ceremony and the reception, and makes a lovely backdrop for photos. Check that it copes with the summer heat and that the driver knows the way into the venue.

## Shuttles for guests

Shuttles between the hotels and the venue spare guests a night-time drive on winding roads after the party. Plan several runs at the end of the evening, and a service from the station or the airport for guests coming from afar.

## Check access to the venue

Many estates lie at the end of narrow lanes: ask the venue whether a coach can get all the way to the car park. Our article on [large weddings](/en/journal/large-wedding-venues-var) covers the logistics for a long guest list, and the one on [venues with accommodation](/en/journal/wedding-venues-with-accommodation-var) helps cut down on journeys.

## Summer traffic

On the coast in July and August, traffic is heavy, especially at weekends. Build some slack into the timeline, particularly between the town hall and the reception venue.
`,
    faq: [
      {
        q: 'Should we organise shuttles for our guests?',
        a: 'It is strongly recommended if the venue is far from the hotels: it saves guests a night-time drive after the party.',
      },
      {
        q: 'When should we book the wedding car?',
        a: 'Three to six months ahead, earlier for a vintage vehicle in the high season.',
      },
      {
        q: 'Can a coach reach every estate?',
        a: 'No, some lanes are too narrow. Check access with the venue before booking.',
      },
    ],
  },
  papeterie: {
    name: 'Invitations and stationery',
    title: 'Wedding invitations and stationery in the Var',
    pro: 'stationery designer',
    menuDesc: 'Save the dates, invitations, menus',
    description:
      'Save the dates, invitations, menus and seating plan: the timeline and our advice for the stationery of your wedding in the Var.',
    intro:
      'From the save the date to the place cards, your stationery gives guests a first glimpse of your wedding and guides them on the day.',
    bookAhead: '6 to 9 months ahead',
    imageAlt: 'Wedding table laid with menus and bouquets',
    body: `
## The timeline

- **The save the date**: nine to twelve months ahead, especially if your guests are travelling from afar.
- **The invitation**: four to six months ahead.
- **The on-the-day items**: menus, place cards, seating plan and order of service, finalised in the last month.

Our [planning timeline](/en/journal/wedding-planning-timeline) places these steps within the planning as a whole.

## Practical information

For a wedding in the Var, the invitation or the wedding website should give directions to the venue, nearby accommodation, railway stations and airports, and the programme for the weekend. Remember the dress code too: shoes suited to gardens, light outfits in summer.

## A consistent look

A single visual identity, from the invitations to the menus, gives the decor a sense of unity. Olive branches, vines or lavender suit a wedding in Provence.
`,
    faq: [
      {
        q: 'When should we send our wedding invitations?',
        a: 'Four to six months ahead, preceded by a save the date nine to twelve months ahead if your guests are travelling from afar.',
      },
      {
        q: 'What should go on a wedding invitation?',
        a: 'The date, the venues and times, directions, nearby accommodation, the RSVP deadline and a link to the wedding website.',
      },
      {
        q: 'Do we need a wedding website?',
        a: 'It is very handy for keeping information, RSVPs and accommodation in one place, especially for a wedding far from home.',
      },
    ],
  },
  animations: {
    name: 'Entertainment',
    title: 'Wedding entertainment in the Var',
    pro: 'entertainment provider',
    menuDesc: 'Photo booth, children, performers',
    description:
      "Photo booths, children's entertainment, performers, games for the drinks reception: wedding entertainment ideas in the Var, and the rules to follow.",
    intro:
      'Well-chosen entertainment livens up the drinks reception, keeps the children busy or creates a lasting memory. Here are the ideas that work, and the rules to know in the Var.',
    bookAhead: '3 to 6 months ahead',
    imageAlt: 'Newly-weds under a shower of confetti',
    body: `
## Entertainment that goes down well

- **The photo booth**: guests leave with their photos, and you with a keepsake album.
- **Children's entertainment**: entertainers or babysitters in a dedicated space, so that parents can enjoy the evening.
- **Games during the drinks reception**: pétanque, wooden games, a tasting of the estate's wines.
- **Performers**: a magician during drinks, dancers, roaming musicians.

## Fireworks and lanterns

In summer, fire-prevention rules strictly limit any use of fire in the Var. Fireworks and sky lanterns are often banned or need permission. Check with the venue and the town hall, and plan alternatives: bubbles, biodegradable confetti, petals, lavender.

## Timing it well

Entertainment works when it fills a lull: during your couple portraits, between the drinks reception and dinner, or late in the evening. Fit it into the schedule with the venue and the DJ. See also our [music and DJs](/en/vendors/music-dj) page.
`,
    faq: [
      {
        q: 'Can we have fireworks at a wedding in the Var?',
        a: 'In summer, the use of fire is tightly regulated because of the fire risk. Check with the venue and the town hall before planning any.',
      },
      {
        q: 'How can we keep children entertained at a wedding?',
        a: 'With a dedicated space and professional entertainers or babysitters, especially during dinner and the evening party.',
      },
      {
        q: 'When should we book a photo booth?',
        a: 'Three to six months ahead for a high-season Saturday.',
      },
    ],
  },
  alliances: {
    name: 'Rings and jewellery',
    title: 'Wedding rings in the Var',
    pro: 'jeweller',
    menuDesc: 'Wedding rings, engraving, jewellery',
    description:
      'Choosing your wedding rings: metals, sizing, engraving and making times. Our advice and the right timeline before the wedding.',
    intro:
      'Wedding rings are worn for a lifetime: they deserve to be chosen without rushing. Here is what you need to know, and the timeline to follow.',
    bookAhead: '3 to 4 months ahead',
    imageAlt: 'Wedding rings resting on flowers',
    body: `
## Choosing the metal

Yellow gold, white gold, rose gold, platinum: each metal has its own style and durability. Think about how it will go with the engagement ring, worn on the same finger, and about your everyday life if you do a lot of work with your hands.

## The right size

Fingers swell in the heat: have them measured at a representative time of day, neither in a heatwave nor first thing in the morning. The jeweller will also advise you on the width, which changes how the ring feels on your finger.

## Engraving and lead times

Allow three to four months for rings that are made or adjusted for you, longer for a bespoke design. Engraving, whether a date, your names or a message, takes a few more days.

## On the day

Decide who will look after the rings until the ceremony, and plan a ring cushion or box. A child can bring them up, under an adult's watchful eye. Our guide to [the symbolic ceremony](/en/journal/symbolic-wedding-ceremony-provence) covers the moment of the exchange.
`,
    faq: [
      {
        q: 'When should we buy our wedding rings?',
        a: 'Three to four months before the wedding, longer for a bespoke design.',
      },
      {
        q: 'How do we find the right ring size?',
        a: 'Have a jeweller measure you, at a time when your fingers are neither swollen by the heat nor numb with cold.',
      },
      {
        q: 'Do our wedding rings have to match?',
        a: 'Not necessarily. Many couples choose different designs in the same metal, or a shared engraving.',
      },
    ],
  },
};

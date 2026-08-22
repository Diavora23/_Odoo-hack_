// Initial sample trips for the user (Ongoing, Upcoming, Past)

export const INITIAL_USER_TRIPS = [
  {
    id: "trip-jaipur-ongoing",
    cityId: "jaipur",
    cityName: "Jaipur",
    state: "Rajasthan",
    tripTitle: "Royal Heritage Odyssey",
    coverImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    status: "ongoing", // ongoing | upcoming | past
    startDate: "2026-08-21",
    endDate: "2026-08-25",
    durationDays: 5,
    travelers: 2,
    planType: "balanced",
    planName: "Royal Heritage Explorer",
    hotel: {
      name: "Alsisar Haveli Heritage",
      pricePerNight: 4200,
      totalHotelCost: 16800,
    },
    totalBudget: 34500,
    spentBudget: 14200,
    days: [
      {
        dayNumber: 1,
        date: "2026-08-21",
        theme: "Arrival & The Grand Forts",
        activities: [
          { id: "act-1", title: "Check-in at Alsisar Haveli", time: "11:00 AM", cost: 0, category: "Stay", icon: "Hotel", notes: "Welcome drink with traditional garland" },
          { id: "act-2", title: "Amber Fort & Palace Tour", time: "02:00 PM", cost: 1000, category: "Sightseeing", icon: "Landmark", notes: "Audio guide through Sheesh Mahal" },
          { id: "act-3", title: "Nahargarh Fort Sunset Point", time: "05:30 PM", cost: 600, category: "Adventure", icon: "Sunset", notes: "Sunset views over Pink City" },
          { id: "act-4", title: "Royal Dal Baati Churma Dinner at LMB", time: "08:00 PM", cost: 1300, category: "Food", icon: "Utensils", notes: "Traditional thali feast" },
        ]
      },
      {
        dayNumber: 2,
        date: "2026-08-22",
        theme: "City Center Palaces & Astronomy",
        activities: [
          { id: "act-5", title: "Pyaaz Kachori Breakfast at Rawat", time: "08:30 AM", cost: 360, category: "Food", icon: "Coffee", notes: "Crispy kachori with kulhad tea" },
          { id: "act-6", title: "Hawa Mahal Photography Session", time: "10:00 AM", cost: 400, category: "Sightseeing", icon: "Camera", notes: "Morning light captures from Wind View Cafe" },
          { id: "act-7", title: "City Palace & Jantar Mantar", time: "01:30 PM", cost: 1400, category: "Culture", icon: "Compass", notes: "UNESCO World Heritage sun dials" },
          { id: "act-8", title: "Bapu Bazaar Textile & Mojari Walk", time: "05:00 PM", cost: 0, category: "Shopping", icon: "ShoppingBag", notes: "Handicrafts & Jaipuri quilts" },
        ]
      },
      {
        dayNumber: 3,
        date: "2026-08-23",
        theme: "Artisans & Royal Dining",
        activities: [
          { id: "act-9", title: "Bagru Block Printing Workshop", time: "09:30 AM", cost: 1200, category: "Culture", icon: "Sparkles", notes: "Create custom indigo block print scarf" },
          { id: "act-10", title: "Jaigarh Fort & Jaivana Cannon", time: "02:30 PM", cost: 500, category: "Sightseeing", icon: "Shield", notes: "World's largest wheeled cannon" },
          { id: "act-11", title: "Laal Maas Feast at Handi", time: "08:00 PM", cost: 1900, category: "Food", icon: "Utensils", notes: "Signature Rajasthani specialty" },
        ]
      },
      {
        dayNumber: 4,
        date: "2026-08-24",
        theme: "Stepwells & Cultural Night",
        activities: [
          { id: "act-12", title: "Panna Meena Ka Kund Stepwell", time: "08:00 AM", cost: 0, category: "Sightseeing", icon: "Camera", notes: "Geometric 16th century stepwell" },
          { id: "act-13", title: "Albert Hall Museum & Pigeon Square", time: "11:30 AM", cost: 600, category: "Culture", icon: "Landmark", notes: "Indo-Saracenic museum architecture" },
          { id: "act-14", title: "Chokhi Dhani Ethnic Resort & Folk Show", time: "06:00 PM", cost: 2400, category: "Culture", icon: "Sparkles", notes: "Puppetry, fire dancers, and village feast" },
        ]
      },
      {
        dayNumber: 5,
        date: "2026-08-25",
        theme: "Souvenirs & Departure",
        activities: [
          { id: "act-15", title: "Mawa Ghevar Tasting at Gulab Ji", time: "09:00 AM", cost: 280, category: "Food", icon: "Coffee", notes: "Sweet farewell snack" },
          { id: "act-16", title: "Blue Pottery Studio Visit", time: "10:30 AM", cost: 800, category: "Shopping", icon: "ShoppingBag", notes: "Pick up hand-painted vases" },
          { id: "act-17", title: "Airport / Station Transfer", time: "02:00 PM", cost: 600, category: "Transport", icon: "Car", notes: "Departure from Jaipur" },
        ]
      }
    ]
  },
  {
    id: "trip-kerala-upcoming",
    cityId: "kerala",
    cityName: "Kerala (Munnar & Alleppey)",
    state: "Kerala",
    tripTitle: "Backwaters & Mist-Clad Tea Trails",
    coverImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    status: "upcoming",
    startDate: "2026-09-10",
    endDate: "2026-09-15",
    durationDays: 6,
    travelers: 4,
    planType: "balanced",
    planName: "Lush Hills & Houseboat Classic",
    hotel: {
      name: "Blanket Resort Munnar & Alleppey AC Houseboat",
      pricePerNight: 6200,
      totalHotelCost: 31000,
    },
    totalBudget: 62400,
    spentBudget: 0,
    days: [
      {
        dayNumber: 1,
        date: "2026-09-10",
        theme: "Scenic Drive to Munnar Tea Country",
        activities: [
          { id: "k-act-1", title: "Kochi to Munnar Mountain Drive via Cheeyappara Falls", time: "09:00 AM", cost: 2500, category: "Transport", icon: "Car", notes: "Picturesque waterfalls along the ghats" },
          { id: "k-act-2", title: "Check-in at Blanket Resort", time: "01:30 PM", cost: 0, category: "Stay", icon: "Hotel", notes: "Balcony overlooking Attukad waterfall" },
          { id: "k-act-3", title: "Tea Museum & Tasting Session", time: "04:00 PM", cost: 800, category: "Culture", icon: "Coffee", notes: "Learn CTC processing & blend tasting" },
        ]
      },
      {
        dayNumber: 2,
        date: "2026-09-11",
        theme: "Clouds of Kolukkumalai",
        activities: [
          { id: "k-act-4", title: "Kolukkumalai Sunrise 4x4 Jeep Safari", time: "04:30 AM", cost: 3600, category: "Adventure", icon: "Sunrise", notes: "Highest organic tea garden in the world" },
          { id: "k-act-5", title: "Appam & Veg Stew Breakfast", time: "09:30 AM", cost: 720, category: "Food", icon: "Utensils", notes: "Traditional Kerala breakfast" },
          { id: "k-act-6", title: "Eravikulam National Park Safari", time: "02:00 PM", cost: 1600, category: "Nature", icon: "Trees", notes: "Spot the endangered Nilgiri Tahr" },
        ]
      }
    ]
  },
  {
    id: "trip-agra-past",
    cityId: "agra",
    cityName: "Agra",
    state: "Uttar Pradesh",
    tripTitle: "Mughal Splendors & Taj Sunrise",
    coverImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    status: "past",
    startDate: "2026-06-12",
    endDate: "2026-06-14",
    durationDays: 3,
    travelers: 2,
    planType: "budget",
    planName: "Golden Triangle Taj Express",
    hotel: {
      name: "Joey's Taj View Hostel",
      pricePerNight: 800,
      totalHotelCost: 1600,
    },
    totalBudget: 8900,
    spentBudget: 8650,
    days: [
      {
        dayNumber: 1,
        date: "2026-06-12",
        theme: "Taj Mahal Dawn",
        activities: [
          { id: "a-act-1", title: "Taj Mahal Sunrise Ticket", time: "05:45 AM", cost: 1000, category: "Sightseeing", icon: "Landmark", notes: "Sunrise golden light" },
          { id: "a-act-2", title: "Bedai & Jalebi Breakfast", time: "09:00 AM", cost: 260, category: "Food", icon: "Utensils", notes: "Local morning breakfast" },
          { id: "a-act-3", title: "Agra Fort Guided Tour", time: "11:30 AM", cost: 700, category: "Heritage", icon: "Shield", notes: "Akbar's magnificent fort" },
        ]
      }
    ]
  }
];

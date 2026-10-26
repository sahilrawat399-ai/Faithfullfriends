import { Cause, ImpactStats, GalleryItem, StoryItem } from '../types';

export const IMAGES = {
  hero: '/src/assets/images/hero_faithful_friends_trust.jpg',
  childMeal: '/src/assets/images/cause_feed_child_1792750365325.jpg',
  feedHungry: '/src/assets/images/cause_feed_hungry_1792750366371.jpg',
  careForCows: '/src/assets/images/cause_care_for_cows_1792750367182.jpg',
  communityWelfare: '/src/assets/images/cause_community_welfare_1792750367432.jpg',
};

export const INITIAL_CAUSES: Cause[] = [
  {
    id: 'feed-child',
    title: 'Feed a Child',
    subtitle: 'Nutritious meals & daily morning nourishment for children in need',
    description: 'Providing wholesome, hygiene-certified balanced meals rich in proteins and vitamins to school-going and underprivileged children across informal settlements.',
    targetAmount: 500000,
    raisedAmount: 342500,
    imageIndex: 'child',
    donorsCount: 428,
    isUrgent: true,
    impactNote: 'Every ₹501 provides wholesome daily lunches to children for a week.'
  },
  {
    id: 'feed-hungry',
    title: 'Feed the Hungry',
    subtitle: 'Daily hot meal langar and mobile food distribution for vulnerable families',
    description: 'Hot meal distribution van serving daily lunches and dinners outside public hospitals, elder care shelters, and daily-wage construction clusters.',
    targetAmount: 600000,
    raisedAmount: 485000,
    imageIndex: 'hungry',
    donorsCount: 612,
    isUrgent: false,
    impactNote: 'Fresh rotis, dal, and seasonal vegetables prepared fresh daily.'
  },
  {
    id: 'cow-welfare',
    title: 'Care for Cows (Gau Seva)',
    subtitle: 'Nutritious green fodder, clean water, and shelter for sacred cows',
    description: 'Dedicated sanctuary care for injured, abandoned, and elderly cows with 24/7 veterinarian access, fresh green grass, jaggery, and clean bedding.',
    targetAmount: 450000,
    raisedAmount: 310200,
    imageIndex: 'cows',
    donorsCount: 395,
    isUrgent: false,
    impactNote: 'Supporting over 640 cows in verified gaushalas with daily nutritional care.'
  },
  {
    id: 'community-welfare',
    title: 'Community Welfare & Relief',
    subtitle: 'Emergency winter kits, dry rations, and healthcare assistance',
    description: 'Relief operations delivering heavy winter blankets, tarpaulins, dry grocery ration kits, and medical aid to marginalized communities during emergencies.',
    targetAmount: 400000,
    raisedAmount: 265000,
    imageIndex: 'community',
    donorsCount: 284,
    isUrgent: false,
    impactNote: 'Direct on-ground relief verified by local welfare coordinators.'
  }
];

export const INITIAL_IMPACT: ImpactStats = {
  mealsDistributed: 142850,
  childrenSupported: 3840,
  cowsCaredFor: 645,
  welfareDrives: 188,
  activeVolunteers: 456,
  totalDonationsAmount: 3125400,
  lastVerifiedDate: '2026-10-20',
  auditNote: 'Verified by Chartered Accountant & Governing Council'
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Morning Nutritious Meal Drive',
    category: 'children',
    image: IMAGES.childMeal,
    caption: 'Children receiving hot nutritious dal-khichdi and seasonal apples before their remedial study session.',
    date: 'October 2026',
    location: 'North Delhi Community Learning Centre'
  },
  {
    id: 'g-2',
    title: 'Community Care & Children Welfare Drive',
    category: 'meals',
    image: IMAGES.feedHungry,
    caption: 'Faithful Friends Welfare team, educators, and volunteers gathering with children during our nutrition and community support initiative.',
    date: 'October 2026',
    location: 'Community Centre, New Delhi'
  },
  {
    id: 'g-3',
    title: 'Gau Seva & Fodder Loading',
    category: 'cows',
    image: IMAGES.careForCows,
    caption: 'Fresh organic green fodder and jaggery distributed to over 200 rescue cows at our partner gaushala sanctuary.',
    date: 'September 2026',
    location: 'Vrindavan Gaushala Care Project'
  },
  {
    id: 'g-4',
    title: 'Winter Relief Blanket Distribution',
    category: 'community',
    image: IMAGES.communityWelfare,
    caption: '1,200 thermal fleece blankets and dry ration packages distributed to elderly residents and migrant families.',
    date: 'September 2026',
    location: 'Yamuna Floodplain Settlements'
  },
  {
    id: 'g-5',
    title: 'Dedicated Volunteer Service Team',
    category: 'volunteers',
    image: IMAGES.hero,
    caption: 'Faithful Friends Welfare Trust team celebrating and sharing wholesome meals and festive joy with children.',
    date: 'October 2026',
    location: 'Faithful Friends Community Centre'
  }
];

export const STORIES_OF_CHANGE: StoryItem[] = [
  {
    id: 'story-1',
    title: 'From Empty Stomachs to Enthusiastic Learners: Riya & Anuj',
    summary: 'How regular morning meal support helped two young siblings maintain 94% school attendance.',
    cause: 'Feed a Child',
    date: 'October 14, 2026',
    image: IMAGES.childMeal,
    metrics: '380 children supported in the cluster',
    fullStory: `Eight-year-old Riya and her brother Anuj used to skip their morning classes due to hunger. Their parents work twelve-hour shifts as construction helpers and often left home before sunrise without resources for breakfast.

Through Faithful Friends Welfare's morning nourishment initiative, Riya and Anuj now receive a warm, protein-packed breakfast bowl every single morning before school starts. Their school teacher reports an astounding turnaround: Riya's attendance has risen to 94%, and Anuj has developed an eager fascination with mathematics. Small acts of kindness, multiplied across hundreds of children, change the trajectory of entire generations.`
  },
  {
    id: 'story-2',
    title: 'Sanctuary for the Gentle: Rescuing Kamdhenu & Her Calf',
    summary: 'A story of rehabilitation, veterinary healing, and lifetime sanctuary for an injured cow and newborn.',
    cause: 'Care for Cows',
    date: 'September 28, 2026',
    image: IMAGES.careForCows,
    metrics: '24/7 Veterinary & Fodder Care',
    fullStory: `Found wandering near a busy national highway divider with a fractured rear leg, Kamdhenu was severely malnourished and frightened. A passerby contacted Faithful Friends Welfare's animal welfare helpline.

Within 45 minutes, our rescue vehicle safely transported her to the Gaushala sanctuary. Over six weeks of intensive veterinary treatment, calcium supplementation, and fresh green grass nourishment, Kamdhenu healed completely. Three months later, she gave birth to a healthy calf. Today, both thrive in a safe, open paddock surrounded by loving caretakers.`
  },
  {
    id: 'story-3',
    title: 'Dignity on a Platter: Serving 500 Hot Meals Daily Outside AIIMS',
    summary: 'Supporting outstation families who spend weeks outside referral hospitals without access to affordable food.',
    cause: 'Feed the Hungry',
    date: 'September 12, 2026',
    image: IMAGES.feedHungry,
    metrics: '15,000+ meals served every month',
    fullStory: `Families of patients travelling from rural regions for medical treatments frequently exhaust their lifetime savings on diagnostic tests and medicines, often going days on just plain biscuits and tea.

Our community meal van parks outside public hospital corridors every afternoon, serving freshly steamed rice, wholesome dal, seasonal vegetables, and warm chapatis. Served with deep respect and hygienic food-grade plates, this meal is not merely calories—it is reassurance that someone cares.`
  }
];

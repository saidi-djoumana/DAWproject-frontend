<template>
  <div class="page">
    <HeroBanner />

    <div class="container">
      <!-- TOP: left event card + right scientific committee -->
      <div class="topGrid">
        <div class="leftCol">
          <EventInfoCard :event="event" />
        </div>

        <div class="rightCol">
          <h2 class="sectionTitle">Scientific Committee</h2>

          <PersonHighlightCard :person="scientificChair" />

          <h3 class="subTitle">Committee Members</h3>

          <div class="membersGrid">
            <PersonCard v-for="m in committeeMembers" :key="m.email" :person="m" />
          </div>
        </div>
      </div>

      <!-- MIDDLE: speakers + programme -->
      <div class="midGrid">
        <div>
          <h2 class="sectionTitle">Speakers</h2>
          <div class="speakersGrid">
            <SpeakerCard v-for="s in speakers" :key="s.email" :speaker="s" />
          </div>
        </div>

        <div>
          <h2 class="sectionTitle">Programme</h2>
          <ProgrammeSection :days="programmeDays" />
        </div>
      </div>

      <!-- BOTTOM: workshops -->
      <div class="workshopsWrap">
        <h2 class="sectionTitle center">Associated Workshops</h2>

        <div class="workshopsGrid">
          <WorkshopCard
            v-for="w in workshops"
            :key="w.id"
            :workshop="w"
            @register="onRegisterWorkshop"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeroBanner from "@/components/eventDetails/HeroBanner.vue";
import EventInfoCard from "@/components/eventDetails/EventInfoCard.vue";
import PersonHighlightCard from "@/components/eventDetails/PersonHighlightCard.vue";
import PersonCard from "@/components/eventDetails/PersonCard.vue";
import SpeakerCard from "@/components/eventDetails/SpeakerCard.vue";
import ProgrammeSection from "@/components/eventDetails/ProgrammeSection.vue";
import WorkshopCard from "@/components/eventDetails/WorkshopCard.vue";

const event = {
  title: "Event",
  startDate: "March 1, 2023",
  endDate: "March 3, 2023",
  duration: "3 days",
  description:
    "Join us for an exciting event that will cover various topics in depth. This event is designed for enthusiasts and professionals alike to exchange ideas and learn from each other.",
  type: "Conference",
  topics: ["Innovation", "Technology", "Networking"],
};

const scientificChair = {
  name: "Prof. Dr. John Smith",
  affiliation: "Harvard Medical University",
  specialty: "Healthcare Analytics",
  email: "john.smith@harvard.edu",
};

const committeeMembers = [
  {
    name: "Dr. Jane Doe",
    affiliation: "MIT",
    specialty: "Data Science",
    email: "jane@mit.edu",
  },
  {
    name: "Dr. Ahmed Hassan",
    affiliation: "American University of Cairo",
    specialty: "Medical Informatics",
    email: "ahmed@auc.edu.eg",
  },
  {
    name: "Prof. Mohamed Bouramoul",
    affiliation: "University Constantine 2",
    specialty: "Research Methods",
    email: "m.bouramoul@ucc2.dz",
  },
  {
    name: "Dr. Fatima Al-Rashid",
    affiliation: "King Saud University",
    specialty: "Healthcare Systems",
    email: "fatima@ksu.edu.sa",
  },
];

const speakers = [
  {
    name: "Dr. Expert Speaker 2",
    topic: "Data Privacy in Medical Systems",
    affiliation: "MIT Media Lab",
    email: "expert2@mit.edu",
    bio: '"Lorem ipsum dolor sit amet..."',
  },
  {
    name: "Prof. Expert Speaker 3",
    topic: "Future of Clinical Data Analytics",
    affiliation: "Oxford University",
    email: "expert3@oxford.edu",
    bio: '"Lorem ipsum dolor sit amet..."',
  },
];

const programmeDays = [
  {
    label: "Day 1",
    items: [
      { time: "9:00-10:00", title: "Opening Ceremony" },
      { time: "10:00-11:00", title: "Session 1: AI in Healthcare" },
      { time: "11:00-12:00", title: "Lunch Break" },
      { time: "12:00-13:00", title: "Session 2: Big Data Analytics" },
    ],
  },
  { label: "Day 2", items: [{ time: "9:00-10:00", title: "Workshops & Panels" }] },
  { label: "Day 3", items: [{ time: "9:00-10:00", title: "Closing & Awards" }] },
];

const workshops = [
  {
    id: 1,
    title: "Workshop on AI for Clinical Diagnosis",
    date: "June 15, 2025",
    time: "15:00 - 16:30",
    location: "Workshop Room A",
    facilitator: "Dr. Tech Expert",
    capacity: { used: 45, total: 50 },
    description: '"Learn practical AI applications in clinical diagnosis..."',
    fee: "Included in registration",
    requirements: "None",
  },
  {
    id: 2,
    title: "Workshop on AI for Clinical Diagnosis",
    date: "June 15, 2025",
    time: "15:00 - 16:30",
    location: "Workshop Room A",
    facilitator: "Dr. Tech Expert",
    capacity: { used: 45, total: 50 },
    description: '"Learn practical AI applications in clinical diagnosis..."',
    fee: "Included in registration",
    requirements: "None",
  },
  {
    id: 3,
    title: "Workshop on AI for Clinical Diagnosis",
    date: "June 15, 2025",
    time: "15:00 - 16:30",
    location: "Workshop Room A",
    facilitator: "Dr. Tech Expert",
    capacity: { used: 45, total: 50 },
    description: '"Learn practical AI applications in clinical diagnosis..."',
    fee: "Included in registration",
    requirements: "None",
  },
];

function onRegisterWorkshop(workshopId) {
  console.log("Register workshop:", workshopId);
}
</script>

<style scoped>
.page {
  font-family: var(--font-sans);
  background: #f4f5f7;
  min-height: 100vh;
}

.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 22px 18px 60px;
}

.topGrid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: start;
}

.midGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  margin-top: 26px;
  align-items: start;
}

.sectionTitle {
  font-family: var(--font-title);
  font-size: 22px;
  font-weight: 700;
  margin: 10px 0 14px;
  color: #111827;
}

.subTitle {
  font-family: var(--font-title);
  font-size: 18px;
  font-weight: 700;
  margin: 18px 0 12px;
  color: #111827;
}

.center {
  text-align: center;
}

.membersGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.speakersGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.workshopsWrap {
  margin-top: 30px;
  padding-top: 10px;
}

.workshopsGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-top: 14px;
}

@media (max-width: 980px) {
  .topGrid {
    grid-template-columns: 1fr;
  }
  .midGrid {
    grid-template-columns: 1fr;
  }
  .workshopsGrid {
    grid-template-columns: 1fr;
  }
  .speakersGrid {
    grid-template-columns: 1fr;
  }
  .membersGrid {
    grid-template-columns: 1fr;
  }
}
</style>

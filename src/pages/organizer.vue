<template>
    <OrganizerHero />
    <EventSetupSection />
    <Events />
    <PaymentStatus />
    <SubmissionManagement />
    <Footer />

</template>

<script setup>
import OrganizerHero from '@/components/organizer/OrganizerHero.vue';
import EventSetupSection from '@/components/organizer/EventSetupSection.vue';
import Events from '@/components/organizer/Events.vue';
import PaymentStatus from '@/components/organizer/PaymentStatus.vue';
import SubmissionManagement from '@/components/organizer/SubmissionManagement.vue';
import Footer from '@/components/Footer.vue';
</script>


<template>
    <adminNavBar />
    <AdminHero />
    <Dashboard />
    <organizersToApprove />
    <platformUsersList />
    <createOrganizer />
    <allEvents />
    <allSubmissions />
    <allEvaluations />
    <Footer />  

    
</template>


<script setup>
import AdminHero from '@/components/admin/adminHero.vue';
import Footer from '@/components/Footer.vue';
import Dashboard from '@/components/admin/dashboard.vue';
import organizersToApprove from '@/components/admin/organizersToApprove.vue';
import platformUsersList from '@/components/admin/platformUsersList.vue';
import createOrganizer from '@/components/admin/createOrganizer.vue';
import allEvents from '@/components/admin/allEvents.vue';
import allSubmissions from '@/components/admin/allSubmissions.vue';
import allEvaluations from '@/components/admin/allEvaluations.vue';
import adminNavBar from '@/components/admin/adminNavBar.vue';
</script>
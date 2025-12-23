<template>
    <AdminHero />
    <Dashboard />
    <organizersToApprove />
    <platformUsersList />
    <createOrganizer />
    <Footer />  

    
</template>


<script setup>
import AdminHero from '@/components/admin/adminHero.vue';
import Footer from '@/components/Footer.vue';
import Dashboard from '@/components/admin/dashboard.vue';
import organizersToApprove from '@/components/admin/organizersToApprove.vue';
import platformUsersList from '@/components/admin/platformUsersList.vue';
import createOrganizer from '@/components/admin/createOrganizer.vue';
</script>
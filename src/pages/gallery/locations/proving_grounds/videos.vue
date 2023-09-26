<template>
    <video-player name="proving_ground_1" :next-route-name="GALLERY.STATE_PARK"/>
</template>

<script setup lang="ts">
import { VideoPlayer } from "@/pages/gallery/components"
import { GALLERY } from "@/route/names";
</script>
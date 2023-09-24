<template>
    <video-player name="golf_course_1" file-name='SNW-Drone_Golf Course Hole 2__(4m).mp4' :next-route-name="GALLERY.PROVING_GROUNDS"/>
</template>

<script setup lang="ts">
import { VideoPlayer } from "@/pages/gallery/components"
import { GALLERY } from "@/route/names";
</script>
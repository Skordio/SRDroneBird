<template>
    <video-player name="golf_course_1" file-name='SNW-Drone_Golf Cart Tour__(11m)3.mp4' :next-route-name="GALLERY.GOLF_COURSE"/>
</template>

<script setup lang="ts">
import { VideoPlayer } from "@/pages/gallery/components"
import { GALLERY } from "@/route/names";
</script>
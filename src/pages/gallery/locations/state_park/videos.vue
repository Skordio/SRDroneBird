<template>
    <video-player name="state_park_1" file-name='SNW-Drone_CT State Park 2__(3m).mp4' :next-route-name="GALLERY.LAKE"/>
</template>

<script setup lang="ts">
import { VideoPlayer } from "@/pages/gallery/components"
import { GALLERY } from "@/route/names";
</script>
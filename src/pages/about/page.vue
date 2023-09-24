<template>
    <v-container fluid class="mx-8 text-body-1 d-flex flex-column overflow-y-auto">
        <v-row class="d-flex align-center">
            <v-col cols="auto">
                <p class="text-h3">About</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-card class="about-card pa-3" elevation="10">
                    <p>
                        Hi, my name is Steven Wells.
                    </p>
                    <p>
                        SR DroneBird is my drone photography and videography company based near Scranton, Pennsylvania.
                    </p>
                    <p>
                        I have been flying drones for almost a year now as a personal hobby, and I am now looking to offer
                        my services as
                        a drone photographer. I am willing to do any job, ranging from weddings to real estate to personal
                        projects.
                    </p>
                    <p>
                        From flying my drones recreationally I have amassed a large amount of footage, and from that I have
                        edited several full cuts and short clips, which you can find on the gallery section of this website. 
                        Most of the footage is taken near Lake Wallenpaupack in the Pocono Mountains of Pennsylvania.
                    </p>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-card class="about-card pa-3" elevation="10">
                    <p>
                        Drone List:    
                    </p>
                    <ul>
                        <li>
                            DJI Avata
                        </li>
                        <li>
                            DJI FPV
                        </li>
                        <li>
                            iFlight Nazgul V3
                        </li>
                    </ul>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss">
.about-card {
    background: rgba(221, 44, 0, 0.4) !important;
}
</style>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs"
import { useTitle } from "@vueuse/core"

const display = useDisplay()

const title = useTitle()


</script>
